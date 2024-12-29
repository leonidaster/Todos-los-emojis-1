import React from 'react';
import { Phone, MessageSquare, Copy, ExternalLink } from 'lucide-react';
import { WhatsAppPreview } from './components/WhatsAppPreview';
import { LinkForm } from './components/LinkForm';
import { EmojiPicker } from './components/EmojiPicker';

function App() {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [copied, setCopied] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);

  const generateWhatsAppLink = () => {
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${formattedPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generateWhatsAppLink());
    setCopied(true);
    setShowPreview(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openWhatsApp = () => {
    window.open(generateWhatsAppLink(), '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Generador de Enlaces WhatsApp
          </h1>
          <p className="text-gray-600">
            Crea enlaces personalizados para iniciar conversaciones en WhatsApp
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          {/* Phone Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Número de WhatsApp
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="+1 234 567 8900"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mensaje (opcional)
            </label>
            <div className="mb-2">
              <EmojiPicker
                onEmojiSelect={(emoji) => setMessage(prev => prev + emoji)}
              />
            </div>
            <div className="relative">
              <div className="absolute top-2.5 left-0 pl-3 pointer-events-none">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Escribe tu mensaje aquí..."
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          {/* Preview */}
          <button
            onClick={copyToClipboard}
            className="w-full py-3 px-4 bg-[#006d5b] hover:bg-[#005446] text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006d5b]"
          >
            Generar enlace
          </button>

          {showPreview && (
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <LinkForm link={generateWhatsAppLink()} />
            </div>
          )}

          {/* Action Buttons */}
          {showPreview && (
            <button
              onClick={openWhatsApp}
              className="w-full mt-4 flex items-center justify-center px-4 py-3 text-sm font-medium text-[#006d5b] bg-white border-2 border-[#006d5b] rounded-md hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#006d5b]"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Abrir vista previa
            </button>
          )}

          {/* Copied Notification */}
          {copied && (
            <div className="fixed bottom-4 right-4 bg-[#006d5b] text-white px-4 py-2 rounded-md shadow-lg">
              ¡Enlace copiado!
            </div>
          )}
        </div>
      </div>
      <WhatsAppPreview phoneNumber={phoneNumber} message={message} />
    </div>
  );
}

export default App;
