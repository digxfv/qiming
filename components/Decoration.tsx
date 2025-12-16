import React from 'react';

export const CloudPattern = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10,40 Q20,20 35,30 T60,25 T85,35 T95,45 H5 Z" opacity="0.6"/>
  </svg>
);

export const KnotTassel = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
    <path d="M50,0 V20" strokeWidth="3"/>
    <rect x="25" y="20" width="50" height="30" rx="5" fill="currentColor" fillOpacity="0.1"/>
    <path d="M25,35 H75 M50,20 V50" />
    <circle cx="50" cy="35" r="8" fill="currentColor" />
    <path d="M30,50 Q20,80 30,110 T40,150" />
    <path d="M70,50 Q80,80 70,110 T60,150" />
    <path d="M50,50 V160" />
    <path d="M50,160 L40,190 M50,160 L60,190 M50,160 L50,195" strokeWidth="1"/>
  </svg>
);

export const BorderCorner = ({ className, rotate = 0 }: { className?: string; rotate?: number }) => (
  <svg 
    className={className} 
    style={{ transform: `rotate(${rotate}deg)` }}
    viewBox="0 0 50 50" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M5,50 V15 A10,10 0 0,1 15,5 H50" />
    <path d="M12,50 V22 A10,10 0 0,1 22,12 H50" opacity="0.5"/>
  </svg>
);
