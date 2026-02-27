import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function PolicyLayout({ title, subtitle, lastUpdated, children }) {
  return (
    <div className="bg-[#fcfcfc] min-h-screen font-sans pb-20">
      {/* --- CLEAN WHITE PAGE HEADER --- */}
      <header className="bg-white py-16 md:py-24 px-4 md:px-10 lg:px-16 border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6">
              <Link to="/" className="text-[12px] font-bold text-gray-400 hover:text-[#007185] transition-colors uppercase tracking-widest">Home</Link>
              <ChevronRight size={14} className="text-gray-200" />
              <span className="text-[12px] font-bold text-[#007185] uppercase tracking-widest">Legal Document</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-tight mb-8">
              {title.split(' ').slice(0, -1).join(' ') || title} <span className="text-[#007185]">{title.split(' ').slice(-1)}</span>
            </h1>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-8 border-t border-gray-100">
              {subtitle && (
                <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                  {subtitle}
                </p>
              )}
              
              <div className="flex items-center gap-3 bg-[#f9f9f9] px-5 py-2.5 rounded-xl border border-gray-100 shrink-0 shadow-sm">
                <Clock size={18} className="text-[#007185]" />
                <span className="text-gray-600 text-[13px] font-bold">Revised: February 28, 2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <article className="max-w-[1500px] mx-auto px-4 md:px-10 lg:px-16 py-16 lg:py-24">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-4xl prose prose-slate lg:prose-lg 
            prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:border-b prose-h2:border-gray-100 prose-h2:pb-4 prose-h2:mt-12
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:font-medium
            prose-strong:text-gray-900 prose-strong:font-bold
            prose-a:text-[#007185] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-li:text-gray-600 prose-li:font-medium"
        >
          {children}
        </motion.div>
      </article>
    </div>
  );
}

