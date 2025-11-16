import TodoProvider from "@/context/TodoContext";
import React from "react";

export default function DataProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TodoProvider>{children}</TodoProvider>;
}
