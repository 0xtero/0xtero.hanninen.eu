### README.ml

Personal site at [0xtero.hanninen.eu](https://0xtero.hanninen.eu).

## Development (Dev Container)

Open the repo in a Dev Container (VS Code **Dev Containers: Reopen in Container**). 
The container includes Ruby, Bundler, Jekyll, and the GitHub CLI — nothing needs to be installed on the host.

After the container builds:

```bash
./bin/serve    # preview at http://localhost:4000
./bin/test     # run a local Jekyll build
```

## Blog posts

Create `_posts/YYYY-MM-DD-title.md` with front matter (`layout: post`, `title`, `date`) and markdown body, then commit and push.
