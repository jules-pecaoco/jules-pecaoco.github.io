import { projects, content } from '../data/content.js';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const escapeXml=(s:string)=>s.replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]!));
export function GET(){
 const paths=['/','/projects/','/about/','/resume/','/contact/',...(content.events.some(e=>e.visible)?['/events/']:[]),...projects.map(p=>'/projects/'+p.slug+'/')];
 // Use actual source/publication changes, never the build time.
 const sourceModified=execFileSync('git',['log','-1','--format=%cI','--','src','public','scripts/prepare-content.mjs'],{encoding:'utf8'}).trim();
 const publicationModified=JSON.parse(fs.readFileSync('src/data/publication-meta.generated.json','utf8')).modified;
 const dates=[sourceModified,publicationModified].filter(date=>date&&!Number.isNaN(Date.parse(date)));
 const lastmod=dates.sort((a,b)=>Date.parse(b)-Date.parse(a))[0];
 const xml='<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+paths.map(p=>'<url><loc>'+escapeXml(new URL(p,'https://jules-pecaoco.github.io').href)+'</loc>'+(lastmod?'<lastmod>'+escapeXml(lastmod)+'</lastmod>':'')+'<priority>'+(p==='/'?'1.0':p.startsWith('/projects/')?'0.8':'0.6')+'</priority></url>').join('')+'</urlset>';
 return new Response(xml,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
}
