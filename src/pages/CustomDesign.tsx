import React, { useState } from 'react';
import { Upload, Palette, Sparkles, ShoppingCart, X, Wand2, Type } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface Sticker {
  id: string;
  url: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

const CustomDesign: React.FC = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedGarment, setSelectedGarment] = useState('T-Shirt');
  const [customText, setCustomText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [aiCommand, setAiCommand] = useState('');
  const [aiEnabled, setAiEnabled] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const garmentTypes = ['T-Shirt', 'Hoodie', 'Tank Top', 'Long Sleeve', 'Polo Shirt'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const popularColors = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#000000' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Green', hex: '#008000' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Pink', hex: '#FF69B4' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Cyan', hex: '#00FFFF' },
  ];

  const aiSuggestions = [
    'Make it metallic gold',
    'Add neon glow effect',
    'Apply vintage filter',
    'Add drop shadow',
    'Make it look embroidered',
    'Apply 3D effect',
  ];

  const textSuggestions = [
    'HYPE WEAR',
    'Stay Fresh',
    'Born to Stand Out',
    'Dream Big',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newSticker: Sticker = {
          id: `sticker-${Date.now()}`,
          url: event.target?.result as string,
          x: 50,
          y: 50,
          scale: 1,
          rotation: 0,
        };
        setStickers([...stickers, newSticker]);
        setSelectedSticker(newSticker.id);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStickerMove = (id: string, direction: 'up' | 'down' | 'left' | 'right') => {
    setStickers(stickers.map(s => {
      if (s.id === id) {
        const step = 10;
        return {
          ...s,
          x: direction === 'left' ? s.x - step : direction === 'right' ? s.x + step : s.x,
          y: direction === 'up' ? s.y - step : direction === 'down' ? s.y + step : s.y,
        };
      }
      return s;
    }));
  };

  const handleStickerScale = (id: string, larger: boolean) => {
    setStickers(stickers.map(s => {
      if (s.id === id) {
        return { ...s, scale: larger ? s.scale * 1.2 : s.scale * 0.8 };
      }
      return s;
    }));
  };

  const handleStickerRotate = (id: string) => {
    setStickers(stickers.map(s => {
      if (s.id === id) {
        return { ...s, rotation: s.rotation + 45 };
      }
      return s;
    }));
  };

  const handleDeleteSticker = (id: string) => {
    setStickers(stickers.filter(s => s.id !== id));
    if (selectedSticker === id) {
      setSelectedSticker(null);
    }
  };

  const handleAICommand = async () => {
    if (!aiCommand.trim()) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      alert(`✨ AI Command: "${aiCommand}"\n\n🚀 AI feature coming soon!\n\nThis will:\n- Send your design to AI API\n- Apply: ${aiCommand}\n- Return enhanced design\n\nFor now, manually adjust stickers and text.`);
      setIsProcessing(false);
      setAiCommand('');
    }, 2000);
  };

  const handleAddToCart = () => {
    if (stickers.length === 0 && !customText) {
      alert('Please add stickers or text to your design!');
      return;
    }

    const customProduct = {
      id: `custom-${Date.now()}`,
      name: `Custom ${selectedGarment}`,
      price: aiEnabled && aiCommand ? 3999 : 2999,
      color: selectedColor,
      size: selectedSize,
      image: stickers[0]?.url || 'https://via.placeholder.com/400x500/808080/FFFFFF?text=Custom+Design',
      category: 'custom',
      stock: 999,
      quantity: 1,
    };

    addItem(customProduct);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ✨ Custom Design Studio Pro
          </h1>
          <p className="text-xl text-gray-600">
            Design your unique style with drag & drop sticker editor!
          </p>
          {aiEnabled && (
            <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
              <Wand2 size={18} />
              AI Mode Active (+RS 1,000)
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="space-y-4">
            {/* Garment Selection */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="text-purple-600" size={20} />
                Garment
              </h3>
              <select
                value={selectedGarment}
                onChange={(e) => setSelectedGarment(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
              >
                {garmentTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Upload Sticker */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Upload className="text-blue-600" size={20} />
                Upload Stickers
              </h3>
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="sticker-upload"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition">
                  <Upload size={28} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-600 font-medium">Upload Image</p>
                </div>
              </label>
              
              {stickers.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold text-gray-700">{stickers.length} Sticker(s)</p>
                  {stickers.map((sticker) => (
                    <div key={sticker.id} className={`p-2 rounded border-2 ${selectedSticker === sticker.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      <div className="flex items-center justify-between">
                        <img src={sticker.url} alt="Sticker" className="w-12 h-12 object-contain rounded" onClick={() => setSelectedSticker(sticker.id)} />
                        <button
                          onClick={() => handleDeleteSticker(sticker.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      {selectedSticker === sticker.id && (
                        <div className="mt-2 grid grid-cols-3 gap-1">
                          <button onClick={() => handleStickerMove(sticker.id, 'up')} className="bg-gray-100 py-1 text-xs rounded hover:bg-gray-200">▲</button>
                          <button onClick={() => handleStickerRotate(sticker.id)} className="bg-gray-100 py-1 text-xs rounded hover:bg-gray-200">↻</button>
                          <button onClick={() => handleStickerScale(sticker.id, true)} className="bg-gray-100 py-1 text-xs rounded hover:bg-gray-200">+</button>
                          <button onClick={() => handleStickerMove(sticker.id, 'left')} className="bg-gray-100 py-1 text-xs rounded hover:bg-gray-200">◄</button>
                          <button onClick={() => handleStickerMove(sticker.id, 'down')} className="bg-gray-100 py-1 text-xs rounded hover:bg-gray-200">▼</button>
                          <button onClick={() => handleStickerMove(sticker.id, 'right')} className="bg-gray-100 py-1 text-xs rounded hover:bg-gray-200">►</button>
                          <button onClick={() => handleStickerScale(sticker.id, false)} className="bg-gray-100 py-1 text-xs rounded col-span-3 hover:bg-gray-200">−</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Text Input */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Type className="text-green-600" size={20} />
                Custom Text
              </h3>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Your text..."
                className="w-full px-3 py-2 text-sm border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                maxLength={30}
              />
              <p className="text-xs text-gray-500 mt-1">{customText.length}/30</p>
              
              <div className="mt-3">
                <label className="text-xs font-medium text-gray-700 block mb-1">Text Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-10 h-10 rounded border-2"
                  />
                  <span className="text-xs font-mono py-2">{textColor}</span>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-700 mb-2">Quick Text:</p>
                <div className="grid grid-cols-2 gap-1">
                  {textSuggestions.map((text, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCustomText(text)}
                      className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Palette className="text-orange-600" size={20} />
                T-Shirt Color
              </h3>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {popularColors.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`h-10 rounded border-2 transition ${
                      selectedColor === color.hex
                        ? 'border-purple-600 scale-110'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-10 h-10 rounded border-2"
                />
                <span className="text-xs font-mono">{selectedColor}</span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded font-bold text-sm transition ${
                      selectedSize === size
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Preview */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Live Preview
              </h3>
              <div 
                className="relative w-full h-[500px] rounded-xl shadow-inner flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: selectedColor }}
              >
                {/* Stickers */}
                {stickers.map((sticker) => (
                  <img
                    key={sticker.id}
                    src={sticker.url}
                    alt="Sticker"
                    className={`absolute cursor-pointer ${selectedSticker === sticker.id ? 'ring-4 ring-blue-500' : ''}`}
                    style={{
                      left: `${sticker.x}px`,
                      top: `${sticker.y}px`,
                      transform: `scale(${sticker.scale}) rotate(${sticker.rotation}deg)`,
                      maxWidth: '200px',
                      maxHeight: '200px',
                    }}
                    onClick={() => setSelectedSticker(sticker.id)}
                  />
                ))}
                
                {/* Custom Text */}
                {customText && (
                  <div 
                    className="absolute text-3xl font-bold text-center px-4"
                    style={{ 
                      color: textColor,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                      top: '60%',
                    }}
                  >
                    {customText}
                  </div>
                )}

                {/* Placeholder */}
                {stickers.length === 0 && !customText && (
                  <div className="text-center opacity-50">
                    <Sparkles size={64} className="mx-auto mb-3 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-600">Your design will appear here</p>
                  </div>
                )}
              </div>
              <p className="text-center text-xs text-gray-500 mt-3">
                Click stickers to select • Use arrow buttons to adjust
              </p>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* AI Command */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl shadow-lg p-4 border-2 border-purple-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Wand2 className="text-purple-600" size={20} />
                  AI Designer
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aiEnabled}
                    onChange={(e) => setAiEnabled(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-medium">Enable</span>
                </label>
              </div>
              
              {aiEnabled ? (
                <>
                  <textarea
                    value={aiCommand}
                    onChange={(e) => setAiCommand(e.target.value)}
                    placeholder="Tell AI what to do..."
                    className="w-full px-3 py-2 text-sm border-2 border-purple-300 rounded-lg resize-none"
                    rows={2}
                    disabled={isProcessing}
                  />
                  <button
                    onClick={handleAICommand}
                    disabled={!aiCommand.trim() || isProcessing}
                    className={`w-full mt-2 py-2 rounded-lg font-semibold text-sm ${
                      !aiCommand.trim() || isProcessing
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    }`}
                  >
                    {isProcessing ? '✨ Processing...' : '✨ Apply AI'}
                  </button>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {aiSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => setAiCommand(suggestion)}
                        className="text-xs px-2 py-1 bg-white rounded hover:bg-purple-50"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-3 bg-yellow-50 border border-yellow-300 rounded p-2">
                    <p className="text-xs text-yellow-800">
                      ⚠️ <strong>AI Coming Soon!</strong> Adds RS 1,000 to price.
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <Wand2 size={40} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">Enable AI for magic effects</p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Order Summary</h3>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Garment:</span>
                  <span className="font-semibold">{selectedGarment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Size:</span>
                  <span className="font-semibold">{selectedSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stickers:</span>
                  <span className="font-semibold">{stickers.length}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="font-bold text-lg">Price:</span>
                  <span className="font-bold text-2xl text-purple-600">
                    RS {aiEnabled && aiCommand ? '3,999' : '2,999'}.00
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-xl transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <h4 className="font-bold text-blue-900 mb-2 text-sm">💡 Pro Tips:</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>✓ Upload multiple stickers</li>
                <li>✓ Click sticker to select</li>
                <li>✓ Use arrows to position</li>
                <li>✓ Add custom text overlay</li>
                <li>✓ Enable AI for effects (+RS 1,000)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Added to Cart!</h3>
              <p className="text-gray-600 mb-6">Your custom design is ready</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Design Another
                </button>
                <button
                  onClick={() => navigate('/cart')}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDesign;
