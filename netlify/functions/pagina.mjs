// Entrega /plataforma/<nome> com as tags que mostram foto e título quando o link é compartilhado.
import { getStore } from "@netlify/blobs";
import { PADRAO } from "./lib/padrao.mjs";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export default async (req) => {
  const u = new URL(req.url);
  const slug = decodeURIComponent(u.pathname.replace(/^\/plataforma\/?/, "").split("/")[0]);
  const cfg = (await getStore("loja").get("config", { type: "json" })) ?? PADRAO;
  const p = (cfg.plataformas || []).find((x) => x.slug === slug && x.ativo !== false);
  let html;
  try {
    const r = await fetch(u.origin + "/plataforma.html");
    if (!r.ok) throw new Error();
    html = await r.text();
  } catch {
    return new Response("Página indisponível no momento. Tente novamente.", { status: 502 });
  }
  if (p) {
    const nome = cfg.loja?.nome || "Curso";
    let img = p.foto || "";
    if (img.startsWith("/")) img = u.origin + img;
    const titulo = `${p.titulo || p.nome} | ${nome}`;
    const desc = (p.resumo || cfg.curso?.descricao || "").slice(0, 200);
    const og = `<meta name="description" content="${esc(desc)}"><meta property="og:type" content="website"><meta property="og:title" content="${esc(titulo)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${esc(u.href)}">${img ? `<meta property="og:image" content="${esc(img)}"><meta name="twitter:card" content="summary_large_image">` : ""}`;
    html = html.replace("<!--OG-->", () => og).replace("<title>Plataforma</title>", () => `<title>${esc(titulo)}</title>`);
  }
  return new Response(html, { status: p ? 200 : 404, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=60" } });
};

export const config = { path: "/plataforma/*" };
