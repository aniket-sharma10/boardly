"use client";

import { ComponentRef, useRef, useState } from "react";
import { FormInput } from "@/components/form/formInput";
import { Button } from "@/components/ui/button";
import { Board } from "@/lib/generated/prisma/client";
import { useAction } from "@/hooks/useAction";
import { toast } from "sonner";
import { updateBoard } from "@/actions/updateBoard";

interface BoardTitleFormProps {
  data: Board;
}
export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ComponentRef<"form">>(null);
  const inputRef = useRef<ComponentRef<"input">>(null);
  const [title, setTitle] = useState(data.title);
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} updated`);
      setIsEditing(false);
      setTitle(data.title);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 100);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const title = formdata.get("title") as string;
    execute({
      title,
      id: data.id,
    });
  };

  if (isEditing) {
    return (
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex items-center gap-x-2"
      >
        <FormInput
          id="title"
          ref={inputRef}
          onBlur={() => formRef.current?.requestSubmit()}
          defaultValue={title}
          className="text-lg md:text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      type="button"
      variant="transparent"
      onClick={handleEditing}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};
