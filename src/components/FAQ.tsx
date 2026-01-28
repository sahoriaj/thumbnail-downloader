import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    category: "General",
    questions: [
      { q: "Is ThumbGrabber really free?", a: "Yes, ThumbGrabber is 100% free to use. There are no hidden fees, subscriptions, or limits on how many thumbnails you can download." },
      { q: "Do I need to create an account?", a: "No account is required. You can start downloading thumbnails instantly without signing up or logging in." },
      { q: "Is it legal to download thumbnails?", a: "Generally, downloading thumbnails for personal use, inspiration, or reference is acceptable. However, if you plan to reuse them publicly, you should respect the creator's copyright." },
      { q: "Does this work on mobile phones?", a: "Yes! Our tool is fully optimized for all devices, including iPhones, Android phones, tablets, and desktop computers." },
      { q: "Is there a limit to how many I can download?", a: "No. You can download as many thumbnails as you need. Unlimited usage is free for everyone." }
    ]
  },
  {
    category: "Technical & Quality",
    questions: [
      { q: "How do I get the 8K resolution?", a: "If the video creator uploaded a thumbnail in 8K (7680x4320), we will automatically detect and provide it. Look for the 'Max Resolution' option in the results." },
      { q: "Why is 4K/8K not available for some videos?", a: "Not all videos have high-resolution thumbnails. If a creator uploaded a 1080p or 720p image, that is the maximum quality we can retrieve." },
      { q: "What file formats are supported?", a: "We provide thumbnails in their original high-quality format, typically JPG. You can also convert them to PNG or WebP using the dropdown menu before downloading." },
      { q: "Can I download thumbnails from private videos?", a: "No. The video must be Public or Unlisted. We cannot access data from Private videos due to YouTube's privacy restrictions." },
      { q: "Does this work for YouTube Shorts?", a: "Yes! Simply paste the link to any YouTube Short, and we will extract the high-quality cover image for you." },
      { q: "Can I grab thumbnails from Live Streams?", a: "Yes, works perfectly for both past live streams and currently live videos." }
    ]
  },
  {
    category: "Troubleshooting",
    questions: [
      { q: "The download button isn't working.", a: "Try 'Right-Click > Save Image As' (Desktop) or 'Long Press > Download Image' (Mobile) if the button fails. This usually happens due to browser security settings." },
      { q: "It says 'Invalid URL'. What do I do?", a: "Make sure you copied the full link (e.g., https://youtube.com/watch?v=...). Short links like 'youtu.be' work too, but ensure they are complete." },
      { q: "Why is the downloaded image black bars?", a: "Some older videos have 4:3 aspect ratios which result in black bars on modern screens. This is part of the original image uploaded by the creator." },
      { q: "The site is slow, why?", a: "Our servers are usually instant. If it's slow, please check your own internet connection or try refreshing the page." }
    ]
  },
  {
    category: "Features",
    questions: [
      { q: "Can I download all thumbnails at once?", a: "Currently, you download them one by one to ensure you get exactly the resolution you want. Bulk downloading is a planned future feature." },
      { q: "Do you have a browser extension?", a: "Not yet, but we are working on a Chrome and Firefox extension for easier access." },
      { q: "Can I preview the image before downloading?", a: "Yes, we show you a full preview of the thumbnail in all available resolutions before you click download." },
      { q: "Does it work with playlists?", a: "Currently, we only process single video links. You cannot paste a playlist link to get all images at once yet." },
      { q: "Is there an API available?", a: "We do not offer a public API at this moment. This tool is intended for direct user interaction only." }
    ]
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleFAQ = (index: string) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="section-title">
        <HelpCircle size={24} /> 
        <span>Frequently Asked Questions</span>
      </div>
      
      <div className="faq-container">
        {faqData.map((category, catIndex) => (
          <div key={catIndex} className="faq-category">
            <h3 className="faq-cat-title">{category.category}</h3>
            <div className="faq-grid-custom">
              {category.questions.map((item, qIndex) => {
                const uniqueId = `${catIndex}-${qIndex}`;
                return (
                  <div 
                    key={uniqueId} 
                    className={`faq-item-custom ${openIndex === uniqueId ? 'open' : ''}`}
                    onClick={() => toggleFAQ(uniqueId)}
                  >
                    <div className="faq-question">
                      {item.q}
                      {openIndex === uniqueId ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                    {openIndex === uniqueId && <div className="faq-answer">{item.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
