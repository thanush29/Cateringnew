import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin, Heart, Code, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '/Site-logo.png';

export function Footer() {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

  const developers = [
    { name: 'Thanush', linkedin: 'https://www.linkedin.com/in/thanush29/', portfolio: 'https://thanush29-ai.web.app/' },
    { name: 'Santhosh', linkedin: 'https://www.linkedin.com/in/santhosh-ai-dev/' },
    { name: 'Karthick Raj', linkedin: 'https://www.linkedin.com/in/karthick-raja--s/' }
  ];

  const policyContent = {
    privacy: {
      title: 'Privacy Policy',
      content: `
        <div class="space-y-6">
          <div>
            <p class="text-sm text-gray-500 mb-4">Last updated: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p class="text-gray-700 leading-relaxed">At Shanvik Catering & Events, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.</p>
          </div>
          
          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">1. Information We Collect</h4>
            <p class="text-gray-700 leading-relaxed mb-3">When you interact with our services, we collect the following information:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Personal Information:</strong> Full name, email address, phone number</li>
              <li><strong>Event Details:</strong> Event type, event date, budget range, guest count</li>
              <li><strong>Additional Information:</strong> Special requests, dietary requirements, venue details</li>
              <li><strong>Communication Data:</strong> Messages sent through our contact forms or WhatsApp</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">2. How We Collect Information</h4>
            <p class="text-gray-700 leading-relaxed mb-3">We collect information through:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Event Planning Form:</strong> Full name, email, phone, event type, date, and budget range</li>
              <li><strong>Contact Form:</strong> Name, email, phone number, and message</li>
              <li><strong>WhatsApp Communications:</strong> Messages and inquiries sent via WhatsApp</li>
              <li><strong>Direct Communications:</strong> Phone calls, emails, and in-person meetings</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">3. How We Use Your Information</h4>
            <p class="text-gray-700 leading-relaxed mb-3">Your information is used to:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Process and confirm your event bookings</li>
              <li>Communicate with you regarding your event requirements</li>
              <li>Provide customized menu suggestions and service recommendations</li>
              <li>Send booking confirmations and event reminders</li>
              <li>Improve our services based on your feedback</li>
              <li>Respond to inquiries within 24 hours as promised</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">4. Data Security</h4>
            <p class="text-gray-700 leading-relaxed">We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Your data is stored securely and accessed only by authorized personnel.</p>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">5. Information Sharing</h4>
            <p class="text-gray-700 leading-relaxed">We do not sell, trade, or rent your personal information to third parties. We may share your information only with:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-3">
              <li>Our trusted service partners required to fulfill your event (e.g., venue coordinators)</li>
              <li>Legal authorities if required by law</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">6. Your Rights</h4>
            <p class="text-gray-700 leading-relaxed mb-3">You have the right to:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Access your personal data we hold</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">7. Data Retention</h4>
            <p class="text-gray-700 leading-relaxed">We retain your information for as long as necessary to provide our services and comply with legal obligations. Event-related data is typically retained for 3 years for reference and improvement purposes.</p>
          </div>

          <div class="bg-[#d4af37]/10 p-4 rounded-lg border-l-4 border-[#d4af37]">
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-2">Contact Us About Privacy</h4>
            <p class="text-gray-700 leading-relaxed mb-2">If you have questions about this Privacy Policy or wish to exercise your rights:</p>
            <p class="text-gray-700"><strong>Email:</strong> mohankrish25@gmail.com</p>
            <p class="text-gray-700"><strong>Phone:</strong> +91 72002 19061</p>
            <p class="text-gray-700"><strong>Location:</strong> Chennai, Tamil Nadu, India</p>
          </div>
        </div>
      `
    },
    terms: {
      title: 'Terms of Service',
      content: `
        <div class="space-y-6">
          <div>
            <p class="text-sm text-gray-500 mb-4">Last updated: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p class="text-gray-700 leading-relaxed">Welcome to Shanvik Catering & Events. By using our services, you agree to comply with and be bound by these Terms of Service. Please read them carefully.</p>
          </div>
          
          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">1. Acceptance of Terms</h4>
            <p class="text-gray-700 leading-relaxed">By submitting an inquiry through our event planning form, contact form, or WhatsApp, and by engaging our catering services, you accept and agree to be bound by these Terms of Service.</p>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">2. Service Inquiry & Booking Process</h4>
            <p class="text-gray-700 leading-relaxed mb-3">Our booking process includes:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Initial Inquiry:</strong> Submit details via event planning form, contact form, or WhatsApp</li>
              <li><strong>24-Hour Response:</strong> We commit to responding to all inquiries within 24 hours</li>
              <li><strong>Consultation:</strong> Discuss your requirements including event type, date, budget, and preferences</li>
              <li><strong>Proposal:</strong> Receive a customized catering proposal and menu options</li>
              <li><strong>Confirmation:</strong> Booking confirmed upon agreement and advance payment</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">3. Event Types & Requirements</h4>
            <p class="text-gray-700 leading-relaxed mb-3">We cater to various events including:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Weddings</li>
              <li>Corporate Events</li>
              <li>Private Parties</li>
              <li>Birthdays</li>
              <li>Anniversaries</li>
              <li>Other special occasions</li>
            </ul>
            <p class="text-gray-700 leading-relaxed mt-3">Minimum advance notice of 2 weeks is recommended for optimal service planning.</p>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">4. Budget & Pricing</h4>
            <p class="text-gray-700 leading-relaxed mb-3">We offer flexible pricing across various budget ranges:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Under ₹1 Lakh</li>
              <li>₹1 - ₹3 Lakhs</li>
              <li>₹3 - ₹5 Lakhs</li>
              <li>₹5 - ₹10 Lakhs</li>
              <li>Above ₹10 Lakhs</li>
            </ul>
            <p class="text-gray-700 leading-relaxed mt-3">Final pricing depends on guest count, menu selection, service requirements, and event duration. Detailed quotations will be provided before confirmation.</p>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">5. Payment Terms</h4>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Advance Payment:</strong> 30-50% advance required to confirm booking</li>
              <li><strong>Payment Schedule:</strong> Remaining balance due as per agreed timeline</li>
              <li><strong>Payment Methods:</strong> Bank transfer, UPI, cash, or cheque</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">6. Cancellation & Rescheduling Policy</h4>
            <p class="text-gray-700 leading-relaxed mb-3"><strong>Cancellation by Client:</strong></p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>30+ days before event: 75% refund of advance</li>
              <li>15-30 days before event: 50% refund of advance</li>
              <li>Less than 15 days: No refund</li>
            </ul>
            <p class="text-gray-700 leading-relaxed mt-3"><strong>Rescheduling:</strong> Events can be rescheduled once without penalty if notified 30+ days in advance.</p>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">7. Menu & Dietary Requirements</h4>
            <p class="text-gray-700 leading-relaxed">We accommodate various dietary requirements including vegetarian, vegan, gluten-free, and allergen-free options. Please inform us of all dietary restrictions and allergies in the "Additional Details" section or contact form message.</p>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">8. Service Delivery & Quality</h4>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>All dishes prepared fresh using quality ingredients</li>
              <li>Professional staff for service and presentation</li>
              <li>Adherence to food safety and hygiene standards</li>
              <li>Menu items as confirmed in writing</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">9. Liability</h4>
            <p class="text-gray-700 leading-relaxed">While we take utmost care in food preparation and service:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-3">
              <li>We are not liable for allergic reactions or dietary issues not communicated to us in advance</li>
              <li>Force majeure events (natural disasters, pandemics, etc.) may affect service delivery</li>
              <li>Venue-related issues are the responsibility of the client or venue management</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">10. Communication Channels</h4>
            <p class="text-gray-700 leading-relaxed mb-3">You can reach us through:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Event Planning Form:</strong> For comprehensive event inquiries</li>
              <li><strong>Contact Form:</strong> For general questions and messages</li>
              <li><strong>WhatsApp:</strong> For quick communication and updates</li>
              <li><strong>Phone:</strong> +91 72002 19061</li>
              <li><strong>Email:</strong> mohankrish25@gmail.com</li>
            </ul>
          </div>

          <div class="bg-[#d4af37]/10 p-4 rounded-lg border-l-4 border-[#d4af37]">
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-2">Questions About Terms?</h4>
            <p class="text-gray-700 leading-relaxed">For questions or clarifications regarding these Terms of Service, please contact us at +91 72002 19061 or mohankrish25@gmail.com</p>
          </div>
        </div>
      `
    },
    cookies: {
      title: 'Cookie Notice',
      content: `
        <div class="space-y-6">
          <div>
            <p class="text-sm text-gray-500 mb-4">Last updated: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p class="text-gray-700 leading-relaxed">This Cookie Notice explains how Shanvik Catering & Events uses cookies and similar technologies to enhance your browsing experience on our website.</p>
          </div>
          
          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">1. What Are Cookies?</h4>
            <p class="text-gray-700 leading-relaxed">Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit our website. They help us provide you with a better, faster, and safer experience by remembering your preferences and understanding how you use our site.</p>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">2. How We Use Cookies</h4>
            <p class="text-gray-700 leading-relaxed mb-3">We use cookies to:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Remember your form inputs (Event Planning Form, Contact Form)</li>
              <li>Keep you logged in if you create an account</li>
              <li>Understand how visitors interact with our website</li>
              <li>Improve website performance and user experience</li>
              <li>Remember your language and display preferences</li>
              <li>Track which pages are most popular</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">3. Types of Cookies We Use</h4>
            
            <div class="space-y-4 mt-3">
              <div class="bg-blue-50 p-4 rounded-lg">
                <h5 class="font-bold text-[#1e3a8a] mb-2">Essential Cookies (Required)</h5>
                <p class="text-gray-700 text-sm leading-relaxed">These cookies are necessary for the website to function properly. They enable core functionality such as:</p>
                <ul class="list-disc list-inside text-gray-700 text-sm ml-4 mt-2">
                  <li>Form submission (Event Planning Form, Contact Form)</li>
                  <li>Session management</li>
                  <li>Security features</li>
                  <li>WhatsApp integration functionality</li>
                </ul>
              </div>

              <div class="bg-green-50 p-4 rounded-lg">
                <h5 class="font-bold text-[#1e3a8a] mb-2">Performance Cookies</h5>
                <p class="text-gray-700 text-sm leading-relaxed">These cookies help us understand how visitors use our website by collecting anonymous information about:</p>
                <ul class="list-disc list-inside text-gray-700 text-sm ml-4 mt-2">
                  <li>Pages visited most frequently</li>
                  <li>Time spent on different pages</li>
                  <li>Any error messages encountered</li>
                  <li>Form completion rates</li>
                </ul>
              </div>

              <div class="bg-purple-50 p-4 rounded-lg">
                <h5 class="font-bold text-[#1e3a8a] mb-2">Functionality Cookies</h5>
                <p class="text-gray-700 text-sm leading-relaxed">These cookies remember your preferences and choices such as:</p>
                <ul class="list-disc list-inside text-gray-700 text-sm ml-4 mt-2">
                  <li>Event type selections</li>
                  <li>Budget range preferences</li>
                  <li>Form field auto-fill data</li>
                  <li>Language and region settings</li>
                </ul>
              </div>

              <div class="bg-amber-50 p-4 rounded-lg">
                <h5 class="font-bold text-[#1e3a8a] mb-2">Analytics Cookies</h5>
                <p class="text-gray-700 text-sm leading-relaxed">We use analytics cookies to:</p>
                <ul class="list-disc list-inside text-gray-700 text-sm ml-4 mt-2">
                  <li>Track visitor behavior patterns</li>
                  <li>Measure form submission success rates</li>
                  <li>Understand which services are most popular</li>
                  <li>Improve our website based on user data</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">4. Third-Party Cookies</h4>
            <p class="text-gray-700 leading-relaxed mb-3">We may use third-party services that set cookies on our website:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Google Analytics:</strong> To understand website usage patterns</li>
              <li><strong>Social Media Platforms:</strong> For Instagram, Facebook, LinkedIn sharing features</li>
              <li><strong>WhatsApp Business:</strong> For WhatsApp integration</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">5. Data Collected Through Forms</h4>
            <p class="text-gray-700 leading-relaxed mb-3">When you use our forms, cookies help remember:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Event Planning Form:</strong> Full name, email, phone, event type, event date, budget range, additional details</li>
              <li><strong>Contact Form:</strong> Name, email, phone number, message</li>
            </ul>
            <p class="text-gray-700 leading-relaxed mt-3">This data is stored temporarily to prevent loss during form submission and improve user experience.</p>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">6. Managing Cookies</h4>
            <p class="text-gray-700 leading-relaxed mb-3">You can control and manage cookies in several ways:</p>
            
            <div class="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <h5 class="font-semibold text-gray-800 mb-1">Browser Settings</h5>
                <p class="text-gray-700 text-sm">Most browsers allow you to:</p>
                <ul class="list-disc list-inside text-gray-700 text-sm ml-4 mt-1">
                  <li>View and delete cookies</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies</li>
                  <li>Delete cookies when closing browser</li>
                </ul>
              </div>
              
              <div>
                <h5 class="font-semibold text-gray-800 mb-1">Important Note</h5>
                <p class="text-gray-700 text-sm">Disabling cookies may affect website functionality. Specifically:</p>
                <ul class="list-disc list-inside text-gray-700 text-sm ml-4 mt-1">
                  <li>Forms may not work properly</li>
                  <li>Your preferences won't be saved</li>
                  <li>WhatsApp integration may not function</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">7. Cookie Duration</h4>
            <p class="text-gray-700 leading-relaxed mb-3">Our cookies have different lifespans:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain for a set period (typically 30-365 days) to remember your preferences</li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-3">8. Updates to Cookie Notice</h4>
            <p class="text-gray-700 leading-relaxed">We may update this Cookie Notice periodically to reflect changes in our practices or for legal and regulatory reasons. Please check this page regularly for updates.</p>
          </div>

          <div class="bg-[#d4af37]/10 p-4 rounded-lg border-l-4 border-[#d4af37]">
            <h4 class="text-lg font-bold text-[#1e3a8a] mb-2">Questions About Cookies?</h4>
            <p class="text-gray-700 leading-relaxed mb-2">If you have questions about how we use cookies:</p>
            <p class="text-gray-700"><strong>Email:</strong> mohankrish25@gmail.com</p>
            <p class="text-gray-700"><strong>Phone:</strong> +91 72002 19061</p>
          </div>
        </div>
      `
    }
  };

  const openModal = (type: 'privacy' | 'terms' | 'cookies') => {
    setModalContent(policyContent[type]);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <footer className="relative bg-[#1e3a8a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={logoImage}
                  alt="Shanvik Catering & Events"
                  className="h-12 w-auto"
                />
                <div>
                  <h3 className="text-xl font-display font-bold text-white">Shanvik Catering & Events</h3>
                  <p className="text-[#d4af37] text-xs">Turning Moments into Memories</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-2">
                Creating unforgettable culinary experiences with passion, tradition, and excellence.
              </p>
              <p className="text-[#d4af37] text-sm font-medium mb-4">
                Turning moments into memories since 2013
              </p>
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Heart size={16} className="fill-current" />
                <span className="text-sm font-medium">Made with love since 2013</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="font-display font-semibold text-[#d4af37] mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { href: '/#story', label: 'Our Story' },
                  { href: '/#services', label: 'Services' },
                  { href: '/#gallery', label: 'Gallery' },
                  { href: '/#testimonials', label: 'Testimonials' },
                  { href: '/#contact', label: 'Contact Us' }
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        
                        if (link.href.includes('#')) {
                          const hash = link.href.split('#')[1];
                          
                          // Function to scroll to element with retries
                          const scrollToElement = (elementId: string, retries = 3) => {
                            const element = document.querySelector(`#${elementId}`);
                            if (element) {
                              // Use setTimeout to ensure smooth scroll happens after rendering
                              setTimeout(() => {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }, 50);
                            } else if (retries > 0) {
                              // Retry if element not found
                              setTimeout(() => {
                                scrollToElement(elementId, retries - 1);
                              }, 300);
                            }
                          };
                          
                          // If on home page, scroll to section
                          if (window.location.pathname === '/') {
                            scrollToElement(hash);
                          } else {
                            // If not on home page, navigate to home and scroll
                            navigate('/');
                            // Wait longer for page navigation and rendering
                            setTimeout(() => {
                              scrollToElement(hash);
                            }, 800);
                          }
                        } else {
                          // For non-hash links, just navigate
                          navigate(link.href);
                        }
                      }}
                      className="text-gray-300 hover:text-[#d4af37] transition-all duration-300 hover:translate-x-2 inline-flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#d4af37] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-display font-semibold text-[#d4af37] mb-6 text-lg">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-300 hover:text-[#d4af37] transition-colors group">
                  <MapPin size={20} className="text-[#d4af37] mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Chennai, Tamil Nadu, India</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300 hover:text-[#d4af37] transition-colors group">
                  <Phone size={20} className="text-[#d4af37] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="tel:+917200219061" className="text-sm">+91 72002 19061</a>
                </li>
                <li className="flex items-center gap-3 text-gray-300 hover:text-[#d4af37] transition-colors group">
                  <Mail size={20} className="text-[#d4af37] flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="mailto:mohankrish25@gmail.com" className="text-sm">mohankrish25@gmail.com</a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="font-display font-semibold text-[#d4af37] mb-6 text-lg">Follow Us</h4>
              <p className="text-gray-300 text-sm mb-6">Stay connected for latest updates and culinary inspirations</p>
              <div className="flex gap-4">
                {[
                  { href: 'https://instagram.com/shanvikcateringevents', icon: Instagram, color: 'hover:bg-pink-600' },
                  { href: 'https://facebook.com', icon: Facebook, color: 'hover:bg-blue-600' },
                  { href: 'https://linkedin.com', icon: Linkedin, color: 'hover:bg-blue-700' }
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#d4af37] transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      whileHover={{ y: -5 }}
                      aria-label={social.icon.name}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="border-t border-white/10 pt-8">
            {/* Center-aligned copyright and developer credits */}
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.div 
                className="flex flex-col items-center gap-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-gray-400 text-sm">
                  © {currentYear} <span className="text-[#d4af37] font-semibold">shanvikcateringevents</span>. All Rights Reserved
                </p>
                
                <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-full border border-white/10">
                  <Code size={18} className="text-[#d4af37]" />
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-xs">Built with</span>
                    <Heart size={12} className="text-red-400 fill-current animate-pulse" />
                    <span className="text-xs">by</span>
                    <div className="flex items-center gap-2">
                      {developers.map((dev, index) => (
                        <span key={index} className="flex items-center">
                          <a
                            href={dev.portfolio || dev.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#d4af37] hover:text-white transition-colors font-medium text-xs hover:underline"
                          >
                            {dev.name}
                          </a>
                          {index < developers.length - 1 && (
                            <span className="mx-1.5 text-gray-500">•</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Policy Links */}
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                <button 
                  onClick={() => openModal('privacy')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span>•</span>
                <button 
                  onClick={() => openModal('terms')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
                <span>•</span>
                <button 
                  onClick={() => openModal('cookies')}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Cookie Notice
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header - Fixed */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] text-white px-6 py-5 flex items-center justify-between shadow-lg">
                <h2 className="text-2xl font-bold">{modalContent.title}</h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 hover:rotate-90"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
                <div dangerouslySetInnerHTML={{ __html: modalContent.content }} />
              </div>

              {/* Modal Footer - Fixed */}
              <div className="sticky bottom-0 z-10 bg-gradient-to-t from-gray-100 to-gray-50 px-6 py-4 border-t border-gray-200 shadow-lg">
                <button
                  onClick={closeModal}
                  className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1e3a8a] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}