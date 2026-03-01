"use client";

import { createCard } from "@/actions/createCard";
import { FormButton } from "@/components/form/formButton";
import { FormTextarea } from "@/components/form/formTextarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  (
    { listId, isEditing, enableEditing, disableEditing }: CardFormProps,
    ref,
  ) => {
    const params = useParams();
    const formRef = useRef<HTMLFormElement>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card ${data.title} created successfully`);
        disableEditing();
        formRef.current?.reset();
      },
      onError: (error) => {
        toast.error(error || `Failed to create card`);
      },
    });

    const handleSubmit = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;
      console.log({ title, listId, boardId });
      execute({ title, listId, boardId });
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    const onTextareakeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    useOnClickOutside(formRef as React.RefObject<HTMLElement>, disableEditing);
    useEventListener("keydown", onKeyDown);

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={handleSubmit}
          className="m-1 space-y-4 px-1 py-0.5"
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextareakeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <input hidden readOnly id="listId" name="listId" value={listId} />
          <div className="flex items-center gap-x-1">
            <FormButton>Add card</FormButton>
            <Button
              onClick={disableEditing}
              type="button"
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          className="h-auto w-full justify-start px-2 py-1.5 text-muted-foreground text-sm"
          size={"sm"}
          variant={"ghost"}
          onClick={enableEditing}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </div>
    );
  },
);

CardForm.displayName = "CardForm";
