import { useEffect, useRef, useState } from "react"
import IcClose from "../icons/IcClose"
import Button from "./Button"
import IcEdit from "../icons/IcEdit";
import { wait } from "@/lib/libs";

export interface ModalProps {
    children: React.ReactNode,
    title: string,
    footer?: React.ReactNode,
    isOpen: boolean,
    onClose?: () => void,
    onSubmit?: () => void
}

export default function Modal({ children, title, isOpen, footer, onClose, onSubmit }: ModalProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) {
            onCloseModal();
            return;
        }
        onOpenModal();
    }, [isOpen]);

    const onCloseModal = async () => {
        onClose?.();
        modalRef.current?.classList.remove("move-up-animation");

        await wait(1);
        modalRef.current?.classList.add("move-down-animation");
        setTimeout(() => {
            setIsVisible(false);
        }, 280)
    }

    const handleMouseMove = (e: TouchEvent) => {
        const [touch] = e.touches;
        // console.log(touch.clientY, modalRef.current?.clientHeight);
        
        const p = -20


        // modalRef.current!.style.bottom = "-20px";
    }


    const onOpenModal = () => {
        setIsVisible(true)
    }

    useEffect(() => {
        document.addEventListener("touchmove", handleMouseMove)

        return () => {
            document.removeEventListener("touchmove", handleMouseMove);
        }
    }, [])


    return isVisible && <div
        className="fixed w-screen h-screen z-50 bg-[#0000009f]"
        onClick={onCloseModal}
    >
        <div
            className="move-up-animation absolute max-sm:w-full max-sm:-bottom-5 left-[50%] translate-x-[-50%] sm:top-[50%] sm:translate-y-[-50%] w-[500px] shadow-2xl "
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => console.log(e.touches[0].clientX)}
            ref={modalRef}
        >
            <div className="sm:hidden absolute top-0 mt-4 w-24 h-1 rounded-4xl bg-gray-500 left-[50%] translate-x-[-50%]"></div>
            <div className=" top-0 left-0 w-full bg-[#181818] h-full z-0 p-6 rounded-2xl fle flex-col">
                {/* HEADER */}
                <div className="header justify-between flex items-center bg-[#121212] rounded-3xl p-2 px-4 mb-4">
                    <p className="font-black text-2xl truncate">
                        {title}
                    </p>
                    <Button Icon={<IcClose />} OnClick={onCloseModal} />
                </div>
                {/* CONTENT */}
                {children}
                {/* FOOTER */}
                {footer ? (<>{footer}</>) : (<div className="footer mt-12 left-0 p-4 flex justify-end items-center w-full gap-3">
                    <Button
                        Content="Accept"
                        className="bg-blue-500 hover:bg-white hover:text-gray-900"
                        Icon={<IcEdit />}
                        IconBlur={false}
                        OnClick={(e) => {
                            e.stopPropagation();
                            onSubmit?.();
                        }}
                    />
                    <Button Content="Cancel" OnClick={onClose} />
                </div>)}
            </div>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rainbow w-[calc(100%+2px)] h-[calc(100%+2px)] -z-10 rounded-2xl"></div>
        </div>
    </div>
}