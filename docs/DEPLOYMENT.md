# ClarityAge - 40: Deployment Guide

**📚 [Documentation Hub](./README.md) | [← Back to Documentation](./README.md)**

---

## Deployment Overview

ClarityAge is deployed as a **static site** on GitHub Pages. This deployment strategy provides:

- **Zero-cost hosting** via GitHub Pages
- **Automatic HTTPS** with GitHub's infrastructure
- **CDN delivery** through GitHub's global network
- **Simple deployment** via npm scripts
- **Version control** integrated with deployment

---

## Quick Start Deployment

### Initial Setup

1. **Ensure repository is configured for GitHub Pages**
   ```bash
   # Check if gh-pages is configured
   git remote -v
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build and deploy**
   ```bash
   npm run deploy
   ```

4. **Access the site**
   - URL: `https://<username>.github.io/ClarityAge`

### Automated Deployment

```bash
# One-command deployment
npm run deploy
```

This command:
1. Runs `npm run build` (TypeScript compile + Vite build)
2. Creates `dist/` directory with optimized assets
3. Deploys to `gh-pages` branch
4. Triggers GitHub Pages to update the live site

---

## Deployment Architecture

### Build Process

```
Source Code (src/)
    ↓
TypeScript Compiler (tsc)
    ↓
Vite Build (vite build)
    ↓
dist/ directory
    ├── index.html
    ├── assets/
    │   ├── index-[hash].js
    │   └── index-[hash].css
    └── (other static assets)
    ↓
gh-pages deploy
    ↓
GitHub Pages Hosting
    ↓
https://bitlogicforge.github.io/ClarityAge
```

### Deployment Workflow

1. **Development**: Work on `master` branch
2. **Testing**: Local testing with `npm run preview`
3. **Build**: Production build with `npm run build`
4. **Deploy**: Push to `gh-pages` branch via gh-pages
5. **Live**: GitHub Pages automatically updates

---

## Environment Configuration

### Vite Build Configuration

```typescript
// vite.config.ts
export default defineConfig({
  base: '/ClarityAge/',          // GitHub Pages subdirectory
  server: {
    host: '0.0.0.0',             // Allow external access
    port: 5173                    // Default Vite port
  },
  build: {
    outDir: 'dist',               // Output directory
    sourcemap: true,              // Debug source maps
    rollupOptions: {
      output: {
        manualChunks: {            // Code splitting
          'react-vendor': ['react', 'react-dom', 'react-redux'],
          'mui-vendor': ['@mui/material', '@emotion/react', '@emotion/styled']
        }
      }
    }
  }
});
```

### Production vs Development

| Aspect | Development | Production |
|--------|-------------|------------|
| **Server** | Vite dev server (localhost:5173) | GitHub Pages |
| **Build** | On-the-fly compilation | Pre-built static assets |
| **Source Maps** | Full | Included for debugging |
| **Optimization** | Minimal | Full optimization |
| **Base Path** | `/` | `/ClarityAge/` |

---

## Deployment Procedures

### Standard Deployment

```bash
# 1. Ensure clean working directory
git status

# 2. Commit any pending changes
git add .
git commit -m "feat: description of changes"

# 3. Build and deploy
npm run deploy

# 4. Verify deployment
# Visit: https://bitlogicforge.github.io/ClarityAge
```

### Pre-Deployment Checklist

Before deploying, verify:

- [ ] All changes committed to `master`
- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] `npm run preview` looks correct
- [ ] No console errors in production build
- [ ] All translations updated (if content changes)

### Hotfix Deployment

For urgent fixes:

```bash
# Create hotfix branch
git checkout -b hotfix/issue-description

# Make changes and test locally
npm run dev

# Quick deploy
npm run deploy

# Merge to master after verification
git checkout master
git merge hotfix/issue-description
```

---

## GitHub Pages Configuration

### Repository Settings

Configure in GitHub repository settings:

