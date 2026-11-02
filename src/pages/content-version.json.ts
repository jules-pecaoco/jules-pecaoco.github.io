import content from '../data/portfolio.generated.json';
export function GET(){return new Response(JSON.stringify({revision:content.revision}),{headers:{'Content-Type':'application/json','Cache-Control':'no-cache'}});}
