import { useState, useEffect, useCallback } from 'react';
import { Lock, Plus, Trash2, X } from 'lucide-react';

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
  const [message, setMessage] = useState('');
  const [openDate, setOpenDate] = useState(null);
  const [isSealed, setIsSealed] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const maxItems = 7;
  const maxFileSize = 5 * 1024 * 1024; // 5MB

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
    if ((items.length > 0 || image || file) && openDate && message.trim()) {
      setIsSealed(true);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size <= maxFileSize) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Image size exceeds 5MB limit.');
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.size <= maxFileSize) {
      setFile(uploadedFile);
    } else {
      alert('File size exceeds 5MB limit.');
    }
  };

  const removeImage = () => setImage(null);
  const removeFile = () => setFile(null);

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

              <ul className="mb-4">
                {items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center bg-gray-900/50 border-gray-500/50 text-gray-100 p-2 rounded-md mb-2">
                    <span>{item}</span>
                    <button onClick={() => removeItem(index)} className="text-gray-300 hover:text-gray-100">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <input
                type="datetime-local"
                value={openDate ? openDate.toISOString().slice(0, -1) : ''}
                onChange={(e) => setOpenDate(new Date(e.target.value))}
                className="w-full mb-4 bg-gray-900/50 border-gray-500/50 text-gray-100 placeholder-gray-300 p-2 rounded-md"
              />
              
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a message..."
                className="w-full mb-4 bg-gray-900/50 border-gray-500/50 text-gray-100 placeholder-gray-300 p-2 rounded-md"
              />

              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="mb-4 block w-full text-sm text-gray-300"
              />
              {file && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-100">{file.name}</span>
                  <button onClick={removeFile} className="text-gray-300 hover:text-gray-100">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <div className="mb-4">
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

              <button
                onClick={sealTimeCapsule}
                disabled={!openDate || (!items.length && !image && !file) || !message.trim()}
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
