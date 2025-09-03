"use client";

import React, { useState } from "react";
import {
  useSkills,
  useUserSkills,
  useAddUserSkill,
  useRemoveUserSkill,
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

const Skills = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel>(
    SkillLevel.BEGINNER,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: skillsData, isLoading: skillsLoading } = useSkills();
  const { data: userSkillsData, isLoading: userSkillsLoading } =
    useUserSkills();
  const addSkillMutation = useAddUserSkill();
  const removeSkillMutation = useRemoveUserSkill();

  const skills = skillsData?.data || [];
  const userSkills = userSkillsData?.data || [];

  // Get user skill IDs for filtering
  const userSkillIds = userSkills.map((us) => us.skillId);

  // Filter available skills (not already added by user)
  const availableSkills = skills.filter(
    (skill) =>
      !userSkillIds.includes(skill.id) &&
      skill.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

  if (skillsLoading || userSkillsLoading) {
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mes Compétences</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter une compétence</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-4">
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
                  <SelectTrigger className="w-40">
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

              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {availableSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div>
                        <h4 className="font-medium">{skill.title}</h4>
                        <p className="text-sm text-gray-500">
                          {skill.sousSkill?.length || 0} sous-compétences
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddSkill(skill.id)}
                        disabled={addSkillMutation.isPending}
                      >
                        Ajouter
                      </Button>
                    </div>
                  ))}
                  {availableSkills.length === 0 && searchTerm && (
                    <div className="text-center py-8 text-gray-500">
                      Aucune compétence trouvée pour "{searchTerm}"
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {userSkills.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Aucune compétence ajoutée pour le moment.</p>
            <p className="text-sm mt-2">
              Cliquez sur "Ajouter" pour commencer.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {userSkills.map((userSkill) => (
              <div
                key={userSkill.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{userSkill.skill.title}</h4>
                    <Badge className={getLevelColor(userSkill.level)}>
                      {getLevelLabel(userSkill.level)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {userSkill.skill.sousSkill?.length || 0} sous-compétences
                    disponibles
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveSkill(userSkill.skillId)}
                  disabled={removeSkillMutation.isPending}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Skills;
