"use client";

import { TodoContext } from "@/context/TodoContext";
import { TodoContextType } from "@/types/core/type";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";

export default function page() {
  const { getTodos } = useContext(TodoContext) as TodoContextType;

  useEffect(() => {
    redirect("/new");
  }, []);

  return <div className="mt-24">Loading</div>;
}
