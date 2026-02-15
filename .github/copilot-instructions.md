# Copilot Instructions for 0xtero.hanninen.eu

Short, actionable guidance to help AI agents be productive in this repo.

## Project overview ✅
- This is a very small **Jekyll**-based personal site (About page) served as static HTML.
- Key files/directories:
  - `index.html` — root page (hand-authored HTML)
  - `styles.css` — main stylesheet
  - `assets/` — images and static assets (e.g., `assets/tero_profile.jpg`)
  - `_config.yml` — Jekyll configuration (theme: `minima`, plugins: `jekyll-feed`)
  - `Gemfile` — locks Jekyll version and Ruby gems
  - `.gitlab-ci.yml` — CI pipeline (build/test and Pages deployment)
  - `CNAME` and `tero@hanninen.eu.gpg.asc` — domain and public GPG key (do not change without owner consent)

## Build & preview (exact commands) 🔧
- Setup: `gem install bundler` (if needed) then `bundle install`.
- Local preview: `bundle exec jekyll serve` (or `bundle exec jekyll build -d test` then inspect `test/`)
- CI mimic (what GitLab CI runs):
  - Test job: `bundle exec jekyll build -d test` (runs on non-default branches)
  - Pages job: `bundle exec jekyll build -d public` (runs on the default branch and is deployed to GitLab Pages)
- Note: `_config.yml` is **not** auto-reloaded by `jekyll serve`; restart the server after config changes.
- Always use `bundle exec` to ensure the locked gem versions are used (Gemfile pins Jekyll `~> 4.3.1`).

## Dependencies & troubleshooting ⚠️
- On many Linux systems you may need **system development packages** to build native gems (e.g., when installing `bigdecimal` or other native extensions).
  - Debian/Ubuntu: `sudo apt-get update && sudo apt-get install -y ruby-dev build-essential`
  - Fedora/RHEL/CentOS: `sudo yum install -y ruby-devel gcc make`
- Ruby 3.4+ separates some standard library components from the core install. If you see LoadError for `csv`, `base64`, `logger`, etc., add them to the `Gemfile` (example below) and run `bundle install`:

```ruby
# Gemfile (example additions)
gem "csv"
gem "base64"
gem "logger"
```

- After resolving system dependencies and gem issues, run `bundle install` then `bundle exec jekyll serve` (or `bundle exec jekyll build -d test` for a build-only check).
- Common non-blocking warnings you may see:
  - Sass deprecation warnings from dependencies (`@import` usage, color functions) — these are from upstream themes (`minima`) and don't break local builds, but consider migrating if you update Sass in the future.

## CI & deploy behaviour ⚙️
- `.gitlab-ci.yml` sets `JEKYLL_ENV=production` in CI.
- Non-default branches run a `test` build (artifact: `test/`). Default branch builds `public/` and is published to Pages.
- Do not commit generated artifact directories (`test/` or `public/`) to the repository—these are CI artifacts.

## Conventions & patterns 📌
- Content is **hand-written HTML/CSS**, not markdown posts—if you add new pages, be consistent (use root-level HTML or add proper Jekyll front matter when using templating).
- Assets are referenced with relative paths (e.g., `assets/tero_profile.jpg`). Keep asset paths stable when refactoring.
- Styling is centralized in `styles.css`; prefer editing this file rather than adding inline styles.
- External resources: Fork Awesome icons and a Minecraftia font are loaded from CDNs in `index.html`—avoid replacing with heavy local builds.

## What to avoid ❗
- Don't add a Node.js front-end build system unless strictly necessary—this project is intentionally minimal.
- Do not modify `CNAME` or `tero@hanninen.eu.gpg.asc` without explicit permission.
- Avoid committing build artifacts (`public/`, `test/`) or vendor/bundle directories.

## Patch/PR workflow & testing ✔️
- For content or style changes: run `bundle exec jekyll serve` and visually verify pages locally.
- For responsive/layout changes: run `bundle exec jekyll build -d test` and open `test/index.html` in a browser; use DevTools (Device Toolbar) to test multiple viewport sizes and consider running Lighthouse for a quick mobile/accessibility audit.
- For config or gem changes: run `bundle exec jekyll build -d test` and confirm the generated output in `test/` looks correct.
- When opening a merge request targeting the default branch, note that merging will trigger Pages deployment—include screenshots or a short QA checklist in the MR description.

## Examples (practical patterns) 💡
- Add a new image: place file under `assets/` and reference it as `<img src="assets/your.jpg" alt="...">` in your HTML.
- Update CSS: modify `styles.css` and test locally with `jekyll serve`.
- Update gems: change `Gemfile`, run `bundle install`, then `bundle exec jekyll build -d test` to verify.

## Where to look for more context 🔎
- `._config.yml` and `Gemfile` for build/runtime configuration
- `index.html` and `styles.css` for site structure and styling patterns

