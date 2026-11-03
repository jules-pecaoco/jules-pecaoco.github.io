const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const path = location.pathname.replace(/\/$/, '') || '/';
document.querySelectorAll('nav a').forEach(a => { if (path.startsWith(a.pathname.replace(/\/$/, ''))) a.setAttribute('aria-current', 'page'); });
const theme = document.querySelector('#theme');
const labelTheme = () => { if(theme) {theme.textContent = document.documentElement.classList.contains('dark') ? '☀' : '☾'; theme.setAttribute('aria-label', document.documentElement.classList.contains('dark') ? 'Switch to light theme' : 'Switch to dark theme');} };
labelTheme(); theme?.addEventListener('click', () => queueMicrotask(labelTheme));
if (!reduced.matches && 'IntersectionObserver' in window) {
 const observer = new IntersectionObserver(entries => entries.forEach(e => {if(e.isIntersecting){e.target.classList.add('revealed');observer.unobserve(e.target);}}), {threshold: .08});
 document.querySelectorAll('.project,.capabilities article,.split,.contact-card,.proof').forEach(el => {el.classList.add('reveal');observer.observe(el);});
}
if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced.matches) document.querySelectorAll('.project-image,.hero-device').forEach(el => {
 el.addEventListener('pointermove', e => {const r=el.getBoundingClientRect();el.style.transform=`perspective(1000px) rotateX(${-(e.clientY-r.top-r.height/2)/r.height*5}deg) rotateY(${(e.clientX-r.left-r.width/2)/r.width*5}deg)`;});
 el.addEventListener('pointerleave',()=>el.style.transform='');
});
document.querySelectorAll('.contact-card a[href^="mailto:"]').forEach(a=>{const b=document.createElement('button');b.className='copy-email';b.textContent='Copy email';b.type='button';b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(a.getAttribute('href').slice(7));b.textContent='Copied ✓';setTimeout(()=>b.textContent='Copy email',2000);}catch{b.textContent='Please use the email link';}});a.after(b);});
const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => button.addEventListener('click',()=>{
 filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
 let count=0;document.querySelectorAll('[data-project-group]').forEach(el=>{el.hidden=button.dataset.filter!=='all'&&el.dataset.projectGroup!==button.dataset.filter;if(!el.hidden)count++;});
 const status=document.querySelector('#filter-status');if(status)status.textContent=`Showing ${count} projects`;
}));
const previews=document.querySelectorAll('[data-lightbox]');
if(previews.length){
 const dialog=document.createElement('dialog');dialog.className='image-dialog';dialog.innerHTML='<button type="button" autofocus aria-label="Close enlarged image">Close ×</button><img alt="" />';document.body.append(dialog);
 const close=()=>dialog.close();dialog.querySelector('button').addEventListener('click',close);dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
 previews.forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const img=dialog.querySelector('img');img.src=a.href;img.alt=a.querySelector('img')?.alt||'Project screenshot';dialog.showModal();}));
}
