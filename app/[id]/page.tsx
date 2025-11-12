import TodoChat from "@/components/TodoChat";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TodoChat id={id} />;
}
