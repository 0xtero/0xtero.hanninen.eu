### README.md

Personal site at [0xtero.hanninen.eu](https://0xtero.hanninen.eu).

## Development (Dev Container)

Open the repo in a Dev Container (VS Code **Dev Containers: Reopen in Container**).
The container includes Ruby, Bundler, Jekyll, the GitHub CLI (`gh`), and the Gitea/Forgejo CLI (`tea`) for Codeberg — nothing needs to be installed on the host.

After the container builds:

```bash
./bin/serve    # preview at http://localhost:4000
./bin/test     # run a local Jekyll build

# GitHub (origin) — one-time
gh auth login

# Codeberg — one-time (token: https://codeberg.org/user/settings/applications)
# Needed scopes: repository + issue (and organization if you use an org)
tea login add --name codeberg --url https://codeberg.org --token <TOKEN>
tea login default codeberg
```

## Remotes and publishing

Until DNS cutover, **GitHub Pages** still serves `https://0xtero.hanninen.eu` from `main` (branch deploy).
**Codeberg Pages** is built by Forgejo Actions ([.forgejo/workflows/pages.yml](.forgejo/workflows/pages.yml)) and previewed at:

`https://0xtero.codeberg.page/0xtero.hanninen.eu/`

```bash
# Primary (GitHub) — keeps the live custom domain updated
git push origin main

# Parallel (Codeberg) — triggers Forgejo Actions → Pages
git push codeberg main
```

One-time Codeberg remote + repo setup (requires `tea` login):

```bash
./bin/codeberg-setup
```

Or manually:

```bash
git remote add codeberg https://codeberg.org/0xtero/0xtero.hanninen.eu.git
git push -u codeberg main
```

## DNS cutover (production switch)

DNS is currently on EasyDNS. Live CNAME today:

`0xtero.hanninen.eu` → `0xtero.github.io`

### Prep (no traffic move)

1. Lower TTL on `0xtero` (e.g. 300s).
2. Add TXT (Forgejo Actions allowlist):

| Host | Type | Value |
|------|------|--------|
| `_git-pages-forge-allowlist.0xtero` | TXT | `https://codeberg.org/0xtero/0xtero.hanninen.eu.git` |

3. Check readiness: `./bin/dns-verify`

No CAA records are required on `hanninen.eu` today.

### Cutover

```bash
./bin/cutover-custom-domain   # retarget workflow to https://0xtero.hanninen.eu/
git push origin main && git push codeberg main
# Then at EasyDNS: change CNAME 0xtero → codeberg.page.
```

Rollback: point CNAME back to `0xtero.github.io` (leave GitHub Pages enabled until verified).

### After cutover

```bash
./bin/post-cutover-cleanup    # docs/CNAME cleanup instructions
# Disable GitHub Pages in repo settings when ready.
```

## Blog posts

Create `_posts/YYYY-MM-DD-title.md` with front matter (`layout: post`, `title`, `date`) and markdown body, then commit and push to both remotes.
