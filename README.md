# An Early-Warning Queue for Organic Click Decline: Client-Grouped and Time-Forward Evaluation of a Decision-Support Ranker

**Author:** Hassan Ali Imran  
**Affiliation:** FlyRank ML Internship, Applied Search Intelligence (August 2026)  
**Dataset:** Built on the [FlyRank ML Internship dataset](https://flyrank.ai)  
**Notebooks & Code Repository:** [github.com/Hassan-tech-pro/ml-internship](https://github.com/Hassan-tech-pro/ml-internship/tree/main/work/notebooks)

---

## Deploying to Vercel

This repository is pre-configured for zero-configuration, one-click deployment on **Vercel**:

### Option 1: Vercel Dashboard (Recommended)

1. Push this project to your GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Vercel automatically detects the configuration from `vercel.json`:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Your research paper site will be live immediately with clean URLs, SPA rewrites, and asset caching.

### Option 2: Vercel CLI

```bash
# Install Vercel CLI if needed
npm install -g vercel

# Deploy directly from terminal
vercel
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure & Configuration

- `vercel.json`: Configures client-side SPA routing (`/(.*) -> /index.html`), clean URLs, and HTTP cache headers for static assets.
- `vite.config.ts`: Modern ESM Vite bundler configuration using Tailwind CSS v4 and React 19.
- `index.html`: Fully populated with Google Scholar citation tags (`citation_title`, `citation_author`), OpenGraph, Twitter Cards, and Schema.org `ScholarlyArticle` JSON-LD structured data.
- `src/App.tsx`: The complete research paper with 3 viewing modes (Full Paper, Executive Brief, and Interactive Visual Lab).
- `src/components/`:
  - `Figure1Interactive.tsx`: Interactive Precision@K curve and queue horizon inspector.
  - `Figure2Interactive.tsx`: Sealed June 2026 month holdout with automated drift guard alert.
  - `LeakageExperiment.tsx`: Interactive row-level vs client-grouped cross-validation comparison.
  - `PlaybookSimulator.tsx`: Decision triage engine for testing content refresh policies.
  - `Table1Folds.tsx`: 5-fold cross-validation metrics and fold inspector.
  - `BibTeXModal.tsx`: One-click copyable BibTeX & APA scholarly citations.
  - `TopNav.tsx`: Clean top bar contract with reading progress indicator.
