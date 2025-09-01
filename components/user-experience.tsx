"use client";

import { Experience } from "@/types/experiences";
import React from "react";
import { Timeline, TimelineItem } from "./timeline";
import { Briefcase } from "lucide-react";

interface UserExperienceProps {
  experiences: Experience[];
}

const UserExperience = ({ experiences }: UserExperienceProps) => {
  // Transformer les expériences en items de timeline
  const timelineItems: TimelineItem[] = experiences.map((experience) => {
    const formatDate = (date: Date | string | undefined) => {
      if (!date) return "";
      const d = typeof date === "string" ? new Date(date) : date;
      return d.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
    };

    const startDate = formatDate(experience.startDate);
    const endDate = experience.current
      ? "Présent"
      : formatDate(experience.endDate);
    const period = startDate && endDate ? `${startDate} - ${endDate}` : "";

    return {
      id: experience.id,
      title: experience.title,
      description: `${experience.company}${period ? ` • ${period}` : ""}`,
      timestamp: experience.startDate,
      status: experience.current ? "active" : "completed",
      icon: <Briefcase className="h-3 w-3" />,
      content: experience.description ? (
        <div className="rounded-md bg-muted/30 p-2 text-xs">
          <p className="text-muted-foreground line-clamp-2">
            {experience.description}
          </p>
        </div>
      ) : undefined,
    };
  });

  return (
    <div className="w-full h-full p-4 overflow-hidden">
      <div className="h-full flex flex-col">
        <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Expériences
        </h3>
        <div className="flex-1 overflow-y-auto">
          {experiences && experiences.length > 0 ? (
            <Timeline
              items={timelineItems}
              variant="compact"
              timestampPosition="inline"
              showTimestamps={false}
            />
          ) : (
            <div className="text-center text-muted-foreground text-sm">
              Aucune expérience
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserExperience;
