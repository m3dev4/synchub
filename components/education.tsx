import { useEducation } from "@/hooks/education/useEducation";
import { Education } from "@/types/educations";
import { Badge, GraduationCap, School, Calendar, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Educations = () => {
  const [AllEducations, setAllEducations] = useState<Education[]>([]);

  const { educations, isLoading, error } = useEducation();

  useEffect(() => {
    if (educations) {
      setAllEducations(educations);
    }
  }, [educations]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-lg font-semibold">Chargement des formations...</p>
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
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Formation & Éducation
          </h2>
          <p className="text-muted-foreground">
            {AllEducations.length} formation
            {AllEducations.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {AllEducations && AllEducations.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-4">
          {AllEducations.map((education, index) => {
            const startDate = formatDate(education.startDate);
            const endDate = education.current
              ? "En cours"
              : formatDate(education.endDate);
            const period =
              startDate && endDate ? `${startDate} - ${endDate}` : "";

            return (
              <AccordionItem
                key={education.id}
                value={`education-${education.id}`}
                className="border rounded-lg bg-card shadow-sm hover:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-start gap-4 text-left">
                      <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mt-1">
                        <School className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-lg font-semibold text-foreground">
                            {education.title}
                          </h3>
                          {education.current && (
                            <Badge className="text-xs bg-blue-100 text-blue-800 hover:bg-blue-100">
                              En cours
                            </Badge>
                          )}
                        </div>
                        <p className="text-green-600 dark:text-green-400 font-medium mb-1">
                          {education.school}
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
                    <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border-l-4 border-green-200 dark:border-green-800">
                      <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        Détails de la formation
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        Formation en{" "}
                        <span className="font-medium text-foreground">
                          {education.title}
                        </span>{" "}
                        dispensée par{" "}
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {education.school}
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="font-medium">Période:</span>
                        <span>{period}</span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <School className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="font-medium">Établissement:</span>
                        <span>{education.school}</span>
                      </div>
                    </div>

                    {education.current && (
                      <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">
                            Formation actuellement en cours
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      ) : (
        <div className="text-center py-12 bg-green-50/50 dark:bg-green-950/10 rounded-lg border-2 border-dashed border-green-200 dark:border-green-800">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full w-fit mx-auto mb-4">
            <GraduationCap className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-foreground">
            Aucune formation
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Les formations et diplômes seront affichés ici une fois ajoutés au
            profil.
          </p>
        </div>
      )}
    </div>
  );
};

export default Educations;
