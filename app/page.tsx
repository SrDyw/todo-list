"use client";

import { useStorage } from "@/hooks/useStorage";
import { useTask } from "@/hooks/useTask";
import { ITask, ITaskSet } from "@/types/task";
import React, { useEffect } from "react";

export default function page() {
  const { getTask } = useTask();

  useEffect(() => {
    console.log(getTask("Task set 2"));
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center azucar">
        <form action="" className="w-full flex justify-center items-center">
          <div className=" w-[80%] max-w-[600px] rainbow-outline">
            <input
              name="task-title"
              type="text"
              className="bg-[#21252b] border-0 outline-0 rounded-3xl pl-4 font-bold w-full text-3xl p-4"
            />
          </div>
        </form>
      </div>
    </>
  );
}
