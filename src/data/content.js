import bundled from './portfolio.generated.json';
export const content = bundled;
export const projects = content.projects.filter(p => p.visible !== false);
export const projectImage = p => p.image ? (/^(https?:|\/)/.test(p.image) ? p.image : '/images/' + p.image) : '';
