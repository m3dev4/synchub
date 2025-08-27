"use client";

import { Education } from "@/types/educations";
import React from "react";
import { Timeline, TimelineItem } from "./timeline";
import { School2Icon } from "lucide-react";

interface UserEducationProps {
  educations: Education[];
}

const UserEducation = ({ educations }: UserEducationProps) => {
  // Transformer les éducations en items de timeline
  const timelineItems: TimelineItem[] = educations.map((education) => {
    const formatDate = (date: Date | string | undefined) => {
      if (!date) return "";
      const d = typeof date === "string" ? new Date(date) : date;
      return d.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
    };

    const startDate = formatDate(education.startDate);
    const endDate = education.current
      ? "Présent"
      : formatDate(education.endDate);
    const period = startDate && endDate ? `${startDate} - ${endDate}` : "";

    return {
      id: education.id,
      title: education.title,
      description: `${education.school}${period ? ` • ${period}` : ""}`,
      timestamp: education.startDate,
      status: education.current ? "active" : "completed",
      icon: <School2Icon className="h-3 w-3" />,
    };
  });

  return (
    <div className="w-full h-full p-4 overflow-hidden">
      <div className="h-full flex flex-col">
        <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <School2Icon className="h-4 w-4" />
          Éducations
        </h3>
        <div className="flex-1 overflow-y-auto">
          {educations && educations.length > 0 ? (
            <Timeline
              items={timelineItems}
              variant="compact"
              timestampPosition="inline"
              showTimestamps={false}
            />
          ) : (
            <div className="text-center text-muted-foreground text-sm">
              Aucune éducation
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserEducation;
