'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/contexts/AuthContext';

export default function CreateAuctionPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    startingPrice: '',
    bidIncrement: '',
    duration: '24',
    imageUrl: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("You must be logged in to create an auction.");
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      return toast.error("Authentication error.");
    }
    setIsLoading(true);

    const now = new Date();
    const startTime = now.toISOString();
    const endTime = new Date(now.getTime() + Number(formData.duration) * 60 * 60 * 1000).toISOString();

    const { error } = await supabase.from('auctions').insert({
      item_name: formData.itemName,
      description: formData.description,
      starting_price: parseFloat(formData.startingPrice),
      bid_increment: parseFloat(formData.bidIncrement),
      image_url: formData.imageUrl,
      start_time: startTime,
      end_time: endTime,
      seller_id: user.id,
      status: 'active',
    });

    setIsLoading(false);

    if (error) {
      console.error("Error creating auction:", error);
      toast.error(error.message);
    } else {
      toast.success("Auction created successfully!");
      router.push('/');
      router.refresh();
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Create a New Auction</h1>
            <p className="text-gray-600 text-lg">List your item and start receiving bids in minutes</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="itemName" className="block text-sm font-semibold text-gray-800 mb-2">
                  Item Name *
                </label>
                <input 
                  required 
                  type="text" 
                  name="itemName" 
                  id="itemName" 
                  value={formData.itemName} 
                  onChange={handleChange} 
                  className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500" 
                  placeholder="e.g., Vintage Watch"
                />
              </div>
              
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-semibold text-gray-800 mb-2">
                  Image URL
                </label>
                <input 
                  type="url" 
                  name="imageUrl" 
                  id="imageUrl" 
                  value={formData.imageUrl} 
                  onChange={handleChange} 
                  placeholder="https://example.com/image.png" 
                  className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500" 
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-2">
                Description *
              </label>
              <textarea 
                required 
                name="description" 
                id="description" 
                rows={4} 
                value={formData.description} 
                onChange={handleChange} 
                className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
                placeholder="Describe your item in detail..."
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="startingPrice" className="block text-sm font-semibold text-gray-800 mb-2">
                  Starting Price ($) *
                </label>
                <input 
                  required 
                  type="number" 
                  name="startingPrice" 
                  id="startingPrice" 
                  value={formData.startingPrice} 
                  onChange={handleChange} 
                  className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500" 
                  min="0"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label htmlFor="bidIncrement" className="block text-sm font-semibold text-gray-800 mb-2">
                  Bid Increment ($) *
                </label>
                <input 
                  required 
                  type="number" 
                  name="bidIncrement" 
                  id="bidIncrement" 
                  value={formData.bidIncrement} 
                  onChange={handleChange} 
                  className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500" 
                  min="1"
                  placeholder="1.00"
                />
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-semibold text-gray-800 mb-2">
                  Duration *
                </label>
                <select 
                  name="duration" 
                  id="duration" 
                  value={formData.duration} 
                  onChange={handleChange} 
                  className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900"
                >
                  <option value="0.083">5 Minutes</option>
                  <option value="1">1 Hour</option>
                  <option value="6">6 Hours</option>
                  <option value="12">12 Hours</option>
                  <option value="24">1 Day</option>
                  <option value="72">3 Days</option>
                  <option value="168">1 Week</option>
                </select>
              </div>
            </div>
            
            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Auction...
                  </div>
                ) : (
                  '🚀 Launch Auction'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
