const requiredSite=['greeting','headline','role','intro','motto','title','description','aboutHeading','aboutBio','profileImage','email','linkedin','github','contactIntro','proofNumber','proofText','proofSlug'];
export function safeUrl(value,{image=false}={}) {
  if (typeof value !== 'string') return false;
  if(value==='') return true;
  if(value.startsWith('/')&&!value.startsWith('//')&&!value.includes('\\'))return !value.includes('..');
  if(image && /^[a-zA-Z0-9_-]+\.(png|jpe?g|webp|avif|gif)$/i.test(value))return true;
  try { const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password; } catch {return false;}
}
export function validateContent(value){
  const errors=[];
  if(!value || value.schemaVersion!==1)return ['Unsupported portfolio format.'];
  for(const key of requiredSite)if(typeof value.site?.[key]!=='string'||value.site[key].length>12000)errors.push(`Site field ${key} is missing or too long.`);
  if(!value.site?.title?.trim()||!value.site?.headline?.trim())errors.push('A page title and headline are required.');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.site?.email||''))errors.push('Enter a valid contact email.');
  for(const key of ['linkedin','github','profileImage'])if(!safeUrl(value.site?.[key],{image:key==='profileImage'}))errors.push(`Invalid ${key} URL.`);
  if(!Array.isArray(value.projects)||value.projects.length>100)return [...errors,'Projects must be a list of at most 100 entries.'];
  const slugs=new Set();
  value.projects.forEach((p,i)=>{
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug)||slugs.has(p.slug)||p.slug==='index')errors.push(`Project ${i+1} needs a unique URL slug.`);slugs.add(p.slug);
    for(const key of ['title','category','summary','problem','story','tools','image','live','repo'])if(typeof p[key]!=='string'||p[key].length>20000)errors.push(`Project ${i+1}: invalid ${key}.`);
    if(!p.title?.trim()||!p.summary?.trim())errors.push(`Project ${i+1} needs a title and summary.`);
    if(!safeUrl(p.image,{image:true})||!safeUrl(p.live))errors.push(`Project ${i+1} has an unsafe image or demo URL.`);
    if(p.repo&&!/^[a-zA-Z0-9_.-]+$/.test(p.repo))errors.push(`Project ${i+1}: enter a repository name, not a full URL.`);
    if(typeof p.visible!=='boolean'||typeof p.featured!=='boolean')errors.push(`Project ${i+1} needs visibility and featured settings.`);
  });
  const visible=value.projects.filter(p=>p.visible);
  if(!visible.length)errors.push('Keep at least one project visible.');
  if(!visible.some(p=>p.featured))errors.push('Feature at least one visible project for the homepage.');
  if(!visible.some(p=>p.slug===value.site?.proofSlug))errors.push('Choose a visible project for the homepage proof link.');
  if(!safeUrl(value.resume?.url)||!value.resume?.url||typeof value.resume?.name!=='string')errors.push('A valid resume URL and filename are required.');
  if(!Array.isArray(value.events)||value.events.length>100)errors.push('Events must contain at most 100 entries.');
  else value.events.forEach((e,i)=>{if(!e.title?.trim()||typeof e.description!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(e.date)||!safeUrl(e.url)||typeof e.visible!=='boolean')errors.push(`Event ${i+1} needs a title, date, description, visibility, and safe link.`);});
  if(JSON.stringify(value).length>250000)errors.push('Portfolio content is too large. Use uploaded images instead of embedded data.');
  return errors;
}
export function assertContent(value){const errors=validateContent(value);if(errors.length)throw new Error(errors.join('\n'));return value;}
