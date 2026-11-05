import { content, projects } from '../data/content.js';

export function GET() {
  const origin = 'https://jules-pecaoco.github.io';
  const text = `# Jules Alfonz Pecaoco

> Jules Alfonz Pecaoco, also known as Jules Pecaoco, is a web and mobile application developer based in Bacolod, Philippines.

He builds applications for attendance, record management, education, and business workflows. His portfolio documents implementation work, technologies, source links, and available demos.

## Portfolio
- [Home](${origin}/): Introduction and selected work.
- [About](${origin}/about/): Background and approach.
- [Projects](${origin}/projects/): Web, mobile, and desktop projects.
- [CV](${origin}/resume/): Dated experience, skills, education, and CV download.
- [Contact](${origin}/contact/): Discuss a role, project, or collaboration.

## Projects
${projects.map(p => `- [${p.title}](${origin}/projects/${p.slug}/): ${p.summary} Technologies: ${p.tools}.`).join('\n')}

The QR attendance project's 1,600+ figure describes the size of the organization served, not a measured active-user count. Refer to individual project pages for implementation scope and dates.

## Professional profiles
- [GitHub](${content.site.github}): Source repositories.
- [LinkedIn](${content.site.linkedin}): Professional profile.
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
