import Link from 'next/link';
import CountdownTimer from './CountdownTimer';

export default function AuctionCard({ auction }) {
  const isEnded = new Date(auction.end_time) <= new Date();
  const timeLeft = new Date(auction.end_time) - new Date();
  const isEndingSoon = timeLeft > 0 && timeLeft < 3600000; // Less than 1 hour

  return (
    <Link href={`/auction/${auction.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
        <div className="relative">
          <img 
            src={auction.imageUrl} 
            alt={auction.item_name} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
          />
          {isEnded && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="text-white text-xl font-bold bg-red-600 px-4 py-2 rounded-full">AUCTION ENDED</span>
            </div>
          )}
          {isEndingSoon && !isEnded && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              ENDING SOON
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-sm font-semibold text-gray-800">
              ${auction.currentPrice.toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {auction.item_name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {auction.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Current Bid</span>
              <span className="text-lg font-bold text-blue-600">
                ${auction.currentPrice.toLocaleString()}
              </span>
            </div>
            
            {!isEnded && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Ends In</span>
                <CountdownTimer endTime={auction.end_time} isCard={true} />
              </div>
            )}
            
            {isEnded && (
              <div className="text-center py-2 bg-gray-100 rounded-lg">
                <span className="text-sm font-medium text-gray-600">Final Price</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}