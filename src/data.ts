import { List } from "interfaces/list";
import { Item } from "interfaces/item";
const jake = {
  id: "1",
  name: "Jake",
};

const BMO = {
  id: "2",
  name: "BMO",
};

const finn = {
  id: "3",
  name: "Finn",
};

const princess = {
  id: "4",
  name: "Princess bubblegum",
};

export const lists: List[] = [jake, BMO, finn, princess];
export const items: Item[] = [
  {
    id: "1",
    content: "Sometimes life is scary and dark",
    listID: "1",
  },
  {
    id: "2",
    content:
      "Sucking at something is the first step towards being sorta good at something.",
    listID: "2",
  },
  {
    id: "3",
    content: "You got to focus on what's real, man",
    listID: "3",
  },
  {
    id: "4",
    content: "Is that where creativity comes from? From sad biz?",
    listID: "4",
  },
  {
    id: "5",
    content: "Homies help homies. Always",
    listID: "3",
  },
  {
    id: "6",
    content: "Responsibility demands sacrifice",
    listID: "2",
  },
  {
    id: "7",
    content: "That's it! The answer was so simple, I was too smart to see it!",
    listID: "1",
  },
  {
    id: "8",
    content: "People make mistakes. It’s a part of growing up",
    listID: "1",
  },
  {
    id: "9",
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    listID: "1",
  },
  {
    id: "10",
    content: "I should not have drunk that much tea!",
    listID: "1",
  },
  {
    id: "11",
    content: "Please! I need the real you!",
    listID: "1",
  },
  {
    id: "12",
    content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    listID: "1",
  },
];
