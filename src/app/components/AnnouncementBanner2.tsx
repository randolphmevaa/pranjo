"use client";

import React from "react";
import "./AnnouncementBar.css";

const AnnouncementBar: React.FC = () => {
  const announcements = [
    "WORLDWIDE SHIPPING",
    "Free UK & EU shipping",
    "Try Pranjo leggings for 30 days",
    "WORLDWIDE SHIPPING",
    "Free UK & EU shipping",
    "Try Pranjo leggings for 30 days",
    "WORLDWIDE SHIPPING",
    "Free UK & EU shipping",
    "Try Pranjo leggings for 30 days",
  ];

  // Duplicate announcements dynamically to avoid blank spaces
  const repeatedAnnouncements = [...announcements, ...announcements];

  return (
    <div className="announcement-bar">
      <div className="announcement-bar__carousel">
        <div className="announcement-bar__marquee">
          {repeatedAnnouncements.map((announcement, index) => (
            <React.Fragment key={index}>
              <span>{announcement}</span>
              <span className="separator">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;