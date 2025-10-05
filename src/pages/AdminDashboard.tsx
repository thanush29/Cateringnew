import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Image, MessageSquare, Mail, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { GalleryManager } from '../components/admin/GalleryManager';
import { TestimonialManager } from '../components/admin/TestimonialManager';
import { EventSubmissionsViewer } from '../components/admin/EventSubmissionsViewer';
import { ContactInquiriesManager } from '../components/admin/ContactInquiriesManager';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState({
    galleryImages: 0,
    testimonials: 0,
    eventSubmissions: 0,
    contactInquiries: 0
  });
  const [activeTab, setActiveTab] = useState<'gallery' | 'testimonials' | 'submissions' | 'contacts'>('gallery');

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    const [gallery, testimonials, submissions, contacts] = await Promise.all([
      supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      supabase.from('event_inquiries').select('id', { count: 'exact', head: true }),
      supabase.from('contact_inquiries').select('id', { count: 'exact', head: true })
    ]);

    setStats({
      galleryImages: gallery.count || 0,
      testimonials: testimonials.count || 0,
      eventSubmissions: submissions.count || 0,
      contactInquiries: contacts.count || 0
    });
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'gallery', label: 'Gallery', icon: Image, count: stats.galleryImages },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, count: stats.testimonials },
    { id: 'submissions', label: 'Event Inquiries', icon: Mail, count: stats.eventSubmissions },
    { id: 'contacts', label: 'Contact Inquiries', icon: Phone, count: stats.contactInquiries }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-300/20 to-orange-300/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <header className="bg-white/80 backdrop-blur-xl shadow-xl border-b border-amber-200/50 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600">
                  Admin Dashboard
                </span>
              </h1>
              <p className="text-sm text-gray-600 font-medium">Shanvik Catering & Event Management</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={handleSignOut}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              <LogOut size={20} />
              Sign Out
            </motion.button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.08, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-2xl shadow-xl p-6 cursor-pointer transition-all border-2 ${
                  isActive
                    ? 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white border-amber-300 shadow-amber-200'
                    : 'bg-white/90 backdrop-blur-sm hover:shadow-2xl border-transparent hover:border-amber-200'
                }`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
              >
                <div className="flex flex-col items-center text-center">
                  <Icon className={isActive ? 'text-white' : 'text-amber-600'} size={32} />
                  <span className={`text-3xl font-bold mt-3 ${isActive ? 'text-white' : 'text-gray-800'}`}>
                    {tab.count}
                  </span>
                  <h3 className={`text-sm font-semibold mt-2 ${isActive ? 'text-white' : 'text-gray-700'}`}>
                    {tab.label}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {activeTab === 'gallery' && <GalleryManager onUpdate={fetchStats} />}
          {activeTab === 'testimonials' && <TestimonialManager onUpdate={fetchStats} />}
          {activeTab === 'submissions' && <EventSubmissionsViewer onUpdate={fetchStats} />}
          {activeTab === 'contacts' && <ContactInquiriesManager onUpdate={fetchStats} />}
        </motion.div>
      </div>
    </div>
  );
}