import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/solid-query";
import { AddTodo } from "./components/add-todo";
import { TodoSummary } from "./components/todo-summary";
import { TodoList } from "./components/todo-list";

import "./styles.css";

const client = new QueryClient();

export const Root = () => (
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);

const App = () => {

  return (
    <main>
      <header>Example TODO app</header>
      <AddTodo />
      <TodoSummary />
      <TodoList />
    </main>
  );
};
