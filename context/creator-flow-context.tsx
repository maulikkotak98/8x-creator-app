import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { CAMPAIGNS } from "@/data/campaigns";
import { SEED_SUBMISSIONS } from "@/data/submissions";
import type { Campaign, Submission } from "@/types";
import { isValidVideoUrl } from "@/utils/linking";

type SubmitResult = { ok: true } | { ok: false; error: string };

type CreatorFlowContextValue = {
  campaigns: Campaign[];
  submissions: Submission[];
  submitVideo: (campaignId: string, videoUrl: string) => SubmitResult;
};

const CreatorFlowContext = createContext<CreatorFlowContextValue | null>(null);

export function CreatorFlowProvider({ children }: { children: ReactNode }) {
  const [submissions, setSubmissions] =
    useState<Submission[]>(SEED_SUBMISSIONS);

  const submitVideo = (campaignId: string, videoUrl: string): SubmitResult => {
    const campaign = CAMPAIGNS.find((c) => c.id === campaignId);
    if (!campaign) {
      return { ok: false, error: "Campaign not found." };
    }

    const trimmedUrl = videoUrl.trim();
    if (!isValidVideoUrl(trimmedUrl)) {
      return {
        ok: false,
        error: "Please enter a valid TikTok or Instagram video URL.",
      };
    }

    const newSubmission: Submission = {
      id: `sub-${Date.now()}`,
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      brand: campaign.brand,
      platform: campaign.platform,
      submittedAt: "Today",
      videoUrl: trimmedUrl,
      status: "pending",
      payout: campaign.payout,
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
    return { ok: true };
  };

  const value = useMemo<CreatorFlowContextValue>(
    () => ({ campaigns: CAMPAIGNS, submissions, submitVideo }),
    [submissions],
  );

  return (
    <CreatorFlowContext.Provider value={value}>
      {children}
    </CreatorFlowContext.Provider>
  );
}

export function useCreatorFlow(): CreatorFlowContextValue {
  const context = useContext(CreatorFlowContext);
  if (!context) {
    throw new Error(
      "useCreatorFlow must be used inside <CreatorFlowProvider>.",
    );
  }
  return context;
}
