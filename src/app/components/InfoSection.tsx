// app/components/InfoSection.tsx

"use client";

import React from "react";
import {
  HiOutlineShieldCheck,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineClock,
} from "react-icons/hi";

type InfoItem = {
  id: number;
  icon: React.ReactElement;
  title: string;
  description: string;
};

const infoItems: InfoItem[] = [
  {
    id: 1,
    icon: <HiOutlineClock className="w-6 h-6 text-blue-500" />,
    title: "30 DAY SWEAT TEST",
    description:
      "Sweat in our leggings for 30 days. Not in love? Return them!",
  },
  {
    id: 2,
    icon: <HiOutlineRefresh className="w-6 h-6 text-blue-500" />,
    title: "RETURNS + EXCHANGES",
    description:
      "FREE returns and exchanges on UK + EU orders.",
  },
  {
    id: 3,
    icon: <HiOutlineTruck className="w-6 h-6 text-blue-500" />,
    title: "FREE, FAST SHIPPING",
    description:
      "FREE shipping on all EU orders over €200.",
  },
  {
    id: 4,
    icon: <HiOutlineShieldCheck className="w-6 h-6 text-blue-500" />,
    title: "QUALITY GUARANTEE",
    description:
      "If one of our products isn't working as hard as you, we'll sort it.",
  },
];

export default function InfoSection() {
  return (
    <section
      className="py-16 px-6 sm:px-8 bg-gray-50 border-t border-b border-black"
      id="info"
      aria-labelledby="info-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2
          id="info-heading"
          className="text-3xl sm:text-4xl font-header text-gray-800 mb-12 text-center"
        >
          Why Choose Us
        </h2>

        {/* Info Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {infoItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 p-6 border border-gray-200 rounded-lg 
                         bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg font-header text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-body">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}