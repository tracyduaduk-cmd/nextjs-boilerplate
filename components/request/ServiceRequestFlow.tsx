"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
import { SpatialInstrument } from "@/components/spatial/SpatialInstrument";
import { RequestProgress } from "./RequestProgress";
import { StepModeSelect } from "./StepModeSelect";
import { ProblemStep } from "./ProblemStep";
import { ServiceStep } from "./ServiceStep";
import { ContextQuestionsStep } from "./ContextQuestionsStep";
import { DetailsStep } from "./DetailsStep";
import { TimelineStep } from "./TimelineStep";
import { ContactStep } from "./ContactStep";
import { ReviewStep } from "./ReviewStep";
import { SuccessState } from "./SuccessState";

import {
  EntryMode,
  ServiceRequestData,
  ServiceRequestRecord,
  TimelineOption,
  BudgetOption,
  DiagnosticResult,
  ContactInformation,
} from "@/lib/requests/types";
import { ServiceRecord, CapabilityFamilyId } from "@/lib/services/types";
import { fetchServices, FALLBACK_SERVICES } from "@/lib/services/fetchServices";
import { submitServiceRequest } from "@/lib/requests/queries";
import { motionTokens } from "@/motion/tokens";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface ServiceRequestFlowProps {
  initialServiceSlug?: string;
  initialMode?: EntryMode;
  initialProblemText?: string;
  onClose?: () => void;
  className?: string;
}

const STEP_LABELS = [
  "Mode",
  "Service",
  "Questions",
  "Scope",
  "Timeline",
  "Contact",
  "Review",
];

