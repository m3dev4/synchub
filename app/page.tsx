"use client";
import { ModeToggle } from "@/components/darkMode";
import { InteractiveRobotSpline } from "@/components/interactive-3d-robot";
import RotatingText from "@/components/RotatingText";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const page = () => {
  const ROBOT_SCENE_URL =
    "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";
  return (
    <div className="min-h-screen relative w-screen overflow-hidden">
      <div className="flex items-center mt-4 justify-between z-50">
        <div className="flex items-center px-4 gap-2">
          <Image
            src="/images/shlogo.png"
            alt="logo syncHub"
            width={50}
            height={50}
            className="object-contain"
          />
          <p className="uppercase text-xl font-bold">SyncHub</p>
        </div>
        <nav className="flex items-center gap-4 pr-10">
          <Button
            variant="outline"
            className="font-bold"
            onClick={() => (window.location.href = "/sign-in")}
          >
            Sign In
          </Button>
          <ModeToggle />
        </nav>
      </div>
      <InteractiveRobotSpline
        scene={ROBOT_SCENE_URL}
        className="absolute inset-0 -z-10"
      />
      <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
        <h2 className="text-3xl font-bold">
          Connecter, Collaborer, Créer avec les{" "}
        </h2>
        <RotatingText
          texts={[
            "développeurs passionnés",
            "designers créatifs",
            "protecteurs du numérique",
            "à travers le monde!",
          ]}
          mainClassName="px-2 sm:px-2 md:px-3 
bg-stone-800 text-xl font-bold text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
          staggerFrom={"first"}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          staggerDuration={0.02}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 200,
            duration: 0.6,
          }}
          rotationInterval={3000}
          animatePresenceMode="wait"
        />
      </div>
    </div>
  );
};

export default page;
