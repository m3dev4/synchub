import Image from "next/image";

interface StepIndicatorProps {
  title: string;
  description: string;
  image: string | null;
  isActive?: boolean;
}

export const StepIndicator = ({
  title,
  description,
  image,
  isActive = false,
}: StepIndicatorProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center h-full">
      <div className="relative mb-8">
        <Image
          src={image || "/images/manIllust.jpg"}
          alt={title}
          width={400}
          height={400}
          className="object-contain rounded-2xl shadow-2xl"
        />

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-400/30 rounded-full"></div>
        <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-blue-400/20 rounded-full"></div>
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300 text-lg max-w-md">{description}</p>
      </div>
    </div>
  );
};
