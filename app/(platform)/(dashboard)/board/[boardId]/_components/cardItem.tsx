import { Card } from "@/lib/generated/prisma/client";

interface CardItemProps {
  index: number;
  data: Card;
}

export const CardItem = ({ index, data }: CardItemProps) => {
  return (
    <li
      role="button"
      className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
    >
      {data.title}
    </li>
  );
};
