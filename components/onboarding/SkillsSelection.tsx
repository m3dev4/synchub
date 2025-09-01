"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  Code,
  Shield,
  Palette,
  Cloud,
  Briefcase,
  BarChart3,
  X,
  Plus,
} from "lucide-react";
// import { skills } from "@/constants/skill/skills";

interface Technology {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SousSkill {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  technologies: Technology[];
}

interface Skill {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  sousSkills: SousSkill[];
}

interface SelectedSkill {
  skillId: string;
  skillTitle: string;
  sousSkillId: string;
  sousSkillTitle: string;
  technologyId: string;
  technologyTitle: string;
  level?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
}

interface SkillsSelectionProps {
  selectedSkills: SelectedSkill[];
  onSkillsChange: (skills: SelectedSkill[]) => void;
}

const skillIcons: Record<string, React.ReactNode> = {
  "1": <Code className="w-6 h-6" />, // Software Engineering
  "2": <Shield className="w-6 h-6" />, // Cybersecurity
  "3": <Palette className="w-6 h-6" />, // UI/UX Design
  "4": <Cloud className="w-6 h-6" />, // Cloud & Infrastructure
  "5": <Briefcase className="w-6 h-6" />, // Business & Project Management
  "6": <BarChart3 className="w-6 h-6" />, // Data & Analytics
};

const SkillsSelection: React.FC<SkillsSelectionProps> = ({
  selectedSkills,
  onSkillsChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null,
  );
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);

  // Fetch skills from API
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills/getAllSkills");
        const data = await response.json();
        setSkills(data.skills || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoadingSkills(false);
      }
    };

    fetchSkills();
  }, []);

  const isSkillSelected = (
    skillId: string,
    sousSkillId: string,
    technologyId: string,
  ) => {
    return selectedSkills.some(
      (skill) =>
        skill.skillId === skillId &&
        skill.sousSkillId === sousSkillId &&
        skill.technologyId === technologyId,
    );
  };

  const toggleTechnologySelection = (
    skill: Skill,
    sousSkill: SousSkill,
    technology: Technology,
  ) => {
    const isSelected = isSkillSelected(skill.id, sousSkill.id, technology.id);

    if (isSelected) {
      const updatedSkills = selectedSkills.filter(
        (s) =>
          !(
            s.skillId === skill.id &&
            s.sousSkillId === sousSkill.id &&
            s.technologyId === technology.id
          ),
      );
      onSkillsChange(updatedSkills);
    } else {
      const newSkill: SelectedSkill = {
        skillId: skill.id,
        skillTitle: skill.title,
        sousSkillId: sousSkill.id,
        sousSkillTitle: sousSkill.title,
        technologyId: technology.id,
        technologyTitle: technology.title,
      };
      onSkillsChange([...selectedSkills, newSkill]);
    }
  };

  const filteredTechnologies = () => {
    if (!selectedCategory || !selectedSubcategory || !skills.length) return [];

    const category = skills.find((s: Skill) => s.id === selectedCategory);
    if (!category || !category.sousSkills) return [];

    const subcategory = category.sousSkills.find(
      (ss: SousSkill) => ss.id === selectedSubcategory,
    );
    if (!subcategory || !subcategory.technologies) return [];

    return subcategory.technologies.filter((tech) =>
      tech.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const getSelectedCount = () => selectedSkills.length;

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header with animated counter */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h3 className="text-2xl font-bold text-white">
            Sélectionnez vos compétences
          </h3>
        </div>
        <p className="text-purple-200 mb-4">
          Choisissez les technologies que vous maîtrisez pour créer votre profil
          unique
        </p>

        {/* Animated counter */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-purple-400/30"
          animate={{ scale: selectedSkills.length > 0 ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-2 h-2 bg-purple-400 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <span className="text-purple-200 font-medium">
            {getSelectedCount()} compétence{getSelectedCount() !== 1 ? "s" : ""}{" "}
            sélectionnée{getSelectedCount() !== 1 ? "s" : ""}
          </span>
        </motion.div>
      </motion.div>

      {/* Step 1: Category Selection */}
      <AnimatePresence mode="wait">
        {!selectedCategory && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h4
              className="text-lg font-semibold text-purple-200 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Choisissez votre domaine principal
            </motion.h4>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, staggerChildren: 0.1 }}
            >
              {loadingSkills ? (
                <div className="col-span-full text-center text-purple-300">
                  Chargement des compétences...
                </div>
              ) : (
                skills?.map((skill: Skill, index: number) => (
                  <motion.button
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(skill.id)}
                    className="group relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:bg-white/10"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                        {skillIcons[skill.id] || <Code className="w-6 h-6" />}
                      </div>
                      <span className="text-white font-medium text-center text-sm leading-tight">
                        {skill.title}
                      </span>
                    </div>

                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                )) || []
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: Subcategory Selection */}
      {selectedCategory && !selectedSubcategory && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-purple-200">
              Sélectionnez une spécialisation
            </h4>
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
              Retour
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills
              .find((s: Skill) => s.id === selectedCategory)
              ?.sousSkills?.map((sousSkill: SousSkill) => (
                <button
                  key={sousSkill.id}
                  onClick={() => setSelectedSubcategory(sousSkill.id)}
                  className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:bg-white/10 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">
                      {sousSkill.title}
                    </span>
                    <div className="text-purple-300 text-sm">
                      {sousSkill.technologies?.length || 0} technologies
                    </div>
                  </div>
                </button>
              )) || []}
          </div>
        </div>
      )}

      {/* Step 3: Technology Selection */}
      {selectedCategory && selectedSubcategory && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-purple-200">
              Sélectionnez vos technologies
            </h4>
            <button
              onClick={() => setSelectedSubcategory(null)}
              className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
              Retour
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
            <input
              type="text"
              placeholder="Rechercher une technologie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-purple-400/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
            />
          </div>

          {/* Technologies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredTechnologies().map((technology: Technology) => {
              const skill = skills.find(
                (s: Skill) => s.id === selectedCategory,
              );
              const sousSkill = skill?.sousSkills.find(
                (ss: SousSkill) => ss.id === selectedSubcategory,
              )!;
              const isSelected = isSkillSelected(
                skill.id,
                sousSkill.id,
                technology.id,
              );

              return (
                <button
                  key={technology.id}
                  onClick={() =>
                    toggleTechnologySelection(skill, sousSkill, technology)
                  }
                  className={`
                    relative p-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105
                    ${
                      isSelected
                        ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                        : "bg-white/5 backdrop-blur-sm border border-white/10 text-purple-100 hover:bg-white/10 hover:border-purple-400/50"
                    }
                  `}
                >
                  <span className="relative z-10">{technology.title}</span>

                  {isSelected && (
                    <div className="absolute top-1 right-1 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                      <Plus className="w-3 h-3 rotate-45" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setSearchTerm("");
              }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
            >
              Choisir autre domaine
            </button>
          </div>
        </div>
      )}

      {/* Selected Skills Summary */}
      {selectedSkills.length > 0 && (
        <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-400/30">
          <h4 className="font-semibold text-purple-200 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Vos compétences sélectionnées ({getSelectedCount()})
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill, index) => (
              <span
                key={index}
                className="group inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full text-purple-100 text-sm"
              >
                {skill.technologyTitle}
                <button
                  onClick={() => {
                    const updatedSkills = selectedSkills.filter(
                      (_, i) => i !== index,
                    );
                    onSkillsChange(updatedSkills);
                  }}
                  className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SkillsSelection;
