"use client";

import { updateList } from "@/actions/updateList";
import { FormInput } from "@/components/form/formInput";
import { useAction } from "@/hooks/useAction";
import { List } from "@/lib/generated/prisma/client";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./listOptions";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`List renamed to "${data.title}"`);
      setTitle(data.title);
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      setIsEditing(false);
      return;
    }

    execute({ id, title, boardId });
  };

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
        <form ref={formRef} action={handleSubmit} className="flex-1 px-0.5">
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
            onBlur={() => formRef.current?.requestSubmit()}
            placeholder="Enter list title..."
            className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
          />
          <button hidden type="submit" />
        </form>
      ) : (
        <div
          onClick={handleEditing}
          className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
        >
          {data.title}
        </div>
      )}

      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};
