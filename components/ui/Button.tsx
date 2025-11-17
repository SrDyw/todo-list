import { ButtonProps } from "@/types/ui/types";
import IcSend from "../icons/IcSend";

export default function Button({
  Content,
  Icon,
  OnClick,
  className = "p-3",
  IconBlur = true,
  Disabled,
}: ButtonProps) {
  return (
    <button
      className={`shrink-0 flex justify-center items-center gap-2 rounded-full ${
        Content != undefined ? "px-6" : ""
      } relative ${
        Disabled ? "opacity-35" : "cursor-pointer hover:bg-[#1f1f1f]"
      } ${className}`}
      onClick={(e) => {
        if (Disabled) return;
        e.stopPropagation();
        OnClick?.(e);
      }}
    >
      {Content}
      <span className="relative">
        {Icon}

        {IconBlur && (
          <span className="absolute top-0 left-0 blur-[2px]">{Icon}</span>
        )}
      </span>
    </button>
  );
}
