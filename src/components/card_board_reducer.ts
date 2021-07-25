import { Reducer } from "react";
import { DropResult } from "react-beautiful-dnd";

import { Item } from "interfaces/item";
import { lists, items } from "data";
import { swap } from "utils/swap";

type Columns = { [id: string]: Item[] };
interface State {
  columns: Columns;
  ordered: string[];
}

type Action =
  | { type: "DROPPED"; result: DropResult }
  | { type: "COLUMN_DROPPED"; result: DropResult };

const listNameItemsMap = lists.reduce(
  (previous, list) => ({
    ...previous,
    [list.name]: items.filter((item) => item.listID === list.id),
  }),
  {}
);

export const initialState: State = {
  columns: listNameItemsMap,
  ordered: lists.map((l) => l.name),
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "COLUMN_DROPPED":
      // TODO: Smart way to avoid 'has already been declared' in switch statement.
      const { ordered: o } = state;
      const { destination: d, source: s } = action.result;
      if (!d) return state;
      return {
        ...state,
        ordered: swap(o, s.index, d.index),
      };
    case "DROPPED":
      const { columns } = state;
      const { destination, source } = action.result;
      if (!destination) return state;

      const current = [...columns[source.droppableId]];
      if (source.droppableId === destination.droppableId) {
        const result = {
          ...columns,
          [source.droppableId]: swap(current, source.index, destination.index),
        };
        return {
          ...state,
          columns: result,
        };
      } else {
        const next = [...columns[destination.droppableId]];
        const target = current[source.index];

        current.splice(source.index, 1);
        next.splice(destination.index, 0, target);

        const result = {
          ...columns,
          [source.droppableId]: current,
          [destination.droppableId]: next,
        };
        return {
          ...state,
          columns: result,
        };
      }
    default:
      throw new Error("Impl err");
  }
};
