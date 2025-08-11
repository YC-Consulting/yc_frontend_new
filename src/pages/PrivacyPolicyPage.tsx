import { motion } from "framer-motion";
import { Shield, Eye, Lock, FileText, Globe, Mail } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Shield className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your privacy and data security are our top priorities. This policy
            explains how we collect, use, and protect your information.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-primary-600" />
              1. Information We Collect
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Information You Provide
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Account Information:</strong> Name, email address, and
                  account credentials
                </li>
                <li>
                  <strong>Documents:</strong> CVs, portfolios, reference
                  letters, and other career documents you upload for analysis
                </li>
                <li>
                  <strong>Contact Information:</strong> Details provided through
                  contact forms or support requests
                </li>
                <li>
                  <strong>Profile Data:</strong> Career preferences, industry
                  information, and professional background
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Information We Collect Automatically
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  <strong>Usage Data:</strong> How you interact with our
                  platform, features used, and time spent
                </li>
                <li>
                  <strong>Technical Information:</strong> IP address, browser
                  type, device information, and operating system
                </li>
                <li>
                  <strong>Cookies and Tracking:</strong> Session data,
                  preferences, and analytics information
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-primary-600" />
              2. How We Use Your Information
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>
                <strong>AI Document Analysis:</strong> Process your uploaded
                documents to provide feedback, recommendations, and analysis
              </li>
              <li>
                <strong>Career Advisory Services:</strong> Deliver personalized
                career guidance and strategic advice
              </li>
              <li>
                <strong>Platform Improvement:</strong> Enhance our AI algorithms
                and user experience
              </li>
              <li>
                <strong>Communication:</strong> Send service updates, analysis
                results, and support responses
              </li>
              <li>
                <strong>Security:</strong> Protect against fraud, abuse, and
                unauthorized access
              </li>
              <li>
                <strong>Legal Compliance:</strong> Meet legal obligations and
                enforce our terms of service
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8 flex items-center">
              <Lock className="h-6 w-6 mr-2 text-primary-600" />
              3. Data Security & Protection
            </h2>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Security Commitment:</strong> We implement
                industry-standard security measures to protect your sensitive
                documents and personal information.
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>
                <strong>Encryption:</strong> All data transmitted to and from
                our servers is encrypted using TLS/SSL
              </li>
              <li>
                <strong>Secure Storage:</strong> Documents and personal data are
                stored in encrypted, access-controlled databases
              </li>
              <li>
                <strong>Access Controls:</strong> Strict employee access
                controls with regular security training
              </li>
              <li>
                <strong>AI Processing:</strong> Document analysis occurs in
                secure, isolated environments
              </li>
              <li>
                <strong>Data Retention:</strong> Documents are automatically
                deleted after analysis unless you choose to save them
              </li>
              <li>
                <strong>Regular Audits:</strong> Ongoing security assessments
                and vulnerability testing
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8 flex items-center">
              <Globe className="h-6 w-6 mr-2 text-primary-600" />
              4. Data Sharing & Third Parties
            </h2>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
              <p className="text-green-800">
                <strong>No Selling:</strong> We never sell, rent, or trade your
                personal information or documents to third parties.
              </p>
            </div>

            <p className="text-gray-700 mb-4">
              We may share limited information only in these specific
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>
                <strong>Service Providers:</strong> Trusted partners who help us
                operate our platform (hosting, analytics, email services)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law, court
                order, or legal process
              </li>
              <li>
                <strong>Safety Protection:</strong> To protect our users,
                platform, or public safety
              </li>
              <li>
                <strong>Business Transfers:</strong> In case of merger,
                acquisition, or sale of our company
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              5. Your Rights & Choices
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>
                <strong>Correction:</strong> Update or correct inaccurate
                personal information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your account and
                associated data
              </li>
              <li>
                <strong>Portability:</strong> Export your data in a common
                format
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing
                communications
              </li>
              <li>
                <strong>Restrict Processing:</strong> Limit how we use your
                information
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              6. International Data Transfers
            </h2>

            <p className="text-gray-700 mb-6">
              If you're located outside the country where our servers are
              located, your information may be transferred internationally. We
              ensure appropriate safeguards are in place to protect your data in
              accordance with applicable privacy laws, including GDPR for EU
              residents and CCPA for California residents.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              7. Document-Specific Privacy
            </h2>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800">
                <strong>Document Handling:</strong> Your uploaded documents
                contain sensitive career information. Here's how we protect
                them:
              </p>
            </div>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>
                <strong>Temporary Processing:</strong> Documents are processed
                for analysis and can be deleted immediately after
              </li>
              <li>
                <strong>No Human Review:</strong> Only our AI systems analyze
                your documents unless you explicitly request human review
              </li>
              <li>
                <strong>Secure Deletion:</strong> When you delete documents,
                they are permanently removed from our systems
              </li>
              <li>
                <strong>Analysis Isolation:</strong> Each analysis session is
                isolated to prevent data leakage between users
              </li>
              <li>
                <strong>No Training Data:</strong> Your documents are not used
                to train our AI models without explicit consent
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              8. Cookies & Tracking
            </h2>

            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>
                <strong>Essential Cookies:</strong> Required for platform
                functionality and security
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how you
                use our platform
              </li>
              <li>
                <strong>Preference Cookies:</strong> Remember your settings and
                preferences
              </li>
            </ul>
            <p className="text-gray-700 mb-6">
              You can control cookies through your browser settings, though some
              features may not work properly if disabled.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              9. Data Retention
            </h2>

            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>
                <strong>Account Data:</strong> Retained while your account is
                active and for 90 days after deletion
              </li>
              <li>
                <strong>Documents:</strong> Deleted immediately after analysis
                unless you choose to save them
              </li>
              <li>
                <strong>Analysis Results:</strong> Stored according to your
                preferences, deletable at any time
              </li>
              <li>
                <strong>Communication Records:</strong> Support communications
                retained for 2 years
              </li>
              <li>
                <strong>Legal Requirements:</strong> Some data may be retained
                longer if required by law
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              10. Changes to This Policy
            </h2>

            <p className="text-gray-700 mb-6">
              We may update this privacy policy periodically to reflect changes
              in our practices or applicable laws. We will notify you of
              significant changes via email or platform notification. Continued
              use of our services after changes take effect constitutes
              acceptance of the updated policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8 flex items-center">
              <Mail className="h-6 w-6 mr-2 text-primary-600" />
              11. Contact Us
            </h2>

            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                If you have questions about this privacy policy or your data
                rights, please contact us:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:yichuaned@gmail.com"
                    className="text-primary-600 hover:text-primary-800 transition-colors"
                  >
                    yichuaned@gmail.com
                  </a>
                </li>
                <li>
                  <strong>Subject Line:</strong> "Privacy Policy Inquiry"
                </li>
                <li>
                  <strong>Response Time:</strong> We aim to respond within 48
                  hours
                </li>
              </ul>
              <p className="text-gray-600 mt-4 text-sm">
                For urgent privacy concerns or data breaches, please mark your
                email as "URGENT: Privacy Issue"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
