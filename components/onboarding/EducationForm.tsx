"use client";
import { useState } from "react";
import { FormField } from "./FormField";
import { Education } from "@/types/educations";

interface EducationFormProps {
  educations: Education[];
  onChange: (educations: Education[]) => void;
  errors?: Record<string, string>;
}

export const EducationForm = ({
  educations,
  onChange,
  errors,
}: EducationFormProps) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      title: "",
      school: "",
      startDate: undefined,
      endDate: undefined,
      current: false,
      userId: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    onChange([...educations, newEducation]);
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: any,
  ) => {
    const updated = educations.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu,
    );
    onChange(updated);
  };

  const removeEducation = (index: number) => {
    onChange(educations.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Formation académique
        </h3>
        <button
          type="button"
          onClick={addEducation}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          + Ajouter
        </button>
      </div>

      {educations.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>Aucune formation ajoutée</p>
          <p className="text-sm">Cliquez sur "Ajouter" pour commencer</p>
        </div>
      )}

      {educations.map((education, index) => (
        <div key={education.id} className="bg-white/5 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-purple-300 font-medium">
              Formation {index + 1}
            </h4>
            <button
              type="button"
              onClick={() => removeEducation(index)}
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
              label="Diplôme/Formation"
              value={education.title}
              onChange={(value) => updateEducation(index, "title", value)}
              placeholder="Ex: Master en Informatique"
              required
            />

            <FormField
              label="École/Université"
              value={education.school}
              onChange={(value) => updateEducation(index, "school", value)}
              placeholder="Ex: Université de Paris"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Date de début"
              type="date"
              value={
                education.startDate
                  ? education.startDate.toISOString().split("T")[0]
                  : ""
              }
              onChange={(value) =>
                updateEducation(
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
                  id={`current-${education.id}`}
                  checked={education.current}
                  onChange={(e) =>
                    updateEducation(index, "current", e.target.checked)
                  }
                  className="w-4 h-4 text-purple-600 bg-white/20 border-purple-400/30 rounded focus:ring-purple-500"
                />
                <label
                  htmlFor={`current-${education.id}`}
                  className="text-purple-300 font-semibold"
                >
                  Formation en cours
                </label>
              </div>

              {!education.current && (
                <FormField
                  label="Date de fin"
                  type="date"
                  value={
                    education.endDate
                      ? education.endDate.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(value) =>
                    updateEducation(
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
