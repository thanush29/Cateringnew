import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Calendar, Users, MapPin, DollarSign, MessageSquare } from 'lucide-react';
import { supabase, EventSubmission } from '../../lib/supabase';

interface EventSubmissionsViewerProps {
  onUpdate: () => void;
}

export function EventSubmissionsViewer({ onUpdate }: EventSubmissionsViewerProps) {
  const [submissions, setSubmissions] = useState<EventSubmission[]>([]);
  const [filter, setFilter] = useState<EventSubmission['status'] | 'all'>('all');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('plan_your_event_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSubmissions(data);
    }
    onUpdate();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      const { error } = await supabase
        .from('plan_your_event_submissions')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchSubmissions();
      }
    }
  };

  const handleStatusChange = async (id: string, status: EventSubmission['status']) => {
    const { error } = await supabase
      .from('plan_your_event_submissions')
      .update({ status })
      .eq('id', id);

    if (!error) {
      fetchSubmissions();
    }
  };

  const filteredSubmissions = filter === 'all'
    ? submissions
    : submissions.filter(s => s.status === filter);

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    converted: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800'
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Event Inquiries</h2>
        <div className="flex gap-2 flex-wrap">
          {['all', 'new', 'contacted', 'converted', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                filter === status
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredSubmissions.map((submission) => (
          <motion.div
            key={submission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{submission.name}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full ${statusColors[submission.status]}`}>
                    {submission.status}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Email: {submission.email}</p>
                  <p>Phone: {submission.phone}</p>
                  <p className="text-xs text-gray-400">
                    Submitted: {new Date(submission.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={submission.status}
                  onChange={(e) => handleStatusChange(submission.id, e.target.value as EventSubmission['status'])}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="archived">Archived</option>
                </select>
                <button
                  onClick={() => handleDelete(submission.id)}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-start gap-2">
                <Calendar className="text-amber-600 mt-1" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Event Type</p>
                  <p className="font-medium text-gray-800">{submission.event_type}</p>
                </div>
              </div>
              {submission.event_date && (
                <div className="flex items-start gap-2">
                  <Calendar className="text-amber-600 mt-1" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Event Date</p>
                    <p className="font-medium text-gray-800">
                      {new Date(submission.event_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              {submission.guest_count && (
                <div className="flex items-start gap-2">
                  <Users className="text-amber-600 mt-1" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Guest Count</p>
                    <p className="font-medium text-gray-800">{submission.guest_count}</p>
                  </div>
                </div>
              )}
              {submission.budget_range && (
                <div className="flex items-start gap-2">
                  <DollarSign className="text-amber-600 mt-1" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Budget Range</p>
                    <p className="font-medium text-gray-800">{submission.budget_range}</p>
                  </div>
                </div>
              )}
            </div>

            {submission.venue_location && (
              <div className="flex items-start gap-2 mb-4">
                <MapPin className="text-amber-600 mt-1" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Venue Location</p>
                  <p className="font-medium text-gray-800">{submission.venue_location}</p>
                </div>
              </div>
            )}

            {submission.message && (
              <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-4">
                <MessageSquare className="text-amber-600 mt-1" size={18} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Message</p>
                  <p className="text-gray-700">{submission.message}</p>
                </div>
              </div>
            )}

            {submission.via_whatsapp && (
              <div className="mt-4">
                <span className="inline-flex items-center gap-2 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  WhatsApp notification requested
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p>No submissions found.</p>
        </div>
      )}
    </div>
  );
}
