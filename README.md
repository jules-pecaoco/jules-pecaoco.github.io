# Jules Pecaoco portfolio and Portfolio Studio

The public portfolio uses Astro static HTML. Portfolio Studio is a separate React application at `/admin/`, sharing the public site's palette and typography.

## Local development

- `npm ci`
- `npm run dev`
- `npm test`
- `npm run build`
- `npm run preview`

Open `/admin/` and choose **Explore a local demo** to inspect editors without signing in. The demo never writes to Firebase, uploads files, reads private messages, or publishes. Demo edits exist only in memory; export a JSON backup if you want to keep them.

## Editing and publishing

1. Sign in with the existing Firebase email/password account that has the `admin: true` custom claim.
2. Edit projects, site/profile text, notes, and the CV. All nine migrated projects are included as the first-workspace baseline.
3. **Save draft** creates or updates the private `portfolio/draft` document. It does not affect the live site.
4. **Publishing → Publish saved draft** validates and copies the saved content to `portfolio/published`. Only published content is publicly readable. Never put private information in the portfolio snapshot.
5. GitHub Actions checks for a new publication every 15 minutes at minutes 7, 22, 37, and 52. GitHub may delay scheduled runs. A workflow can also be started manually in Actions.
6. Check the live revision from Studio. A successful database publish is not labeled as a successful deployment until `/content-version.json` matches it.

The workflow skips deployment on scheduled runs when the live revision already matches. Failed reads or invalid content fail the build, leaving the previous deployment in place. No GitHub token is stored in the browser. Drafts are never fetched by the static build.

`portfolioReleases` retains previous publication snapshots. Loading a previous version changes the working copy only; saving and publishing it creates a new release. Draft saving and publishing check revisions in Firestore transactions to prevent stale browser tabs from overwriting someone else's edits.

## One-time production activation

The code does not change live Firebase rules, grant privileges, or deploy itself.

1. In a trusted Firebase Admin SDK environment, grant the existing owner's Firebase Auth UID the custom claim `admin: true`, preserving other claims. This is an administrator action; select the existing owner account explicitly. Sign out and back in to refresh its token. There is no public signup or privilege-granting endpoint in Studio.
2. Deploy the checked-in rules with the Firebase project explicitly selected: `firebase deploy --only "firestore:portfolio-document,storage" --project <your-project-id>`. The Firestore database target is configured in `firebase.json`. Check the admin claim first: the tightened rules intentionally stop treating every authenticated user as an administrator.
3. Ensure existing `VITE_FIREBASE_*` and `VITE_EMAILJS_*` GitHub Actions secrets are set. `VITE_FIREBASE_DATABASE_ID` must match the named database, or be omitted for `(default)`.
4. Push the reviewed migration to the default branch, enable GitHub Actions for Pages, and enable scheduled workflows if needed. Publish a first snapshot from Studio after sign-in.
5. Verify a draft save, PDF/image upload, publication, live revision, and private inbox under the real owner account. These cloud writes were not performed during local verification.

For the custom claim, use the official Admin SDK pattern in your trusted administration environment, merging existing claims:

```js
const account = await getAuth().getUser(ownerUid);
await getAuth().setCustomUserClaims(ownerUid, {
  ...account.customClaims,
  admin: true,
});
```

Firebase client configuration is intentionally public and is exposed through the Vite environment prefix. Never place server credentials, service-account keys, or GitHub tokens in `VITE_*` or `PUBLIC_*` variables.

## Content and build boundary

- `src/data/portfolio.json`: repository baseline, including all nine projects.
- `src/data/schema.mjs`: shared publication validation for Studio and the build.
- `src/data/portfolio.generated.json`: ignored, generated build snapshot.
- `scripts/prepare-content.mjs`: loads only the public published Firestore document when `PORTFOLIO_CONTENT_SOURCE=published`; otherwise copies the repository baseline.
- `npm run build:published`: explicitly build from the Firebase publication using local `.env` configuration.
- `.github/workflows/deploy.yml`: always uses the published-source build path in production; no publication yet uses the repository baseline. Permission or network failures do not silently fall back.

An ordinary local `npm run build` intentionally uses the baseline. After a publication exists, edit from Studio or export a backup; the legacy `projects`, `siteContent`, and `events` collections are no longer public rendering sources. They are retained and are not destructively reseeded. Existing `contactMessages` and Storage assets remain in use.

Project visibility controls generated pages and sitemap entries. Featured visible projects appear on the homepage in list order. Changing or removing a published slug changes its public URL; keep published slugs stable unless you also plan redirects. URLs are validated before publishing, and build output escapes authored text.

Uploaded media is stored under the existing `portfolio/about`, `portfolio/projects`, and `portfolio/resume` Storage paths. Uploading does not publish the new reference automatically. Old files are retained for recovery; uploads are not deleted on cancellation.

The original stable CV and its previous hashed link remain available. A new uploaded PDF becomes the CV page's download after publication and deployment. Private inbox data is never included in the public snapshot or build.

## Verification

`npm test` checks migrated content, duplicate slugs, unsafe URLs, missing featured/proof projects, malformed notes, oversized payloads, missing publications, failed remote reads, and mismatched revisions. `npm run build` checks all public and admin entry pages. Browser demo checks cover editing and responsive layout without cloud mutations. Real Firebase authentication, rule enforcement, and deployment need the production activation above.

## Production activation — 2 November 2026

The verified existing owner account has the `admin: true` claim. Firestore rules for `portfolio-document` and Storage rules have been deployed and checked against the local sources. The first private draft and public snapshot contain all nine projects. Studio refreshes sign-in tokens on entry so updated claims are picked up.

Firebase Storage currently returns HTTP 402 because the project’s billing account is closed. Billing has not been changed. The existing Firebase resume record is preserved; the public portfolio uses the working bundled PDF. File uploads and old Storage download links remain unavailable until the owner restores Storage billing. Draft editing, Firestore publishing, and the GitHub-hosted PDF do not require that repair. EmailJS credentials are not configured in repository Actions secrets, so contact submissions fall back to the private Firestore inbox rather than email notifications.
