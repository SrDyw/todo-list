import { ButtonProps } from "@/types/ui/types";
import IcSend from "../icons/IcSend";

export default function Button({
  Content,
  Icon,
  OnClick,
  className,
  IconBlur = true
}: ButtonProps) {
  return (
    <button
      className={`cursor-pointer shrink-0 flex justify-center items-center gap-2 hover:bg-[#1f1f1f] rounded-full mx-4 p-3 relative ${className}`}
      onClick={OnClick}
    >
      {Content}
      <span>{Icon}</span>
      {IconBlur && <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[2px]">{Icon}</span>}
    </button>
  );
}
