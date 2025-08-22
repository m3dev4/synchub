import Image from "next/image";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const OnboardingHeader = ({
  currentStep,
  totalSteps,
}: OnboardingHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 md:p-6">
      <div className="flex items-center gap-2 md:gap-3">
        <Image
          src="/images/shlogo.png"
          alt="logo syncHub"
          width={32}
          height={32}
          className="object-contain md:w-10 md:h-10"
        />
        <p className="text-white text-lg md:text-xl font-bold tracking-wide">
          SyncHub
        </p>
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-6 md:w-8 h-1 rounded-full transition-colors ${
              currentStep > index ? "bg-purple-400" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
