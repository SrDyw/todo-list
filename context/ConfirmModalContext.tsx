import Backdrop from "@/components/ui/Backdrop";
import Modal from "@/components/ui/Modal";
import {
  ModalContextOpenParams,
  ConfirmModalContextType,
} from "@/types/core/type";
import React, { useState } from "react";

export const ConfirmModalContext =
  React.createContext<ConfirmModalContextType | null>(null);

interface UIElements {
  title: string;
  text: string;
}

export const ConfirmModalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [onClose, setOnClose] = useState<() => void>();
  const [onSubmit, setOnSubmit] = useState<() => void>();
  const [ui, setUI] = useState<UIElements>();

  const onOpen = (v: ModalContextOpenParams) => {
    const { onClose, title, onSubmit, text } = v;

    setUI({
      title,
      text,
    });
    setVisible(true);
    setIsOpen(true);
    setOnClose(() => onClose);
    setOnSubmit(() => onSubmit);
  };

  const onCloseModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setVisible(false);
    }, 280);
    onClose?.();
  };

  return (
    <ConfirmModalContext.Provider value={{ isOpen, onOpen }}>
      {visible && (
        <div className="fixed top-0 left-0 h-screen w-screen z-[100]">
          <Backdrop OnClick={onCloseModal}>
            <Modal
              isOpen={isOpen}
              title={ui?.title ?? "Title"}
              onSubmit={() => {
                onSubmit?.();
                onCloseModal();
              }}
              onClose={() => {
                onCloseModal();
              }}
            >
              <p>{ui?.text}</p>
            </Modal>
          </Backdrop>
        </div>
      )}
      {children}
    </ConfirmModalContext.Provider>
  );
};
