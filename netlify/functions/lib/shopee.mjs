// Busca dados de produtos pela API OFICIAL de afiliados da Shopee (precisa de App ID e Secret).
import { createHash } from "node:crypto";
import { getStore } from "@netlify/blobs";
import { PADRAO } from "./padrao.mjs";

const ENDPOINT = "https://open-api.affiliate.shopee.com.br/graphql";
const HOST = /(^|\.)(shopee\.com\.br|shp\.ee|shope\.ee)$/i;
export const configurado = () => !!(process.env.SHOPEE_APP_ID && process.env.SHOPEE_SECRET);

const ids = (u) => { const m = /\/product\/(\d+)\/(\d+)/.exec(u) || /-i\.(\d+)\.(\d+)/.exec(u); return m ? { shopId: m[1], itemId: m[2] } : null; };

// Aceita link completo do produto ou link curto (s.shopee.com.br), seguindo os redirecionamentos
export async function resolver(link) {
  let u = String(link || "").trim();
  for (let i = 0; i < 5; i++) {
    let h;
    try { h = new URL(u).hostname; } catch { throw new Error("Link inválido."); }
    if (!HOST.test(h)) throw new Error("O link precisa ser da Shopee (shopee.com.br ou s.shopee.com.br).");
    const r = ids(u);
    if (r) return r;
    const res = await fetch(u, { redirect: "manual", headers: { "user-agent": "Mozilla/5.0" } });
    const loc = res.headers.get("location");
    if (!loc) break;
    u = new URL(loc, u).href;
  }
  throw new Error("Não consegui identificar o produto por esse link. Use o link completo da página do produto ou preencha manualmente.");
}

async function gql(query) {
  const body = JSON.stringify({ query }), ts = Math.floor(Date.now() / 1000), id = process.env.SHOPEE_APP_ID;
  const sig = createHash("sha256").update(id + ts + body + process.env.SHOPEE_SECRET).digest("hex");
  const r = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json", Authorization: `SHA256 Credential=${id}, Timestamp=${ts}, Signature=${sig}` },
    body,
  });
  const j = await r.json();
  if (j.errors?.length) throw new Error(j.errors[0].message || "Erro na API da Shopee");
  return j.data;
}

export async function produto({ shopId, itemId }) {
  const d = await gql(`{ productOfferV2(shopId: ${shopId}, itemId: ${itemId}, limit: 1) { nodes { itemId shopId productName imageUrl priceMin priceMax productLink offerLink shopName } } }`);
  const n = d?.productOfferV2?.nodes?.[0];
  if (!n) throw new Error("A API de afiliados não encontrou esse produto (ele precisa participar do programa de afiliados).");
  const preco = parseFloat(n.priceMin) || 0, precoMax = parseFloat(n.priceMax) || preco;
  return {
    nome: n.productName, preco, precoMax,
    precoTxt: preco ? (precoMax > preco ? "a partir de " : "") + preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) : "",
    foto: n.imageUrl, link: n.offerLink || n.productLink, shopId: String(n.shopId || shopId), itemId: String(n.itemId || itemId),
  };
}

// Guarda a foto no seu próprio site (assim o compartilhamento com foto funciona e ela não some se a Shopee mudar o endereço)
export async function salvarImagem(url) {
  try {
    if (!/^https:\/\//.test(url || "")) return "";
    const r = await fetch(url);
    if (!r.ok) return "";
    const tipo = (r.headers.get("content-type") || "").split(";")[0];
    if (!tipo.startsWith("image/")) return "";
    const b = await r.arrayBuffer();
    if (b.byteLength > 1500000) return "";
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    await getStore("imagens").set(id, b, { metadata: { tipo } });
    return "/api/imagem?id=" + id;
  } catch { return ""; }
}

// Atualiza só os preços dos produtos Shopee (relê a config antes de gravar para não apagar edições do painel)
export async function atualizarPrecos() {
  if (!configurado()) return { atualizados: 0, total: 0 };
  const store = getStore("loja");
  const cfg = (await store.get("config", { type: "json" })) ?? PADRAO;
  const alvo = cfg.produtos.filter((p) => p.tipo === "shopee" && p.auto !== false && p.shopId && p.itemId).slice(0, 200);
  const novos = {};
  for (const p of alvo) { try { const d = await produto(p); novos[p.id] = { preco: d.preco, precoMax: d.precoMax }; } catch {} }
  const atual = (await store.get("config", { type: "json" })) ?? PADRAO;
  let n = 0;
  for (const p of atual.produtos) {
    const x = novos[p.id];
    if (x && x.preco > 0) { p.preco = x.preco; p.precoMax = x.precoMax; p.atualizadoEm = new Date().toISOString(); n++; }
  }
  if (n) await store.setJSON("config", atual);
  return { atualizados: n, total: alvo.length };
}
