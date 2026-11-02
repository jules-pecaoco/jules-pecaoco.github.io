import { loadEnv } from 'vite';
import fs from 'node:fs/promises';
import { assertContent } from '../src/data/schema.mjs';
const env={...loadEnv('',process.cwd(),'VITE_'),...process.env};
export function decodeField(field){if('stringValue'in field)return field.stringValue;if('integerValue'in field)return Number(field.integerValue);if('booleanValue'in field)return field.booleanValue;if('mapValue'in field)return Object.fromEntries(Object.entries(field.mapValue.fields||{}).map(([k,v])=>[k,decodeField(v)]));return null;}
export async function fetchPublished(fetcher=fetch){
 if(!env.VITE_FIREBASE_PROJECT_ID)throw new Error('VITE_FIREBASE_PROJECT_ID is required to load published content.');
 const database=env.VITE_FIREBASE_DATABASE_ID||'(default)';
 const url=`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(env.VITE_FIREBASE_PROJECT_ID)}/databases/${encodeURIComponent(database)}/documents/portfolio/published`;
 const response=await fetcher(url,{signal:AbortSignal.timeout(30000)});
 if(response.status===404)return null;
 if(!response.ok)throw new Error(`Cannot read published portfolio (HTTP ${response.status}). Check published-document rules; the previous deployment must remain intact.`);
 const document=await response.json();const payload=decodeField(document.fields?.payload||{});const revision=decodeField(document.fields?.revision||{});
 const content=assertContent(JSON.parse(payload));if(content.revision!==revision)throw new Error('Published revision does not match the content payload.');return content;
}
async function main(){
 if(process.argv.includes('--check')){
  const content=await fetchPublished();let changed=!!content;
  if(content){try{const response=await fetch('https://jules-pecaoco.github.io/content-version.json',{signal:AbortSignal.timeout(15000),cache:'no-store'});if(response.ok)changed=(await response.json()).revision!==content.revision;}catch{/* Rebuild when the live revision cannot be verified. */}}
  if(process.env.GITHUB_OUTPUT)await fs.appendFile(process.env.GITHUB_OUTPUT,`changed=${changed}\n`);console.log(changed?'A published snapshot needs deployment.':'No new published snapshot.');return;
 }
 if(env.PORTFOLIO_CONTENT_SOURCE==='published'){
  const content=await fetchPublished();
  if(content){await fs.writeFile('src/data/portfolio.generated.json',JSON.stringify(content,null,2));console.log('Prepared validated published content.');return;}
  console.log('No published snapshot yet; using the repository baseline.');
 }
 await fs.copyFile('src/data/portfolio.json','src/data/portfolio.generated.json');
}
if(process.argv[1]?.endsWith('prepare-content.mjs'))main().catch(error=>{console.error(error.message);process.exitCode=1;});
