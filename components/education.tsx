import { useExperience } from "@/hooks/experience/useExperience";
import { Experience } from "@/types/experiences";
import React, { useEffect, useState } from "react";
import { Timeline, TimelineItem } from "./timeline";
import { Briefcase, Calendar, School2Icon } from "lucide-react";
import { Education } from "@/types/educations";
import { useEducation } from "@/hooks/education/useEducation";

const GetEducation = () => {
  const [AllEducations, setAllEducations] = useState<Education[]>([]);

  const { educations, isLoading, error } = useEducation();

  useEffect(() => {
    if (educations) {
      setAllEducations(educations);
    }
  }, [educations]);

  // Transformer les expériences en items de timeline
  const timelineItems: TimelineItem[] = AllEducations.map((education) => {
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
      icon: <Briefcase className="h-3 w-3" />,
      //   content: education.description ? (
      //     <div className="rounded-md bg-muted/30 p-2 text-xs">
      //       <p className="text-muted-foreground line-clamp-2">{education.description}</p>
      //     </div>
      //   ) : undefined,
    };
  });

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">Erreur: {error.message}</div>;

  return (
    <div className="w-full h-full p-4 overflow-hidden">
      <div className="h-full flex flex-col">
        <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
          <School2Icon className="h-4 w-4" />
          Educations
        </h3>
        <div className="flex-1 overflow-y-auto">
          {AllEducations && AllEducations.length > 0 ? (
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

export default GetEducation;
