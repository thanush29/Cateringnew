import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  via_whatsapp: boolean;
  status: 'new' | 'contacted' | 'resolved' | 'archived';
  created_at: string;
}

interface ContactInquiriesManagerProps {
  onUpdate: () => void;
}

export function ContactInquiriesManager({ onUpdate }: ContactInquiriesManagerProps) {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [filter, setFilter] = useState<ContactInquiry['status'] | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setIsLoading(true);
    
    const { data, error } = await supabase
      .from('contact_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching contact inquiries:', error);
    } else if (data) {
      console.log('Fetched contact inquiries:', data);
      setInquiries(data);
    }
    
    setIsLoading(false);
    onUpdate();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact inquiry?')) {
      const { error } = await supabase
        .from('contact_inquiries')
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

  const handleStatusChange = async (id: string, status: ContactInquiry['status']) => {
    const { error } = await supabase
      .from('contact_inquiries')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } else {
      fetchInquiries();
    }
  };

  const filteredInquiries = filter === 'all'
    ? inquiries
    : inquiries.filter(i => i.status === filter);

  const statusColors = {
    new: 'bg-blue-100 text-blue-800',
    contacted: 'bg-yellow-100 text-yellow-800',
    resolved: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800'
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
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Contact Inquiries</h2>
          <p className="text-sm text-gray-600">Manage customer messages from the contact form</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['all', 'new', 'contacted', 'resolved', 'archived'] as const).map((status) => {
            const count = status === 'all' 
              ? inquiries.length 
              : inquiries.filter(i => i.status === status).length;
            
            return (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                  filter === status
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <motion.div
            key={inquiry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{inquiry.name}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full ${statusColors[inquiry.status]}`}>
                    {inquiry.status}
                  </span>
                  {inquiry.via_whatsapp && (
                    <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-800">
                      WhatsApp
                    </span>
                  )}
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-amber-600" />
                    <a href={`mailto:${inquiry.email}`} className="text-blue-600 hover:underline">
                      {inquiry.email}
                    </a>
                  </div>
                  {inquiry.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-amber-600" />
                      <a 
                        href={inquiry.via_whatsapp ? `https://wa.me/${inquiry.phone.replace(/\D/g, '')}` : `tel:${inquiry.phone}`} 
                        className="text-blue-600 hover:underline"
                        target={inquiry.via_whatsapp ? '_blank' : undefined}
                        rel={inquiry.via_whatsapp ? 'noopener noreferrer' : undefined}
                      >
                        {inquiry.phone}
                      </a>
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
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
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusChange(inquiry.id, e.target.value as ContactInquiry['status'])}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-sm"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                  <option value="archived">Archived</option>
                </select>
                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  title="Delete inquiry"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-4">
              <MessageSquare className="text-amber-600 mt-1 flex-shrink-0" size={18} />
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Message</p>
                <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredInquiries.length === 0 && !isLoading && (
        <div className="text-center py-12 text-gray-500">
          <Mail size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">
            {filter === 'all' 
              ? 'No contact inquiries yet' 
              : `No ${filter} inquiries`}
          </p>
          <p className="text-sm mt-2">
            {filter === 'all' 
              ? 'Contact inquiries will appear here when customers submit the contact form'
              : `No inquiries with "${filter}" status`}
          </p>
        </div>
      )}
    </div>
  );
}