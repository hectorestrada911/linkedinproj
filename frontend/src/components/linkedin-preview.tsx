"use client";

import Image from "next/image";
import { MessageCircle, Repeat2, Send, ThumbsUp } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";

interface LinkedInPreviewProps {
  post: string;
  imageUrl?: string;
  authorName?: string;
  authorTitle?: string;
}

export function LinkedInPreview({
  post,
  imageUrl,
  authorName = "You",
  authorTitle = "Founder · Building with AI",
}: LinkedInPreviewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#2a2a2e] bg-[#1e1e22] shadow-sm shadow-black/20">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#0A66C2]" />
          <h3 className="text-[13px] font-semibold text-[#FAFAF9]">LinkedIn Preview</h3>
        </div>
        <CopyButton text={post} label="Copy post" />
      </div>

      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D4A853] to-[#B8923A] text-sm font-semibold text-[#0a0a0b]">
            {authorName.charAt(0)}
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#FAFAF9]">{authorName}</p>
            <p className="text-[12px] text-[#8A8A8E]">{authorTitle}</p>
            <p className="mt-0.5 text-[11px] text-[#8A8A8E]/60">Just now · 🌐</p>
          </div>
        </div>

        <div className="mt-4 whitespace-pre-wrap text-[14px] leading-relaxed text-[#FAFAF9]/90">
          {post}
        </div>

        {imageUrl && (
          <div className="relative mt-4 aspect-[1.91/1] overflow-hidden rounded-xl bg-[#0a0a0b]">
            <Image src={imageUrl} alt="Post visual" fill className="object-cover" unoptimized />
          </div>
        )}

        <div className="mt-4 flex items-center justify-around border-t border-white/[0.06] pt-3">
          {[
            { icon: ThumbsUp, label: "Like" },
            { icon: MessageCircle, label: "Comment" },
            { icon: Repeat2, label: "Repost" },
            { icon: Send, label: "Send" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-[12px] font-medium text-[#8A8A8E]">
              <Icon className="h-4 w-4" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
