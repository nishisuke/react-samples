import { VFC, useState, useRef, useCallback } from "react";
import {
  DndProvider,
  useDrag,
  useDrop,
  DropTargetMonitor,
  DragSourceMonitor,
} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Item {
  id: number;
}
interface CardProps {
  id: any;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}
interface DragItem {
  index: number;
}

const ITEM = "card";
const items: Item[] = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
];

export const Dnd = () => {
  const [cards, setCards] = useState(items);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      const copy = [...cards];
      copy.splice(dragIndex, 1);
      copy.splice(hoverIndex, 0, dragCard);
      setCards(copy);
    },
    [cards]
  );

  return (
    <DndProvider backend={HTML5Backend}>
      {cards.map((card, i) => (
        <Card key={card.id} index={i} id={card.id} moveCard={moveCard} />
      ))}
    </DndProvider>
  );
};

const Card: VFC<CardProps> = ({ id, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ITEM,
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM,
    item: () => ({ id, index }),
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,

        border: "1px dashed gray",
        padding: "0.5rem 1rem",
        marginBottom: ".5rem",
        backgroundColor: "white",
        cursor: "move",
      }}
      data-handler-id={handlerId}
    >
      {id.toString()}
    </div>
  );
};
