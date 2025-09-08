"use client";

import React, { useState } from "react";
import {
  useSkills,
  useUserSkills,
  useAddUserSkill,
  useRemoveUserSkill,
  useUserTechnologies,
  useAddUserTechnology,
  useRemoveUserTechnology,
} from "@/hooks/skills/useSkills";
import { SkillLevel } from "@/types/skills";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, X, Search } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel>(
    SkillLevel.BEGINNER,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: skillsData, isLoading: skillsLoading } = useSkills();
  const { data: userSkillsData, isLoading: userSkillsLoading } =
    useUserSkills();
  const { data: userTechnologiesData, isLoading: userTechnologiesLoading } =
    useUserTechnologies();
  const addSkillMutation = useAddUserSkill();
  const removeSkillMutation = useRemoveUserSkill();
  const addTechnologyMutation = useAddUserTechnology();
  const removeTechnologyMutation = useRemoveUserTechnology();

  const skills = skillsData?.data || [];
  const userSkills = userSkillsData?.data || [];
  const userTechnologies = userTechnologiesData?.data || [];

  // Get user skill IDs for filtering
  const userSkillIds = userSkills.map((us) => us.skillId);

  // Filter available skills
  const availableSkills = skills.filter((skill) => {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();

    // Search in skill title
    if (skill.title.toLowerCase().includes(searchLower)) return true;

    // Search in technologies
    return (
      skill.sousSkill?.some((sousSkill) =>
        sousSkill.Technology?.some((tech) =>
          tech.title.toLowerCase().includes(searchLower),
        ),
      ) || false
    );
  });

  const handleAddSkill = async (skillId: string) => {
    try {
      await addSkillMutation.mutateAsync({ skillId, level: selectedLevel });
      toast.success("Compétence ajoutée avec succès!");
      setIsDialogOpen(false);
      setSearchTerm("");
      setSelectedLevel(SkillLevel.BEGINNER);
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la compétence");
    }
  };

  const handleAddTechnology = async (technologyId: string, skillId: string) => {
    try {
      await addTechnologyMutation.mutateAsync({
        technologyId,
        level: selectedLevel,
      });
      toast.success("Technologie ajoutée avec succès!");
    } catch (error) {
      toast.error("Erreur lors de l'ajout de la technologie");
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    try {
      await removeSkillMutation.mutateAsync(skillId);
      toast.success("Compétence supprimée avec succès!");
    } catch (error) {
      toast.error("Erreur lors de la suppression de la compétence");
    }
  };

  const getLevelColor = (level: SkillLevel) => {
    switch (level) {
      case SkillLevel.BEGINNER:
        return "bg-gray-100 text-gray-800";
      case SkillLevel.INTERMEDIATE:
        return "bg-blue-100 text-blue-800";
      case SkillLevel.ADVANCED:
        return "bg-green-100 text-green-800";
      case SkillLevel.EXPERT:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getLevelLabel = (level: SkillLevel) => {
    switch (level) {
      case SkillLevel.BEGINNER:
        return "Débutant";
      case SkillLevel.INTERMEDIATE:
        return "Intermédiaire";
      case SkillLevel.ADVANCED:
        return "Avancé";
      case SkillLevel.EXPERT:
        return "Expert";
      default:
        return "Débutant";
    }
  };

  if (skillsLoading || userSkillsLoading || userTechnologiesLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Compétences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <CardTitle className="text-lg sm:text-xl">Mes Compétences</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Ajouter</span>
              <span className="sm:hidden">Ajouter une compétence</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] w-[95vw] sm:w-full">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">Ajouter une compétence</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Rechercher une compétence..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select
                  value={selectedLevel}
                  onValueChange={(value) =>
                    setSelectedLevel(value as SkillLevel)
                  }
                >
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SkillLevel.BEGINNER}>
                      Débutant
                    </SelectItem>
                    <SelectItem value={SkillLevel.INTERMEDIATE}>
                      Intermédiaire
                    </SelectItem>
                    <SelectItem value={SkillLevel.ADVANCED}>Avancé</SelectItem>
                    <SelectItem value={SkillLevel.EXPERT}>Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ScrollArea className="h-80 sm:h-96">
                <div className="space-y-4">
                  {availableSkills.map((skill) => (
                    <div key={skill.id} className="border rounded-lg p-3 sm:p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                        <h4 className="font-semibold text-base sm:text-lg">{skill.title}</h4>
                        <Badge variant="outline" className="self-start sm:self-center">
                          {skill.sousSkill?.length || 0} catégories
                        </Badge>
                      </div>

                      {skill.sousSkill?.map((sousSkill) => (
                        <div key={sousSkill.id} className="mb-4 last:mb-0">
                          <h5 className="font-medium text-sm text-gray-700 mb-2">
                            {sousSkill.title}
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {sousSkill.Technology?.map((tech) => (
                              <div
                                key={tech.id}
                                className="flex items-center justify-between p-2 border rounded hover:bg-gray-50"
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  {tech.icon &&
                                  (tech.icon.startsWith("http://") ||
                                    tech.icon.startsWith("https://")) ? (
                                    <Image
                                      src={tech.icon}
                                      alt={tech.title}
                                      width={20}
                                      height={20}
                                      className="object-contain flex-shrink-0"
                                    />
                                  ) : (
                                    <span className="text-base flex-shrink-0">{tech.icon}</span>
                                  )}
                                  <span className="text-sm font-medium truncate">
                                    {tech.title}
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleAddTechnology(
                                      tech.id,
                                      sousSkill.skillId,
                                    )
                                  }
                                  disabled={addSkillMutation.isPending}
                                  className="h-6 w-6 p-0 text-xs flex-shrink-0"
                                >
                                  +
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                  {availableSkills.length === 0 && searchTerm && (
                    <div className="text-center py-8 text-gray-500">
                      Aucune compétence trouvée pour{" "}
                      <strong>{searchTerm}</strong>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {userTechnologies.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm sm:text-base">Aucune technologie ajoutée pour le moment.</p>
            <p className="text-xs sm:text-sm mt-2">
              Cliquez sur <strong>Ajouter</strong> pour commencer.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Group technologies by skill */}
            {Object.entries(
              userTechnologies.reduce(
                (acc, userTech) => {
                  const skillTitle = userTech.technology.sousSkill.skill.title;
                  if (!acc[skillTitle]) acc[skillTitle] = [];
                  acc[skillTitle].push(userTech);
                  return acc;
                },
                {} as Record<string, typeof userTechnologies>,
              ),
            ).map(([skillTitle, techs]) => (
              <div key={skillTitle} className="border rounded-lg p-3 sm:p-4">
                <h4 className="font-semibold text-base sm:text-lg mb-3">{skillTitle}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {techs.map((userTech) => (
                    <div
                      key={userTech.id}
                      className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {userTech.technology.icon &&
                        (userTech.technology.icon.startsWith("http://") ||
                          userTech.technology.icon.startsWith("https://")) ? (
                          <Image
                            src={userTech.technology.icon}
                            alt={userTech.technology.title}
                            width={20}
                            height={20}
                            className="object-contain flex-shrink-0"
                          />
                        ) : (
                          <span className="text-base flex-shrink-0">
                            {userTech.technology.icon}
                          </span>
                        )}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                          <span className="font-medium text-sm truncate">
                            {userTech.technology.title}
                          </span>
                          <Badge
                            className={`text-xs ${getLevelColor(userTech.level)} self-start sm:self-center`}
                          >
                            {getLevelLabel(userTech.level)}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          removeTechnologyMutation.mutateAsync(
                            userTech.technologyId,
                          )
                        }
                        disabled={removeTechnologyMutation.isPending}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0 flex-shrink-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Skills;
