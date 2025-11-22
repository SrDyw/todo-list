import React from "react";


export default function Loading() {
  return (
    <div className="flex justify-between gap-4 loading-container">
      {Array.from({ length: 3 }).map((x, key) => (
        <div key={key} className="size-4 bg-white rounded-full"></div>
      ))}
    </div>
  );
}
