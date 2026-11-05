import metadata from './seo.json';

export function pageSeo(path, fallback = {}) {
  return metadata[path]?.[0] ?? fallback;
}

export function entityGraph({ content, projects, path, canonical, title, description, root }) {
  const personId = root + '#person';
  const websiteId = root + '#website';
  const project = projects.find(p => path === `/projects/${p.slug}/`);
  const image = project?.image ? (/^(https?:|\/)/.test(project.image) ? project.image : '/images/' + project.image) : null;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person', '@id': personId,
        name: 'Jules Alfonz Pecaoco', alternateName: 'Jules Pecaoco',
        url: root, image: new URL(content.site.profileImage, root).href,
        jobTitle: 'Web and Mobile Application Developer',
        homeLocation: { '@type': 'Place', name: 'Bacolod, Philippines' },
        knowsAbout: ['JavaScript', 'TypeScript', 'React', 'React Native', 'Web development', 'Mobile application development'],
        sameAs: [content.site.github, content.site.linkedin]
      },
      {
        '@type': 'WebSite', '@id': websiteId, url: root, name: 'Jules Pecaoco',
        inLanguage: 'en-PH', publisher: { '@id': personId }
      },
      {
        '@type': path === '/about/' ? 'ProfilePage' : 'WebPage',
        '@id': canonical + '#webpage', url: canonical, name: title, description,
        inLanguage: 'en-PH', isPartOf: { '@id': websiteId },
        ...(path === '/' || path === '/about/' ? { mainEntity: { '@id': personId } }
          : project ? { mainEntity: { '@id': canonical + '#software' } } : {})
      },
      ...(project ? [{
        '@type': 'SoftwareSourceCode', '@id': canonical + '#software',
        name: project.title, description: project.summary, url: canonical,
        author: { '@id': personId },
        ...(project.repo ? { codeRepository: 'https://github.com/jules-pecaoco/' + project.repo } : {}),
        ...(image ? { image: new URL(image, root).href } : {})
      }] : [])
    ]
  };
}
