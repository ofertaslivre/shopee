// Endpoints do painel para a Shopee (só com a senha do painel).
import { configurado, resolver, produto, salvarImagem, atualizarPrecos } from "./lib/shopee.mjs";

const J = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });
const admin = (req) => !!process.env.ADMIN_PASSWORD && req.headers.get("x-admin-senha") === process.env.ADMIN_PASSWORD;

export default async (req) => {
  const path = new URL(req.url).pathname;
  if (!admin(req)) return J({ erro: "Senha incorreta" }, 401);
  if (path === "/api/shopee-atualizar" && req.method === "POST") {
    if (!configurado()) return J({ erro: "Faltam as chaves da API de afiliados (veja a aba Shopee)." }, 400);
    return J(await atualizarPrecos());
  }
  if (req.method === "GET") return J({ configurado: configurado() });
  if (req.method === "POST") {
    if (!configurado()) return J({ erro: "A busca automática precisa das chaves da API de afiliados da Shopee (veja a aba Shopee). Preencha os campos manualmente." }, 400);
    try {
      const { url } = await req.json();
      const d = await produto(await resolver(url));
      const f = await salvarImagem(d.foto);
      if (f) d.foto = f;
      return J(d);
    } catch (e) { return J({ erro: e.message }, 400); }
  }
  return J({ erro: "Método não permitido" }, 405);
};

export const config = { path: ["/api/shopee", "/api/shopee-atualizar"] };
