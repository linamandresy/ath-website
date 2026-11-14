
/* ===== CONFIGURATION — remplacez ici images et coordonnées ===== */
const SITE_CONFIG={
  images:{hero:"",about:"",cta:"",services:["","","",""]}, // ex: "images/hero-house.jpg"
  contact:{whatsapp:"261XXXXXXXXX",phone:"",email:"",address:"",facebook:""}
};
/* ===== PROJETS — ajoutez des objets ici (cover vide = image de démonstration) ===== */
const projects=[
 {id:1,title:"Maison familiale",location:"",category:"Maisons individuelles",year:"",description:"",cover:"",images:["","",""]},
 {id:2,title:"Villa contemporaine",location:"",category:"Villas",year:"",description:"",cover:"",images:["","",""]},
 {id:3,title:"Résidence",location:"",category:"Résidences",year:"",description:"",cover:"",images:["",""]},
 {id:4,title:"Maison à étage",location:"",category:"Maisons individuelles",year:"",description:"",cover:"",images:["","",""]},
 {id:5,title:"Villa avec terrasse",location:"",category:"Villas",year:"",description:"",cover:"",images:["",""]},
 {id:6,title:"Autre réalisation",location:"",category:"Autres réalisations",year:"",description:"",cover:"",images:[""]}
];
const CATS=["Tous les projets","Maisons individuelles","Villas","Résidences","Autres réalisations"];
const SERVICES=[["Construction de maisons","Nous réalisons des projets de construction résidentielle en accordant une attention particulière aux exigences techniques, à la qualité des matériaux et aux finitions."],["Études et planification","Nous accompagnons la préparation de votre projet en tenant compte de vos besoins, des contraintes techniques et des objectifs de réalisation."],["Rénovation et extension","Nous transformons et modernisons les habitations existantes afin de les adapter aux nouveaux besoins de leurs occupants."],["Suivi et gestion de chantier","Nous assurons un suivi rigoureux des travaux afin de veiller à la bonne exécution du projet à chaque étape."]];
const STEPS=[["Comprendre votre projet","Nous échangeons avec vous afin de comprendre vos attentes, vos besoins et votre vision."],["Étudier et planifier","Nous préparons les éléments techniques et organisons les différentes étapes du projet."],["Préparer le chantier","Nous organisons les ressources et préparons le démarrage des travaux."],["Construire et suivre","Nous suivons l'avancement des travaux et veillons à la qualité de leur réalisation."],["Livrer votre projet","Nous finalisons les travaux et procédons à la livraison de votre habitation."]];

