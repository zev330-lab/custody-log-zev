# CustodyLog

A private, offline-first Progressive Web App (PWA) for documenting custody-related incidents and positive parenting moments. All data stays on your device — nothing is ever sent to a server.

## Features

### Incident Logging
- 15 incident categories across 6 groups: Behavior & Safety, Custody & Court, Communication, Children, Concerns, Documentation
- Severity levels: Low, Medium, High, Critical
- Date/time with backdating support and automatic audit trail
- Location, witness, and children-present tracking
- Photo, video, and audio attachments with automatic image compression

### Positive Moment Tracking
- 12 categories: Quality Time, Activities, Milestones, Co-Parenting Wins, and more
- Documents healthy routines, stability, and engaged parenting
- Positive entries appear first in attorney reports

### Security & Privacy
- Optional 4-digit PIN lock
- All data stored locally via IndexedDB — zero network requests
- No analytics, tracking, or cloud storage
- Full offline support via service worker

### Export Options
- **Attorney-Ready Report** — formatted HTML with print-to-PDF, includes summary statistics, chronological entries, and embedded photos
- **Media Bundle (ZIP)** — all attachments organized by entry, with cross-reference index
- **Spreadsheet (CSV)** — compatible with Excel and Google Sheets
- **Full Backup (JSON)** — complete data export with attachments for backup/restore

### Production Features
- Automatic backup reminders (warns after 7 days without export)
- Storage quota monitoring with visual meter and warnings
- Debounced search across all entry fields
- Filter by type (incidents/positive) and category
- Custom confirmation dialogs for all destructive actions
- Error boundary with recovery UI
- Boot loading screen
- Data migration from previous versions
- Character limits and input validation
- Toast notification queue (no overlapping messages)

## Tech Stack

- Pure HTML, CSS, and JavaScript — no build step, no dependencies
- IndexedDB for data storage (hundreds of MB capacity)
- Service Worker for offline caching with proper fallback page
- PWA manifest for home screen install

## Setup

1. Serve the files from any static web server or deploy to GitHub Pages
2. Open in a mobile browser (Chrome, Safari, Firefox)
3. Tap "Add to Home Screen" to install as a PWA
4. Set a PIN when prompted (or skip for later)
5. Complete the onboarding walkthrough

### Local Development

```bash
# Any static server works
npx serve .
# or
python3 -m http.server 8000
```

## File Structure

```
index.html          — Complete app (HTML + CSS + JS in single file)
manifest.json       — PWA manifest with app metadata and icons
sw.js               — Service worker for offline caching
icon-192.png        — App icon (192x192)
icon-512.png        — App icon (512x512)
apple-touch-icon.png — iOS home screen icon (180x180)
```

## Data Storage

- **Settings** (PIN, onboarding state, last backup time) — `localStorage`
- **Entries & drafts** — `IndexedDB` (supports large datasets with media attachments)
- **Cache** — Service Worker cache for offline access

Clearing browser data will delete all entries. Always export backups regularly.

## Privacy

CustodyLog stores all data exclusively on the user's device. No data is transmitted to any server, no analytics are collected, and no third-party services are used beyond Google Fonts (loaded via CSS). The app functions fully offline after the first load.

## Disclaimer

This app is a documentation tool, not legal software. It does not constitute legal advice. Always consult with your attorney about your specific custody situation.

## License

MIT
