import logoImage from '/Site-logo.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Image, MessageSquare, Mail, Phone, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { GalleryManager } from '../components/admin/GalleryManager';
import { TestimonialManager } from '../components/admin/TestimonialManager';
import { EventSubmissionsViewer } from '../components/admin/EventSubmissionsViewer';
import { ContactInquiriesManager } from '../components/admin/ContactInquiriesManager';
import { AnalyticsDashboard } from '../components/admin/AnalyticsDashboard';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState({
    galleryImages: 4,
    testimonials: 0,
    eventSubmissions: 0,
    contactInquiries: 0
  });
  const [activeTab, setActiveTab] = useState<'analytics' | 'gallery' | 'testimonials' | 'submissions' | 'contacts'>('analytics');

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      const [gallery, testimonials, submissions, contacts] = await Promise.all([
        supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('event_inquiries').select('id', { count: 'exact', head: true }),
        supabase.from('contact_inquiries').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        galleryImages: gallery.count ?? stats.galleryImages,
        testimonials: testimonials.count ?? stats.testimonials,
        eventSubmissions: submissions.count ?? stats.eventSubmissions,
        contactInquiries: contacts.count ?? stats.contactInquiries
      });
    } catch (err) {
      // keep defaults if fetch fails
      console.warn('Failed to fetch stats, using defaults', err);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3, count: 12 },
    { id: 'gallery', label: 'Gallery', icon: Image, count: stats.galleryImages },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, count: stats.testimonials },
    { id: 'submissions', label: 'Event Inquiries', icon: Mail, count: stats.eventSubmissions },
    { id: 'contacts', label: 'Contact Inquiries', icon: Phone, count: stats.contactInquiries }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark hero video background like login page */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/image.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/heroSection.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/45 to-black/55"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Soft halo particle layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full bg-white/20"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -40 - Math.random() * 30, 0], opacity: [0.2, 0.9, 0.2], scale: [1, 1.6, 1] }}
              transition={{ duration: 6 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 3 }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/6 backdrop-blur-xl border-b border-white/10 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-4">
              <img src={logoImage} alt="Site logo" className="w-14 h-14 rounded-full p-1 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-xl" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg leading-tight">
                  <span className="bg-clip-text text-white">Admin Dashboard</span>
                </h1>
                <p className="text-sm text-white/80 font-medium drop-shadow-md">Shanvik Catering & Event Management</p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={handleSignOut}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-5 py-3 rounded-2xl transition-all shadow-xl font-semibold"
            >
              <LogOut size={18} />
              Sign Out
            </motion.button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: 0.2 + index * 0.06 }}
                whileHover={{ scale: 1.06, y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`rounded-2xl p-6 cursor-pointer transition-all border-2 ${isActive ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white border-white/20 shadow-[0_10px_40px_rgba(168,85,247,0.14)]' : 'bg-white/6 backdrop-blur-sm hover:shadow-2xl border-white/6 hover:border-white/10'}`}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className={isActive ? 'text-white' : 'text-white/80'} size={30} />
                  <span className={`text-3xl font-bold mt-3 ${isActive ? 'text-white' : 'text-white'}`}>{tab.count}</span>
                  <h3 className={`text-sm font-semibold mt-2 ${isActive ? 'text-white/90' : 'text-white/80'}`}>{tab.label}</h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="rounded-xl p-6 bg-white/6 backdrop-blur-md border border-white/10 shadow-lg">
          {/* Ensure children components inherit dark glass style - keep logic same */}
          {activeTab === 'analytics' && <AnalyticsDashboard onUpdate={fetchStats} />}
          {activeTab === 'gallery' && <GalleryManager onUpdate={fetchStats} />}
          {activeTab === 'testimonials' && <TestimonialManager onUpdate={fetchStats} />}
          {activeTab === 'submissions' && <EventSubmissionsViewer onUpdate={fetchStats} />}
          {activeTab === 'contacts' && <ContactInquiriesManager onUpdate={fetchStats} />}
        </motion.div>
      </main>

      {/* Subtle neon corner orbs for decoration */}
      <motion.div className="absolute bottom-8 left-6 w-36 h-36 rounded-full blur-3xl bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 pointer-events-none" animate={{ x: [0, 10, 0], y: [0, -6, 0] }} transition={{ duration: 12, repeat: Infinity }} />

    </div>
  );
}

