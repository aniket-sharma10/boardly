"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/formInput";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { ListWrapper } from "./listWrapper";
import { FormButton } from "@/components/form/formButton";
import { useAction } from "@/hooks/useAction";
import { createList } from "@/actions/createList";

export const ListForm = () => {
  const router = useRouter();
  const params = useParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      setIsEditing(false);
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  });
  useOnClickOutside(formRef as React.RefObject<HTMLElement>, () =>
    setIsEditing(false),
  );

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    execute({ title, boardId });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          action={handleSubmit}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            id="title"
            ref={inputRef}
            errors={fieldErrors}
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition-all"
            placeholder="Enter list title..."
          />
          <input hidden value={params.boardId} readOnly name="boardId" />
          <div className="flex items-center justify-between gap-x-1">
            <FormButton>Add list</FormButton>
            <Button
              onClick={() => setIsEditing(false)}
              type="button"
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      {/* <form className="w-full p-3 bg-white rounded-md space-y-4 shadow-md"> */}
      <Button
        onClick={handleEditing}
        className="w-full rounded-md text-black/80 bg-white/80 hover:bg-white/50 transition p-5.5 flex items-center justify-start text-sm font-medium"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add a list
      </Button>
      {/* </form> */}
    </ListWrapper>
  );
};
