import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { UserInput, GeneratedName } from './types';
import { generateBabyNames } from './services/geminiService';
import InputForm from './components/InputForm';
import NameCard from './components/NameCard';
import { CloudPattern, BorderCorner, KnotTassel } from './components/Decoration';

const App: React.FC = () => {
  const [input, setInput] = useState<UserInput>({
    surname: '',
    gender: 'unspecified',
    wishes: '',
    wordCount: '2',
    useBazi: false,
    birthDate: '',
    birthTime: '',
    birthPlace: ''
  });
  const [names, setNames] = useState<GeneratedName[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!input.surname) return;
    
    setLoading(true);
    setError(null);
    setNames([]); // Clear previous results to show loading state better
    
    try {
      const generatedNames = await generateBabyNames(input);
      setNames(generatedNames);
      
      // Smooth scroll to results after a short delay to allow render
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError("抱歉，生成名字时遇到了一点小问题，请稍后再试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-12 font-sans text-gray-800 relative max-w-md mx-auto shadow-2xl bg-[#FDF5E6]">
      
      {/* Decorative Borders */}
      <div className="fixed top-0 left-0 p-2 pointer-events-none z-50 text-china-gold">
        <BorderCorner className="w-8 h-8" />
      </div>
      <div className="fixed top-0 right-0 p-2 pointer-events-none z-50 text-china-gold">
        <BorderCorner className="w-8 h-8" rotate={90} />
      </div>

      {/* Header Section */}
      <header className="relative bg-china-red pt-12 pb-16 px-6 overflow-hidden rounded-b-[3rem] shadow-lg">
        <CloudPattern className="absolute top-0 left-0 w-full text-deep-red opacity-20" />
        <div className="absolute top-0 right-8 text-china-gold opacity-80">
            <KnotTassel className="w-12 h-24" />
        </div>
        
        <div className="relative z-10 text-center">
            <h1 className="font-calligraphy text-5xl text-china-gold drop-shadow-md mb-2">锦绣良名</h1>
            <p className="text-red-100 text-sm tracking-widest font-serif opacity-90">中国经典 · 诗词起名 · 吉祥寓意</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="px-4 -mt-10 relative z-20">
        
        <InputForm 
          input={input} 
          setInput={setInput} 
          onSubmit={handleSubmit}
          isLoading={loading}
        />

        {/* Error Message */}
        {error && (
            <div className="mt-6 p-4 bg-red-100 text-china-red rounded-lg text-center border border-red-200">
                {error}
            </div>
        )}

        {/* Results Section */}
        <div ref={resultsRef} className="mt-8 space-y-6">
            {names.length > 0 && (
                <div className="flex items-center justify-center mb-6">
                    <span className="h-[1px] w-12 bg-china-gold"></span>
                    <h3 className="mx-4 text-china-red font-serif text-xl font-bold">为您甄选</h3>
                    <span className="h-[1px] w-12 bg-china-gold"></span>
                </div>
            )}
            
            <div className="grid gap-4">
                {names.map((name, index) => (
                    <div 
                        key={index} 
                        className="animate-fadeIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <NameCard data={name} surname={input.surname} />
                    </div>
                ))}
            </div>

            {/* Empty State / Initial Greeting */}
            {!loading && names.length === 0 && !error && (
                <div className="text-center py-10 opacity-60">
                    <p className="text-gray-500 font-serif text-sm">
                        “ 赐子千金，不如教子一艺；<br/>教子一艺，不如赐子好名。”
                    </p>
                </div>
            )}
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-400 text-xs pb-4 font-serif">
         © 2024 锦绣良名 | 愿宝宝健康快乐成长
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element");
}
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
