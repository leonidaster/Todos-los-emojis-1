import React from 'react';
import { User } from 'lucide-react';

interface WhatsAppPreviewProps {
  phoneNumber: string;
  message: string;
}

export function WhatsAppPreview({ phoneNumber, message }: WhatsAppPreviewProps) {
  return (
    <div className="hidden lg:block fixed top-1/2 right-8 transform -translate-y-1/2">
      <div className="w-[280px] h-[560px] bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-gray-100">
        {/* Header */}
        <div className="bg-gray-100 p-3 flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-sm text-gray-700 font-medium">
            {phoneNumber || '+1 234 567 8900'}
          </span>
        </div>

        {/* Chat Area */}
        <div className="h-[calc(100%-120px)] bg-[#e5ddd5] p-4 relative">
          <div className="absolute bottom-4 right-4 max-w-[80%]">
            {message && (
              <div className="bg-[#dcf8c6] p-3 rounded-lg shadow-sm inline-block select-text cursor-text">
                <p className="text-sm text-gray-800 whitespace-pre-wrap break-words select-text">
                  {message}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="h-[60px] bg-gray-100 p-2 flex items-center">
          <div className="flex-1 bg-white rounded-full h-10" />
          <div className="w-10 h-10 flex items-center justify-center text-gray-500">
            <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#54656f]">
              <path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}