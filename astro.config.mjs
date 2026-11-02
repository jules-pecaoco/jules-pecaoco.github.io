import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
export default defineConfig({site:'https://jules-pecaoco.github.io',trailingSlash:'always',integrations:[react()],vite:{envPrefix:['PUBLIC_','VITE_']}});