import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fetchPublished } from '../scripts/prepare-content.mjs';
const content=JSON.parse(fs.readFileSync(new URL('../src/data/portfolio.json',import.meta.url)));
test('missing first publication returns no snapshot',async()=>{assert.equal(await fetchPublished(async()=>({status:404})),null)});
test('denied or failed publication reads fail instead of publishing empty content',async()=>{for(const status of [403,500])await assert.rejects(()=>fetchPublished(async()=>({status,ok:false})),/Cannot read published portfolio/)});
test('published payload must match its revision',async()=>{await assert.rejects(()=>fetchPublished(async()=>({ok:true,json:async()=>({fields:{payload:{stringValue:JSON.stringify(content)},revision:{stringValue:'different'}}})})),/revision does not match/)});
test('valid published content survives the build boundary',async()=>{const result=await fetchPublished(async()=>({ok:true,json:async()=>({fields:{payload:{stringValue:JSON.stringify(content)},revision:{stringValue:content.revision}}})}));assert.equal(result.projects.length,9);assert.equal(result.site.headline,content.site.headline)});
