import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Check, 
  Clock, 
  Info, 
  FileText, 
  ClipboardList, 
  Droplet, 
  FlaskConical, 
  Dna, 
  Gift,
  Folder,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const CollectionProgress = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [showAssetsModal, setShowAssetsModal] = useState(false);

  const studyData = {
    name: "Gut Microbiome & Mental Health",
    participantId: "P-4521",
    currentStep: 3,
    totalSteps: 7,
    blocked: 0,
    pending: 1,
    assets: 1,
  };

  const steps = [
    {
      id: 1,
      title: "Welcome",
      description: "Study introduction and overview",
      status: "Completed",
      icon: Info,
      iconColor: "bg-primary/20 text-primary",
      hasAsset: false,
    },
    {
      id: 2,
      title: "Informed Consent",
      description: "Review and sign consent form",
      status: "Completed",
      icon: FileText,
      iconColor: "bg-primary/20 text-primary",
      hasAsset: false,
    },
    {
      id: 3,
      title: "Health History",
      description: "Complete health questionnaire",
      status: "In Progress",
      icon: ClipboardList,
      iconColor: "bg-primary/20 text-primary",
      hasAsset: true,
    },
    {
      id: 4,
      title: "Blood Draw",
      description: "Visit clinic for blood collection",
      status: "Pending",
      icon: Droplet,
      iconColor: "bg-gray-200 text-gray-500",
      hasAsset: false,
    },
    {
      id: 5,
      title: "Sample QC",
      description: "Quality control check",
      status: "Pending",
      icon: FlaskConical,
      iconColor: "bg-gray-200 text-gray-500",
      hasAsset: false,
    },
    {
      id: 6,
      title: "Sequencing",
      description: "Process for sequencing",
      status: "Pending",
      icon: Dna,
      iconColor: "bg-gray-200 text-gray-500",
      hasAsset: false,
    },
    {
      id: 7,
      title: "Send Reward",
      description: "Send Amazon gift card to participant",
      status: "Pending",
      icon: Gift,
      iconColor: "bg-gray-200 text-gray-500",
      hasAsset: false,
    },
  ];

  const assetsData = {
    Consent: [
      { id: 1, name: "Consent Form - Signed", date: "Jan 15, 2026", type: "PDF" },
    ],
    Survey: [
      { id: 2, name: "Health Questionnaire", date: "Jan 16, 2026", type: "PDF" },
    ],
    Specimen: [
      { id: 3, name: "Blood Sample - QC Passed", date: "Jan 18, 2026", type: "Data" },
    ],
    Reward: [],
  };

  const isStepCompleted = (step: typeof steps[0]) => step.status === "Completed";
  const isStepInProgress = (step: typeof steps[0]) => step.status === "In Progress";
  const isStepPending = (step: typeof steps[0]) => step.status === "Pending";

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="main-container flex-1 overflow-auto bg-[#F8FFFC]">
        <div className="p-6 space-y-6">
          {/* Top Navigation Bar */}
          <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
            {/* Left: Back and Study Title */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-[#F0F0F0] hover:text-[#222222]"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-regular text-foreground">
                {studyData.name}
              </span>
            </div>

            {/* Center: Participant Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {studyData.participantId.slice(-2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-regular text-foreground">
                  {studyData.participantId}
                </span>
                <span className="text-xs text-muted-foreground">
                  Step {studyData.currentStep} of {studyData.totalSteps}
                </span>
              </div>
            </div>

            {/* Right: Status Badges */}
            <div className="flex items-center gap-3">
              {studyData.blocked > 0 && (
                <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">
                  blocked
                </Badge>
              )}
              {studyData.pending > 0 && (
                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                  {studyData.pending} pending
                </Badge>
              )}
              <button
                onClick={() => setShowAssetsModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-[#F0F0F0] transition-colors"
              >
                <Folder className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-regular text-foreground">
                  Assets {studyData.assets}
                </span>
              </button>
            </div>
          </div>

          {/* Workflow Steps - Horizontal Layout */}
          <div className="bg-white rounded-lg p-6 shadow-sm overflow-x-auto">
            <div className="flex items-start gap-4 min-w-max">
              {steps.map((step, index) => {
                const completed = isStepCompleted(step);
                const inProgress = isStepInProgress(step);
                const pending = isStepPending(step);
                const isLast = index === steps.length - 1;
                const IconComponent = step.icon;

                return (
                  <div key={step.id} className="flex items-start">
                    {/* Step Card */}
                    <div className="relative w-48">
                      <div className="bg-white border rounded-lg p-4 shadow-sm relative">
                        {/* Icon */}
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", step.iconColor)}>
                          <IconComponent className="h-5 w-5" />
                        </div>

                        {/* Completion Indicator */}
                        <div className="absolute top-3 right-3">
                          {completed ? (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                              <Clock className="h-4 w-4 text-gray-500" />
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className={cn(
                          "text-sm font-regular mb-1",
                          completed || inProgress ? "text-foreground" : "text-muted-foreground"
                        )}>
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-muted-foreground mb-3">
                          {step.description}
                        </p>

                        {/* Status Badge and Asset */}
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              completed
                                ? "bg-primary/10 text-primary border-primary/30"
                                : inProgress
                                ? "bg-primary/10 text-primary border-primary/30"
                                : "bg-gray-100 text-gray-600 border-gray-300"
                            )}
                          >
                            {step.status}
                          </Badge>
                          {step.hasAsset && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Folder className="h-3 w-3" />
                              <span>Asset</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {!isLast && (
                      <div className="flex items-center px-2">
                        <div
                          className={cn(
                            "h-0.5 transition-all duration-500",
                            completed
                              ? "w-16 bg-primary"
                              : "w-16 bg-gray-300 border-dashed border-t-2 border-gray-300"
                          )}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Assets Modal - Slides from Left */}
      {showAssetsModal && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 animate-in fade-in-0 duration-200"
            onClick={() => setShowAssetsModal(false)}
          />

          {/* Drawer */}
          <div className="fixed left-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto animate-slide-in-from-left">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-regular">Assets</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAssetsModal(false)}
                  className="h-8 w-8 p-0 hover:bg-[#F0F0F0]"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Asset Categories */}
              <div className="space-y-6">
                {Object.entries(assetsData).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-sm font-regular text-foreground mb-3">
                      {category}
                    </h3>
                    {items.length > 0 ? (
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 border rounded-lg hover:bg-[#F0F0F0] transition-colors cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-regular text-foreground">
                                  {item.name}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.date} • {item.type}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground italic">
                        No assets yet
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CollectionProgress;
