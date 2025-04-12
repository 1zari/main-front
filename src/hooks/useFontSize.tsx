"use client";

import { createContext, useContext, useState } from "react";

const fontSizeClasses = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
] as const;
type FontSize = (typeof fontSizeClasses)[number];

const FontSizeContext = createContext<{
  fontSize: FontSize;
  increase: () => void;
  decrease: () => void;
}>({
  fontSize: "text-base",
  increase: () => {},
  decrease: () => {},
});

export const FontSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [index, setIndex] = useState(2); // start with "text-base"

  const increase = () => setIndex((prev) => Math.min(prev + 1, fontSizeClasses.length - 1));
  const decrease = () => setIndex((prev) => Math.max(prev - 1, 0));

  return (
    <FontSizeContext.Provider value={{ fontSize: fontSizeClasses[index], increase, decrease }}>
      <div className={fontSizeClasses[index]}>{children}</div>
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => useContext(FontSizeContext);
