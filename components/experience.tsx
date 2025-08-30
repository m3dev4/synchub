import { useExperience } from "@/hooks/experience/useExperience";
import { Experience } from "@/types/experiences";
import React, { useEffect, useState } from "react";
import { Timeline, TimelineItem } from "./timeline";
import { Briefcase, Calendar, MapPin, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const GetExperience = () => {
  const [AllExperiences, setAllExperiences] = useState<Experience[]>([]);

  const { experiences, isLoading, error } = useExperience();

  useEffect(() => {
    if (experiences) {
      setAllExperiences(experiences);
    }
  }, [experiences]);

  // Transformer les expériences en items de timeline
  const timelineItems: TimelineItem[] = AllExperiences.map((experience) => {
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

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-500">Erreur: {error.message}</div>;

  return (
    <div className="space-y-4">
      {AllExperiences && AllExperiences.length > 0 ? (
        AllExperiences.map((experience) => {
          const formatDate = (date: Date | string | undefined) => {
            if (!date) return "";
            const d = typeof date === "string" ? new Date(date) : date;
            return d.toLocaleDateString("fr-FR", {
              month: "short",
              year: "numeric",
            });
          };

          const startDate = formatDate(experience.startDate);
          const endDate = experience.current
            ? "Présent"
            : formatDate(experience.endDate);
          const period =
            startDate && endDate ? `${startDate} - ${endDate}` : "";

          return (
            <Card
              key={experience.id}
              className="transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-foreground mb-1">
                      {experience.title}
                    </h4>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{experience.company}</span>
                    </div>
                    {period && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{period}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    {experience.current && (
                      <Badge variant="secondary" className="text-xs">
                        En cours
                      </Badge>
                    )}
                  </div>
                </div>

                {experience.description && (
                  <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div className="text-center py-8">
          <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucune expérience</h3>
          <p className="text-muted-foreground text-sm">
            Les expériences professionnelles seront affichées ici.
          </p>
        </div>
      )}
    </div>
  );
};

export default GetExperience;
