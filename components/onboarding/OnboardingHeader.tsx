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
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center gap-3">
        <Image
          src="/images/shlogo.png"
          alt="logo syncHub"
          width={40}
          height={40}
          className="object-contain"
        />
        <p className="text-white text-xl font-bold tracking-wide">SyncHub</p>
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`w-8 h-1 rounded-full transition-colors ${
              currentStep > index ? "bg-purple-400" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
