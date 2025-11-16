"use client";
import React from "react";
import DataProviders from "./DataProviders";
import ModalProviders from "./ModalProviders";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DataProviders>
      <ModalProviders>{children}</ModalProviders>
    </DataProviders>
  );
}
