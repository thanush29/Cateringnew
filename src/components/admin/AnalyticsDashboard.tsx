import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign, Star, Phone, Mail, Loader2, Download, Activity } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface AnalyticsDashboardProps {
  onUpdate: () => void;
}

interface AnalyticsData {
  totalInquiries: number;
  totalContacts: number;
  totalTestimonials: number;
  avgRating: number;
  eventTypeBreakdown: { type: string; count: number }[];
  budgetRangeBreakdown: { range: string; count: number }[];
  monthlyTrends: { month: string; events: number; contacts: number }[];
  topRatedCount: number;
  whatsappPreference: number;
  recentActivity: { date: string; events: number; contacts: number }[];
  conversionRate: number;
  growthRate: number;
}

const COLORS = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6'];

export function AnalyticsDashboard({ onUpdate }: AnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const getDateFilter = () => {
    const now = new Date();
    switch (timeRange) {
      case '7d':
        return new Date(now.setDate(now.getDate() - 7)).toISOString();
      case '30d':
        return new Date(now.setDate(now.getDate() - 30)).toISOString();
      case '90d':
        return new Date(now.setDate(now.getDate() - 90)).toISOString();
      default:
        return null;
    }
  };

  const fetchAnalytics = async () => {
    setIsLoading(true);
    const dateFilter = getDateFilter();

    try {
      const eventQuery = supabase.from('event_inquiries').select('*');
      if (dateFilter) eventQuery.gte('created_at', dateFilter);
      const { data: events } = await eventQuery;

      const contactQuery = supabase.from('contact_inquiries').select('*');
      if (dateFilter) contactQuery.gte('created_at', dateFilter);
      const { data: contacts } = await contactQuery;

      const testimonialQuery = supabase.from('testimonials').select('*');
      if (dateFilter) testimonialQuery.gte('created_at', dateFilter);
      const { data: testimonials } = await testimonialQuery;

      const eventTypeMap = new Map<string, number>();
      events?.forEach(e => {
        eventTypeMap.set(e.event_type, (eventTypeMap.get(e.event_type) || 0) + 1);
      });
      const eventTypeBreakdown = Array.from(eventTypeMap.entries())
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);

      const budgetMap = new Map<string, number>();
      events?.forEach(e => {
        if (e.budget_range) {
          budgetMap.set(e.budget_range, (budgetMap.get(e.budget_range) || 0) + 1);
        }
      });
      const budgetRangeBreakdown = Array.from(budgetMap.entries())
        .map(([range, count]) => ({ range, count }))
        .sort((a, b) => b.count - a.count);

      const avgRating = testimonials && testimonials.length > 0
        ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
        : 0;

      const topRatedCount = testimonials?.filter(t => t.rating === 5).length || 0;

      const whatsappCount = contacts?.filter(c => c.via_whatsapp).length || 0;
      const whatsappPreference = contacts && contacts.length > 0
        ? Math.round((whatsappCount / contacts.length) * 100)
        : 0;

      const monthlyMap = new Map<string, { events: number; contacts: number }>();
      const last6Months = Array.from({ length: 6 }, (_, i) => {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        return d.toISOString().slice(0, 7);
      }).reverse();

      last6Months.forEach(month => {
        monthlyMap.set(month, { events: 0, contacts: 0 });
      });

      events?.forEach(e => {
        const month = e.created_at.slice(0, 7);
        if (monthlyMap.has(month)) {
          const current = monthlyMap.get(month)!;
          monthlyMap.set(month, { ...current, events: current.events + 1 });
        }
      });

      contacts?.forEach(c => {
        const month = c.created_at.slice(0, 7);
        if (monthlyMap.has(month)) {
          const current = monthlyMap.get(month)!;
          monthlyMap.set(month, { ...current, contacts: current.contacts + 1 });
        }
      });

      const monthlyTrends = Array.from(monthlyMap.entries()).map(([month, data]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        events: data.events,
        contacts: data.contacts,
        total: data.events + data.contacts
      }));

      const convertedCount = events?.filter(e => e.status === 'converted').length || 0;
      const conversionRate = events && events.length > 0 ? Math.round((convertedCount / events.length) * 100) : 0;

      const firstMonth = monthlyTrends[0]?.total || 0;
      const lastMonth = monthlyTrends[monthlyTrends.length - 1]?.total || 0;
      const growthRate = firstMonth > 0 ? Math.round(((lastMonth - firstMonth) / firstMonth) * 100) : 0;

      setAnalytics({
        totalInquiries: events?.length || 0,
        totalContacts: contacts?.length || 0,
        totalTestimonials: testimonials?.length || 0,
        avgRating,
        eventTypeBreakdown,
        budgetRangeBreakdown,
        monthlyTrends,
        topRatedCount,
        whatsappPreference,
        recentActivity: [],
        conversionRate,
        growthRate
      });

      onUpdate();
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToPDF = () => {
    if (!analytics) return;

    const reportContent = `
      BUSINESS ANALYTICS REPORT
      Generated: ${new Date().toLocaleDateString()}
      Time Range: ${timeRange === 'all' ? 'All Time' : timeRange.toUpperCase()}
      
      ═══════════════════════════════════════════════════════════
      
      KEY METRICS
      ───────────────────────────────────────────────────────────
      • Total Event Inquiries: ${analytics.totalInquiries}
      • Total Contact Messages: ${analytics.totalContacts}
      • Average Rating: ${analytics.avgRating.toFixed(1)} ⭐
      • Five-Star Reviews: ${analytics.topRatedCount}
      • Conversion Rate: ${analytics.conversionRate}%
      • Growth Rate: ${analytics.growthRate}%
      • WhatsApp Preference: ${analytics.whatsappPreference}%
      
      ═══════════════════════════════════════════════════════════
      
      EVENT TYPES DISTRIBUTION
      ───────────────────────────────────────────────────────────
${analytics.eventTypeBreakdown.map(item => {
  const percentage = analytics.totalInquiries > 0 ? Math.round((item.count / analytics.totalInquiries) * 100) : 0;
  return `      • ${item.type}: ${item.count} (${percentage}%)`;
}).join('\n')}
      
      ═══════════════════════════════════════════════════════════
      
      BUDGET RANGE DISTRIBUTION
      ───────────────────────────────────────────────────────────
${analytics.budgetRangeBreakdown.map(item => {
  const percentage = analytics.totalInquiries > 0 ? Math.round((item.count / analytics.totalInquiries) * 100) : 0;
  return `      • ${item.range}: ${item.count} (${percentage}%)`;
}).join('\n')}
      
      ═══════════════════════════════════════════════════════════
      
      MONTHLY TRENDS (Last 6 Months)
      ───────────────────────────────────────────────────────────
${analytics.monthlyTrends.map(trend => 
  `      • ${trend.month}: ${trend.events} events, ${trend.contacts} contacts (Total: ${trend.total})`
).join('\n')}
      
      ═══════════════════════════════════════════════════════════
      
      BUSINESS INSIGHTS
      ───────────────────────────────────────────────────────────
      • Total Engagement: ${analytics.totalInquiries + analytics.totalContacts} interactions
      • Customer Satisfaction: ${analytics.avgRating >= 4.5 ? 'Excellent' : analytics.avgRating >= 4 ? 'Very Good' : 'Good'}
      • Communication Preference: ${analytics.whatsappPreference > 50 ? 'Primarily WhatsApp' : 'Mixed channels'}
      • Business Trend: ${analytics.growthRate > 0 ? `Growing by ${analytics.growthRate}%` : analytics.growthRate < 0 ? `Declining by ${Math.abs(analytics.growthRate)}%` : 'Stable'}
      
      ═══════════════════════════════════════════════════════════
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={48} className="animate-spin text-amber-600" />
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
          <p className="text-sm text-gray-600">Business insights and performance metrics</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['7d', '30d', '90d', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                timeRange === range
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {range === 'all' ? 'All Time' : range.toUpperCase()}
            </button>
          ))}
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Event Inquiries</p>
              <p className="text-3xl font-bold mt-1">{analytics.totalInquiries}</p>
              <p className="text-blue-100 text-xs mt-1">{analytics.conversionRate}% conversion</p>
            </div>
            <Mail size={40} className="text-blue-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Contact Messages</p>
              <p className="text-3xl font-bold mt-1">{analytics.totalContacts}</p>
              <p className="text-green-100 text-xs mt-1">{analytics.whatsappPreference}% via WhatsApp</p>
            </div>
            <Phone size={40} className="text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Avg. Rating</p>
              <p className="text-3xl font-bold mt-1">{analytics.avgRating.toFixed(1)}</p>
              <p className="text-yellow-100 text-xs mt-1">{analytics.topRatedCount} five-star reviews</p>
            </div>
            <Star size={40} className="text-yellow-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Growth Rate</p>
              <p className="text-3xl font-bold mt-1">{analytics.growthRate > 0 ? '+' : ''}{analytics.growthRate}%</p>
              <p className="text-purple-100 text-xs mt-1">monthly trend</p>
            </div>
            <TrendingUp size={40} className="text-purple-200" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="text-amber-600" size={20} />
            Event Types Distribution
          </h3>
          {analytics.eventTypeBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.eventTypeBreakdown}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.type} (${entry.count})`}
                >
                  {analytics.eventTypeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-sm text-center py-12">No event data available</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <DollarSign className="text-amber-600" size={20} />
            Budget Range Distribution
          </h3>
          {analytics.budgetRangeBreakdown.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.budgetRangeBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-sm text-center py-12">No budget data available</p>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="text-amber-600" size={20} />
          6-Month Inquiry Trends
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={analytics.monthlyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="events" stroke="#3b82f6" strokeWidth={3} name="Event Inquiries" />
            <Line type="monotone" dataKey="contacts" stroke="#10b981" strokeWidth={3} name="Contact Messages" />
            <Line type="monotone" dataKey="total" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="Total" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}