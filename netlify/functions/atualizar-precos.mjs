// Todo dia atualiza sozinho o preço dos produtos da Shopee marcados como "automático".
import { atualizarPrecos } from "./lib/shopee.mjs";

export default async () => { await atualizarPrecos(); };
export const config = { schedule: "@daily" };
