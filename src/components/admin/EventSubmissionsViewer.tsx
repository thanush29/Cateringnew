import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Calendar, DollarSign, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface EventInquiry {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  budget_range: string | null;
  additional_details: string | null;
  status: 'new' | 'contacted' | 'converted' | 'archived';
  created_at: string;
}

interface EventSubmissionsViewerProps {
  onUpdate: () => void;
}

export function EventSubmissionsViewer({ onUpdate }: EventSubmissionsViewerProps) {
  const [inquiries, setInquiries] = useState<EventInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    
    const { data, error } = await supabase
      .from('event_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching inquiries:', error);
    } else if (data) {
      console.log('Fetched inquiries:', data);
      setInquiries(data);
    }
    
    setIsLoading(false);
    onUpdate();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      const { error } = await supabase
        .from('event_inquiries')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting inquiry:', error);
        alert('Failed to delete inquiry');
      } else {
        fetchInquiries();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={48} className="animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Event Inquiries</h2>
      </div>

      <div className="space-y-4">
        {inquiries.map((inquiry) => (
          <motion.div
            key={inquiry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{inquiry.full_name}</h3>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Email: <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">{inquiry.email}</a></p>
                  <p>Phone: <a href={`tel:${inquiry.phone}`} className="text-blue-600 hover:underline">{inquiry.phone}</a></p>
                  <p className="text-xs text-gray-400">
                    Submitted: {new Date(inquiry.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  title="Delete inquiry"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div className="flex items-start gap-2">
                <Calendar className="text-amber-600 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Event Type</p>
                  <p className="font-medium text-gray-800">{inquiry.event_type}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Calendar className="text-amber-600 mt-1 flex-shrink-0" size={18} />
                <div>
                  <p className="text-xs text-gray-500">Event Date</p>
                  <p className="font-medium text-gray-800">
                    {new Date(inquiry.event_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {inquiry.budget_range && (
                <div className="flex items-start gap-2">
                  <DollarSign className="text-amber-600 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-gray-500">Budget Range</p>
                    <p className="font-medium text-gray-800">{inquiry.budget_range}</p>
                  </div>
                </div>
              )}
            </div>

            {inquiry.additional_details && (
              <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-4">
                <MessageSquare className="text-amber-600 mt-1 flex-shrink-0" size={18} />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Additional Details</p>
                  <p className="text-gray-700 whitespace-pre-wrap">{inquiry.additional_details}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {inquiries.length === 0 && !isLoading && (
        <div className="text-center py-12 text-gray-500">
          <Calendar size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No inquiries yet</p>
          <p className="text-sm mt-2">
            Event inquiries will appear here when customers submit the form
          </p>
        </div>
      )}
    </div>
  );
}