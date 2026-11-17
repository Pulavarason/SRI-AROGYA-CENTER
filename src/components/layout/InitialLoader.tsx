"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

export function InitialLoader() {
  const [leaving, setLeaving] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const leave = window.setTimeout(() => setLeaving(true), 1450);
    const remove = window.setTimeout(() => setRemoved(true), 2050);
    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(remove);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`initial-loader${leaving ? " initial-loader--leaving" : ""}`}
      role="status"
      aria-label="Loading Sri Arogya Centre"
      aria-live="polite"
    >
      <div className="initial-loader__content">
        <div className="initial-loader__emblem" aria-hidden="true">
          <span className="initial-loader__orbit initial-loader__orbit--outer" />
          <span className="initial-loader__orbit initial-loader__orbit--inner" />
          <LogoMark className="initial-loader__mark" />
          <span className="initial-loader__spark" />
        </div>
        <p className="initial-loader__name">Sri Arogya</p>
        <p className="initial-loader__caption">Siddha <span>·</span> Ayurveda <span>·</span> Panchakarma</p>
        <div className="initial-loader__track" aria-hidden="true"><span /></div>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
