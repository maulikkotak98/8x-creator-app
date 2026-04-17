# Creator mobile app development

_Exported on 17/04/2026 at 16:17:51 GMT+5:30 from Cursor (3.1.15)_

---

**User**

We are going to build a creator mobile app in Expo + React Native, below are the details.

Requirements:

- Build creator submission flow with mocked data (no backend), the app will have
  1. See a list of active campaigns — brand, payout per video, deadline
  2. Tap into a campaign — read the brief + watch 1–2 example videos to replicate
  3. Submit a video URL (TikTok / Instagram)
  4. See submission status — pending / approved / rejected
- High-quality architecture (separation of concerns, reusable components, constants, typed models, clear naming)
- Keep code review-ready and production-minded - I have attached mockups for reference.

Engineering constraints:

- Use Expo Router
- Use TypeScript
- No unnecessary dependencies
- Add concise comments only when helpful
- Keep styling consistent with design tokens
- Avoid dead code and starter template leftovers
- Validate with lint + typecheck regularly

I have already scaffolded the app. Don't perform any actions or build anything yet, i will give you the tasks to perform in subsequent prompts, this was just a brief about what we are going to do.

---

**Cursor**

Understood. I’ll wait for your task-by-task prompts and won’t make any changes yet.

When you send the first task, I’ll implement it directly in the Expo Router + TypeScript setup, keeping the codebase review-ready with:

- clear architecture and typed models
- reusable components/constants
- consistent token-based styling
- no unnecessary deps or template leftovers
- regular lint + typecheck validation

---

**User**

I'v created types file => /types/index.ts, lets create types for campaigns and submissions. A campaign object will have id, brand,title, coverimage, payout, platform (tiktok/instagram), daysleft, dos, donts, examples(video example object having title, url and thumbnail). A submission object will have id, campaignId, campaigntitle, brand, platform, submittedate, videoURL, status (approved, rejected, pending), feedback, payout

---

**Cursor**

I’ll add strongly typed models in `types/index.ts` for `Campaign`, `Submission`, and nested supporting types (platform, status, video examples), matching the fields you specified.

Added the types in `types/index.ts` with clean, reusable models:

- `Platform` union: `tiktok | instagram`
- `SubmissionStatus` union: `approved | rejected | pending`
- `VideoExample` interface: `title`, `url`, `thumbnail`
- `Campaign` interface with all requested fields
- `Submission` interface with all requested fields

I also normalized field names to idiomatic camelCase for TypeScript:

- `coverimage` → `coverImage`
- `daysleft` → `daysLeft`
- `campaigntitle` → `campaignTitle`
- `submittedate` → `submittedAt`
- `videoURL` → `videoUrl`

No lint issues in this file.

---

**User**

i've reviewed and made required changes to it, now lets create seed data, i have created files - data/campaigns.ts and data/submissions.ts. Generate the seed data as per the types/index.ts and the mockups provided.

---

**Cursor**

I’ll read your updated `types/index.ts` first, then populate `data/campaigns.ts` and `data/submissions.ts` with realistic mock data aligned to your mockups and those exact types.

I’ve got the updated shape (`VideoPlatform`, `brief`, optional `feedback`), so I’ll now add complete seed arrays with mockup-matching campaigns and submissions.

Seed data is in place; I’ll quickly run a project typecheck next to make sure these new mocks integrate cleanly.

Added seed data to both files based on your `types/index.ts` and the provided mockups.

### What I added

- `data/campaigns.ts`
  - Exported `campaigns: Campaign[]`
  - 4 campaigns matching mockup context:
    - Glossier — Summer Glow Routine — `$150` — `15` days
    - Athletic Greens — Morning Routine - AG1 — `$200` — `9` days
    - Notion — Productivity Setup Tour — `$120` — `29` days
    - Gymshark — Leg Day Fit Check — `$175` — `24` days
  - Each campaign includes:
    - `brief`
    - `dos` and `donts`
    - `examples` with 2 video example objects (`title`, `url`, `thumbnail`)

- `data/submissions.ts`
  - Exported `submissions: Submission[]`
  - 3 submissions matching mockup states:
    - `approved` (Glossier) with positive feedback
    - `pending` (Athletic Greens) without feedback
    - `rejected` (Notion) with revision feedback

### Validation

- Lint check passed: `npm run lint`
- Typecheck passed: `npx tsc --noEmit`

If you want, next I can wire these into the tabs/screens so `Campaigns`, campaign detail, and `My Submissions` render directly from this seed data.

---

**User**

for state management, will use the context, i have created the context and added a utility function to validate and open video links.

---

**Cursor**

Perfect, that’s the right direction.

Using a dedicated context for creator flow state plus a shared link utility is exactly what we want for clean separation and reuse. I’ll use that as the source of truth in upcoming screens/components (campaign list, campaign details, submit URL flow, and submission status).

Send the next task and I’ll wire it in accordingly.

---

**User**

lets create tabs as per the mockups, create listing ui for active camplaigns

---

**Cursor**

