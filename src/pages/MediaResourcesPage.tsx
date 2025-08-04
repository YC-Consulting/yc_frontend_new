import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Globe, Heart, X, Mail, User, MessageCircle, Send } from "lucide-react";

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
}

const internationalPlatforms: MediaPlatform[] = [
  {
    name: "DSCENE Magazine",
    country: "USA",
    category: "Fashion & Design",
    url: "https://www.designscene.net/2020/12/964/interview-conscious-fashion-with-themore.html"
  },
  {
    name: "1883 Magazine",
    country: "UK", 
    category: "Culture & Arts",
    url: "https://1883magazine.com/james-bay/"
  },
  {
    name: "Made in Shoreditch",
    country: "UK",
    category: "Arts & Culture",
    url: "https://madeinshoreditch.co.uk/2024/of-a-virtuoso-flutist-feng-di-explores-the-timeless-art-of-the-french-flute-school/"
  },
  {
    name: "Flaunt",
    country: "USA",
    category: "Fashion & Lifestyle",
    url: "http://www.flaunt.com/post/spreads"
  },
  {
    name: "Ourculture Magazine",
    country: "UK",
    category: "Culture & Arts",
    url: "https://ourculturemag.com/2024/05/yuan-zhuang-melancholy-people-have-two-reasons-for-being-so-they-dont-know-why-they-hope/"
  },
  {
    name: "Haute Living",
    country: "USA",
    category: "Luxury Lifestyle",
    url: "https://hauteliving.com/2023/02/vid-garcia-uses-art-to-spread-joy-for-the-present-and-future/726014/"
  },
  {
    name: "Sheen Magazine",
    country: "UK",
    category: "Fashion & Business",
    url: "https://www.sheenmagazine.com/b-never-fails-to-surprise-us-intimate-interview-with-business-bombshell-katrina-scott/"
  },
  {
    name: "London Journal",
    country: "UK",
    category: "Arts & Culture",
    url: "https://londonjournal.co.uk/2024/01/contemporary-craft-exhibition-showcases-innovative-works-at-llschke-gallery/"
  },
  {
    name: "New York Weekly",
    country: "USA",
    category: "Fashion & Design",
    url: "https://nyweekly.com/fashion/jayi-che-weaving-a-symphony-of-history-and-modernity-in-the-threads-of-fashion/"
  },
  {
    name: "Daily Front Row (Fashion Week Daily)",
    country: "UK",
    category: "Fashion & Style",
    url: "https://fashionweekdaily.com/scotch-jayi-che-vision-of-beauty-beyond-convention/"
  },
  {
    name: "Art Voice",
    country: "USA",
    category: "Arts & Design",
    url: "https://artvoice.com/2023/02/interview-fashion-furniture-designer-samaransh/"
  },
  {
    name: "The Art Insider",
    country: "USA",
    category: "Arts & Culture",
    url: "https://www.art-insider.com/exploring-boundaries-the-convergence-of-thought-and-vision-at-the-up-defined-tranquility-exhibition/"
  },
  {
    name: "LAWeekly",
    country: "USA",
    category: "Arts & Culture",
    url: "https://www.laweekly.com/he-xu-exploring-the-deep-integration-of-design-and-culture-at-the-new-york-design-festival/"
  },
  {
    name: "World Art News",
    country: "USA",
    category: "Arts & Culture",
    url: "https://worldart.news/2024/06/13/by-jianna-li-a-captivating-short-film-on-memorys-maze/"
  }
];

const chinesePlatforms: MediaPlatform[] = [
  {
    name: "中国国际艺术(艺术中国)",
    country: "China",
    category: "Culture & Arts",
    url: "http://art.china.cn/zixun/2019-05/20/content_40"
  },
  {
    name: "环球奢侈品",
    country: "China",
    category: "女性时尚",
    url: "https://luxury.huanqiu.com/article/49zylqQtoG"
  },
  {
    name: "国际在线时尚",
    country: "China",
    category: "女性时尚",
    url: "http://ent.cri.cn/20220621/344e9948-b306-69b"
  },
  {
    name: "新浪网收藏",
    country: "China",
    category: "Culture & Arts",
    url: "http://collection.sina.com.cn/2018-11-19/doc-i"
  },
  {
    name: "新浪时尚奢侈品",
    country: "China",
    category: "女性时尚",
    url: "http://fashion.sina.com.cn/l/2023-07-10/1458"
  },
  {
    name: "凤凰网文化",
    country: "China",
    category: "Culture & Arts",
    url: "http://culture.ifeng.com/a/20170503/51040106_"
  }
];

export default function MediaResourcesPage() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    selectedMedia: ''
  });

  const handleShowInterest = (platformName: string) => {
    setFormData({
      name: '',
      email: '',
      message: `Hi! I'm interested in getting media coverage through ${platformName}. Please contact me with more information about your services.`,
      selectedMedia: platformName
    });
    setShowContactModal(true);
    setSubmitStatus('idle');
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
    setSubmitStatus('idle');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Here you would normally send to your backend or email service
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setTimeout(() => {
        handleCloseModal();
      }, 2000);
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setSubmitStatus('error');
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
                        <div className="text-sm text-gray-500">{platform.country}</div>
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
                        <div className="text-sm text-gray-500">{platform.country}</div>
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
            Click the "Interest" button next to any platform above to get started, or contact us 
            for personalized recommendations based on your career goals.
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
                  <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Interest in: <span className="font-medium text-primary-600">{formData.selectedMedia}</span>
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
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-yellow-500 text-white font-medium px-6 py-3 rounded-lg hover:from-primary-600 hover:to-yellow-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2 text-green-700">
                      <Heart className="h-5 w-5" />
                      <span className="font-medium">Message sent successfully!</span>
                    </div>
                    <p className="text-green-600 text-sm mt-1 text-center">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2 text-red-700">
                      <X className="h-5 w-5" />
                      <span className="font-medium">Failed to send message</span>
                    </div>
                    <p className="text-red-600 text-sm mt-1 text-center">
                      Please try again or contact us directly at yichuaned@gmail.com
                    </p>
                  </div>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}