import React from 'react';
import { Copy } from 'lucide-react';

interface LinkFormProps {
  link: string;
}

export function LinkForm({ link }: LinkFormProps) {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Aquí está tu enlace
      </label>
      <div className="relative">
        <input
          type="text"
          readOnly
          value={link}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 cursor-text focus:outline-none"
        />
      </div>

      <button
        onClick={copyToClipboard}
        className="w-full group relative flex items-center justify-center px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
      >
        <Copy className="w-5 h-5 mr-2" />
        <span>{copied ? '¡Enlace copiado!' : 'Copiar Enlace'}</span>
        
        {/* Success animation */}
        {copied && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="animate-ping absolute h-4 w-4 rounded-full bg-green-400 opacity-75" />
          </span>
        )}
      </button>
    </div>
  );
}