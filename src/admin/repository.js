import { doc, getDoc, getDocs, query, collection, orderBy, limit, runTransaction, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { assertContent } from '../data/schema.mjs';
const draftRef=()=>doc(db,'portfolio','draft');
const publishedRef=()=>doc(db,'portfolio','published');
export async function loadWorkspace(){
 const [draft,published]=await Promise.all([getDoc(draftRef()),getDoc(publishedRef())]);
 return {draft:draft.exists()?draft.data():null,published:published.exists()?published.data():null};
}
export async function saveDraft(content,expectedRevision){
 assertContent(content);const revision=crypto.randomUUID();
 await runTransaction(db,async tx=>{const current=await tx.get(draftRef());if((current.data()?.revision||null)!==expectedRevision)throw new Error('Someone else updated this draft. Export your changes, then reload before saving.');tx.set(draftRef(),{payload:JSON.stringify({...content,revision}),revision,updatedAt:serverTimestamp(),updatedBy:auth.currentUser.uid});});return revision;
}
export async function publishDraft(expectedDraft,expectedPublished){
 const revision=crypto.randomUUID();
 await runTransaction(db,async tx=>{
  const draft=await tx.get(draftRef());const published=await tx.get(publishedRef());
  if(!draft.exists()||draft.data().revision!==expectedDraft)throw new Error('The saved draft changed. Reload before publishing.');
  if((published.data()?.revision||null)!==expectedPublished)throw new Error('Another version was published. Reload before publishing.');
  const content=assertContent(JSON.parse(draft.data().payload));
  if(published.exists())tx.set(doc(db,'portfolioReleases',published.data().revision),{...published.data(),archivedAt:serverTimestamp()});
  tx.set(publishedRef(),{payload:JSON.stringify({...content,revision}),revision,updatedAt:serverTimestamp(),updatedBy:auth.currentUser.uid});
 });return revision;
}
export async function loadHistory(){const result=await getDocs(query(collection(db,'portfolioReleases'),orderBy('updatedAt','desc'),limit(10)));return result.docs.map(d=>({...d.data(),id:d.id}));}
export async function loadMessages(){const result=await getDocs(query(collection(db,'contactMessages'),orderBy('createdAt','desc'),limit(100)));return result.docs.map(d=>({...d.data(),id:d.id}));}
export async function markRead(id){await updateDoc(doc(db,'contactMessages',id),{read:true,updatedAt:serverTimestamp()});}
