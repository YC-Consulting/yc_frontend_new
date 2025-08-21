import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Globe,
  Heart,
  X,
  Mail,
  User,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import api from "@/utils/api";

interface MediaPlatform {
  name: string;
  country: string;
  url: string;
  category: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  selectedMedia: string;
  wechat: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  general?: string;
}

const internationalPlatforms: MediaPlatform[] = [
  {
    name: "DSCENE Magazine",
    country: "USA",
    category: "Fashion & Design",
    url: "https://www.designscene.net/2020/12/964/interview-conscious-fashion-with-themore.html",
  },
  {
    name: "1883 Magazine",
    country: "UK",
    category: "Culture & Arts",
    url: "https://1883magazine.com/james-bay/",
  },
  {
    name: "Made in Shoreditch",
    country: "UK",
    category: "Arts & Culture",
    url: "https://madeinshoreditch.co.uk/",
  },
  {
    name: "Flaunt",
    country: "USA",
    category: "Fashion & Lifestyle",
    url: "https://www.flaunt.com/",
  },
  {
    name: "Ourculture Magazine",
    country: "UK",
    category: "Culture & Arts",
    url: "https://ourculturemag.com/",
  },
  {
    name: "Haute Living",
    country: "USA",
    category: "Luxury Lifestyle",
    url: "https://hauteliving.com/2023/02/vid-garcia-uses-art-to-spread-joy-for-the-present-and-future/726014/",
  },

  {
    name: "London Journal",
    country: "UK",
    category: "Arts & Culture",
    url: "https://londonjournal.co.uk/2024/01/contemporary-craft-exhibition-showcases-innovative-works-at-llschke-gallery/",
  },
  {
    name: "New York Weekly",
    country: "USA",
    category: "Arts",
    url: "https://nyweekly.com/arts/",
  },
  {
    name: "Daily Front Row (Fashion Week Daily)",
    country: "USA",
    category: "Fashion & Style",
    url: "https://fashionweekdaily.com/",
  },
  {
    name: "Art Voice",
    country: "USA",
    category: "Arts & Design",
    url: "https://artvoice.com/home/",
  },
  {
    name: "The Art Insider",
    country: "USA",
    category: "Arts & Culture",
    url: "https://www.art-insider.com/",
  },
  {
    name: "LAWeekly",
    country: "USA",
    category: "Arts & Culture",
    url: "https://www.laweekly.com/he-xu-exploring-the-deep-integration-of-design-and-culture-at-the-new-york-design-festival/",
  },
  {
    name: "World Art News",
    country: "USA",
    category: "Arts & Culture",
    url: "https://worldart.news/category/art/",
  },
];

const chinesePlatforms: MediaPlatform[] = [
  {
    name: "新华网首发",
    country: "China",
    category: "Culture & Arts",
    url: "http://www.news.cn/culture/",
  },
  {
    name: "中国日报网文化",
    country: "China",
    category: "Culture & Arts",
    url: "https://ent.chinadaily.com.cn/a/201811/26/WS5c048551a3101a87ca946b10.html",
  },
  {
    name: "中国网艺术(艺术中国)",
    country: "China",
    category: "Culture & Arts",
    url: "http://art.china.cn/zixun/2019-05/20/content_40755677.htm",
  },
  {
    name: "新浪网收藏",
    country: "China",
    category: "Culture & Arts",
    url: "https://collection.sina.com.cn/2018-11-19/doc-ihnyuqhi2985985.shtml",
  },
  {
    name: "凤凰网文化",
    country: "China",
    category: "Culture & Arts",
    url: "http://culture.ifeng.com/a/20170503/51040106_0.shtml",
  },
  {
    name: "艺术中文网",
    country: "China",
    category: "Culture & Arts",
    url: "http://www.artzww.com/art2017art/vip_doc/19942994.html",
  },
  {
    name: "雅昌艺术网",
    country: "China",
    category: "Culture & Arts",
    url: "https://news.artron.net/20250811/n1143351.html",
  },
  {
    name: "99艺术网",
    country: "China",
    category: "Culture & Arts",
    url: "http://www.99ys.com/",
  },
  {
    name: "Vogue时尚网",
    country: "China",
    category: "Fashion & Lifestyle",
    url: "https://www.vogue.com.cn/fashion/jewelry__watch/news_162461a01ab04cdc.html",
  },
  {
    name: "嘉人marie claire",
    country: "China",
    category: "Fashion & Lifestyle",
    url: "https://www.marieclaire.com.tw/",
  },
  {
    name: "芭莎Harper's BAZAAR",
    country: "China",
    category: "Fashion & Lifestyle",
    url: "http://fashion.bazaar.com.cn/2024/1122/344704.shtml",
  },
];

