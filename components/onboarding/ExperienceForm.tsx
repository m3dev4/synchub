"use client";
import { useState } from "react";
import { FormField } from "./FormField";
import { OnboardingExperience } from "@/types/onboarding";

interface ExperienceFormProps {
  experiences: OnboardingExperience[];
  onChange: (experiences: OnboardingExperience[]) => void;
  errors?: Record<string, string>;
}

export const ExperienceForm = ({
  experiences,
  onChange,
  errors,
}: ExperienceFormProps) => {
  const addExperience = () => {
    const newExperience: OnboardingExperience = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    };
    onChange([...experiences, newExperience]);
  };

  const updateExperience = (
    index: number,
    field: keyof OnboardingExperience,
    value: any,
  ) => {
    const updated = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp,
    );
    onChange(updated);
  };

  const removeExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Expériences professionnelles
        </h3>
        <button
          type="button"
          onClick={addExperience}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          + Ajouter
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>Aucune expérience ajoutée</p>
          <p className="text-sm">Cliquez sur "Ajouter" pour commencer</p>
        </div>
      )}

      {experiences.map((experience, index) => (
        <div
          key={experience.id}
          className="bg-white/5 rounded-xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-purple-300 font-medium">
              Expérience {index + 1}
            </h4>
            <button
              type="button"
              onClick={() => removeExperience(index)}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Titre du poste"
              value={experience.title}
              onChange={(value) => updateExperience(index, "title", value)}
              placeholder="Ex: Développeur Full Stack"
              required
            />

            <FormField
              label="Entreprise"
              value={experience.company}
              onChange={(value) => updateExperience(index, "company", value)}
              placeholder="Ex: Google"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Date de début"
              type="date"
              value={
                experience.startDate
                  ? experience.startDate.toISOString().split("T")[0]
                  : ""
              }
              onChange={(value) =>
                updateExperience(
                  index,
                  "startDate",
                  value ? new Date(value) : undefined,
                )
              }
            />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${experience.id}`}
                  checked={experience.current}
                  onChange={(e) =>
                    updateExperience(index, "current", e.target.checked)
                  }
                  className="w-4 h-4 text-purple-600 bg-white/20 border-purple-400/30 rounded focus:ring-purple-500"
                />
                <label
                  htmlFor={`current-${experience.id}`}
                  className="text-purple-300 font-semibold"
                >
                  Poste actuel
                </label>
              </div>

              {!experience.current && (
                <FormField
                  label="Date de fin"
                  type="date"
                  value={
                    experience.endDate
                      ? experience.endDate.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(value) =>
                    updateExperience(
                      index,
                      "endDate",
                      value ? new Date(value) : undefined,
                    )
                  }
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
