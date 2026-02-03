import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Trash2 } from "lucide-react";

const Settings = () => {
  const [organizationName, setOrganizationName] = useState(() => {
    const stored = localStorage.getItem("organizationName");
    if (!stored) {
      localStorage.setItem("organizationName", "AminoChain Research");
      return "AminoChain Research";
    }
    return stored;
  });
  const [organizationAddress, setOrganizationAddress] = useState("");
  const [organizationWebsite, setOrganizationWebsite] = useState("");
  const [organizationPhone, setOrganizationPhone] = useState("");
  const [organizationEmail, setOrganizationEmail] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      email: "sarah.chen@aminochain.io",
      role: "Admin",
      initials: "DSC",
    },
    {
      id: 2,
      name: "Dr. Michael Torres",
      email: "m.torres@aminochain.io",
      role: "Researcher",
      initials: "DMT",
    },
    {
      id: 3,
      name: "Emily Watson",
      email: "e.watson@aminochain.io",
      role: "Researcher",
      initials: "EW",
    },
    {
      id: 4,
      name: "James Liu",
      email: "j.liu@aminochain.io",
      role: "Viewer",
      initials: "JL",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="main-container flex-1 overflow-auto bg-[#EDFFF8]">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-light">Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your organization and team
            </p>
          </div>

          {/* Organization and Team Members Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Organization Section */}
            <Card>
              <CardHeader>
                <CardTitle className="font-light">Organization</CardTitle>
                <CardDescription>Manage your organization details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-regular text-muted-foreground mb-2 block">
                    Organization Name
                  </label>
                  <Input
                    type="text"
                    value={organizationName}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setOrganizationName(newName);
                      localStorage.setItem("organizationName", newName);
                      // Dispatch custom event for same-window updates
                      window.dispatchEvent(new Event("organizationNameUpdated"));
                    }}
                    className="font-regular"
                  />
                </div>
                <div>
                  <label className="text-sm font-regular text-muted-foreground mb-2 block">
                    Address
                  </label>
                  <Input
                    type="text"
                    value={organizationAddress}
                    onChange={(e) => setOrganizationAddress(e.target.value)}
                    placeholder="Enter organization address"
                    className="font-regular"
                  />
                </div>
                <div>
                  <label className="text-sm font-regular text-muted-foreground mb-2 block">
                    Website
                  </label>
                  <Input
                    type="url"
                    value={organizationWebsite}
                    onChange={(e) => setOrganizationWebsite(e.target.value)}
                    placeholder="https://example.com"
                    className="font-regular"
                  />
                </div>
                <div>
                  <label className="text-sm font-regular text-muted-foreground mb-2 block">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={organizationPhone}
                    onChange={(e) => setOrganizationPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="font-regular"
                  />
                </div>
                <div>
                  <label className="text-sm font-regular text-muted-foreground mb-2 block">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={organizationEmail}
                    onChange={(e) => setOrganizationEmail(e.target.value)}
                    placeholder="contact@example.com"
                    className="font-regular"
                  />
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="font-regular w-full bg-white hover:bg-[#F0F0F0]">
                    Delete Account
                  </Button>
                </div>
                <Button className="font-regular w-full">Save</Button>
              </CardContent>
            </Card>

            {/* Team Members Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-light">Team Members</CardTitle>
                    <CardDescription>Manage who has access to your organization</CardDescription>
                  </div>
                  <span className="text-sm text-muted-foreground">{teamMembers.length} members</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Invite Section */}
                <div>
                  <label className="text-sm font-regular text-muted-foreground mb-2 block">
                    Enter email to invite
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="pl-10 font-regular"
                      />
                    </div>
                    <Button className="font-regular">+ Invite</Button>
                  </div>
                </div>

                {/* Team Members List */}
                <div className="space-y-3 pt-4 border-t">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 hover:bg-[#F0F0F0] rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="profile-image">
                            {member.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-regular">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                        <Badge
                          variant={member.role === "Admin" ? "default" : "outline"}
                          className="font-regular"
                        >
                          {member.role}
                        </Badge>
                      </div>
                      <button className="p-2 hover:bg-destructive/10 rounded-md transition-colors ml-4">
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
