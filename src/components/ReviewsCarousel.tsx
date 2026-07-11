'use client';

import { useState } from 'react';

interface Review {
  text: string;
  author: string;
  city: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
  title: string;
}

export default function ReviewsCarousel({ reviews, title }: ReviewsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-[#1A1A2E] py-20 px-4 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{title}</h2>
        
        {/* Desktop Layout (Grid) */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
              <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
              <p className="italic text-gray-300 mb-6 min-h-[100px]">"{r.text}"</p>
              <div>
                <p className="font-bold">{r.author}</p>
                <p className="text-gray-400 text-sm">{r.city}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout (Carousel) */}
        <div className="md:hidden relative px-8">
          <div className="relative overflow-hidden min-h-[250px]">
            <div className="transition-all duration-300 transform">
              <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 mx-auto">
                <div className="text-yellow-400 text-xl mb-3">★★★★★</div>
                <p className="italic text-gray-300 mb-6 text-sm">"{reviews[activeIndex].text}"</p>
                <div>
                  <p className="font-bold text-sm">{reviews[activeIndex].author}</p>
                  <p className="text-gray-400 text-xs">{reviews[activeIndex].city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white rounded-full p-2.5 shadow-md active:scale-95 transition-all cursor-pointer"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white rounded-full p-2.5 shadow-md active:scale-95 transition-all cursor-pointer"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {reviews.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${activeIndex === i ? 'bg-[var(--color-primary)]' : 'bg-gray-600'}`}
                aria-label={`Ir a reseña ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
