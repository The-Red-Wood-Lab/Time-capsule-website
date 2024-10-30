import { useState, useEffect, useCallback } from 'react';
import { CalendarIcon, Lock, Plus, Trash2,  X } from 'lucide-react';
import { format } from 'date-fns';

const StarField = () => (
  <div className="absolute inset-0 overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
        }}
      />
    ))}
  </div>
);

export default function StaticMonochromeTimeCapsule() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [openDate, setOpenDate] = useState(null);
  const [isSealed, setIsSealed] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [image, setImage] = useState(null);

  const maxItems = 7;

  const updateRemainingTime = useCallback(() => {
    if (isSealed && openDate) {
      const now = new Date();
      const difference = openDate.getTime() - now.getTime();

      if (difference > 0) {
        setRemainingTime({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setIsSealed(false);
        setRemainingTime(null);
      }
    }
  }, [isSealed, openDate]);

  useEffect(() => {
    const timer = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(timer);
  }, [updateRemainingTime]);

  const addItem = (e) => {
    e.preventDefault();
    if (newItem.trim() && items.length < maxItems) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const sealTimeCapsule = () => {
    if ((items.length > 0 || image) && openDate) {
      setIsSealed(true);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
      <StarField />
      <div className="max-w-md w-full relative">
        <div className="bg-black/50 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-gray-500/30">
          <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
          Time Capsule
          </h1>

          {!isSealed ? (
            <div>
              <form onSubmit={addItem} className="mb-4 flex gap-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Add an item to your capsule"
                  className="flex-grow bg-gray-900/50 border-gray-500/50 text-gray-100 placeholder-gray-300 p-2 rounded-md"
                />
                <button
                  type="submit"
                  disabled={items.length >= maxItems}
                  className="bg-gray-600 hover:bg-gray-700 p-2 rounded-md"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </form>

              <div className="h-40 mb-4 border border-gray-500/50 rounded-md p-2 bg-gray-900/30 overflow-y-auto">
                <ul>
                  {items.map((item, index) => (
                    <li key={index} className="flex justify-between items-center py-1 text-gray-100">
                      <span>{item}</span>
                      <button onClick={() => removeItem(index)} className="text-gray-300 hover:text-gray-100">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <button
                  onClick={() => setOpenDate(new Date())}
                  className="w-full text-left bg-gray-900/50 border-gray-500/50 text-gray-100 p-2 rounded-md"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {openDate ? format(openDate, 'PPP') : 'Set launch date'}
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">Upload Image</label>
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" />
                  <label className="flex items-center justify-center w-full h-32 px-4 bg-gray-900/50 border-2 border-gray-500 border-dashed rounded-md cursor-pointer">
                    {image ? (
                      <img src={image} alt="Uploaded" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-sm text-gray-300">Click to upload image</span>
                    )}
                  </label>
                  {image && (
                    <button onClick={removeImage} className="absolute top-2 right-2 text-gray-300 hover:text-gray-100">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              <button
                onClick={sealTimeCapsule}
                disabled={!openDate || (items.length === 0 && !image)}
                className="w-full bg-gradient-to-b from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 p-2 rounded-md"
              >
                <Lock className="mr-2 h-4 w-4" /> Seal Time Capsule
              </button>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-100">Time Capsule Launched!</h2>
              {remainingTime && (
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {Object.entries(remainingTime).map(([unit, value]) => (
                    <div key={unit} className="bg-gray-900/50 rounded-lg p-2">
                      <div className="text-2xl font-bold text-gray-100">{value}</div>
                      <div className="text-xs text-gray-300">{unit}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
