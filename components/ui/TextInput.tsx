import { InputTextProps } from "@/types/ui/types";
import IcSend from "../icons/IcSend";
import Button from "./Button";
import { useState } from "react";

export default function TextInput({ OnChange, Value, Placeholder, className, containerClassName, Type = "text", Label, SubmitConfig }: InputTextProps) {

    const [internalV, setInternalV] = useState<string>("");

    return <div className="w-full">
        {Label &&
            <label htmlFor="task-title" className="flex items-center justify-start gap-2 m-2">
                <span>{Label.Icon}</span>
                {Label.Name}
            </label>}
        <div className={`bg-[#181818] rounded-3xl border  border-[#282c34] flex flex-nowrap items-center w-full ${containerClassName}`}>
            <input
                name="task-title"
                type={Type}
                className={`w-full px-4 outline-none border-none ${className}`}
                placeholder={Placeholder}
                autoComplete="off"
                value={Value ?? internalV}
                onChange={(e) => {
                    setInternalV(e.currentTarget.value)
                    OnChange?.(e.currentTarget.value)
                }}
            />
            <Button Icon={SubmitConfig?.Icon} Content={SubmitConfig?.Text} OnClick={(e) => {
                SubmitConfig?.OnSubmit?.(Value ?? internalV);
            }} />
        </div>
    </div>
}