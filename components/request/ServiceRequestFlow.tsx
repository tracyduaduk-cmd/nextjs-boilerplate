"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { PerspectiveContainer } from "@/components/spatial/PerspectiveContainer";
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
import { ArrowLeft, ArrowRight, Shield, X } from "lucide-react";

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
  const [direction, setDirection] = useState<number>(1); // 1 = next, -1 = back

  const [entryMode, setEntryMode] = useState<EntryMode>(initialMode || "direct");
  const [selectedFamilyId, setSelectedFamilyId] = useState<CapabilityFamilyId>("WEB");
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>(
    initialServiceSlug || "web-development"
  );
  const [problemDescription, setProblemDescription] = useState<string>(
    initialProblemText || ""
  );
  const [diagnosticNote, setDiagnosticNote] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeline, setTimeline] = useState<TimelineOption>("within_month");
  const [urgency, setUrgency] = useState<string>("normal");
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

  // Update selected family if service changes
  useEffect(() => {
    const matching = services.find((s) => s.slug === selectedServiceSlug);
    if (matching) {
      setSelectedFamilyId(matching.capability_family as CapabilityFamilyId);
    }
  }, [selectedServiceSlug, services]);

  const activeService = services.find((s) => s.slug === selectedServiceSlug) || services[0];

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
      setSelectedServiceSlug(classification.recommendedServiceSlug);
    }
    if (classification.detectedFamilyId) {
      setSelectedFamilyId(classification.detectedFamilyId);
    }
  };

  // Handle Answer Changes in STEP 3
  const handleAnswerChange = (qId: string, val: any) => {
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
      setStep(8); // Success state
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
      {/* Background Lighting */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(56,189,248,0.06),transparent)] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 max-w-4xl mx-auto">
        {/* Top Header Controls */}
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

        {/* Spatial Progress Indicator (hidden on step 8 success) */}
        {step <= 7 && (
          <div className="mb-10">
            <RequestProgress
              currentStep={step}
              totalSteps={7}
              stepLabels={STEP_LABELS}
            />
          </div>
        )}

        {/* Spatial 3D Step Stage */}
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
              {/* STEP 1: Entry Mode Select */}
              {step === 1 && (
                <StepModeSelect
                  selectedMode={entryMode}
                  onSelectMode={handleSelectMode}
                />
              )}

              {/* STEP 2: Service Select OR Free-Text Diagnostic */}
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
                      onSelectService={(s) => setSelectedServiceSlug(s.slug)}
                    />
                  )}
                </>
              )}

              {/* STEP 3: Context-Aware Questions */}
              {step === 3 && (
                <ContextQuestionsStep
                  serviceSlug={selectedServiceSlug}
                  answers={answers}
                  onAnswerChange={handleAnswerChange}
                />
              )}

              {/* STEP 4: Scope & Details */}
              {step === 4 && (
                <DetailsStep
                  problemDescription={problemDescription}
                  onDescriptionChange={setProblemDescription}
                />
              )}

              {/* STEP 5: Timeline & Budget */}
              {step === 5 && (
                <TimelineStep
                  timeline={timeline}
                  onTimelineChange={setTimeline}
                  budgetRange={budgetRange}
                  onBudgetChange={setBudgetRange}
                />
              )}

              {/* STEP 6: Contact Information */}
              {step === 6 && (
                <ContactStep
                  contact={contact}
                  onChange={setContact}
                  isSecurityRequest={selectedFamilyId === "SECURITY & RECOVERY"}
                />
              )}

              {/* STEP 7: Review & Summary */}
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

              {/* STEP 8: Success State */}
              {step === 8 && submissionRecord && (
                <SuccessState record={submissionRecord} onReset={handleReset} />
              )}
            </motion.div>
          </AnimatePresence>
        </PerspectiveContainer>

        {/* Error Notice */}
        {errorMessage && step !== 7 && (
          <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-sans">
            {errorMessage}
          </div>
        )}

        {/* Bottom Navigation Toolbar (For Steps 1 through 6) */}
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
