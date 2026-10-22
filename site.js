const TEMAS={
 verde:{prim:"#0f3d2e",pt:"#fff",dest:"#14683f",dest2:"#1a8a52",ouro:"#e6f4c8",bt:"#fff",faixa:"#eef6e8",btn:"#0f3d2e",btt:"#fff",cta:"#eef6e8",ctat:"#0f3d2e",pd:"#e6f4c8",
  b1:"radial-gradient(circle at 80% 50%,#2fb866,#0f5a37 70%)",b2:"radial-gradient(circle at 80% 50%,#2c4a3a,#0b1f17 70%)",b3:"radial-gradient(circle at 80% 50%,#6fcf97,#1b6b45 70%)",promo:"linear-gradient(100deg,#0b1f17,#14683f)"},
 preto:{prim:"#000",pt:"#fff",dest:"#111",dest2:"#d99a00",ouro:"#f5b800",bt:"#fff",faixa:"#f1efe9",btn:"#000",btt:"#fff",cta:"#f5b800",ctat:"#000",pd:"#f5b800",
  b1:"radial-gradient(circle at 80% 50%,#3a3a3a,#000 70%)",b2:"radial-gradient(circle at 80% 50%,#5a4600,#0a0a0a 70%)",b3:"radial-gradient(circle at 80% 50%,#444,#111 70%)",promo:"linear-gradient(100deg,#000,#3a2f00)"},
 vermelho:{prim:"#7a0c14",pt:"#fff",dest:"#b5121b",dest2:"#d01e27",ouro:"#f5d9a0",bt:"#fff",faixa:"#fbf5e9",btn:"#7a0c14",btt:"#fff",cta:"#fbf5e9",ctat:"#5a0c10",pd:"#f5d9a0",
  b1:"radial-gradient(circle at 80% 50%,#d92b30,#8f0c13 70%)",b2:"radial-gradient(circle at 80% 50%,#1f6f3f,#0b3a20 70%)",b3:"radial-gradient(circle at 80% 50%,#c43a55,#6e1228 70%)",promo:"linear-gradient(100deg,#2a0508,#8f0c13)"},
 amarelo:{prim:"#ffd400",pt:"#111",dest:"#111",dest2:"#e11d1d",ouro:"#111",bt:"#111",faixa:"#fff7c2",btn:"#111",btt:"#fff",cta:"#111",ctat:"#ffd400",pd:"#ffd400",
  b1:"radial-gradient(circle at 80% 50%,#ffe45c,#f5b800 70%)",b2:"radial-gradient(circle at 80% 50%,#ffd400,#e69500 70%)",b3:"radial-gradient(circle at 80% 50%,#fff176,#ffc400 70%)",promo:"linear-gradient(100deg,#111,#e11d1d)"}
};
const ZAP='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>';
const SHARE='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bg=o=>o.foto?`background-image:url('${esc(o.foto)}')`:`background-color:${esc(o.cor||'#777')}`;
const linhas=t=>String(t||'').split('\n').map(x=>x.trim()).filter(Boolean);
const seguro=u=>/^(#|\/|https:\/\/)/.test(u||'')?u:'#conteudo';
const https=u=>/^https:\/\//i.test(u||'');
const brl=n=>Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const yt=u=>{const m=/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/.exec(u||'');return m?m[1]:''};
let CFG,t0,t1,estava=null,desenhar=()=>{},timer,atual=0,filtro='todos',busca='',cart=[];
try{cart=JSON.parse(localStorage.getItem('cart')||'[]').map(c=>({id:String(c.id),qtd:c.qtd}))}catch(e){}
const salvar=()=>{try{localStorage.setItem('cart',JSON.stringify(cart))}catch(e){}};
const pa=()=>{const p=CFG.promo;return !!p&&p.ativa&&Date.now()>=t0&&Date.now()<t1};
const slugAtual=()=>location.pathname.startsWith('/plataforma/')?decodeURIComponent(location.pathname.replace(/\/$/,'').split('/').pop()):'';
const shopee=p=>p.tipo==='shopee';
const preco=p=>pa()&&p.promo!==false&&!shopee(p)?Math.round(p.preco*(100-CFG.promo.desconto))/100:p.preco;
const catDe=p=>CFG.categorias.find(c=>c.id===p.cat)||{};
const achar=id=>CFG&&CFG.produtos.find(p=>String(p.id)===String(id));

/* ===== Curso (Hotmart): página > oferta promocional (no prazo) > link padrão. "sck" mostra de qual página veio a venda ===== */
function linkDe(slug){
  const p=CFG.plataformas.find(x=>x.slug===slug);
  const u=[p&&p.link,pa()&&CFG.promo.cursoLink,CFG.curso.link].find(x=>https(x));
  return u?u+(u.includes('?')?'&':'?')+'sck='+encodeURIComponent(slug||'home'):'';
}
document.addEventListener('click',e=>{const a=e.target.closest('[data-compra]');if(!a)return;e.preventDefault();
  const u=linkDe(a.dataset.compra);if(!u){alert('O link de compra do curso ainda não foi configurado no painel.');return}location.href=u});
function precoHTML(){const c=CFG.curso;
  if(pa()&&CFG.promo.cursoPreco)return `<span class="antigo">${esc(c.preco)}</span> <b>${esc(CFG.promo.cursoPreco)}</b>`;
  return c.preco?(c.precoDe?`<span class="antigo">${esc(c.precoDe)}</span> `:'')+`<b>${esc(c.preco)}</b>`:''}
function ofertaHTML(slug,botao){const c=CFG.curso;
  return `<section class="oferta"><div><h2>${esc(c.nome)}</h2><p>${esc(c.descricao)}</p></div><div class="preco-box"><div class="valor">${precoHTML()}</div>${c.condicao?`<small>${esc(c.condicao)}</small>`:''}<a href="#comprar" class="btn grande" data-compra="${esc(slug||'')}">${esc(botao||c.botao||'Quero o curso')}</a>${c.garantia?`<small>${esc(c.garantia)}</small>`:''}</div></section>`}
const pcard=p=>`<a class="pcard" href="/plataforma/${encodeURIComponent(p.slug)}"><div class="pfoto" style="${bg(p)}">${p.foto?'':esc(p.nome[0])}</div><div class="pinfo"><b>${esc(p.nome)}</b><p>${esc(p.resumo)}</p><span class="btn">Ver página</span></div></a>`;

/* ===== Produtos: próprios (carrinho + Mercado Pago) e da Shopee (link de afiliado) ===== */
const precoP=p=>shopee(p)&&!(p.preco>0)?'Ver preço na Shopee':shopee(p)?(p.precoMax>p.preco?'a partir de ':'')+brl(p.preco):pa()&&p.promo!==false?`<span class="antigo">${brl(p.preco)}</span>${brl(preco(p))}`:brl(p.preco);
const linhaPreco=p=>!(p.preco>0)?'':pa()&&p.promo!==false&&!shopee(p)?'De '+brl(p.preco)+' por *'+brl(preco(p))+'*':'*'+(shopee(p)&&p.precoMax>p.preco?'a partir de ':'')+brl(p.preco)+'*';
const urlP=p=>location.origin+'/p/'+encodeURIComponent(p.id);
const textoP=p=>'*'+p.nome+'*\n'+(linhaPreco(p)?linhaPreco(p)+'\n':'')+urlP(p);
const linkZap=p=>'https://wa.me/'+(CFG.loja?.whatsapp||'')+'?text='+encodeURIComponent('Olá! Tenho interesse neste produto:\n'+textoP(p));
function card(p){const c=catDe(p),o=p.foto?p:c,nm=esc(p.nome),pid=esc(p.id),sh=shopee(p),lk=p.afiliado||p.shopeeUrl;
  const acao=sh?`<a class="btn shopee" href="${https(lk)?esc(lk):'#'}" target="_blank" rel="sponsored noopener">Ver na Shopee</a>`
    :`<button class="btn" onclick="add('${pid}')">Adicionar</button><a class="ic zap" href="${esc(linkZap(p))}" target="_blank" rel="noopener" aria-label="Falar sobre ${nm} no WhatsApp" title="Falar com a loja no WhatsApp">${ZAP}</a>`;
  return `<div class="card" id="pd-${pid}"><div class="foto" style="${bg(o)}">${o.foto?'':esc(p.nome[0])}${sh?'<span class="selo">Shopee</span>':''}${p.video?`<button class="play" onclick="abrirVideo('${pid}')" aria-label="Ver vídeo de ${nm}">▶</button>`:''}</div>
 <div class="info"><div>${nm}</div><div class="preco">${precoP(p)}</div>
 ${!sh&&pa()&&p.promo!==false?`<div class="etiqueta">-${CFG.promo.desconto}% até ${new Date(t1).toLocaleDateString('pt-BR')}</div>`:''}${sh?'<small class="aviso-s">Preço e estoque podem mudar na Shopee</small>':''}
 <div class="acoes">${acao}<button class="ic" onclick="compartilhar('${pid}')" aria-label="Compartilhar ${nm}" title="Compartilhar foto e preço">${SHARE}</button></div></div></div>`}

const arq={};
function aquecer(id){ // baixa a foto antes do toque, para o compartilhamento abrir na hora
  if(arq[id])return arq[id];const p=achar(id),u=p&&(p.foto||catDe(p).foto);
  return arq[id]=u?fetch(u).then(r=>r.ok?r.blob():Promise.reject()).then(b=>new File([b],'produto.jpg',{type:b.type||'image/jpeg'})).catch(()=>false):Promise.resolve(false)}
const aquecerCard=e=>{const c=e.target.closest&&e.target.closest('.card');if(c)aquecer(c.id.slice(3))};
document.addEventListener('pointerover',aquecerCard);document.addEventListener('touchstart',aquecerCard,{passive:true});
async function compartilhar(id){
  const p=achar(id),texto=textoP(p),f=await aquecer(id);
  if(f&&navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],text:texto,title:p.nome});return}catch(e){if(e.name==='AbortError')return}}
  const link='https://wa.me/?text='+encodeURIComponent(texto);window.open(link,'_blank','noopener')||(location.href=link);
}
function abrirVideo(id){const u=achar(id).video||'',y=yt(u);
  $('mconteudo').innerHTML=y?`<iframe src="https://www.youtube-nocookie.com/embed/${y}?autoplay=1" allow="autoplay;encrypted-media" allowfullscreen title="Vídeo"></iframe>`
    :https(u)&&/\.(mp4|webm)(\?|$)/i.test(u)?`<video src="${esc(u)}" controls autoplay playsinline></video>`:'';
  if(!$('mconteudo').innerHTML){if(https(u))window.open(u,'_blank','noopener');return}
  $('modal').hidden=false}
