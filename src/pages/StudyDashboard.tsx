import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FlaskConical, Target, Users, TrendingUp, AlertCircle } from "lucide-react";

const StudyDashboard = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app, fetch based on studyId
  const studyData = {
    id: studyId || "1",
    name: "Cardiovascular Biomarker Discovery",
    description: "Identifying novel biomarkers for early cardiovascular disease detection through multi-omic analysis.",
    status: "Active",
    enrollmentTarget: 350,
    enrolled: 329,
    groups: [
      { name: "Control Group", target: 200, current: 187, percentage: 94 },
      { name: "High Risk", target: 150, current: 142, percentage: 95 },
    ],
    conversionRate: 78.5,
    needsAttention: 3,
    tasks: [
      {
        id: 1,
        title: "Send Reward",
        description: "Participant P-2847 has completed all steps. Ready to send reward.",
        timeAgo: "6d ago",
        priority: "high",
        icon: FlaskConical,
      },
      {
        id: 2,
        title: "Sequencing Approval",
        description: "Sample passed QC, awaiting approval to proceed to sequencing.",
        timeAgo: "7d ago",
        priority: "medium",
        icon: AlertCircle,
      },
      {
        id: 3,
        title: "Send Reward",
        description: "Participant P-3192 has completed all steps. Ready to send reward.",
        timeAgo: "5d ago",
        priority: "high",
        icon: FlaskConical,
      },
    ],
    participants: [
      {
        id: "P-2847",
        age: "30-39",
        gender: "Female",
        workflowStatus: "Awaiting Action",
        currentStep: "6 Sequencing",
        stepTag: "Researcher",
        assets: 3,
        enrolled: "Nov 28, 2025",
      },
      {
        id: "P-3192",
        age: "40-49",
        gender: "Male",
        workflowStatus: "Awaiting Action",
        currentStep: "6 Sequencing",
        stepTag: "Researcher",
        assets: 2,
        enrolled: "Jan 4, 2026",
      },
      {
        id: "P-5678",
        age: "50-59",
        gender: "Male",
        workflowStatus: "Awaiting Action",
        currentStep: "4 Blood Draw",
        stepTag: null,
        assets: 2,
        enrolled: "Jan 18, 2026",
      },
    ],
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="main-container flex-1 overflow-auto bg-[#F8FFFC]">
        <div className="p-6 space-y-6">
          {/* Header with Back Navigation */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="p-2 hover:bg-[#F0F0F0]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Study Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FlaskConical className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-light">{studyData.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {studyData.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {studyData.status}
              </Badge>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Enrollment Target Card */}
            <Card className="hover:bg-[#F0F0F0] transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-regular">{studyData.enrollmentTarget}</div>
                    <div className="text-sm text-muted-foreground">
                      {studyData.enrolled} enrolled
                    </div>
                  </div>
                  <Progress
                    value={(studyData.enrolled / studyData.enrollmentTarget) * 100}
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground">Enrollment Target</div>
                </div>
              </CardContent>
            </Card>

            {/* Groups Card */}
            <Card className="hover:bg-[#F0F0F0] transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-regular">{studyData.groups.length}</div>
                    <div className="text-sm text-muted-foreground">
                      {studyData.groups.map((g) => g.name).join(", ")}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Groups</div>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Rate Card */}
            <Card className="hover:bg-[#F0F0F0] transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-regular">{studyData.conversionRate}%</div>
                    <div className="text-sm text-muted-foreground">
                      Screening to enrollment
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Conversion Rate</div>
                </div>
              </CardContent>
            </Card>

            {/* Needs Attention Card */}
            <Card className="hover:bg-[#F0F0F0] transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="text-2xl font-regular">{studyData.needsAttention}</div>
                    <div className="text-sm text-muted-foreground">Pending actions</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Needs Attention</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Groups & Recruitment Section */}
          <Card>
            <CardHeader>
              <CardTitle className="font-light">Groups & Recruitment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studyData.groups.map((group, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-[#F0F0F0] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-regular">{group.name}</div>
                      <div className="text-sm font-regular">{group.percentage}%</div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {group.current} / {group.target}
                    </div>
                    <Progress value={group.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Needs Attention Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <CardTitle className="font-light">Needs Attention</CardTitle>
                </div>
                <span className="text-sm text-muted-foreground">
                  {studyData.tasks.length} items
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyData.tasks.map((task) => {
                  const Icon = task.icon;
                  return (
                    <div
                      key={task.id}
                      className="p-4 border rounded-lg hover:bg-[#F0F0F0] transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <Icon className="h-5 w-5 text-primary mt-0.5" />
                          <div className="flex-1">
                            <div className="font-regular mb-1">{task.title}</div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {task.description}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              {task.timeAgo}
                            </div>
                          </div>
                        </div>
                        <Badge
                          className={`${getPriorityColor(task.priority)} font-regular`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Participants Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="font-light">Participants</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        ID
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Age
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Gender
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Workflow Status
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Current Step
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Assets
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Enrolled
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studyData.participants.map((participant) => (
                      <tr
                        key={participant.id}
                        className="border-b hover:bg-[#F0F0F0] transition-colors"
                      >
                        <td className="py-4 px-4 font-regular">{participant.id}</td>
                        <td className="py-4 px-4 text-sm">{participant.age}</td>
                        <td className="py-4 px-4 text-sm">{participant.gender}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{participant.workflowStatus}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{participant.currentStep}</span>
                            {participant.stepTag && (
                              <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                                {participant.stepTag}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: participant.assets }).map((_, i) => (
                              <div
                                key={i}
                                className="h-4 w-4 bg-primary rounded flex items-center justify-center"
                              >
                                <div className="h-2 w-2 bg-primary-foreground rounded-sm" />
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm">{participant.enrolled}</td>
                        <td className="py-4 px-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-sm hover:bg-[#F0F0F0]"
                            onClick={() =>
                              navigate(
                                `/studies/${studyId}/participants/${participant.id}/workflow`
                              )
                            }
                          >
                            View Workflow →
                          </Button>
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

export default StudyDashboard;
