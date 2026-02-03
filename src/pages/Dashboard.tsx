import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import OnboardingTooltip from "@/components/OnboardingTooltip";
import { ChevronRight } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const firstStudyRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    // Show onboarding on first landing
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
      setOnboardingStep(1); // Start with modal
    }
  }, []);

  const getConversionLevel = (percentage: number): { level: string; variant: "low" | "medium" | "high" | "exceptional" } => {
    if (percentage >= 0 && percentage <= 25) {
      return { level: "low", variant: "low" };
    } else if (percentage >= 26 && percentage <= 50) {
      return { level: "medium", variant: "medium" };
    } else if (percentage >= 51 && percentage <= 75) {
      return { level: "high", variant: "high" };
    } else {
      return { level: "exceptional", variant: "exceptional" };
    }
  };

  const studies = [
    {
      id: 1,
      name: "Cardiovascular Biomarker",
      description: "Identifying novel biomarkers f...",
      participants: { avatars: ["A", "B", "C"], count: 329 },
      progress: 94,
      dueDate: "Feb 15, 2026",
      conversion: 82,
      category: "Cardiovascular",
    },
    {
      id: 2,
      name: "Gut Microbiome",
      description: "Exploring the gut-brain axis c...",
      participants: { avatars: ["A", "B", "C"], count: 156 },
      progress: 78,
      dueDate: "May 1, 2026",
      conversion: 45,
      category: "Gut Microbiome",
    },
    {
      id: 3,
      name: "Pharmacogenomics Pilot",
      description: "Testing personalized drug resp...",
      participants: { avatars: ["A"], count: 12 },
      progress: 24,
      dueDate: "Jul 10, 2026",
      conversion: 18,
      category: "Pharmacogenomics",
    },
  ];

  const tasks = [
    {
      id: 1,
      title: "Send Reward",
      description: "Participant P-2847 has completed all steps. Ready to send reward.",
      study: "Cardiovascular Biomarker Discovery",
      timeAgo: "5d ago",
      priority: "high" as const,
      category: "Cardiovascular",
    },
    {
      id: 2,
      title: "Sequencing Approval",
      description: "Sample passed QC, awaiting approval to proceed to sequencing.",
      study: "Cardiovascular Biomarker Discovery",
      timeAgo: "6d ago",
      priority: "medium" as const,
      category: "Cardiovascular",
    },
    {
      id: 3,
      title: "Survey Incomplete",
      description: "Participant P-4521 has not completed required survey after 14 days.",
      study: "Gut Microbiome & Mental Health",
      timeAgo: "4d ago",
      priority: "low" as const,
      category: "Gut Microbiome",
    },
  ];

  const filteredStudies =
    activeTab === "all"
      ? studies
      : studies.filter((s) => s.category === activeTab);

  const filteredTasks =
    activeTab === "all"
      ? tasks
      : tasks.filter((t) => t.category === activeTab);

  const tabItems = [
    "All",
    "Cardiovascular",
    "Gut Microbiome",
    "Pharmacogenomics",
    "Genetics",
    "Clinical Trials",
  ];

  const handleNextStep = () => {
    if (onboardingStep === 1) {
      // Move from modal to tooltip pointing to first study
      setOnboardingStep(2);
    } else if (onboardingStep === 2) {
      // Move to tooltip pointing to Settings nav
      setOnboardingStep(3);
    } else if (onboardingStep === 3) {
      // Move to tooltip pointing to Participants nav
      setOnboardingStep(4);
    } else {
      setShowOnboarding(false);
      localStorage.setItem("hasSeenOnboarding", "true");
    }
  };

  const handleSkip = () => {
    setShowOnboarding(false);
    localStorage.setItem("hasSeenOnboarding", "true");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Page Header with Tabs */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light">Activity</h1>
            <div className="inline-flex items-center gap-1">
              {tabItems.map((item) => {
                const value = item === "All" ? "all" : item;
                return (
                  <button
                    key={item}
                    onClick={() => setActiveTab(value)}
                    className={`px-4 py-2 text-sm font-regular transition-colors border-b-2 ${
                      activeTab === value
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Studies Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-light">Active Studies</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground">
                        Study
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground">
                        Participants
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground">
                        Progress
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground">
                        Due date
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground">
                        Average Conversion
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudies.map((study, index) => (
                      <tr
                        key={study.id}
                        ref={index === 0 ? firstStudyRef : null}
                        data-study-row={index === 0 ? "first" : undefined}
                        className="border-b"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-regular">{study.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {study.description}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {study.participants.avatars.map((avatar, idx) => (
                                <Avatar key={idx} className="h-8 w-8 border-2 border-background">
                                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    {avatar}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              +{study.participants.count}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <Progress value={study.progress} className="h-2" />
                            <span className="text-sm font-regular">{study.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm">{study.dueDate}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-regular">{study.conversion}%</span>
                            <Badge variant={getConversionLevel(study.conversion).variant}>
                              {getConversionLevel(study.conversion).level}
                            </Badge>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Outstanding Tasks Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-light">Outstanding Tasks</CardTitle>
                <span className="text-sm text-muted-foreground">{filteredTasks.length} items</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-regular">{task.title}</h3>
                          <Badge variant={task.priority}>{task.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{task.study}</span>
                          <span>•</span>
                          <span>{task.timeAgo}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm" className="font-regular">
                          Start
                        </Button>
                        <Button size="sm" className="font-regular">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Step 1: Modal with image */}
      <Dialog open={showOnboarding && onboardingStep === 1} onOpenChange={setShowOnboarding}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-4">
              <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                <span className="text-muted-foreground text-sm">Onboarding Image</span>
              </div>
            </div>
            <DialogTitle className="font-light">Welcome to ImYoo</DialogTitle>
            <DialogDescription>
              Let's get you started with a quick tour of the platform.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1 w-8 rounded ${
                      step === onboardingStep
                        ? "bg-primary"
                        : step < onboardingStep
                        ? "bg-primary/50"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="font-regular"
                >
                  Skip
                </Button>
                <Button onClick={handleNextStep} className="font-regular">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Step 2: Tooltip pointing to first Active Study */}
      <OnboardingTooltip
        isOpen={showOnboarding && onboardingStep === 2}
        onClose={handleSkip}
        onNext={handleNextStep}
        targetSelector='tr[data-study-row="first"]'
        title="View Current Collection"
        description="You can now view your current collection of studies and participants."
        position="right"
      />

      {/* Step 3: Tooltip pointing to Settings nav */}
      <OnboardingTooltip
        isOpen={showOnboarding && onboardingStep === 3}
        onClose={handleSkip}
        onNext={handleNextStep}
        targetSelector='a[href="/settings"]'
        title="Invite Team Members"
        description="Add more people to the tool by inviting them via email in Settings."
        position="right"
      />

      {/* Step 4: Tooltip pointing to Participants nav */}
      <OnboardingTooltip
        isOpen={showOnboarding && onboardingStep === 4}
        onClose={handleSkip}
        onNext={handleNextStep}
        targetSelector='a[href="/participants"]'
        title="You're all set"
        description="Participants are de-identified but easy to engage with under this section."
        position="right"
        showNext={false}
      />
    </div>
  );
};

export default Dashboard;