function destacar(){const id=new URLSearchParams(location.search).get('produto');if(!id)return;const el=document.getElementById('pd-'+id);if(el){el.scrollIntoView({block:'center'});el.classList.add('dest')}}

/* ===== Carrinho (só produtos próprios) ===== */
function add(id){const i=cart.find(c=>c.id===id);i?i.qtd++:cart.push({id,qtd:1});salvar();desenharCarrinho();abrirC()}
function mudar(id,d){const i=cart.find(c=>c.id===id);i.qtd+=d;cart=cart.filter(c=>c.qtd>0);salvar();desenharCarrinho()}
function desenharCarrinho(){
  cart=cart.filter(c=>CFG.produtos.some(p=>String(p.id)===c.id&&p.ativo!==false&&!shopee(p)));let tot=0,n=0;
  $('itens').innerHTML=cart.map(c=>{const p=achar(c.id);tot+=preco(p)*c.qtd;n+=c.qtd;
   return `<div class="linha"><div>${esc(p.nome)}<br><small>${brl(preco(p))}</small></div><div class="qtd"><button onclick="mudar('${esc(c.id)}',-1)">−</button> ${c.qtd} <button onclick="mudar('${esc(c.id)}',1)">+</button></div></div>`}).join('')||'<p>Seu carrinho está vazio.</p>';
  $('total').textContent=brl(tot);$('cont').textContent=n;
}
const abrirC=()=>{$('gaveta').classList.add('aberta');$('veu').classList.add('on')},fecharC=()=>{$('gaveta').classList.remove('aberta');$('veu').classList.remove('on')};
async function pagar(){
  if(!cart.length)return;
  const nome=$('cliNome').value.trim(),tel=$('cliTel').value.replace(/\D/g,'');
  if(nome.length<2||tel.length<10){alert('Preencha seu nome e seu WhatsApp com DDD para continuar.');(nome.length<2?$('cliNome'):$('cliTel')).focus();return}
  try{localStorage.setItem('cli',JSON.stringify({nome,tel}))}catch(e){}
  $('pagar').disabled=true;$('pagar').textContent='Abrindo pagamento…';
  try{const r=await fetch('/api/checkout',{method:'POST',body:JSON.stringify({itens:cart,cliente:{nome,tel}})});const d=await r.json();if(!d.url)throw new Error(d.erro);
    try{localStorage.setItem('pedido',JSON.stringify({numero:d.numero,resumo:d.resumo}))}catch(e){}
    location.href=d.url}
  catch(e){alert('Não foi possível iniciar o pagamento: '+e.message);$('pagar').disabled=false;$('pagar').textContent='Pagar com Mercado Pago'}
}

