import React from 'react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge: string;
  onBackToHome: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  badge,
  onBackToHome
}) => {
  return (
    <div className="bg-[#2a170f] text-[#f7ece2] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#472719]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center gap-2 text-xs text-[#cfae97] mb-3">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Beranda Toko</span>
            </button>
            <ChevronRight className="w-3 h-3 text-[#7d563e]" />
            <span className="text-amber-300 font-semibold">{title}</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#3d2215] text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2 border border-[#522f1d]">
            {badge}
          </div>

          <h1 className="font-serif-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#dec2af] max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Back to Shopping Button */}
        <div className="shrink-0">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#3d2215] hover:bg-[#4f2c1b] text-amber-200 border border-[#5c331f] text-xs font-bold transition-all shadow-sm group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            <span>Kembali ke Belanja Kopi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