I’ll wire the tab layout to match the mockups and build the active campaigns listing UI first, using your context/theme types and keeping it reusable. I’m reading the current tab and theme files now to implement against your structure.

I found the current tabs are still template (`Home/Explore`). Next I’ll replace them with `Campaigns`, `My Submissions`, and `Profile`, then build a dark-themed active campaigns list on the campaigns tab powered by `useCreatorFlow()`.

I’m now replacing the starter home screen with the real campaigns list UI and then I’ll add minimal `submissions` and `profile` tab screens so the new tab routes resolve cleanly.

Implemented the tabs and active campaign listing UI to match the mockup direction.

### What changed

- Updated tab navigator in `app/(tabs)/_layout.tsx`
  - Tabs are now:
    - `Campaigns` (`index`)
    - `My Submissions` (`submissions`)
    - `Profile` (`profile`)
  - Applied dark tab bar styling and green active state similar to mockups.

- Added tab icon support in `components/ui/icon-symbol.tsx`
  - Added mappings for:
    - `megaphone.fill`
    - `tray.full.fill`
    - `person.fill`

- Replaced starter home screen with active campaigns listing in `app/(tabs)/index.tsx`
  - Uses `useCreatorFlow()` to load campaigns from context
  - Shows:
    - header: `Campaigns` + active count
    - card list with brand, title, payout, days left, platform
    - badge logic: `Active` vs `Closing Soon` (when `daysLeft <= 10`)
  - Dark visual styling aligned with your provided mockups.

- Added route placeholders so all tabs resolve
  - `app/(tabs)/submissions.tsx`
  - `app/(tabs)/profile.tsx`

### Validation

- Typecheck passed: `npx tsc --noEmit`
- Lint passed: `npm run lint`

If you want, next I can make each campaign card tappable and build the campaign detail screen (brief, do/don’t lists, and example videos).

---

**User**

lets implement the profile ui, its straightforward, refer to the mockup

---

**Cursor**

I’ll implement `app/(tabs)/profile.tsx` to match the mockup with a dark profile card style, avatar/handle section, and live stats (`Submitted`, `Approved`, `Earned`) derived from your context data.

Implemented the profile UI in `app/(tabs)/profile.tsx` to match the mockup style.

### What’s implemented

- Dark-themed profile screen with:
  - top title: `Profile`
  - centered avatar circle with icon
  - creator name + handle (`@yourcreatorhandle`)
- Stats row with 3 cards:
  - `Submitted`
  - `Approved`
  - `Earned`
- Stats are derived from real context data via `useCreatorFlow()`:
  - `Submitted` = total submissions
  - `Approved` = submissions with `status === "approved"`
  - `Earned` = sum of payouts for approved submissions

This matches your current seed data behavior (e.g. `3`, `1`, `$150`).

### Validation

- Typecheck passed: `npx tsc --noEmit`
- Lint passed: `npm run lint`

If you want, next I can implement `My Submissions` UI to match the third mockup card list with status chips and feedback blocks.

---

**User**

Implement campaign details ui, clicking on the campaing from the listing page should open its details along with a button to submit video, as per the mockup, the submit video should open a new UI asking user to enter ther instagram/tiktok URL, and validate it using the utility function in utils/linking.ts.

---

**Cursor**

I’ll add two new routed screens: campaign detail and submit video, wire tap navigation from the campaigns list, and hook URL validation to `isValidVideoUrl` (with clear inline error state). I’m checking the current app structure first so routing fits Expo Router cleanly.

I’ve mapped the route structure and will now implement three focused changes: make campaign cards tappable, add a campaign detail screen (brief/do-don’t/examples + submit CTA), and add a submit screen with URL validation + context submission flow.

Implemented the full campaign details + submit flow with Expo Router navigation, aligned to your mockup requirements.

### What I changed

- Updated campaigns listing tap behavior in `app/(tabs)/index.tsx`
  - Each campaign card is now tappable.
  - On press, it navigates to `campaign/[campaignId]`.

- Added campaign detail screen at `app/campaign/[campaignId].tsx`
  - Dark UI with custom top bar + back button
  - Shows:
    - campaign cover image
    - title + active badge
    - payout + days remaining cards
    - brief
    - do’s and don’ts list
    - example videos list
  - Example videos are tappable and use `openUrl()` from `utils/linking.ts`.
  - Bottom CTA button: `Submit Your Video` opens submit screen.

- Added submit screen at `app/campaign/[campaignId]/submit.tsx`
  - Custom UI asking for TikTok/Instagram URL
  - Inline validation using `isValidVideoUrl()` from `utils/linking.ts`
  - Also submits through context `submitVideo()` (which performs source-of-truth validation too)
  - On success, routes to `My Submissions` tab (`/submissions`)

### Validation

- Typecheck passed: `npx tsc --noEmit`
- Lint passed: `npm run lint`

If you want next, I can implement `My Submissions` tab UI to match the mockup cards (status chips, feedback panel, and `View video` link).

---

**User**

i'll am testing and updating it as needed meanwhile lets complete the remaining implementation, i.e submission screen. Also lets make sure that upon submitting a video we are updating the count in the profile page and the submissions page also reflects that.

