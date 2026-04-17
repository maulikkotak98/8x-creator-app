import type { Submission } from "@/types";

export const SEED_SUBMISSIONS: Submission[] = [
  {
    id: "sub-1",
    campaignId: "glossier",
    campaignTitle: "Summer Glow Routine",
    brand: "Glossier",
    platform: "TikTok",
    submittedAt: "Apr 10",
    videoUrl: "https://www.tiktok.com/@yourhandle/video/7269800000000000001",
    status: "approved",
    payout: 150,
    feedback: "Great energy and natural lighting. Exactly what we wanted.",
  },
  {
    id: "sub-2",
    campaignId: "athletic-greens",
    campaignTitle: "Morning Routine - AG1",
    brand: "Athletic Greens",
    platform: "TikTok",
    submittedAt: "Apr 14",
    videoUrl: "https://www.tiktok.com/@yourhandle/video/7269800000000000002",
    status: "pending",
    payout: 200,
  },
  {
    id: "sub-3",
    campaignId: "notion",
    campaignTitle: "Productivity Setup Tour",
    brand: "Notion",
    platform: "Instagram",
    submittedAt: "Apr 12",
    videoUrl: "https://www.instagram.com/reel/CREATOR123/",
    status: "rejected",
    payout: 120,
    feedback:
      "Video used a heavy filter. Please reshoot with natural screen recording.",
  },
];
