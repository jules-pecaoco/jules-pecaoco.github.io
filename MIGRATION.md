# 🗺️ Firebase Migration Status & Handover Guide

This file tracks the status of the migration from a static React + Vite portfolio to a dynamic, Firebase-powered application. Use this document to resume work across different accounts, environments, or agents.

---

## 📌 Project Overview
- **Objective**: Convert a static Vite+React portfolio into a dynamic site managed via a private admin panel.
- **Tech Stack**: React 18, Vite 5, React Router v6, Firebase (Auth, Firestore, Storage), EmailJS.
- **Hosting**: GitHub Pages / Vercel.

---

## 🗂️ Firestore Collections Design

### 1. `siteContent` (Document: `main`)
- Stores global metadata, hero text, bio/about section, social links, and Spotify embeds.
```json
{
  "hero": {
    "greeting": "Hi I'm Jules.",
    "typingWords": ["Geek", "Software Engineer", "Problem Solver", "Blind"],
    "tagline": "Sic Parvis Magna"
  },
  "about": {
    "name": "I'm Jules.",
    "heading": "I'm a Web and Application Developer from Bacolod, Philippines.",
    "bio": "I enjoy creating things...",
    "profileImageUrl": "Storage URL",
    "otherTools": {
      "year": "2021~",
      "title": "OTHER LANGUAGES AND TOOLS I USED",
      "tech": "SASS, Figma, Photoshop, Python, API's, Firebase, HTML, Javascript",
      "icons": "sass,figma,photoshop,python,firebase,html,javascript&perline=4"
    }
  },
  "socials": [
    { "label": "Github", "url": "https://github.com/jules-pecaoco", "category": "social" }
  ],
  "spotify": {
    "embedUrl": "Spotify Embed URL"
  }
}
```

### 2. `projects`
- Document schema for each individual showcase project.
```json
{
  "title": "Project Title",
  "description": "Project Description",
  "imageUrl": "Storage download URL",
  "technologies": ["React", "CSS"],
  "techIcons": "react,css",
  "year": "2023~",
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://...",
  "isLive": true,
  "reverseLayout": false,
  "scrollY": "-77%",
  "order": 1,
  "visible": true
}
```

### 3. `events`
- Chronological list of papers, events, studies, and news.
```json
{
  "title": "Event/Paper Title",
  "description": "Event/Paper Description",
  "type": "event | paper | study | news",
  "role": "participant | speaker | organizer | author",
  "date": "Timestamp",
  "location": "Location Name",
  "imageUrl": "Storage download URL",
  "externalUrl": "https://...",
  "tags": ["tag1", "tag2"],
  "visible": true
}
```

### 4. `contactMessages`
- Stores incoming form submissions before forwarding/auditing.
```json
{
  "name": "Sender Name",
  "email": "sender@email.com",
  "subject": "Subject",
  "message": "Message Body",
  "read": false,
  "emailSent": true,
  "createdAt": "Timestamp"
}
```

### 5. `resume` (Document: `current`)
- References to PDF files stored in Firebase Storage.
```json
{
  "fileUrl": "Storage download URL",
  "fileName": "Resume_Name.pdf",
  "showDownloadButton": true,
  "visible": true,
  "updatedAt": "Timestamp"
}
```

---

## 🗺️ Migration Roadmap & Progress Tracker

### ✅ Phase 1: Foundation & Routing
- [x] Install dependencies: `npm install firebase react-router-dom @emailjs/browser`
- [x] Create `src/firebase/config.js` and initialize Firebase app.
- [x] Implement `src/firebase/auth.js` for administrator login & session monitoring.
- [x] Implement `src/firebase/storage.js` helper functions for image/PDF uploads.
- [x] Setup `src/context/AuthContext.jsx` & `useAuth` hook.
- [x] Build `ProtectedRoute.jsx` for the admin portal security wrapper.
- [x] Extract theme handling into `src/components/ThemeToggle.jsx`.
- [x] Configure `main.jsx` and `App.jsx` with React Router v6 `<RouterProvider>` & `<Outlet>`.
- [x] Convert `Header.jsx` navigation to use `<NavLink>`.
- [x] Create skeleton pages for both public routes and admin routes.

### ✅ Phase 2: Firestore Integration & Data Migration
- [x] Code generic database wrapper hook `src/hooks/useFirestore.js`.
- [x] Implement dynamic data fetch hooks: `useSiteContent.js`, `useProjects.js`, `useEvents.js`.
- [x] Script a seed runner (`src/scripts/seedFirestore.js`) to migrate hardcoded elements in `src/projects.js` to Firestore.
- [x] Remove `src/projects.js` and connect components directly to database hooks.

### ⬜ Phase 3: Storage Migration
- [ ] Upload static images to Firebase Storage.
- [ ] Update Firestore document URLs.
- [ ] Implement administrative upload widget (`src/components/ImageUpload.jsx`).

### ⬜ Phase 4: New Public Pages
- [ ] Develop `/events` timeline/list with layout filter.
- [ ] Build `/contact` page with local verification and EmailJS client integration.
- [ ] Build `/resume` view/download page.

### ⬜ Phase 5: CRUD Admin Dashboard
- [ ] Build `/admin/login` page.
- [ ] Implement Dashboard with quick metrics.
- [ ] Create admin managers: Projects Manager (with sorting support), Events Manager, Site Content Editor, Resume Manager, Messages Inbox.

### ⬜ Phase 6: Production Polish & Deployment
- [ ] Implement secure Firestore and Storage JSON rule configurations.
- [ ] Deploy client bundle to Vercel/GitHub Pages.

---

## 🙋‍♂️ Handover Instructions for Next Agent
1. **Analyze Current State**: Check the roadmap checkboxes above to see which tasks are completed.
2. **Setup Env**: Read configuration variables from `.env`. Make sure firebase/config.js targets those keys.
3. **Execution**: Pick up exactly at the first unchecked item in Phase 1.
