import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

const Studies = () => {
  const [statusTab, setStatusTab] = useState("Active");
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

  const studies = {
    Active: [
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
    ],
    Completed: [
      {
        id: 4,
        name: "Oncology Biomarker Study",
        description: "Investigating cancer biomarkers...",
        participants: { avatars: ["A", "B"], count: 87 },
        progress: 100,
        dueDate: "Dec 15, 2025",
        conversion: 58,
        category: "Oncology",
      },
    ],
    Cancelled: [
      {
        id: 5,
        name: "Neurology Cognitive Assessment",
        description: "Evaluating cognitive function...",
        participants: { avatars: ["A", "B", "C", "D"], count: 201 },
        progress: 45,
        dueDate: "Cancelled",
        conversion: 35,
        category: "Neurology",
      },
    ],
    "On Hold": [
      {
        id: 6,
        name: "Immunology Response Study",
        description: "Analyzing immune system responses...",
        participants: { avatars: ["A", "B"], count: 145 },
        progress: 60,
        dueDate: "On Hold",
        conversion: 50,
        category: "Immunology",
      },
    ],
  };

  const statusTabs = ["Active", "Completed", "Cancelled", "On Hold"];
  const currentStudies = studies[statusTab as keyof typeof studies] || [];

  const filteredStudies = currentStudies.filter((study) =>
    study.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    study.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <h1 className="text-2xl font-light">Studies</h1>

          {/* Status Tabs and Search */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1">
              {statusTabs.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusTab(status)}
                  className={`px-4 py-2 text-sm font-regular transition-colors border-b-2 ${
                    statusTab === status
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
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
                  className="p-2 hover:bg-accent rounded-md transition-colors"
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
                <div>
                  <CardTitle className="font-light">
                    {statusTab === "Active" && "Active Studies"}
                    {statusTab === "Completed" && "Completed Studies"}
                    {statusTab === "Cancelled" && "Cancelled Studies"}
                    {statusTab === "On Hold" && "On Hold Studies"}
                  </CardTitle>
                </div>
                {statusTab === "Completed" && (
                  <Button variant="ghost" className="font-regular text-sm">
                    Show all
                  </Button>
                )}
                {statusTab === "Active" && (
                  <Button variant="outline" className="font-regular">
                    Create Study
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {statusTab === "Active" ? (
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
                      {filteredStudies.map((study) => (
                        <tr key={study.id} className="border-b hover:bg-accent/50 transition-colors">
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
              ) : (
                <div className="space-y-2">
                  {filteredStudies.map((study) => (
                    <div
                      key={study.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-regular mb-1">{study.name}</div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {study.description}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{study.participants.count} participants</span>
                            <span>•</span>
                            <span>{study.dueDate}</span>
                            <span>•</span>
                            <span>{study.conversion}% conversion</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Studies;
