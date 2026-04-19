import { useCardModal } from "@/hooks/useCardModal";
import { Card } from "@/lib/generated/prisma/client";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps {
  index: number;
  data: Card;
}

export const CardItem = ({ index, data }: CardItemProps) => {
  const { onOpen } = useCardModal();
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={() => onOpen(data.id)}
          className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
        >
          {data.title}
        </li>
      )}
    </Draggable>
  );
};
