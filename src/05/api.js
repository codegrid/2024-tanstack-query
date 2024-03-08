const id = () => Math.random().toString().slice(2);

/** @param {number} ms */
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const TODOS = [
  { id: id(), title: "Learn Solid.js" },
  { id: id(), title: "Enjoy TanStack Query" },
];

export const listTodos = async () => {
  console.log("listTodos()");
  await sleep(1000);

  return structuredClone(TODOS);
};

/** @param {string} title */
export const addTodo = async (title) => {
  console.log("addTodo()", title);
  await sleep(2000);

  const newTodo = {
    id: id(),
    title,
  };

  TODOS.push(newTodo);

  return newTodo;
};

/** @param {string} id */
export const deleteTodo = async (id) => {
  console.log("deleteTodo()", id);
  await sleep(500);

  const index = TODOS.findIndex((todo) => todo.id === id);
  const deletedTodo = TODOS.splice(index, 1)[0];

  return deletedTodo;
};
