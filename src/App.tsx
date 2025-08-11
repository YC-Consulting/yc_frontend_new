import { Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HomePage from "@/pages/HomePage";
import DocumentAnalysisPage from "@/pages/DocumentAnalysisPage";
import CommunityHubPage from "@/pages/CommunityHubPage";
import MediaResourcesPage from "@/pages/MediaResourcesPage";
import DashboardPage from "@/pages/DashboardPage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ProfilePage from "@/pages/ProfilePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import { AuthProvider } from "@/contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/document-analysis"
              element={<DocumentAnalysisPage />}
            />
            <Route path="/community-hub" element={<CommunityHubPage />} />
            <Route path="/media-resources" element={<MediaResourcesPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
