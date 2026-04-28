import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ApiKeyBar } from "./components/ApiKeyBar";
import { AppFooter, AppNav } from "./components/Chrome";
import { AuditPage } from "./pages/AuditPage";
import { CompliancePage } from "./pages/CompliancePage";
import { CommunityPage } from "./pages/CommunityPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DemoTextPage } from "./pages/DemoTextPage";
import { DocsPage } from "./pages/DocsPage";
import { HomePage } from "./pages/HomePage";
import { RegistryPage } from "./pages/RegistryPage";
import { ResearchPage } from "./pages/ResearchPage";
import { SessionPage } from "./pages/SessionPage";

function ScrollReset() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollReset />
      <AppNav />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/session" element={<SessionPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/registry" element={<RegistryPage />} />
          <Route path="/registry/:slug" element={<RegistryPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/demo/text" element={<DemoTextPage />} />
        </Routes>
      </main>
      <ApiKeyBar />
      <AppFooter />
    </div>
  );
}