---

**Cursor**

I’ll implement the full `My Submissions` screen from context data now, including status chips, optional feedback, and `View video` action; this will automatically reflect new submissions and keep profile counts in sync since both read the same context state.

I’ve completed the submissions screen and kept it fully context-driven, so new submissions will appear immediately and profile counts stay synchronized. I’ll run lint/typecheck to confirm everything is clean.

Completed the remaining implementation for `My Submissions` and confirmed data sync behavior.

### Implemented `My Submissions` UI

Updated `app/(tabs)/submissions.tsx` with a full context-driven screen:

- Header + total count (`{submissions.length} total`)
- Card list for each submission showing:
  - `brand`
  - `campaignTitle`
  - `platform` + `submittedAt`
  - status chip (`Pending`, `Approved`, `Rejected`)
  - optional `feedback` block
  - `View video` action (uses `openUrl()` from `utils/linking.ts`)
  - payout on the right
- Empty state when no submissions exist

### Count/state sync confirmation

Yes — submitting a video now updates both screens automatically because they read the same `submissions` state from `CreatorFlowContext`:

- `app/(tabs)/profile.tsx` derives:
  - submitted count
  - approved count
  - earned payout total
- `app/(tabs)/submissions.tsx` renders the current submissions list

The submit flow already inserts new items at the top (`setSubmissions((prev) => [newSubmission, ...prev])`), so the new entry appears immediately in `My Submissions` and profile stats update in the same render cycle.

### Validation

- `npx tsc --noEmit` passed
- `npm run lint` passed

---

**User**

lets make sure that unused code and components and/or irrelevant extra code is cleaned up

---

**Cursor**

I’ll do a targeted cleanup pass for template leftovers and unused code, then run lint/typecheck to confirm nothing breaks. First I’m scanning references so we only remove truly unused files.

I identified a clear template-only chain (`explore`/`modal` + themed/collapsible/parallax helpers) that is now unused by your creator flow. I’ll remove those files and simplify root layout so the codebase only keeps what this app uses.

Cleanup edits are done; I’m running full lint + typecheck now to ensure no stale imports or routing fallout remain.

Completed a full cleanup of unused/irrelevant starter code while keeping the creator flow intact.

### Removed unused routes/components/hooks

Deleted template leftovers that were no longer referenced:

- `app/(tabs)/explore.tsx`
- `app/modal.tsx`
- `components/external-link.tsx`
- `components/hello-wave.tsx`
- `components/parallax-scroll-view.tsx`
- `components/themed-text.tsx`
- `components/themed-view.tsx`
- `components/ui/collapsible.tsx`
- `hooks/use-theme-color.ts`
- `constants/theme.ts`

### Updated layout to match cleanup

- Updated `app/_layout.tsx` to remove the obsolete `modal` screen registration from the root `Stack`.

### Validation

- Typecheck passed: `npx tsc --noEmit`
- Lint passed: `npm run lint`
- IDE lints: no errors

If you want, next I can also do a **docs cleanup pass** (rewrite `README.md` from Expo template to creator-app-specific setup and feature notes).

---

**User**

update the readme

---

**Cursor**

I’ll replace the Expo template README with a project-specific one covering architecture, routes, mocked data flow, and run/quality commands for this creator app.

Updated `README.md` to be project-specific and review-ready.

### Included in the new README

- Clear project overview for the creator submission app
- Implemented flow summary (campaigns → details → submit URL → status tracking)
- Tech stack section (Expo Router + TypeScript + Context)
- Current folder/file architecture map
- Setup and run instructions (`start`, `ios`, `android`, `web`)
- Data/state notes (`CAMPAIGNS`, `SEED_SUBMISSIONS`, `CreatorFlowProvider`, `submitVideo`)
- Validation commands (`npm run lint`, `npx tsc --noEmit`)
- Notes about mocked data and mockup-driven UI

If you want, I can also add a short “future improvements” section (backend/API integration, persistence, auth, tests) to help with handoff/review context.

---

**User**

Update the code as needed check if readme needs to be updated

---

**Cursor**

I’ll do a quick review pass for consistency issues and run lint/typecheck, then I’ll apply any required fixes and update the README only if the behavior or routes have changed.

I found one mismatch: routing now uses `app/campaign/[id]` while README still documented `[campaignId]`. I’ll update README to reflect the current code and briefly note the shared context sync behavior after submission.

Did a validation pass and checked whether code updates were needed.

### What I checked

- Ran `npx tsc --noEmit` (passes)
- Ran `npm run lint` (passes)
- Verified current route structure and submission flow wiring

### What I updated

- Updated `README.md` to match the current implementation:
  - corrected routes from `app/campaign/[campaignId]` to `app/campaign/[id]`
  - added `components` and `constants` sections now used in the app architecture
  - documented that submitting a video updates shared context and immediately reflects in both:
    - `My Submissions`
    - `Profile` counters

No additional code changes were required at this point since lint/typecheck and flow consistency are clean.
