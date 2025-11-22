"use client";

import React, { useContext, useEffect, useState } from "react";
import IcBars from "./icons/IcBars";
import Button from "./ui/Button";
import Backdrop from "./ui/Backdrop";
import { TodoContext } from "@/context/TodoContext";
import { TodoContextType, TodoModalContextType } from "@/types/core/type";
import IcEdit from "./icons/IcEdit";
import Modal from "./ui/Modal";
import TextInput from "./ui/TextInput";
import IcChatBubble from "./icons/IcChatBubble";
import { redirect } from "next/navigation";
import IcClose from "./icons/IcClose";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { appConfig } from "@/app.config";
import IcGithub from "./icons/IcGithub";
import IcPlus from "./icons/IcPlus";
import { BaseSessionData } from "@/mocks/data.template";

interface LinkProps {
  title: string;
  link: string;
  id: string;
}

export default function Sidebar() {
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  const [selectedLink, setSelectedLink] = useState<LinkProps>();

  const { onOpen } = useConfirmModal();

  const {
    data,
    todos,
    session,
    updateTodoStorage,
    deleteSession,
    editSession,
  } = useContext(TodoContext) as TodoContextType;

  const openEditModal = (v: LinkProps) => {
    setSelectedLink(v);
    setEditModalIsOpen(true);
  };

  useEffect(() => {
    refreshLinks();
  }, [data, todos]);

  const refreshLinks = () => {
    if (data == undefined || data.sesions == undefined) return;

    setLinks(
      data.sesions
        .filter((x) => !x.deleted)
        .sort((x, y) => x.date - x.date)
        .map(
          (x, key) =>
            ({
              link: "/" + x.id,
              title: x.title,
              id: x.id,
            } as LinkProps)
        )
    );
  };

  const onClose = () => {
    setEditModalIsOpen(false);
    // setLinks( prev => (prev.filter(x => x.link != selectedLink?.link)))
  };

  const onDeleteSession = (id: string) => {
    if (data == undefined) return;

    deleteSession(id, () => {
      setNavIsOpen(false);
    });

    refreshLinks();
  };

  const onSubmit = () => {
    if (data == undefined) return;

    editSession(selectedLink!.id, {
      ...BaseSessionData(),
      title: selectedLink!.title,
    });

    refreshLinks();
    onClose();
  };

  return (
    <nav className="fixed text-white top-0 left-0 h-screen z-50">
      <div className="z-10 absolute top-0 left-0 p-2">
        <Button
          Icon={<IcBars />}
          OnClick={() => setNavIsOpen((prev) => !prev)}
        />
      </div>
      <Modal
        isOpen={editModalIsOpen}
        title="Edit title"
        onClose={onClose}
        onSubmit={onSubmit}
      >
        <TextInput
          Placeholder="Task title"
          OnChange={(v) => {
            setSelectedLink((prev) => prev && { ...prev, title: v });
          }}
          Value={selectedLink?.title}
          autoFocus
          Label={{ Name: "Title", Icon: <IcChatBubble /> }}
          SubmitConfig={{
            Icon: <IcEdit />,
            IconBlur: false,
            Disabled: true,
          }}
        />
      </Modal>
      {navIsOpen && (
        <Backdrop OnClick={() => setNavIsOpen((prev) => !prev)}>
          <div className="w-72 bg-[#181818] h-full top-0 absolute left-0 p-4">
            <div className="mt-12 flex justify-between relative w-full">
              <p className="flex justify-start flex-col mb-8">
                <span className="text-2xl font-black">Todo App</span>
                <span className="opacity-60 font-semibold">Sessions</span>
              </p>
              <Button
                Icon={<IcPlus />}
                className="size-12"
                OnClick={() => {
                  setTimeout(() => {
                    setNavIsOpen(false);
                  }, 1);
                  redirect("/");
                }}
              />
            </div>
            {links.length == 0 ? (
              <p>No history</p>
            ) : (
              <ul className="w-full">
                {links.map((x, i) => (
                  <li className="p-2 flex justify-between items-center" key={i}>
                    <a href={x.link}>{x.title}</a>
                    <div className="flex justify-end gap-4">
                      <Button
                        Icon={<IcEdit />}
                        OnClick={() => openEditModal(x)}
                        className="p-0"
                      />
                      <Button
                        Icon={<IcClose />}
                        OnClick={() =>
                          onOpen({
                            text:
                              "Are you sure you want to delete session named " +
                              x.title,
                            onSubmit: () => {
                              onDeleteSession(x.id);
                            },
                            title: "Delete session",
                          })
                        }
                        className="p-0 text-red-300"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="absolute bottom-2 w-full left-0 p-4 flex justify-between items-center">
              <p className="">v{appConfig.version}</p>
              <a
                href="https://github.com/SrDyw/todo-list"
                className="text-white"
                target="_blank"
              >
                <Button Icon={<IcGithub />} className="p-0" />
              </a>
            </div>
          </div>
        </Backdrop>
      )}
    </nav>
  );
}
