import { useExperience } from "@/hooks/experience/useExperience";
import { Experience } from "@/types/experiences";
import {
  Badge,
  Briefcase,
  Building2,
  Calendar,
  Loader2,
  MapPin,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Experiences = () => {
  const [AllExperiences, setAllExperiences] = useState<Experience[]>([]);

  const { experiences, isLoading, error } = useExperience();

  useEffect(() => {
    if (experiences) {
      setAllExperiences(experiences);
    }
  }, [experiences]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-lg font-semibold">Chargement des expériences...</p>
      </div>
    );
  }

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "";
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("fr-FR", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Briefcase className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Expériences Professionnelles
          </h2>
          <p className="text-muted-foreground">
            {AllExperiences.length} expérience
            {AllExperiences.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {AllExperiences && AllExperiences.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-4">
          {AllExperiences.map((experience, index) => {
            const startDate = formatDate(experience.startDate);
            const endDate = experience.current
              ? "Présent"
              : formatDate(experience.endDate);
            const period =
              startDate && endDate ? `${startDate} - ${endDate}` : "";

            return (
              <AccordionItem
                key={experience.id}
                value={`experience-${experience.id}`}
                className="border rounded-lg bg-card shadow-sm hover:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-start gap-4 text-left">
                      <div className="p-2 bg-primary/10 rounded-lg mt-1">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-foreground">
                            {experience.title}
                          </h3>
                          {experience.current && (
                            <Badge className="text-xs bg-green-100 text-green-800 hover:bg-green-100">
                              En cours
                            </Badge>
                          )}
                        </div>
                        <p className="text-primary font-medium mb-1">
                          {experience.company}
                        </p>
                        {period && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{period}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6">
                  <div className="pl-14 space-y-4">
                    {experience.description && (
                      <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary/20">
                        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          Description du poste
                        </h4>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                          {experience.description}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="font-medium">Durée:</span>
                        <span>{period}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="font-medium">Entreprise:</span>
                        <span>{experience.company}</span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-lg border-2 border-dashed border-muted">
          <div className="p-4 bg-muted/30 rounded-full w-fit mx-auto mb-4">
            <Briefcase className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Aucune expérience
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Les expériences professionnelles seront affichées ici une fois
            ajoutées au profil.
          </p>
        </div>
      )}
    </div>
  );
};

export default Experiences;
