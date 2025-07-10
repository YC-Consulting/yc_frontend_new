import { Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HomePage from "@/pages/HomePage";
import DocumentAnalysisPage from "@/pages/DocumentAnalysisPage";
import CommunityHubPage from "@/pages/CommunityHubPage";
import DashboardPage from "@/pages/DashboardPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/document-analysis" element={<DocumentAnalysisPage />} />
          <Route path="/community-hub" element={<CommunityHubPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
