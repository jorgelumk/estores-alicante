'use client';

import { useState, useEffect } from 'react';

interface ShareButtonsProps {
  title: string;
  url: string;
  copiedText: string;
}

export default function ShareButtons({ title, url, copiedText }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(window.location.origin + url);
    }
  }, [url]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);

  const shareLinks = {
    x: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`
  };

  return (
    <div className="space-y-4">
      {/* Share Grid */}
      <div className="grid grid-cols-5 gap-2">
        <a 
          href={shareLinks.x} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Compartir en X (Twitter)"
          className="flex items-center justify-center p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a 
          href={shareLinks.facebook} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Compartir en Facebook"
          className="flex items-center justify-center p-2.5 rounded-xl bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
          </svg>
        </a>
        <a 
          href={shareLinks.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Compartir en WhatsApp"
          className="flex items-center justify-center p-2.5 rounded-xl bg-gray-100 hover:bg-emerald-600 hover:text-white text-emerald-600 transition-colors"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.13-1.348a9.96 9.96 0 004.881 1.28c5.505 0 9.988-4.478 9.989-9.985A9.99 9.99 0 0012.012 2zm5.849 14.28c-.252.712-1.261 1.17-1.831 1.24-.469.058-.936.26-2.98-.564-2.615-1.055-4.281-3.713-4.412-3.887-.132-.174-1.077-1.433-1.077-2.734 0-1.302.68-1.942.92-2.203.242-.26.529-.326.705-.326.177 0 .354.002.508.01.16.007.373-.06.584.45.22.53.748 1.828.814 1.961.066.133.11.288.022.464-.088.177-.132.288-.264.443-.133.155-.278.345-.397.464-.133.133-.272.278-.118.543.154.264.686 1.13 1.472 1.828.163.144.3.3.435.438.252.253.518.253.68.066.162-.187.686-.8.87-.978.187-.178.374-.155.626-.063.252.093 1.6.753 1.875.892.275.138.459.208.525.32.066.112.066.65-.186 1.362z"/>
          </svg>
        </a>
        <a 
          href={shareLinks.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Compartir en LinkedIn"
          className="flex items-center justify-center p-2.5 rounded-xl bg-gray-100 hover:bg-sky-700 hover:text-white text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <a 
          href={shareLinks.email} 
          aria-label="Compartir por Email"
          className="flex items-center justify-center p-2.5 rounded-xl bg-gray-100 hover:bg-gray-600 hover:text-white text-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.776l10 8.103 10-8.103v11.776h-20z"/>
          </svg>
        </a>
      </div>

      {/* Copy Link Button */}
      <button
        onClick={handleCopyLink}
        className="w-full py-2 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-semibold text-gray-700 transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-2 focus:outline-[var(--color-primary)]"
      >
        <span>🔗</span>
        <span>{copied ? copiedText : 'Copiar enlace'}</span>
      </button>
    </div>
  );
}