/* ===== Cronômetro da promoção ===== */
const z=n=>String(n).padStart(2,'0');
function tick(){
  const ativa=pa(),falta=Math.max(0,t1-Date.now());$('promo').classList.toggle('ativa',ativa);
  if(ativa){const s=Math.floor(falta/1000),P=CFG.promo;
    $('promoTitulo').innerHTML=esc(P.nome)+'<br>'+(P.desconto?P.desconto+'% OFF':'')+(P.texto?(P.desconto?' · ':'')+esc(P.texto):'');
    $('d').textContent=z(Math.floor(s/86400));$('h').textContent=z(Math.floor(s%86400/3600));$('m').textContent=z(Math.floor(s%3600/60));$('s').textContent=z(s%60);
    $('restante').textContent=s>=86400?Math.floor(s/86400)+' dias':z(Math.floor(s/3600))+':'+z(Math.floor(s%3600/60));
    $('anel').style.strokeDashoffset=2*Math.PI*44*(1-falta/(t1-t0));$('relogio').classList.toggle('urgente',s<3600)}
  if(estava!==ativa){estava=ativa;desenhar();desenharCarrinho()}
}

/* ===== Estrutura comum das páginas ===== */
document.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b)return;
  if(location.pathname!=='/'){location.href='/?cat='+encodeURIComponent(b.dataset.f);return}
  filtro=b.dataset.f;busca='';(window.desenharConteudo||desenhar)();($('conteudo')||document.body).scrollIntoView({behavior:'smooth'})});
