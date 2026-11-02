import { spawnSync } from 'node:child_process';
const env={...process.env,PORTFOLIO_CONTENT_SOURCE:'published'};
for(const args of [['scripts/prepare-content.mjs'],['node_modules/astro/astro.js','build']]){const result=spawnSync(process.execPath,args,{env,stdio:'inherit'});if(result.status!==0)process.exit(result.status||1);}
