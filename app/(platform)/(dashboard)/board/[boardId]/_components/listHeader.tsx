"use client";

import { FormInput } from "@/components/form/formInput";
import { List } from "@/lib/generated/prisma/client";
import { useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";

interface ListHeaderProps {
  data: List;
}

export const ListHeader = ({ data }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  useEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  });

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form className="flex-1 px-0.5">
          <input hidden readOnly id="id" name="id" value={data.id} />
          <input
            hidden
            readOnly
            id="boardId"
            name="boardId"
            value={data.boardId}
          />
          <FormInput
            id="title"
            ref={inputRef}
            defaultValue={title}
            onBlur={() => setIsEditing(false)}
            placeholder="Enter list title..."
            className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
          />
        </form>
      ) : (
        <div
          onClick={handleEditing}
          className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
        >
          {data.title}
        </div>
      )}
    </div>
  );
};