export const ServiceRequestFlow: React.FC<ServiceRequestFlowProps> = ({
  initialServiceSlug,
  initialMode,
  initialProblemText,
  onClose,
  className = "",
}) => {
  const [services, setServices] = useState<ServiceRecord[]>(FALLBACK_SERVICES);
  const [step, setStep] = useState<number>(initialMode || initialServiceSlug ? 2 : 1);
  const [direction, setDirection] = useState<number>(1);

  const [entryMode, setEntryMode] = useState<EntryMode>(initialMode || "direct");
  const [selectedFamilyId, setSelectedFamilyId] = useState<CapabilityFamilyId>("WEB");
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>(
    initialServiceSlug || "web-development"
  );
  const [problemDescription, setProblemDescription] = useState<string>(
    initialProblemText || ""
  );
  const [diagnosticNote, setDiagnosticNote] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [timeline, setTimeline] = useState<TimelineOption>("within_month");
  const [urgency] = useState<string>("normal");
  const [budgetRange, setBudgetRange] = useState<BudgetOption>("not_sure");
  const [contact, setContact] = useState<ContactInformation>({
    name: "",
    email: "",
    phone: "",
    company: "",
    preferredContact: "email",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submissionRecord, setSubmissionRecord] = useState<ServiceRequestRecord | null>(null);

  // Load active services catalog
  useEffect(() => {
    async function loadData() {
      const data = await fetchServices();
      if (data && data.length > 0) {
        setServices(data);
      }
    }
    loadData();
  }, []);

  const activeService = services.find((s) => s.slug === selectedServiceSlug) || services[0];

  const handleSelectServiceSlug = (slug: string) => {
    setSelectedServiceSlug(slug);
    const matching = services.find((s) => s.slug === slug);
    if (matching) {
      setSelectedFamilyId(matching.capability_family as CapabilityFamilyId);
    }
  };

  // Handle Mode Selection in STEP 1
  const handleSelectMode = (mode: EntryMode) => {
    setEntryMode(mode);
    setDirection(1);
    setStep(2);
  };

  // Handle Problem Text Change in Diagnostic Mode (STEP 2)
  const handleProblemChange = (text: string, classification: DiagnosticResult) => {
    setProblemDescription(text);
    setDiagnosticNote(classification.explanation);
    if (classification.recommendedServiceSlug) {
      handleSelectServiceSlug(classification.recommendedServiceSlug);
    }
    if (classification.detectedFamilyId) {
      setSelectedFamilyId(classification.detectedFamilyId);
    }
  };

  // Handle Answer Changes in STEP 3
  const handleAnswerChange = (qId: string, val: unknown) => {
    setAnswers((prev) => ({
      ...prev,
      [qId]: val,
    }));
  };

  // Step Validation Check before proceeding
  const isCurrentStepValid = (): boolean => {
    setErrorMessage(null);
    if (step === 1) return true;

    if (step === 2) {
      if (entryMode === "diagnostic") {
        if (!problemDescription || problemDescription.trim().length < 10) {
          setErrorMessage("Please describe your technical problem or request in at least 10 characters.");
          return false;
        }
      } else {
        if (!selectedServiceSlug) {
          setErrorMessage("Please select a service capability.");
          return false;
        }
      }
    }

    if (step === 6) {
      if (!contact.name || contact.name.trim().length < 2) {
        setErrorMessage("Please enter a valid contact name.");
        return false;
      }
      if (!contact.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
        setErrorMessage("Please enter a valid email address.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!isCurrentStepValid()) return;
    setDirection(1);
    setStep((prev) => Math.min(7, prev + 1));
  };

  const handleBack = () => {
    setErrorMessage(null);
    setDirection(-1);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleJumpToStep = (targetStep: number) => {
    setDirection(targetStep < step ? -1 : 1);
    setStep(targetStep);
  };

  // Handle Final Submission in STEP 7
  const handleSubmitRequest = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload: ServiceRequestData = {
      entryMode,
      selectedFamilyId,
      selectedServiceSlug,
      selectedServiceId: activeService?.id,
      problemDescription,
      diagnosticNote,
      answers,
      timeline,
      urgency,
      budgetRange,
      contact,
    };

    const res = await submitServiceRequest(payload);
    setIsSubmitting(false);

    if (res.success && res.record) {
      setSubmissionRecord(res.record);
      setStep(8);
    } else {
      setErrorMessage(res.error || "Failed to submit request. Please try again.");
    }
  };

  // Reset Form
  const handleReset = () => {
    setStep(1);
    setSubmissionRecord(null);
    setProblemDescription("");
    setAnswers({});
    setErrorMessage(null);
  };

  // Spatial Animation Variants
  const spatialVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 40 : -40,
      scale: 0.96,
      z: -50,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      z: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
      scale: 0.96,
      z: -50,
    }),
  };

  return (
    <section
      id="service-request-flow"
      className={`relative w-full min-h-[600px] py-12 sm:py-20 bg-slate-950 text-slate-100 ${className}`}
    >
      {/* Embedded Request Spatial Instrument */}
      <div className="absolute top-8 right-6 sm:right-12 w-[220px] h-[220px] opacity-60 hidden sm:block pointer-events-auto z-0">
        <SpatialInstrument mode="request" badgeLabel="[ SYSTEM SIGNAL READY ]" scale={0.85} />
      </div>

      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(56,189,248,0.06),transparent)] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-sky-300 tracking-wider uppercase">
              SNOW TECHNICAL INTAKE
            </span>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              aria-label="Close intake form"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {step <= 7 && (
          <div className="mb-10">
            <RequestProgress
              currentStep={step}
              totalSteps={7}
              stepLabels={STEP_LABELS}
            />
          </div>
        )}

        <PerspectiveContainer perspective={1200} className="w-full min-h-[420px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={spatialVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: motionTokens.duration.normal,
                ease: motionTokens.ease.outExponential,
              }}
              className="w-full bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl"
            >
              {step === 1 && (
                <StepModeSelect
                  selectedMode={entryMode}
                  onSelectMode={handleSelectMode}
                />
              )}

              {step === 2 && (
                <>
                  {entryMode === "diagnostic" ? (
                    <ProblemStep
                      value={problemDescription}
                      onChange={handleProblemChange}
                      onContinue={handleNext}
                    />
                  ) : (
                    <ServiceStep
                      services={services}
                      selectedFamilyId={selectedFamilyId}
                      selectedServiceSlug={selectedServiceSlug}
                      onSelectFamily={setSelectedFamilyId}
                      onSelectService={(s) => handleSelectServiceSlug(s.slug)}
                    />
                  )}
                </>
              )}

              {step === 3 && (
                <ContextQuestionsStep
                  serviceSlug={selectedServiceSlug}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                />
              )}

              {step === 4 && (
                <DetailsStep
                  problemDescription={problemDescription}
                  onDescriptionChange={setProblemDescription}
                />
              )}

              {step === 5 && (
                <TimelineStep
                  timeline={timeline}
                  onTimelineChange={setTimeline}
                  budgetRange={budgetRange}
                  onBudgetChange={setBudgetRange}
                />
              )}

              {step === 6 && (
                <ContactStep
                  contact={contact}
                  onChange={setContact}
                  isSecurityRequest={selectedFamilyId === "SECURITY & RECOVERY"}
                />
              )}

              {step === 7 && (
                <ReviewStep
                  data={{
                    entryMode,
                    selectedFamilyId,
                    selectedServiceSlug,
                    selectedServiceId: activeService?.id,
                    problemDescription,
                    diagnosticNote,
                    answers,
                    timeline,
                    urgency,
                    budgetRange,
                    contact,
                  }}
                  serviceName={activeService ? activeService.name : "Custom Service"}
                  onJumpToStep={handleJumpToStep}
                  onSubmit={handleSubmitRequest}
                  isSubmitting={isSubmitting}
                  errorMessage={errorMessage}
                />
              )}

              {step === 8 && submissionRecord && (
                <SuccessState record={submissionRecord} onReset={handleReset} />
              )}
            </motion.div>
          </AnimatePresence>
        </PerspectiveContainer>

        {errorMessage && step !== 7 && (
          <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-sans">
            {errorMessage}
          </div>
        )}

        {step <= 6 && (
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs flex items-center gap-2 border border-slate-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold font-mono text-xs flex items-center gap-2 shadow-lg shadow-sky-950/50 transition-all"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
};
