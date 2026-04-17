# Creator Mobile App (Expo + React Native)

A mock creator workflow app built with Expo Router and TypeScript.

The app demonstrates an end-to-end submission flow using local seed data (no backend):
- Browse active campaigns
- Open campaign details (brief, do's/don'ts, example videos)
- Submit a TikTok/Instagram video URL
- Track submission status (pending/approved/rejected)

## Tech Stack

- Expo + React Native
- Expo Router (file-based routing)
- TypeScript
- React Context for state management

## Project Structure

```txt
app/
  (tabs)/
    _layout.tsx          # Tab navigator
    index.tsx            # Campaign listing
    submissions.tsx      # Submission status listing
    profile.tsx          # Creator profile + derived stats
  campaign/
    [id].tsx             # Campaign details
    [id]/
      submit.tsx         # Submit video URL form
  _layout.tsx            # Root providers + stack

components/
  back-button.tsx        # Shared back navigation button
  sticky-screen-header.tsx # Reusable screen title/header

constants/
  colors.ts              # App color tokens
  layout.ts              # Spacing/radius/layout tokens

context/
  creator-flow-context.tsx  # Campaign/submission state + submit action

data/
  campaigns.ts           # Campaign seed data
  submissions.ts         # Initial submission seed data

types/
  index.ts               # Typed domain models

utils/
  linking.ts             # URL validation + external link opening
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm start
```

Useful platform commands:

```bash
npm run ios
npm run android
npm run web
```

## Data and State

- `CAMPAIGNS` and `SEED_SUBMISSIONS` are mocked in `data/`.
- `CreatorFlowProvider` owns app state and exposes:
  - `campaigns`
  - `submissions`
  - `submitVideo(campaignId, videoUrl)`
- Submitting a video updates shared context state, so `My Submissions` and
  `Profile` counts update immediately.
- URL validation for submissions uses `isValidVideoUrl()` in `utils/linking.ts`.

## Quality Checks

Run before opening a PR:

```bash
npm run lint
npx tsc --noEmit
```

## Notes

- This project is intentionally backend-free for product flow prototyping.
- UI is implemented to closely match the provided creator-app mockups.