const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const WIRE='<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true"><path d="M30 140 200 40l170 100z" stroke="#fff" stroke-opacity=".5" stroke-width=".8"/><path d="M70 140v100h260V140" stroke="#263DAD" stroke-width="1.2"/><path d="M50 240h300v24H50z" stroke="#43C65A" stroke-width="1.2"/><path d="M200 40v200M70 190h260" stroke="#fff" stroke-opacity=".25" stroke-dasharray="3 4"/></svg>';
function media(src,alt,label,eager){
  if(src)return `<img src="${esc(src)}" alt="${esc(alt)}" ${eager?'':'loading="lazy"'}>`;
  return `<div class="ph" role="img" aria-label="${esc(alt)} (image de démonstration)">${WIRE}<span>${esc(label||"Image de démonstration")}</span></div>`;
}
/* Images configurables */
$$("[data-img]").forEach(el=>{const k=el.dataset.img;el.insertAdjacentHTML("afterbegin",media(SITE_CONFIG.images[k],el.dataset.label,el.dataset.label,k==="hero"))});
/* Services */
$("#sg").innerHTML=SERVICES.map((s,i)=>`<article class="srv rv"><div class="media">${media(SITE_CONFIG.images.services[i],s[0],"Image de démonstration")}</div><div class="row"><span class="n">0${i+1}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div><span class="arr" aria-hidden="true">→</span></div></article>`).join("");
$("#fs").innerHTML=SERVICES.map(s=>`<li><a href="#services">${s[0]}</a></li>`).join("");
/* Process */
$("#tl").insertAdjacentHTML("beforeend",STEPS.map((s,i)=>`<div class="st rv" style="transition-delay:${i*.12}s"><i>0${i+1}</i><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join(""));
/* Contacts */
const C=SITE_CONFIG.contact,PH='<span>À renseigner</span>',wa=C.whatsapp.replace(/\D/g,"");
const rows=[["Téléphone",C.phone&&`<a href="tel:${esc(C.phone)}">${esc(C.phone)}</a>`],["E-mail",C.email&&`<a href="mailto:${esc(C.email)}">${esc(C.email)}</a>`],["Adresse",C.address&&esc(C.address)],["Facebook",C.facebook&&`<a href="${esc(C.facebook)}" target="_blank" rel="noopener">Page Facebook</a>`],["WhatsApp",/\d{6,}/.test(wa)?`<a href="https://wa.me/${wa}" target="_blank" rel="noopener">+${wa}</a>`:PH]];
$("#coords").innerHTML=rows.map(r=>`<li><b>${r[0]}</b>${r[1]||PH}</li>`).join("");
$("#fc").innerHTML=rows.filter(r=>r[1]).map(r=>`<li>${r[1]}</li>`).join("")||'<li>Coordonnées à renseigner</li>';
/* Portfolio */
let cur="Tous les projets",list=projects,pi=0,ii=0,last=null;
$("#fl").innerHTML=CATS.map((c,i)=>`<button type="button" aria-pressed="${i==0}" data-c="${c}">${c}</button>`).join("");
function render(){
  list=cur===CATS[0]?projects:projects.filter(p=>p.category===cur);
  $("#gal").innerHTML=list.length?list.map((p,i)=>`<button class="card" data-i="${i}" style="animation-delay:${i*.06}s" aria-label="Ouvrir le projet ${esc(p.title)}"><div class="media">${media(p.cover||(p.images||[])[0],p.title,"Démonstration — photo à remplacer")}</div><div class="meta"><div><h3>${esc(p.title)}</h3><small>${esc([p.location,p.year].filter(Boolean).join(" — ")||"Localisation à renseigner")}</small></div><span class="cat">${esc(p.category||"")}</span></div></button>`).join(""):'<p class="empty">Aucun projet dans cette catégorie pour le moment.</p>';
}
$("#fl").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;cur=b.dataset.c;$$("#fl button").forEach(x=>x.setAttribute("aria-pressed",x===b));render()});
$("#gal").addEventListener("click",e=>{const c=e.target.closest(".card");if(c)openP(+c.dataset.i,c)});
render();
/* Modal */
const md=$("#md");
function imgs(p){const a=(p.images&&p.images.length?p.images:[p.cover]);return a.length?a:[""]}
function openP(i,from){pi=(i+list.length)%list.length;ii=0;if(from)last=from;md.classList.add("open");document.body.style.overflow="hidden";fill();$("#cl").focus()}
function fill(){
  const p=list[pi],a=imgs(p);
  $("#vw").innerHTML=media(a[ii],`${p.title} — photo ${ii+1}`,"Démonstration — photo à remplacer",true);
  $("#ct").textContent=`${ii+1} / ${a.length}`;
  $("#mt").textContent=p.title;$("#mc").textContent=p.category||"";
  $("#mm").innerHTML=[["Localisation",p.location],["Catégorie",p.category],["Année",p.year]].filter(r=>r[1]).map(r=>`<dt>${r[0]}</dt><dd>${esc(r[1])}</dd>`).join("")||"<dt>Détails</dt><dd>À renseigner</dd>";
  $("#mp").textContent=p.description||"Description du projet à renseigner.";
  $("#th").innerHTML=a.map((_,k)=>`<button data-k="${k}" ${k===ii?'aria-current="true"':""} aria-label="Photo ${k+1}">${k+1}</button>`).join("");
  $$(".nv").forEach(b=>b.style.display=a.length>1?"":"none");
}
const shift=d=>{const n=imgs(list[pi]).length;ii=(ii+d+n)%n;fill()};
$("#pv").onclick=()=>shift(-1);$("#nx").onclick=()=>shift(1);
$("#pp").onclick=()=>{pi=(pi-1+list.length)%list.length;ii=0;fill()};$("#pn").onclick=()=>{pi=(pi+1)%list.length;ii=0;fill()};
$("#th").onclick=e=>{const b=e.target.closest("button");if(b){ii=+b.dataset.k;fill()}};
function closeP(){md.classList.remove("open");document.body.style.overflow="";last&&last.focus()}
$("#cl").onclick=closeP;md.addEventListener("click",e=>{if(e.target===md)closeP()});
addEventListener("keydown",e=>{
  if(e.key==="Escape"){if(md.classList.contains("open"))closeP();else toggleMenu(false)}
  if(!md.classList.contains("open"))return;
  if(e.key==="ArrowLeft")shift(-1);if(e.key==="ArrowRight")shift(1);
  if(e.key==="Tab"){const f=$$("button",md).filter(b=>b.offsetParent);const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
});
/* Menu mobile */
const bg=$("#bg"),mob=$("#mob");
function toggleMenu(s){const o=s??!mob.classList.contains("open");mob.classList.toggle("open",o);bg.setAttribute("aria-expanded",o);bg.setAttribute("aria-label",o?"Fermer le menu":"Ouvrir le menu");document.body.style.overflow=o?"hidden":""}
bg.onclick=()=>toggleMenu();$$("a",mob).forEach(a=>a.onclick=()=>toggleMenu(false));
/* Scroll : nav, retour haut, lien actif */
const secs=$$("main section[id]"),links=$$(".links a"),tp=$("#tp");
function onScroll(){
  $("#hd").classList.toggle("sc",scrollY>10);tp.classList.toggle("show",scrollY>700);
  let id="accueil";secs.forEach(s=>{if(scrollY+200>=s.offsetTop)id=s.id});
  links.forEach(a=>a.classList.toggle("act",a.getAttribute("href")==="#"+id));
}
addEventListener("scroll",onScroll,{passive:true});onScroll();
tp.onclick=()=>scrollTo({top:0,behavior:"smooth"});
/* Révélations */
const io="IntersectionObserver"in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");if(e.target.id==="tl")e.target.classList.add("on");io.unobserve(e.target)}}),{threshold:.15}):null;
$$(".rv,#tl").forEach(el=>io?io.observe(el):el.classList.add("in","on"));
/* Formulaire → WhatsApp */
const form=$("#form");
function check(f){
  const i=$("input,select,textarea",f),v=i.value.trim(),e=$(".err",f);if(!e)return true;let m="";
  if(i.required&&!v)m="Ce champ est obligatoire.";
  else if(i.type==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))m="Saisissez une adresse e-mail valide (ex. nom@exemple.com).";
  else if(i.type==="tel"&&v&&!/^[+\d][\d\s().-]{6,}$/.test(v))m="Saisissez un numéro de téléphone valide.";
  f.classList.toggle("bad",!!m);e.textContent=m;i.setAttribute("aria-invalid",!!m);return !m;
}
$$(".f",form).forEach(f=>{const i=$("input,select,textarea",f);if(i)i.addEventListener("blur",()=>check(f))});
form.addEventListener("submit",e=>{
  e.preventDefault();$("#ok").style.display="none";
  const ok=$$(".f",form).map(check).every(Boolean);
  if(!ok){const b=$(".bad input,.bad select,.bad textarea",form);b&&b.focus();return}
  const t=["*Nouvelle demande — ATH Construction*",""];
  $$("input,select,textarea",form).forEach(i=>{if(i.value.trim())t.push(`*${i.name} :* ${i.value.trim()}`)});
  if(!/\d{6,}/.test(wa)){$("#ok").textContent="Le numéro WhatsApp n'est pas encore configuré (SITE_CONFIG.contact.whatsapp).";$("#ok").style.display="block";return}
  open(`https://wa.me/${wa}?text=${encodeURIComponent(t.join("\n"))}`,"_blank","noopener");
  $("#ok").textContent="Merci ! WhatsApp s'ouvre avec votre demande : appuyez sur « Envoyer » pour la transmettre à notre équipe.";$("#ok").style.display="block";form.reset();
});
