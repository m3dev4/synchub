import React, { useEffect, useState } from "react";
import { Timeline, TimelineItem } from "./timeline";
import {
  Briefcase,
  Calendar,
  School2Icon,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { Education } from "@/types/educations";
import { useEducation } from "@/hooks/education/useEducation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-4">
      {AllEducations && AllEducations.length > 0 ? (
        AllEducations.map((education) => {
          const formatDate = (date: Date | string | undefined) => {
            if (!date) return "";
            const d = typeof date === "string" ? new Date(date) : date;
            return d.toLocaleDateString("fr-FR", {
              month: "short",
              year: "numeric",
            });
          };

          const startDate = formatDate(education.startDate);
          const endDate = education.current
            ? "En cours"
            : formatDate(education.endDate);
          const period =
            startDate && endDate ? `${startDate} - ${endDate}` : "";

          return (
            <Card
              key={education.id}
              className="transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      {education.title}
                    </h4>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <BookOpen className="w-4 h-4" />
                      <span className="font-medium">{education.school}</span>
                    </div>
                    {period && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{period}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    {education.current && (
                      <Badge variant="secondary" className="text-xs">
                        En cours
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div className="text-center py-8">
          <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucune formation</h3>
          <p className="text-muted-foreground text-sm">
            Les formations et études seront affichées ici.
          </p>
        </div>
      )}
    </div>
  );
};

export default GetEducation;
