import { ConfirmModalContextProvider } from "@/context/ConfirmModalContext";
import TodoModalProvider from "@/context/TodoModalContext";
import React from "react";

export default function ModalProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfirmModalContextProvider>
      <TodoModalProvider>{children}</TodoModalProvider>
    </ConfirmModalContextProvider>
  );
}
