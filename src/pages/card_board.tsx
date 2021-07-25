import { useReducer, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";

import { Item } from "interfaces/item";
import { reducer, initialState } from "components/card_board_reducer";

const DropZone = styled.div`
  min-height: 200px;
  padding-bottom: 8px;
`;

export const CardBoard = () => {
  const [{ columns, ordered }, dispatch] = useReducer(reducer, initialState);
  const onDragEnd = useCallback((result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    dispatch({
      type: type === "COLUMN" ? "COLUMN_DROPPED" : "DROPPED",
      result,
    });
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {(listDropProvided) => (
          <div
            style={{ display: "flex" }}
            ref={listDropProvided.innerRef}
            {...listDropProvided.droppableProps}
          >
            {ordered.map((key, index) => (
              <Draggable key={key} draggableId={key} index={index}>
                {(listDragProvided) => (
                  <div
                    ref={listDragProvided.innerRef}
                    {...listDragProvided.draggableProps}
                  >
                    <div {...listDragProvided.dragHandleProps}>{key}</div>
                    <Droppable droppableId={key} type="QUOTE">
                      {(dropProvided) => (
                        <div {...dropProvided.droppableProps}>
                          <DropZone ref={dropProvided.innerRef}>
                            {columns[key].map((item: Item, index: number) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(dragProvided) => (
                                  <div
                                    key={item.id}
                                    ref={dragProvided.innerRef}
                                    {...dragProvided.draggableProps}
                                    {...dragProvided.dragHandleProps}
                                  >
                                    <div>{item.content}</div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {dropProvided.placeholder}
                          </DropZone>
                        </div>
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>
            ))}
            {listDropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
