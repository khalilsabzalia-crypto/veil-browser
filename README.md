# Veil Browser

Veil is a lightweight, browser-only search interface backed by a Supabase Edge Function and the Marginalia Search API. No local Node.js installation or build step is required.

## Live preview

After the GitHub Pages workflow completes, the site will be available at:

https://khalilsabzalia-crypto.github.io/veil-browser/

## How it works

- `index.html` contains the full responsive interface and client-side rendering.
- `veil-search` is a Supabase Edge Function that forwards search requests to Marginalia and keeps upstream requests away from the browser.
- GitHub Actions publishes the static files to GitHub Pages whenever a commit is pushed to `main`.

## Search backend

Supabase function endpoint:

`https://vyfeqjtoommsqsqbatyf.supabase.co/functions/v1/veil-search`

The page calls this endpoint with a `q` query parameter. Search availability depends on the upstream Marginalia service and its public API rate limits.

## Deploying

1. Push changes to `main` (or run the workflow manually from the Actions tab).
2. In GitHub, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source if it is not already selected.
3. Open the Pages URL above after the deployment workflow succeeds.

No local Node.js tooling is needed.
