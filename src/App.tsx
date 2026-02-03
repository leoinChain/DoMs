import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import Studies from "./pages/Studies";
import StudyDashboard from "./pages/StudyDashboard";
import Participants from "./pages/Participants";
import Settings from "./pages/Settings";
import ParticipantWorkflow from "./pages/ParticipantWorkflow";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/studies/:studyId" element={<StudyDashboard />} />
          <Route
            path="/studies/:studyId/participants/:participantId/workflow"
            element={<ParticipantWorkflow />}
          />
          <Route path="/participants" element={<Participants />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
