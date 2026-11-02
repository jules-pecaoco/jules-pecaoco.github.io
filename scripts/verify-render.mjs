import fs from 'node:fs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
const file='src/data/portfolio.generated.json';
const original=fs.readFileSync(file,'utf8');
const snapshot=JSON.parse(original);
snapshot.site.headline='Verified studio headline';
snapshot.site.aboutBio='Verified profile biography.';
snapshot.projects[0].title='Verified project title';
snapshot.projects.at(-1).visible=false;
snapshot.resume.url='https://example.com/verified-cv.pdf';
snapshot.events=[{title:'Verified learning note',description:'Verified note content.',date:'2026-11-02',url:'https://example.com/note',visible:true}];
snapshot.revision='verified-render-snapshot';
const build=()=>{const result=spawnSync(process.execPath,['node_modules/astro/astro.js','build'],{encoding:'utf8'});if(result.status!==0)throw new Error((result.stderr||result.stdout).slice(-4000));};
try{
 fs.writeFileSync(file,JSON.stringify(snapshot));build();
 for(const [path,text] of [['index.html',snapshot.site.headline],['about/index.html',snapshot.site.aboutBio],['projects/qr-attendance/index.html',snapshot.projects[0].title],['resume/index.html',snapshot.resume.url],['events/index.html',snapshot.events[0].title],['content-version.json',snapshot.revision]])assert.ok(fs.readFileSync('dist/'+path,'utf8').includes(text),path+' must render the publication');
 assert.ok(!fs.existsSync('dist/projects/calculator/index.html'),'hidden project must have no generated page');
 assert.ok(!fs.readFileSync('dist/sitemap.xml','utf8').includes('/projects/calculator/'),'hidden project must leave sitemap');
 const home=fs.readFileSync('dist/index.html','utf8');assert.ok(!home.includes('AdminApp')&&!home.includes('firebase'),'homepage must remain independent of admin runtime');
 console.log('Verified generated headline, biography, project title, visibility, sitemap, CV, notes, revision, and isolated homepage.');
}finally{fs.writeFileSync(file,original);build();console.log('Restored and rebuilt the original portfolio snapshot.');}
