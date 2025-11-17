import React from "react";

export default function Backdrop({
  children,
  OnClick,
}: {
  children: React.ReactNode;
  OnClick?: () => void;
}) {
  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen backdrop-blur-2xl"
      onClick={(e) => {
        OnClick?.();
      }}
    >
      <div className="" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
