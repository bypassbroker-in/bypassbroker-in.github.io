# BypassBroker website

The public marketing site: plain HTML, CSS and JavaScript, no build step. It
has no `package.json`, so pnpm skips it.

```
index.html            landing page: hero, why, how it works, features,
                      screenshots, pricing, safety, cities, FAQ, download
about.html            About us
terms.html            Terms & Conditions
privacy.html          Privacy Policy
delete-account.html   account deletion steps (Google Play requires a public URL)
404.html
css/styles.css        all styling; colours copied from packages/tokens
js/main.js            nav, tabs, gallery, store links
assets/               logo, icons, app screenshots
```

## Run locally

```sh
cd apps/website && python3 -m http.server 8080
```

Then open http://localhost:8080. All paths are relative, so double-clicking
`index.html` works too.

## Keep in sync with the app

The site copies content that has a source of truth elsewhere. When one of
these changes, update the site too:

| Site | Source of truth |
| --- | --- |
| colours in `css/styles.css` | `packages/tokens/src/palette.json` |
| `terms.html` | `apps/mobile/src/features/legal/TermsScreen.tsx` |
| `privacy.html` | `apps/mobile/src/features/legal/PrivacyPolicyScreen.tsx` |
| `about.html` | `apps/mobile/src/features/legal/AboutUsScreen.tsx` |
| pricing section in `index.html` | the live `subscription_plans` table (admins can change prices) |
| FAQ in `index.html` | `packages/core/src/lib/help.ts` |
| `assets/screens/` | `store-assets/google-play/` (resized to 1000px JPEG) |
| `assets/og-image.jpg` (1200×630 link preview) | headline, cities and screenshots on the landing page |
| FAQPage JSON-LD in `index.html` `<head>` | the visible FAQ — Google requires the text to match |
| `<lastmod>` in `sitemap.xml` | bump the date when a page's content changes |

## Store links

Set the App Store and Play Store URLs in `STORE_LINKS` at the top of
`js/main.js`. A store left as `null` shows a disabled "Coming soon" button.

## Deploy

Any static host works (S3 + CloudFront, Netlify, Cloudflare Pages, GitHub
Pages). Point `bypassbroker.in` at it and configure `404.html` as the error
page.
