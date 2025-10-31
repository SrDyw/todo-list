import { ITodo, TodoModalType } from "@/types/core/type";
import { useState } from "react";

export const useTodoModal = (): TodoModalType => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = (todo : ITodo) => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return { isOpen };
};
