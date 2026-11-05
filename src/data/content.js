import bundled from './portfolio.generated.json';
import copyUpgrades from './seo-copy.json';
// Upgrade only exact legacy copy. Later Studio edits remain authoritative.
export const content = { ...bundled, site: { ...bundled.site } };
for (const [key, upgrade] of Object.entries(copyUpgrades)) {
  if (content.site[key] === upgrade.before) content.site[key] = upgrade.after;
}
export const projects = content.projects.filter(p => p.visible !== false);
export const projectImage = p => p.image ? (/^(https?:|\/)/.test(p.image) ? p.image : '/images/' + p.image) : '';
