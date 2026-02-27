import { ShieldCheck, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={22} className="text-[#007185]" />,
    title: "Authorized HP Partner",
    desc: "Official Warranty Support"
  },
  {
    icon: <Zap size={22} className="text-[#007185]" />,
    title: "Instant Processing",
    desc: "Rapid real-time order flow"
  },
  {
    icon: <Globe size={22} className="text-[#007185]" />,
    title: "Secure US Logistics",
    desc: "Tracked nationwide delivery"
  }
];

export default function Features() {
  return (
    <section className="bg-white border-b border-gray-100 py-10 md:py-12 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-center md:divide-x divide-gray-200 gap-10 md:gap-0">
          {features.map((item, index) => (
            <div key={index} className="flex-1 w-full">
              <div className="flex flex-col items-center text-center gap-3 group px-4 md:px-10">
                <div className="h-12 w-12 flex items-center justify-center rounded-full bg-[#f9f9f9] border border-gray-100 transition-all duration-300 group-hover:bg-[#007185]/5 group-hover:border-[#007185]/20 group-hover:scale-105 shadow-sm">
                  {item.icon}
                </div>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-[15px] md:text-[16px] font-bold text-gray-900 tracking-tight transition-colors group-hover:text-[#007185]">
                    {item.title}
                  </span>
                  <p className="text-[12px] md:text-[13px] font-medium text-gray-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
