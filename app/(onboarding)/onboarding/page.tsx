"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { StepIndicator } from "@/components/onboarding/StepIndicator";
import { FormField } from "@/components/onboarding/FormField";
import { SelectField } from "@/components/onboarding/SelectField";
import { ExperienceForm } from "@/components/onboarding/ExperienceForm";
import { EducationForm } from "@/components/onboarding/EducationForm";
import { PhotoUpload } from "@/components/onboarding/PhotoUpload";
import SkillsSelection from "@/components/onboarding/SkillsSelection";
import { useOnboarding } from "@/hooks/onboarding/useOnboarding";
import {
  UserOnboarding,
  SelectedSkill,
  OnboardingExperience,
  OnboardingEducation,
} from "@/types/onboarding";
// import { countries } from '@/constants/nationality/countries'
import { onBoardingValidation } from "@/validations/onboarding/onBoardingValidation";
import { useAuthStore } from "@/stores/auth/authState";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

const page = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [canContinue, setCanContinue] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countries, setCountries] = useState<any[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated } = useAuthStore();
  const onboardingMutation = useOnboarding();
  const router = useRouter();

  // Fetch nationalities from API
  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const response = await fetch("/api/nationality/getAllNationalities");
        const data = await response.json();
        setCountries(data.nationalities || []);
      } catch (error) {
        console.error("Error fetching nationalities:", error);
        toast.error("Erreur lors du chargement des pays");
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchNationalities();
  }, []);

  // Form data
  const [formData, setFormData] = useState<UserOnboarding>({
    userId: user?.id || "",
    firstName: "",
    lastName: "",
    username: "",
    avatarPicture: "",
    nationalityId: "",
    description: "",
    dateBirth: new Date(),
    title: "",
    titleProfession: "",
    linkWebsite: "",
    experiences: [],
    educations: [],
    skills: [],
  });

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setCanContinue(isAtBottom);
    }
  };

  const updateFormData = (field: keyof UserOnboarding, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Personal info (firstname, lastname, username)
        if (!formData.firstName.trim())
          newErrors.firstName = "Le prénom est requis";
        if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
        if (!formData.username.trim())
          newErrors.username = "Le nom d'utilisateur est requis";
        break;
      case 2: // Nationality & birth date
        if (!formData.dateBirth)
          newErrors.dateBirth = "La date de naissance est requise";
        if (!formData.nationalityId)
          newErrors.nationalityId = "La nationalité est requise";
        break;
      case 3: // Photo upload (optional)
        // Optional, no validation needed
        break;
      case 4: // Professional info (optional)
        // Optional fields, no validation needed
        break;
      case 5: // Experiences (optional)
        // Optional, no validation needed
        break;
      case 6: // Education (optional)
        // Optional, no validation needed
        break;
      case 7: // Skills (optional)
        // Optional, no validation needed
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (currentStep === 0 && canContinue) {
      setCurrentStep(1);
    } else if (currentStep > 0 && currentStep < 7) {
      if (validateStep(currentStep)) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 7) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      // Prepare data for submission - skip complex validation for now
      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        avatarPicture: formData.avatarPicture || "",
        nationalityId: formData.nationalityId,
        description: formData.description || "",
        dateBirth: formData.dateBirth,
        title: formData.title || "",
        titleProfession: formData.titleProfession || "",
        linkWebsite: formData.linkWebsite || "",
        experiences: [],
        educations: [],
        skills: formData.skills || [],
      };

      console.log("Submitting data:", submissionData);
      await onboardingMutation.mutateAsync(submissionData);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error(`Erreur: ${error.message}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return {
          title: "Conditions d'utilisation",
          description:
            "Veuillez lire attentivement nos conditions d'utilisation avant de continuer.",
          image: "/onboarding/term&condition.png",
          indicatorTitle: "Sécurisé & Fiable",
          indicatorDesc:
            "Vos données sont protégées par un chiffrement de niveau entreprise",
        };
      case 1:
        return {
          title: "Informations personnelles",
          description: "Commençons par vos informations de base.",
          image: "/onboarding/informationPersonal.png",
          indicatorTitle: "Identité",
          indicatorDesc: "Prénom, nom et nom d'utilisateur",
        };
      case 2:
        return {
          title: "Nationalité et date de naissance",
          description:
            "Complétez votre profil avec votre nationalité et date de naissance.",
          image: "/onboarding/date&nationality.png",
          indicatorTitle: "Profil Personnel",
          indicatorDesc: "Votre nationalité et date de naissance",
        };
      case 3:
        return {
          title: "Photo de profil",
          description: "Ajoutez une photo pour personnaliser votre profil.",
          image: "/onboarding/cadre.png",
          indicatorTitle: "Photo de Profil",
          indicatorDesc: "Ajoutez votre photo (optionnel)",
        };
      case 4:
        return {
          title: "Informations professionnelles",
          description: "Partagez vos informations professionnelles.",
          image: "/onboarding/illust.png",
          indicatorTitle: "Profil Pro",
          indicatorDesc: "Titre, profession et description",
        };
      case 5:
        return {
          title: "Expériences professionnelles",
          description: "Ajoutez vos expériences pour enrichir votre profil.",
          image: "/onboarding/experience.png",
          indicatorTitle: "Expériences",
          indicatorDesc: "Votre parcours professionnel",
        };
      case 6:
        return {
          title: "Formation académique",
          description: "Complétez avec vos formations et diplômes.",
          image: "/onboarding/edu.png",
          indicatorTitle: "Formation",
          indicatorDesc: "Votre parcours académique",
        };
      case 7:
        return {
          title: "Compétences et technologies",
          description:
            "Sélectionnez vos compétences techniques pour finaliser votre profil.",
          image: "/onboarding/skiils.png",
          indicatorTitle: "Presque terminé !",
          indicatorDesc: "Dernière étape pour finaliser votre profil",
        };
      default:
        return {
          title: "",
          description: "",
          image: null,
          indicatorTitle: "",
          indicatorDesc: "",
        };
    }
  };

  const stepContent = getStepContent();

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 },
  };

  const titleVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const contentVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  };

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden">
      <OnboardingHeader currentStep={currentStep} totalSteps={7} />
      <Toaster />
      {/* Main Content */}
      <div className="flex h-[calc(100vh-100px)] px-6 pb-6 gap-8">
        {/* Left Side - Content */}
        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="mb-8"
              variants={titleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                {stepContent.title}
              </h1>
              <motion.p
                className="text-gray-300 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {stepContent.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step-0"
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <div className="text-white space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-purple-300">
                      1. Acceptation des conditions
                    </h2>
                    <p className="text-gray-200 leading-relaxed">
                      En utilisant SyncHub, vous acceptez d'être lié par ces
                      conditions d'utilisation. Si vous n'acceptez pas ces
                      conditions, veuillez ne pas utiliser notre service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-purple-300">
                      2. Description du service
                    </h2>
                    <p className="text-gray-200 leading-relaxed">
                      SyncHub est une plateforme de synchronisation et de
                      collaboration qui permet aux utilisateurs de partager et
                      de gérer leurs projets en temps réel. Notre service offre
                      des fonctionnalités de collaboration, de gestion de
                      fichiers et de communication.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-purple-300">
                      3. Compte utilisateur
                    </h2>
                    <p className="text-gray-200 leading-relaxed">
                      Pour utiliser certaines fonctionnalités de SyncHub, vous
                      devez créer un compte. Vous êtes responsable de maintenir
                      la confidentialité de vos informations de compte et de
                      toutes les activités qui se produisent sous votre compte.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-purple-300">
                      4. Utilisation acceptable
                    </h2>
                    <p className="text-gray-200 leading-relaxed">
                      Vous acceptez d'utiliser SyncHub uniquement à des fins
                      légales et de manière qui ne porte pas atteinte aux droits
                      d'autrui. Vous ne devez pas utiliser le service pour des
                      activités illégales, nuisibles ou offensantes.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-purple-300">
                      5. Propriété intellectuelle
                    </h2>
                    <p className="text-gray-200 leading-relaxed">
                      Tout le contenu et les matériaux disponibles sur SyncHub,
                      y compris mais sans s'y limiter, le texte, les graphiques,
                      le nom du site web, le code, les images et les logos sont
                      la propriété intellectuelle de SyncHub et sont protégés
                      par les lois applicables sur le droit d'auteur et les
                      marques de commerce.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-purple-300">
                      6. Confidentialité
                    </h2>
                    <p className="text-gray-200 leading-relaxed">
                      Votre vie privée est importante pour nous. Notre politique
                      de confidentialité explique comment nous collectons,
                      utilisons et protégeons vos informations lorsque vous
                      utilisez notre service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-purple-300">
                      7. Limitation de responsabilité
                    </h2>
                    <p className="text-gray-200 leading-relaxed">
                      SyncHub ne sera pas responsable des dommages directs,
                      indirects, accessoires, spéciaux, consécutifs ou punitifs
                      résultant de votre utilisation ou de votre incapacité à
                      utiliser le service.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-purple-300">
                      8. Modifications des conditions
                    </h2>
                    <p className="text-gray-200 leading-relaxed">
                      Nous nous réservons le droit de modifier ces conditions
                      d'utilisation à tout moment. Les modifications entreront
                      en vigueur immédiatement après leur publication sur cette
                      page.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-purple-300">
                      9. Résiliation
                    </h2>
                    <p className="text-gray-200 leading-relaxed">
                      Nous pouvons résilier ou suspendre votre compte et votre
                      accès au service immédiatement, sans préavis ni
                      responsabilité, pour quelque raison que ce soit, y compris
                      sans limitation si vous enfreignez les conditions.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-3 text-purple-300">
                      10. Contact
                    </h2>
                    <p className="text-gray-200 leading-relaxed">
                      Si vous avez des questions concernant ces conditions
                      d'utilisation, veuillez nous contacter à
                      support@synchub.com.
                    </p>
                  </section>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step-1"
                className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 overflow-y-auto"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Prénom"
                      value={formData.firstName}
                      onChange={(value) => updateFormData("firstName", value)}
                      placeholder="Votre prénom"
                      error={errors.firstName}
                      required
                    />

                    <FormField
                      label="Nom de famille"
                      value={formData.lastName}
                      onChange={(value) => updateFormData("lastName", value)}
                      placeholder="Votre nom de famille"
                      error={errors.lastName}
                      required
                    />
                  </div>

                  <FormField
                    label="Nom d'utilisateur"
                    value={formData.username}
                    onChange={(value) => updateFormData("username", value)}
                    placeholder="@votre_username"
                    error={errors.username}
                    required
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step-2"
                className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 overflow-y-auto"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-6 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      label="Date de naissance"
                      type="date"
                      value={
                        formData.dateBirth
                          ? formData.dateBirth.toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(value) =>
                        updateFormData("dateBirth", new Date(value))
                      }
                      error={errors.dateBirth}
                      required
                    />

                    <SelectField
                      label="Nationalité"
                      value={formData.nationalityId}
                      onChange={(value) =>
                        updateFormData("nationalityId", value)
                      }
                      options={
                        loadingCountries
                          ? []
                          : countries.map((country) => ({
                              id: country.id,
                              name: country.name,
                              flag: country.flag,
                            }))
                      }
                      placeholder={
                        loadingCountries
                          ? "Chargement des pays..."
                          : "Sélectionnez votre pays"
                      }
                      error={errors.nationalityId}
                      required
                      searchable
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step-3"
                className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 overflow-y-auto"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-6 max-w-2xl">
                  <PhotoUpload
                    value={formData.avatarPicture || ""}
                    onChange={(value) => updateFormData("avatarPicture", value)}
                    error={errors.avatarPicture}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step-4"
                className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 overflow-y-auto"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-6 max-w-2xl">
                  <FormField
                    label="Titre professionnel"
                    value={formData.title || ""}
                    onChange={(value) => updateFormData("title", value)}
                    placeholder="Ex: Développeur Full Stack"
                  />

                  <FormField
                    label="Profession"
                    value={formData.titleProfession || ""}
                    onChange={(value) =>
                      updateFormData("titleProfession", value)
                    }
                    placeholder="Ex: Ingénieur Logiciel"
                  />

                  <FormField
                    label="Site web"
                    type="url"
                    value={formData.linkWebsite || ""}
                    onChange={(value) => updateFormData("linkWebsite", value)}
                    placeholder="https://votre-site.com"
                  />

                  <div className="space-y-4">
                    <label className="block text-purple-300 font-semibold">
                      Description (optionnel)
                    </label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) =>
                        updateFormData("description", e.target.value)
                      }
                      className="w-full px-4 py-3 bg-white/20 border border-purple-400/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none"
                      placeholder="Parlez-nous de vous..."
                      rows={4}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div
                key="step-5"
                className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 overflow-y-auto"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <ExperienceForm
                  experiences={formData.experiences}
                  onChange={(experiences) =>
                    updateFormData("experiences", experiences)
                  }
                  errors={errors}
                />
              </motion.div>
            )}

            {currentStep === 6 && (
              <motion.div
                key="step-6"
                className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 overflow-y-auto"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <EducationForm
                  educations={formData.educations}
                  onChange={(educations) =>
                    updateFormData("educations", educations)
                  }
                  errors={errors}
                />
              </motion.div>
            )}

            {currentStep === 7 && (
              <motion.div
                key="step-7"
                className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-8 overflow-y-auto"
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                <SkillsSelection
                  selectedSkills={formData.skills || []}
                  onSkillsChange={(skills: SelectedSkill[]) =>
                    updateFormData("skills", skills)
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            className="mt-6 flex justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="px-6 py-3 text-purple-300 hover:text-white transition-colors"
              >
                Retour
              </button>
            )}

            <div className="flex-1"></div>

            <button
              onClick={handleContinue}
              disabled={
                currentStep === 0 ? !canContinue : onboardingMutation.isPending
              }
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                (currentStep === 0 && canContinue) || currentStep > 0
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/25"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {onboardingMutation.isPending
                ? "Chargement..."
                : currentStep === 7
                  ? "Terminer"
                  : "Continuer"}
            </button>
          </motion.div>
        </div>

        {/* Right Side - Visual */}
        <div className="flex-1 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ duration: 0.6 }}
            >
              <StepIndicator
                title={stepContent.indicatorTitle}
                description={stepContent.indicatorDesc}
                image={stepContent.image}
                isActive={true}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default page;
