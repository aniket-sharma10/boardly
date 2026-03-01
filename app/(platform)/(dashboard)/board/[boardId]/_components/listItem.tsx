"use client";

import { ListWithCards } from "@/types";
import { ListHeader } from "./listHeader";
import { useRef, useState } from "react";
import { CardForm } from "./cardForm";
import { cn } from "@/lib/utils";
import { CardItem } from "./cardItem";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

export const ListItem = ({ index, data }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} onAddCard={handleEditing} />
        <ol
          className={cn(
            "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
            data.cards.length > 0 ? "mt-2" : "mt-0",
          )}
        >
          {data.cards.map((card, index) => (
            <CardItem index={index} key={card.id} data={card} />
          ))}
        </ol>
        <CardForm
          ref={textareaRef}
          listId={data.id}
          isEditing={isEditing}
          enableEditing={handleEditing}
          disableEditing={() => setIsEditing(false)}
        />
      </div>
    </li>
  );
};