async function iniciarSite(render){
  try{CFG=await (await fetch('/api/loja',{cache:'no-store'})).json()}
  catch(e){document.body.innerHTML='<p style="padding:40px">Não foi possível carregar o site agora. Tente novamente em instantes.</p>';document.body.classList.add('ok');return}
  Object.entries(TEMAS[CFG.tema]||TEMAS.verde).forEach(([k,v])=>document.documentElement.style.setProperty('--'+k,v));
  t0=new Date(CFG.promo?.inicio).getTime();t1=new Date(CFG.promo?.fim).getTime();
  const S=CFG.loja||{},ps=CFG.plataformas.filter(p=>p.ativo!==false),Q=new URLSearchParams(location.search);
  document.title=S.nome||'Loja';if(Q.get('cat'))filtro=Q.get('cat');if(Q.get('busca'))busca=Q.get('busca').toLowerCase();
  $('topo').innerHTML=`<div class="faixa">${(CFG.faixa||[]).filter(Boolean).map(f=>{const [a,b]=f.split('|');return `<span><b>${esc(a)}</b>${esc(b||'')}</span>`}).join('')}</div>
   <header><a class="logo" href="/">${esc(S.nome)}</a><form class="busca" id="busca" role="search"><input id="q" placeholder="Buscar produtos" aria-label="Buscar"><button type="submit">Buscar</button></form><button class="carrinho" id="abrir">Carrinho (<span id="cont">0</span>)</button></header>
   <nav>${[{id:'todos',nome:'Todos'},...CFG.categorias].map(c=>`<button data-f="${esc(c.id)}">${esc(c.nome)}</button>`).join('')}${ps.length?'<a href="/#cursos">Cursos</a>':''}</nav><div class="msg" id="msg"></div>`;
  $('promoBox').innerHTML=`<section id="promo" aria-live="polite"><h3 id="promoTitulo"></h3>
   <div class="relogio" id="relogio"><svg viewBox="0 0 100 100"><circle class="trilho" cx="50" cy="50" r="44"/><circle class="anel" id="anel" cx="50" cy="50" r="44"/></svg><div class="centro"><span id="restante"></span><small>restantes</small></div></div>
   <div class="blocos"><div class="bloco"><b id="d">00</b><span>dias</span></div><div class="bloco"><b id="h">00</b><span>horas</span></div><div class="bloco"><b id="m">00</b><span>min</span></div><div class="bloco"><b id="s">00</b><span>seg</span></div></div></section>`;
  $('anel').style.strokeDasharray=2*Math.PI*44;
  $('rodape').innerHTML=linhas(CFG.avisos).map(a=>`<p>${esc(a)}</p>`).join('')+`<p>© ${new Date().getFullYear()} ${esc(S.nome)}</p>`;
  document.body.insertAdjacentHTML('beforeend',`<div id="veu"></div><aside id="gaveta" aria-label="Carrinho"><div class="linha" style="border:0"><b style="font-size:1.3rem">Seu carrinho</b><button id="fechar" aria-label="Fechar">✕</button></div><div id="itens"></div>
   <div class="cli"><input id="cliNome" placeholder="Seu nome" autocomplete="name"><input id="cliTel" placeholder="Seu WhatsApp com DDD" inputmode="tel" autocomplete="tel"></div>
   <div class="total"><span>Total</span><span id="total">R$ 0,00</span></div><button class="btn" id="pagar">Pagar com Mercado Pago</button></aside>
   <div id="modal" hidden><div class="mbox"><button id="mfechar" aria-label="Fechar vídeo">✕</button><div id="mconteudo"></div></div></div>`);
  if(S.whatsapp)document.body.insertAdjacentHTML('beforeend',`<a class="zapfix" href="https://wa.me/${esc(S.whatsapp)}?text=${encodeURIComponent('Olá! Vim pelo site.')}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ZAP}</a>`);
  try{const c=JSON.parse(localStorage.getItem('cli')||'{}');$('cliNome').value=c.nome||'';$('cliTel').value=c.tel||''}catch(e){}
  $('abrir').onclick=abrirC;$('fechar').onclick=fecharC;$('veu').onclick=fecharC;$('pagar').onclick=pagar;
  const fv=()=>{$('modal').hidden=true;$('mconteudo').innerHTML=''};$('mfechar').onclick=fv;$('modal').onclick=e=>{if(e.target.id==='modal')fv()};
  $('busca').onsubmit=e=>{e.preventDefault();const v=$('q').value.trim();if(location.pathname!=='/'){location.href='/?busca='+encodeURIComponent(v);return}busca=v.toLowerCase();filtro='todos';(window.desenharConteudo||desenhar)()};
  const ret=Q.get('pago');
  if(ret){const m=$('msg');m.style.display='block';
    m.textContent=ret==='ok'?'Pagamento aprovado! Obrigado pela compra.':ret==='pendente'?'Pagamento pendente. Avisaremos quando for confirmado.':'O pagamento não foi concluído. Tente novamente.';
    let ped=null;try{ped=JSON.parse(localStorage.getItem('pedido')||'null')}catch(e){}
    if(ret!=='erro'&&ped&&S.whatsapp){const a=document.createElement('a');a.className='btn';a.target='_blank';a.rel='noopener';a.textContent='Enviar resumo do pedido para a loja no WhatsApp';a.href='https://wa.me/'+S.whatsapp+'?text='+encodeURIComponent(ped.resumo);m.append(document.createElement('br'),a)}
    if(ret==='ok'){cart=[];salvar()}}
  desenhar=render;render();desenharCarrinho();document.body.classList.add('ok');
  estava=pa();tick();setInterval(tick,1000);destacar();
}
