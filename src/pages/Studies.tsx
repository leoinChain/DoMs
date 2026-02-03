import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SegmentedProgress from "@/components/SegmentedProgress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

const Studies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

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
      participants: { avatars: ["A", "B", "C"], count: 329, enrolledOutOf: 87 },
      progress: 94,
      dueDate: "Feb 15, 2026",
      conversion: 82,
      category: "Cardiovascular",
      status: "Active",
    },
    {
      id: 2,
      name: "Gut Microbiome",
      description: "Exploring the gut-brain axis c...",
      participants: { avatars: ["A", "B", "C"], count: 156, enrolledOutOf: 42 },
      progress: 78,
      dueDate: "May 1, 2026",
      conversion: 45,
      category: "Gut Microbiome",
      status: "Active",
    },
    {
      id: 3,
      name: "Pharmacogenomics Pilot",
      description: "Testing personalized drug resp...",
      participants: { avatars: ["A"], count: 12, enrolledOutOf: 15 },
      progress: 24,
      dueDate: "Jul 10, 2026",
      conversion: 18,
      category: "Pharmacogenomics",
      status: "Active",
    },
    {
      id: 4,
      name: "Oncology Biomarker Study",
      description: "Investigating cancer biomarkers...",
      participants: { avatars: ["A", "B"], count: 87, enrolledOutOf: 73 },
      progress: 100,
      dueDate: "Dec 15, 2025",
      conversion: 58,
      category: "Oncology",
      status: "Completed",
    },
    {
      id: 5,
      name: "Neurology Cognitive Assessment",
      description: "Evaluating cognitive function...",
      participants: { avatars: ["A", "B", "C", "D"], count: 201, enrolledOutOf: 56 },
      progress: 45,
      dueDate: "Cancelled",
      conversion: 35,
      category: "Neurology",
      status: "Cancelled",
    },
    {
      id: 6,
      name: "Immunology Response Study",
      description: "Analyzing immune system responses...",
      participants: { avatars: ["A", "B"], count: 145, enrolledOutOf: 91 },
      progress: 60,
      dueDate: "On Hold",
      conversion: 50,
      category: "Immunology",
      status: "On Hold",
    },
  ];

  const filteredStudies = studies.filter((study) =>
    study.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    study.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="main-container flex-1 overflow-auto bg-[#F8FFFC]">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-light">Studies</h1>
            <div className="flex items-center gap-2">
              {isSearchExpanded ? (
                <div className="relative flex items-center">
                  <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search studies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 w-64"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchExpanded(false);
                      setSearchQuery("");
                    }}
                    className="absolute right-3"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchExpanded(true)}
                  className="p-2 hover:bg-[#F0F0F0] rounded-md transition-colors"
                >
                  <Search className="h-5 w-5 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Studies Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-light">All Studies</CardTitle>
                <Button variant="outline" className="font-regular">
                  Create Study
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Study
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Participants
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Due date
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Average Conversion
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Collection progress
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudies.map((study) => (
                      <tr key={study.id} className="border-b hover:bg-[#F0F0F0] transition-colors">
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
                            <div className="flex flex-col gap-1">
                              <span className="text-xs font-regular text-foreground">
                                {Math.min(study.participants.enrolledOutOf, 100)} out of 100
                              </span>
                              <div className="flex -space-x-2">
                                {study.participants.avatars.slice(0, Math.min(study.participants.avatars.length, 3)).map((avatar, idx) => (
                                  <Avatar key={idx} className="h-8 w-8 border-2 border-background">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                      {avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                +{Math.min(study.participants.count, 100)}
                              </span>
                            </div>
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
                        <td className="py-4 px-4">
                          <div className="space-y-2">
                            <SegmentedProgress value={study.progress} />
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-regular">{study.progress}%</span>
                              <button
                                className="text-xs font-regular text-primary underline hover:text-primary/80 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/studies/${study.id}/collection-progress`);
                                }}
                              >
                                View process
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Studies;
