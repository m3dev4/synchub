interface FormFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const FormField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-purple-300 font-semibold">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 bg-white/20 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/20"
            : "border-purple-400/30 focus:border-purple-400 focus:ring-purple-400/20"
        }`}
        placeholder={placeholder}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};
