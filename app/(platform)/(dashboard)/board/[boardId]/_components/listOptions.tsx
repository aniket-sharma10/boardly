import { List } from "@/lib/generated/prisma/client";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormButton } from "@/components/form/formButton";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/useAction";
import { deleteList } from "@/actions/deleteList";
import { toast } from "sonner";
import { useRef } from "react";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: () => {
      toast.success(`List deleted successfully`);
      closeRef.current?.click();
    },
    onError: () => {
      toast.error(`Failed to delete list`);
    },
  });

  const handleDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeDelete({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          listactions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant={"ghost"}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          variant={"ghost"}
          className="rounded-none h-auto w-full p-2 px-5 justify-start font-normal text-sm"
        >
          Add Card...
        </Button>
        <form>
          <input id="id" name="id" value={data.id} hidden />
          <input id="boardId" name="boardId" value={data.boardId} hidden />
          <FormButton
            variant="ghost"
            className="rounded-none h-auto w-full p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list
          </FormButton>
        </form>
        <Separator />
        <form action={handleDelete}>
          <input id="id" name="id" value={data.id} hidden />
          <input id="boardId" name="boardId" value={data.boardId} hidden />
          <FormButton
            variant="ghost"
            className="rounded-none h-auto w-full p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list
          </FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
