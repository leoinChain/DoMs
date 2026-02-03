import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Users as UsersIcon } from "lucide-react";

const Participants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudy, setSelectedStudy] = useState("all");

  const participants = [
    {
      id: "P-6234",
      age: "35-39",
      gender: "Female",
      studies: ["Gut Microbiome & Mental Health"],
      hasAccount: true,
      assets: 2,
      enrolled: "Jan 24, 2026",
    },
    {
      id: "P-5678",
      age: "50-59",
      gender: "Male",
      studies: ["Cardiovascular Biomarker Discovery", "Pharmacogenomics Pilot"],
      hasAccount: true,
      assets: 2,
      enrolled: "Jan 18, 2026",
    },
    {
      id: "P-4521",
      age: "25-29",
      gender: "Female",
      studies: ["Gut Microbiome & Mental Health"],
      hasAccount: false,
      assets: 1,
      enrolled: "Jan 14, 2026",
    },
    {
      id: "P-3192",
      age: "40-49",
      gender: "Male",
      studies: ["Cardiovascular Biomarker Discovery"],
      hasAccount: true,
      assets: 2,
      enrolled: "Jan 4, 2026",
    },
    {
      id: "P-2847",
      age: "30-39",
      gender: "Female",
      studies: ["Cardiovascular Biomarker Discovery", "Gut Microbiome & Mental Health"],
      hasAccount: true,
      assets: 3,
      enrolled: "Nov 28, 2025",
    },
  ];

  const filteredParticipants = participants.filter((p) => {
    const matchesSearch = p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStudy = selectedStudy === "all" || p.studies.includes(selectedStudy);
    return matchesSearch && matchesStudy;
  });

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="main-container flex-1 overflow-auto bg-[#EDFFF8]">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-light">Participants</h1>
            <p className="text-sm text-muted-foreground">
              View all participants across studies.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by participant ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground cursor-pointer" />
              <Select value={selectedStudy} onValueChange={setSelectedStudy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Studies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Studies</SelectItem>
                  <SelectItem value="Cardiovascular Biomarker Discovery">
                    Cardiovascular Biomarker Discovery
                  </SelectItem>
                  <SelectItem value="Gut Microbiome & Mental Health">
                    Gut Microbiome & Mental Health
                  </SelectItem>
                  <SelectItem value="Pharmacogenomics Pilot">
                    Pharmacogenomics Pilot
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Participants Table */}
          <Card>
            <CardContent className="p-0">
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
                        Studies
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Has Account
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        # of Assets
                      </th>
                      <th className="text-left py-3 px-4 font-regular text-muted-foreground text-[14px]">
                        Enrolled
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.map((participant) => (
                      <tr key={participant.id} className="border-b hover:bg-[#F0F0F0] transition-colors">
                        <td className="py-4 px-4 font-regular">{participant.id}</td>
                        <td className="py-4 px-4 text-sm">{participant.age}</td>
                        <td className="py-4 px-4 text-sm">{participant.gender}</td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {participant.studies.map((study, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs font-regular"
                              >
                                {study}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            variant={participant.hasAccount ? "default" : "secondary"}
                            className="font-regular"
                          >
                            {participant.hasAccount ? "Yes" : "No"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm">{participant.assets}</td>
                        <td className="py-4 px-4 text-sm">{participant.enrolled}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 border-t text-sm text-muted-foreground">
                Showing {filteredParticipants.length} of {participants.length} participants
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Participants;
