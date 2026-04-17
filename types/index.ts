export type VideoPlatform = "TikTok" | "Instagram";

export type SubmissionStatus = "pending" | "approved" | "rejected";

export type CampaignExample = {
  title: string;
  url: string;
  thumbnail: string;
};

export type Campaign = {
  id: string;
  brand: string;
  title: string;
  coverImage: string;
  payout: number;
  platform: VideoPlatform;
  daysLeft: number;
  brief: string;
  dos: string[];
  donts: string[];
  examples: CampaignExample[];
};

export type Submission = {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brand: string;
  platform: VideoPlatform;
  submittedAt: string;
  videoUrl: string;
  status: SubmissionStatus;
  /** Optional feedback from the brand reviewer */
  feedback?: string;
  payout: number;
};
