import React from 'react';
import { GeneratedName } from '../types';

interface NameCardProps {
  data: GeneratedName;
  surname: string;
}

const NameCard: React.FC<NameCardProps> = ({ data, surname }) => {
  return (
    <div className="relative bg-white border border-red-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      {/* Decorative vertical bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-china-red opacity-80" />
      
      {/* Background seal effect */}
      <div className="absolute top-2 right-2 w-16 h-16 border-2 border-red-50 rounded-full opacity-50 flex items-center justify-center transform rotate-12 pointer-events-none group-hover:opacity-20 transition-opacity">
        <span className="text-red-50 font-serif text-xs">大吉</span>
      </div>

      <div className="p-4 pl-6">
        <div className="flex justify-between items-start mb-3">
            <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-serif font-bold text-ink">
                        <span className="text-gray-500 text-xl font-normal mr-0.5">{surname}</span>
                        {data.name}
                    </h3>
                    <span className="text-sm text-gray-500 font-mono">{data.pinyin}</span>
                </div>
                {data.elements && (
                    <div className="flex items-center gap-1">
                        <span className="text-[10px] bg-red-50 text-china-red px-1.5 py-0.5 rounded border border-red-100">
                           五行: {data.elements}
                        </span>
                    </div>
                )}
            </div>
            <div className="text-xs text-white bg-china-red px-2 py-0.5 rounded-full opacity-80 whitespace-nowrap">
                {data.source.split('·')[0].split('/')[0]}
            </div>
        </div>
        
        <div className="mb-3 bg-red-50/50 p-2 rounded border-l-2 border-china-gold">
            <p className="text-sm text-gray-700 font-serif leading-relaxed italic">
                “{data.quote}”
            </p>
            <p className="text-xs text-gray-400 text-right mt-1">—— {data.source}</p>
        </div>

        <div className="text-sm text-gray-600 leading-relaxed text-justify">
            <span className="font-bold text-china-red/80">寓意：</span>
            {data.meaning}
        </div>
      </div>
    </div>
  );
};

export default NameCard;
