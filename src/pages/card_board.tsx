import { useReducer, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { Item } from "interfaces/item";
import { reducer, initialState } from "components/card_board_reducer";
import { Box, Card, CardContent, Paper, Typography } from "@material-ui/core";

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
          <Box
            display="flex"
            ref={listDropProvided.innerRef}
            {...listDropProvided.droppableProps}
          >
            {ordered.map((key, index) => (
              <Draggable key={key} draggableId={key} index={index}>
                {(listDragProvided) => (
                  <Paper
                    sx={{
                      m: 1,
                      p: 1,
                      width: 256,
                    }}
                    square
                    ref={listDragProvided.innerRef}
                    {...listDragProvided.draggableProps}
                  >
                    <Box
                      sx={{
                        minHeight: 64,
                      }}
                      alignItems="center"
                      justifyContent="center"
                      display="flex"
                      {...listDragProvided.dragHandleProps}
                    >
                      <Typography variant="h6">{key}</Typography>
                    </Box>

                    <Droppable droppableId={key} type="QUOTE">
                      {(dropProvided) => (
                        <Box
                          {...dropProvided.droppableProps}
                          sx={{
                            minHeight: 256,
                          }}
                          ref={dropProvided.innerRef}
                        >
                          {columns[key].map((item: Item, index: number) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(dragProvided) => (
                                <Card
                                  sx={{
                                    m: 1,
                                  }}
                                  key={item.id}
                                  ref={dragProvided.innerRef}
                                  {...dragProvided.draggableProps}
                                  {...dragProvided.dragHandleProps}
                                >
                                  <CardContent>
                                    <Typography variant="body1">
                                      {item.content}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              )}
                            </Draggable>
                          ))}
                          {dropProvided.placeholder}
                        </Box>
                      )}
                    </Droppable>
                  </Paper>
                )}
              </Draggable>
            ))}
            {listDropProvided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
