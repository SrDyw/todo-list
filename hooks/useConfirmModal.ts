import { useContext } from "react";
import { ConfirmModalContext } from "@/context/ConfirmModalContext";
import { ConfirmModalContextType } from "@/types/core/type";

export const useConfirmModal = () => {
  const { onOpen, isOpen } = useContext(
    ConfirmModalContext
  ) as ConfirmModalContextType;

  return { isOpen, onOpen };
};
