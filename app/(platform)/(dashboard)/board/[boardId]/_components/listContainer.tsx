"use client";

import { ListWithCards } from "@/types";
import { ListForm } from "./listForm";

interface ListContainerProps {
  lists: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({ lists, boardId }: ListContainerProps) => {
  return (
    <ol className="">
      <ListForm />
      <div className="flex-shrink-0 w-1"></div>
    </ol>
  );
};
