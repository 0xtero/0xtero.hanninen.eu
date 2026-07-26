FROM mcr.microsoft.com/devcontainers/ruby:1-3.4-bookworm

# Remove stale yarn repo (base image key is expired/missing)
RUN rm -f /etc/apt/sources.list.d/yarn.list /etc/apt/keyrings/yarnkey.gpg /usr/share/keyrings/yarn-archive-keyring.gpg

# Install neovim, tmux, and tools pi expects (git, ripgrep, bash)
RUN apt-get update && apt-get install -y --no-install-recommends \
    neovim \
    tmux \
    git \
    ripgrep \
    fd-find \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js 22.x (LTS) — required for pi
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Install pi globally as root (available to all users)
RUN npm install -g --ignore-scripts @earendil-works/pi-coding-agent

# Seed a minimal tmux config for the vscode user.
# Debian Bookworm ships tmux 3.3a — pi supports this with extended-keys on.
# If you upgrade to tmux 3.5+, also add: set -g extended-keys-format csi-u
RUN mkdir -p /home/vscode \
    && echo 'set -g extended-keys on'  > /home/vscode/.tmux.conf \
    && echo 'set -g mouse on'         >> /home/vscode/.tmux.conf \
    && chown -R vscode:vscode /home/vscode

WORKDIR /workspace
