# How to Publish a Skill to an Org Plugin Marketplace

*Reference doc — how to turn a project-scoped Claude Code skill into a plugin and publish it so teammates can install it. Written to be reusable for any skill in this project, not just `write-prd`.*

## The core concept

A skill living in `.claude/skills/<name>/SKILL.md` is **project-scoped only** — it works in this repo, but there's no built-in way for a teammate to "install" it into their own projects. To make a skill shareable, it needs to become a **plugin**, and plugins get distributed through a **marketplace** (a JSON catalog file, hosted in a git repo).

Three distinct things, don't conflate them:
- **Skill** — the actual `SKILL.md` file with instructions
- **Plugin** — a packaged, versioned wrapper around one or more skills (and optionally agents, hooks, MCP servers)
- **Marketplace** — a catalog (`marketplace.json`) listing plugins and where to fetch them from. Not Anthropic-hosted for private/org use — you host it yourself on GitHub (or GitLab, Bitbucket, etc.)

## Step 1: Turn the skill into a plugin

Directory structure:

```
plugins/<plugin-name>/
├── .claude-plugin/
│   └── plugin.json          <- the plugin manifest
└── skills/
    └── <skill-name>/
        └── SKILL.md          <- copy of the skill (keep the original in .claude/skills/ too — that's what makes it work locally in this project)
```

`plugin.json` minimum required fields:

```json
{
  "name": "plugin-name",
  "description": "One-line description",
  "version": "1.0.0",
  "author": { "name": "Your Name" }
}
```

- `name` is public-facing — it's what users type when installing (`/plugin install plugin-name@marketplace-name`)
- Bump `version` on every real update, or updates won't propagate to users who already installed it
- A plugin's skills load automatically from its `skills/` folder — no extra config needed unless skills live somewhere else

**This project's example:** `plugins/write-prd/` is already set up this way, wrapping the `write-prd` skill.

## Step 2: Create the marketplace catalog

In a **separate repo** (your org's marketplace repo, e.g. `your-org/claude-plugins`), create `.claude-plugin/marketplace.json`:

```json
{
  "name": "your-org-tools",
  "owner": {
    "name": "Your Team",
    "email": "team@yourorg.com"
  },
  "plugins": [
    {
      "name": "write-prd",
      "source": "./plugins/write-prd",
      "description": "PRD builder using the Engage v2 project's established structure",
      "version": "1.0.0"
    }
  ]
}
```

`source` options (most relevant ones):
- `"./relative/path"` — plugin lives in the same repo as the marketplace
- `{ "source": "github", "repo": "your-org/some-other-repo" }` — plugin lives in a different repo
- `{ "source": "git-subdir", "url": "...", "path": "..." }` — plugin lives in a subdirectory of a monorepo

If the plugin and the marketplace live in the same repo (simplest setup for a small team), just copy the `plugins/write-prd/` folder from this project into the marketplace repo and use a relative-path source.

## Step 3: Host it

- **Recommended:** push the marketplace repo to GitHub. Teammates add it with `/plugin marketplace add your-org/claude-plugins`
- Any other git host works too — teammates add it with the full URL: `/plugin marketplace add https://gitlab.com/your-org/claude-plugins.git`
- Private repos are supported — Claude Code uses your existing git credentials (SSH keys, `gh auth login`, etc.)

## Step 4: Teammates install it

```bash
/plugin marketplace add your-org/claude-plugins
/plugin install write-prd@your-org-tools
```

After that, the skill is available in their sessions the same way it is in this project — either auto-triggered by its description or invoked directly.

## Optional: require it automatically for your team

Add to `.claude/settings.json` in any repo where you want the marketplace pre-registered for everyone who trusts the folder:

```json
{
  "extraKnownMarketplaces": {
    "your-org-tools": {
      "source": { "source": "github", "repo": "your-org/claude-plugins" }
    }
  },
  "enabledPlugins": {
    "write-prd@your-org-tools": true
  }
}
```

## Updating a published plugin

1. Edit the skill/plugin files
2. Bump `version` in `plugin.json` (and in the marketplace entry if you set it there too — `plugin.json`'s version wins if both are set)
3. Push to the plugin's repo
4. Teammates get the update automatically (if auto-update is on) or via `/plugin marketplace update` + `/plugin update write-prd@your-org-tools`

## Source

Full schema and edge cases (private repos, version pinning, org-managed restrictions, etc.): `https://code.claude.com/docs/en/plugin-marketplaces.md`
