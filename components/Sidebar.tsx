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

interface LinkProps {
  title: string;
  link: string;
  id: number;
}

export default function Sidebar() {
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false);
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  const [selectedLink, setSelectedLink] = useState<LinkProps>();

  const { data, updateTodoStorage } = useContext(TodoContext) as TodoContextType;

  const openEditModal = (v: LinkProps) => {
    setSelectedLink(v);
    setEditModalIsOpen(true);
  };

  useEffect(() => {
    refreshLinks();
  }, [data]);

  const refreshLinks = () => {
    alert(data)
    if (data == undefined || data.sesions == undefined) return;
    setLinks(
      data.sesions.map(
        (x, key) =>
          ({
            link: "/" + x.id,
            title: x.title,
            id: key,
          } as LinkProps)
      )
    );
  };

  const onClose = () => {
    setEditModalIsOpen(false);
    // setLinks( prev => (prev.filter(x => x.link != selectedLink?.link)))
  };

  const onSubmit = () => {
    if (data == undefined) return;

    data.sesions[selectedLink!.id].title = selectedLink!.title;
    updateTodoStorage();
    refreshLinks();
    onClose();
  };

  return (
    <nav className="fixed text-white top-0 left-0 h-screen z-50">
      <div className="z-10 absolute top-0 left-0">
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
            <p className="mt-12 flex justify-start flex-col mb-8">
              <span className="text-2xl font-black">Todo App</span>
              <span className="opacity-60 font-semibold">Sessions</span>
            </p>
            {links.length == 0 ? (
              <p>No history</p>
            ) : (
              <ul className="w-full">
                {links.map((x, i) => (
                  <li className="p-2 flex justify-between items-center" key={i}>
                    <a href={x.link}>{x.title}</a>
                    <Button
                      Icon={<IcEdit />}
                      OnClick={() => openEditModal(x)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Backdrop>
      )}
    </nav>
  );
}
