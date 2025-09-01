"use client";
import { useState } from "react";

interface SelectOption {
  id: string;
  name: string;
  flag?: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  searchable?: boolean;
}

export const SelectField = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
  searchable = false,
}: SelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : options;

  const selectedOption = options.find((option) => option.id === value);

  return (
    <div className="space-y-2 relative">
      <label className="block text-purple-300 font-semibold">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 bg-white/20 border rounded-xl text-white focus:outline-none focus:ring-2 transition-colors text-left flex items-center justify-between ${
            error
              ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20"
              : "border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20"
          }`}
        >
          <span className={selectedOption ? "text-white" : "text-gray-400"}>
            {selectedOption ? (
              <span className="flex items-center gap-2">
                {selectedOption.flag && (
                  <span className="text-lg">{selectedOption.flag}</span>
                )}
                {selectedOption.name}
              </span>
            ) : (
              placeholder || "Sélectionner..."
            )}
          </span>
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-slate-800 border border-purple-400/30 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            {searchable && (
              <div className="p-3 border-b border-purple-400/20">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  placeholder="Rechercher..."
                />
              </div>
            )}

            <div className="py-1">
              {filteredOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option.id);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-purple-500/20 text-white flex items-center gap-2"
                >
                  {option.flag && (
                    <span className="text-lg">{option.flag}</span>
                  )}
                  {option.name}
                </button>
              ))}

              {filteredOptions.length === 0 && (
                <div className="px-4 py-2 text-gray-400">
                  Aucun résultat trouvé
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};