export default function MediaResourcesPage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    selectedMedia: "",
    wechat: "",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShowInterest = (platformName: string) => {
    setFormData({
      name: "",
      email: "",
      message: `Hi! I'm interested in getting media coverage through ${platformName}. Please contact me with more information about your services.`,
      selectedMedia: platformName,
      wechat: "",
    });
    setShowContactModal(true);
    setSubmitStatus("idle");
    setSubmitMessage("");
    setErrors({});
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
    setSubmitStatus("idle");
    setSubmitMessage("");
    setErrors({});
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }

    // Clear submit status when user starts editing
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
      setSubmitMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrors({});

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        media: formData.selectedMedia,
        message: formData.message.trim() || undefined,
        wechat_id: formData.wechat.trim() || undefined,
      };

      const response = await api.post(
        "/website/user/contact/media-resources",
        payload
      );

      setSubmitStatus("success");
      setSubmitMessage(
        response.data.message ||
          "Your message has been submitted successfully! We'll get back to you soon."
      );

      // Close modal after showing success message for 2 seconds
      setTimeout(() => {
        handleCloseModal();
        setFormData({
          name: "",
          email: "",
          message: "",
          selectedMedia: "",
          wechat: "",
        });
      }, 2000);
    } catch (error: any) {
      setSubmitStatus("error");

      if (error.response?.data?.error) {
        setSubmitMessage(error.response.data.error);
      } else if (
        error.response?.status >= 400 &&
        error.response?.status < 500
      ) {
        setSubmitMessage("Please check your input and try again.");
      } else {
        setSubmitMessage(
          "Failed to submit your message. Please try again later."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Globe className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Media Resources for Career Promotion
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional media platforms and publications to elevate your career
            visibility and establish industry presence
          </p>
        </motion.div>

        {/* International Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            International Publications
          </h2>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Platform Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Website
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interest
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {internationalPlatforms.map((platform, index) => (
                    <motion.tr
                      key={platform.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {platform.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {platform.country}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {platform.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Visit Site
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleShowInterest(platform.name)}
                          className="inline-flex items-center px-3 py-1.5 bg-primary-100 text-primary-700 text-sm font-medium rounded-full hover:bg-primary-200 transition-colors"
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          Interest
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Chinese Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Chinese Media Platforms
          </h2>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Platform Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Website
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interest
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {chinesePlatforms.map((platform, index) => (
                    <motion.tr
                      key={platform.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {platform.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {platform.country}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {platform.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-800 text-sm flex items-center"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Visit Site
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleShowInterest(platform.name)}
                          className="inline-flex items-center px-3 py-1.5 bg-primary-100 text-primary-700 text-sm font-medium rounded-full hover:bg-primary-200 transition-colors"
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          Interest
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-primary-500 to-yellow-500 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Boost Your Media Presence?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Click the "Interest" button next to any platform above to get
            started, or contact us for personalized recommendations based on
            your career goals.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-white text-primary-600 font-medium px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            General Consultation
          </a>
        </motion.div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Contact Us
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Interest in:{" "}
                    <span className="font-medium text-primary-600">
                      {formData.selectedMedia}
                    </span>
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Status Message */}
                {submitStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center space-x-2 p-4 rounded-lg ${
                      submitStatus === "success"
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-red-50 text-red-800 border border-red-200"
                    }`}
                  >
                    {submitStatus === "success" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span>{submitMessage}</span>
                  </motion.div>
                )}

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.name ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="Enter your email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* WeChat Field */}
                <div>
                  <label
                    htmlFor="wechat"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    WeChat ID <span className="text-gray-500">(Optional)</span>
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="wechat"
                      name="wechat"
                      value={formData.wechat}
                      onChange={handleFormChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Your WeChat ID"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={4}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
                      placeholder="Tell us about your media coverage needs..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name || !formData.email}
                  className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 disabled:transform-none ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-primary-500 to-yellow-500 text-white hover:from-primary-600 hover:to-yellow-600"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
