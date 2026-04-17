import type { Campaign } from "@/types";

export const CAMPAIGNS: Campaign[] = [
  {
    id: "glossier",
    brand: "Glossier",
    title: "Summer Glow Routine",
    coverImage: "https://picsum.photos/id/1027/900/540",
    payout: 150,
    platform: "TikTok",
    daysLeft: 15,
    brief:
      "Show your authentic morning skincare routine featuring Cloud Paint and Futuredew. Film in natural lighting and keep the tone casual.",
    dos: [
      "Show the product packaging clearly",
      "Use natural lighting",
      "Include a before/after moment",
      "Mention the product name naturally",
    ],
    donts: [
      "No heavy beauty filters",
      "Don't compare competitor products",
      "Avoid scripted language",
    ],
    examples: [
      {
        title: "Natural glow tutorial",
        url: "https://www.tiktok.com/@beauty/video/7269823454000000001",
        thumbnail: "https://picsum.photos/id/1062/640/360",
      },
      {
        title: "Get ready with me",
        url: "https://www.instagram.com/reel/C3EXAMPLE11/",
        thumbnail: "https://picsum.photos/id/1005/640/360",
      },
    ],
  },
  {
    id: "athletic-greens",
    brand: "Athletic Greens",
    title: "Morning Routine - AG1",
    coverImage: "https://picsum.photos/id/292/900/540",
    payout: 200,
    platform: "TikTok",
    daysLeft: 9,
    brief:
      "Feature AG1 as part of your healthy morning stack. Keep pacing quick and focus on real habit moments.",
    dos: [
      "Show your normal routine flow",
      "Mention consistency benefits",
      "Use a clean kitchen or desk setup",
    ],
    donts: [
      "No medical claims",
      "No over-edited transitions",
      "Do not hide the brand label",
    ],
    examples: [
      {
        title: "Fast morning stack",
        url: "https://www.tiktok.com/@wellness/video/7269823454000000002",
        thumbnail: "https://picsum.photos/id/225/640/360",
      },
      {
        title: "Desk prep routine",
        url: "https://www.instagram.com/reel/C3EXAMPLE12/",
        thumbnail: "https://picsum.photos/id/431/640/360",
      },
    ],
  },
  {
    id: "notion",
    brand: "Notion",
    title: "Productivity Setup Tour",
    coverImage: "https://picsum.photos/id/180/900/540",
    payout: 120,
    platform: "Instagram",
    daysLeft: 29,
    brief:
      "Give a mini walkthrough of your weekly planner in Notion. Show practical templates and one clear use case.",
    dos: [
      "Show your dashboard quickly",
      "Highlight one automation",
      "Use clear screen recording",
    ],
    donts: [
      "No blurry screen captures",
      "Do not include private data",
      "Avoid unrelated app demos",
    ],
    examples: [
      {
        title: "Weekly planning workflow",
        url: "https://www.instagram.com/reel/C3EXAMPLE13/",
        thumbnail: "https://picsum.photos/id/48/640/360",
      },
      {
        title: "Creator content calendar",
        url: "https://www.tiktok.com/@creator/video/7269823454000000003",
        thumbnail: "https://picsum.photos/id/26/640/360",
      },
    ],
  },
  {
    id: "gymshark",
    brand: "Gymshark",
    title: "Leg Day Fit Check",
    coverImage: "https://picsum.photos/id/866/900/540",
    payout: 175,
    platform: "TikTok",
    daysLeft: 24,
    brief:
      "Create a short fit-check style video featuring Gymshark activewear in your gym routine. Keep energy high.",
    dos: [
      "Capture movement and fit",
      "Mention comfort and support",
      "Shoot in bright gym areas",
    ],
    donts: [
      "No mirror smudges",
      "Do not use copyrighted music",
      "Avoid overusing slow motion",
    ],
    examples: [
      {
        title: "Leg day routine clip",
        url: "https://www.tiktok.com/@fitness/video/7269823454000000004",
        thumbnail: "https://picsum.photos/id/1084/640/360",
      },
      {
        title: "Outfit + workout transition",
        url: "https://www.instagram.com/reel/C3EXAMPLE14/",
        thumbnail: "https://picsum.photos/id/786/640/360",
      },
    ],
  },
];
