import { motion } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  FileText,
  Scale,
  Clock,
  Users,
} from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Scale className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-8 space-y-8"
        >
          {/* Introduction */}
          <section>
            <div className="flex items-center mb-4">
              <FileText className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                1. Introduction
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Welcome to Yichuan AI. These Terms of Service ("Terms") govern
              your use of our website, artificial intelligence document analysis
              services, media resource platforms, and related services provided
              by Yichuan AI ("Company", "we", "us", or "our").
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              By accessing or using our services, you agree to be bound by these
              Terms. If you do not agree to these Terms, please do not use our
              services.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                2. Acceptance of Terms
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              By creating an account, accessing our website, or using any of our
              services, you acknowledge that you have read, understood, and
              agree to be bound by these Terms and our Privacy Policy. These
              Terms apply to all users, including visitors, registered users,
              and subscribers.
            </p>
          </section>

          {/* Services Description */}
          <section>
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                3. Services Description
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              Yichuan AI provides the following services:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>AI-powered document analysis and insights</li>
              <li>Media resource platforms for career promotion</li>
              <li>Community hub for professional networking</li>
              <li>Consultation services for media coverage</li>
              <li>Educational content and resources</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                4. User Responsibilities
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-3">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>
                Provide accurate and complete information when creating an
                account
              </li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use our services only for lawful purposes</li>
              <li>Respect intellectual property rights</li>
              <li>
                Not attempt to harm, disrupt, or gain unauthorized access to our
                systems
              </li>
              <li>Not upload malicious content or violate others' privacy</li>
            </ul>
          </section>

          {/* Privacy and Data Protection */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Privacy and Data Protection
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We take your privacy seriously. Our collection, use, and
              protection of your personal information is governed by our Privacy
              Policy. By using our services, you consent to the collection and
              use of your information as described in our Privacy Policy.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              For document analysis services, we may temporarily process your
              uploaded documents to provide analysis results. We do not
              permanently store or share your documents without your explicit
              consent.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All content on our website, including but not limited to text,
              graphics, logos, software, and AI algorithms, is the property of
              Yichuan AI and is protected by intellectual property laws. You may
              not copy, modify, distribute, or create derivative works without
              our written permission.
            </p>
          </section>

          {/* Payment and Billing */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Payment and Billing
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Some of our services may require payment. All fees are stated in
              USD unless otherwise specified. Payment is due upon purchase, and
              all sales are final unless otherwise stated. We reserve the right
              to change our pricing with 30 days' notice.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are provided "as is" without warranties of any kind.
              We shall not be liable for any indirect, incidental, special, or
              consequential damages. Our total liability shall not exceed the
              amount paid by you for our services in the 12 months preceding the
              claim.
            </p>
          </section>

          {/* Service Availability */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">
                9. Service Availability
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              While we strive to provide uninterrupted service, we do not
              guarantee that our services will be available at all times. We may
              experience downtime for maintenance, updates, or technical issues.
              We reserve the right to modify, suspend, or discontinue any aspect
              of our services with reasonable notice.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              10. Termination
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Either party may terminate this agreement at any time. We reserve
              the right to terminate or suspend your account immediately if you
              violate these Terms. Upon termination, your right to use our
              services ceases immediately.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              11. Changes to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms from time to time. We will notify users
              of material changes via email or website notification. Continued
              use of our services after changes constitutes acceptance of the
              new Terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              12. Governing Law
            </h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with
              the laws of the jurisdiction where Yichuan AI is incorporated,
              without regard to conflict of law principles.
            </p>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms of Service, please
              contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:yichuaned@gmail.com"
                  className="text-primary-600 hover:text-primary-800 transition-colors"
                >
                  yichuaned@gmail.com
                </a>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Website:</strong> Yichuan AI
              </p>
            </div>
          </section>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8"
        >
          <a
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
          >
            ← Back to Home
          </a>
        </motion.div>
      </div>
    </div>
  );
}
