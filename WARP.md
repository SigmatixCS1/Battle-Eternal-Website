# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Firebase-hosted static website for the Battle Eternal universe. The project consists of a simple HTML site served through Firebase Hosting with minimal dependencies.

**Project Name:** battle-eternal (Firebase project)
**Hosting:** Firebase Hosting
**Content Location:** `public/` directory

## Architecture

### Structure
- **`public/`** - Static web content served by Firebase Hosting
  - `index.html` - Main landing page (currently under construction)
- **`firebase.json`** - Firebase Hosting configuration
- **`.firebaserc`** - Firebase project aliases and configuration

### Hosting Configuration
- Public directory: `public/`
- Ignored patterns: `firebase.json`, `**/.*`, `**/node_modules/**`

## Common Commands

### Development
```powershell
# Serve the site locally with Firebase emulator
firebase serve

# Or specify a custom port
firebase serve --port 8080
```

### Deployment
```powershell
# Deploy to Firebase Hosting
firebase deploy

# Deploy only hosting (if multiple Firebase services are configured later)
firebase deploy --only hosting
```

### Firebase Management
```powershell
# Login to Firebase
firebase login

# View current project
firebase projects:list

# Switch projects (if multiple are configured)
firebase use <project-alias>

# Open Firebase Console in browser
firebase open hosting:site
```

## Development Guidelines

### File Organization
- All web-accessible files must be placed in the `public/` directory
- Static assets (images, CSS, JS) should be organized in subdirectories within `public/`
- Firebase configuration files remain at the project root

### Battle Eternal Universe Context
This website is part of the Battle Eternal dystopian universe, featuring:
- The Hegemony (one-world government)
- F-Link control system
- Narrative Compliance Board (NCB) and culture war themes
- The Furies (heroic resistance)
- Metaphysical/archetypal elements

When creating content, maintain consistency with the dark, dystopian tone and thematic elements of the universe.

## Firebase Hosting Features

### Future Considerations
As the site grows, consider implementing:
- **Custom domain** - Configure via Firebase Console
- **Rewrites/redirects** - Add to `firebase.json` for SPA routing or URL management
- **Headers** - Configure security and caching headers in `firebase.json`
- **Multiple sites** - Firebase projects can host multiple sites

Example `firebase.json` expansion:
```json
{
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{
      "source": "**",
      "destination": "/index.html"
    }],
    "headers": [{
      "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
      "headers": [{
        "key": "Cache-Control",
        "value": "max-age=7200"
      }]
    }]
  }
}
```

## Project State

- **Current Status:** Initial setup with placeholder content
- **Git Repository:** Initialized (main branch, no commits yet)
- **Firebase Project:** Configured and linked to "battle-eternal"