1. **Navigate to**: Settings → Pages
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` / `root`
4. **Custom Domain** (optional): Configure DNS

### Verification

Verify GitHub Pages is enabled:

```bash
# Check gh-pages branch exists
git branch -a | grep gh-pages

# View deployment history
git log gh-pages --oneline -5
```

---

## CI/CD Pipeline

### Manual Deployment (Current)

Currently, deployment is manual via `npm run deploy`.

### Future Automation

Consider adding GitHub Actions for automated deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Deployment Troubleshooting

### Common Issues

#### Issue: 404 Errors After Deployment

**Cause**: Incorrect `base` path in vite.config.ts

**Solution**:
```typescript
// Ensure base matches repository name
base: '/ClarityAge/',
```

#### Issue: White Screen After Deployment

**Cause**: JavaScript errors or incorrect asset paths

**Solution**:
```bash
# Check browser console for errors
# Verify build output
npm run build
# Check dist/ directory contents
```

#### Issue: Old Content Still Showing

**Cause**: GitHub Pages cache not cleared

**Solution**:
```bash
# Force cache busting by clearing cache
# In browser: Ctrl+Shift+R (hard refresh)
# Or wait 1-2 minutes for GitHub Pages to update
```

#### Issue: gh-pages Branch Conflict

**Cause**: Local gh-pages branch out of sync

**Solution**:
```bash
# Delete local gh-pages branch
git branch -D gh-pages

# Re-deploy
npm run deploy
```

---

## Performance Optimization

### Build Optimization

Current optimizations in production build:

1. **Tree Shaking**: Removes unused code
2. **Code Splitting**: Separates vendor bundles
3. **Minification**: Reduces bundle size
4. **Hash Naming**: Cache busting for assets
5. **Gzip Compression**: Server-side compression

### Asset Optimization

```typescript
// Optimized build configuration
build: {
  minify: 'terser',
  terserOptions: {
    compress: {
      drop_console: true,      // Remove console.logs
      drop_debugger: true      // Remove debuggers
    }
  }
}
```

### CDN Configuration

GitHub Pages provides:
- Global CDN via Fastly
- Automatic HTTPS
- HTTP/2 support
- Gzip compression

---

## Monitoring and Analytics

### Current Status

**No analytics or monitoring** - privacy-first approach means:

- No user tracking
- No error reporting
- No performance monitoring
- No A/B testing

### Optional Enhancements

If needed in future:

1. **Error Tracking**: Sentry client-side
2. **Performance**: Web Vitals monitoring
3. **Analytics**: Privacy-preserving alternatives (Plausible, Fathom)

---

## Security Considerations

### Static Site Security

Benefits of static deployment:

- ✅ No server-side vulnerabilities
- ✅ No database to secure
- ✅ No API endpoints to protect
- ✅ HTTPS enforced by GitHub
- ✅ No server configuration needed

### Content Security

Current security posture:

- **No user data collection**
- **No third-party scripts**
- **No cookies**
- **No local storage abuse**
- **Open source code for audit**

---

## Backup and Recovery

### Source Backup

```bash
# Regular backups via git
git push origin master

# Backup entire repository
git archive --format=tar.gz --output=clarityage-backup.tar.gz master
```

### Deployment Backup

```bash
# Backup gh-pages branch
git push origin gh-pages:gh-pages-backup-$(date +%Y%m%d)
```

### Recovery Process

If deployment fails:

```bash
# 1. Revert to previous version
git checkout gh-pages
git checkout <previous-commit>

# 2. Redeploy
npm run deploy
```

---

## Alternative Deployment Options

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### AWS S3 + CloudFront

```bash
# Sync to S3
aws s3 sync dist/ s3://clarityage-bucket

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## Related Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - Development workflow
- **[IMPLEMENTATION.md](./IMPLEMENTATION.md)** - Implementation details

---

*For deployment issues or questions, please open a GitHub issue or check the GitHub Pages documentation.*
