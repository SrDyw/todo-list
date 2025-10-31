import { ButtonProps } from "@/types/ui/types";
import IcSend from "../icons/IcSend";

export default function Button({
  Content,
  Icon,
  OnClick,
  className,
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer shrink-0 flex justify-center items-center gap-2 hover:bg-[#1f1f1f] rounded-full mx-4 p-3 ${className}`}
      onClick={OnClick}
    >
      {Content}
      <span>{Icon}</span>
    </button>
  );
}
