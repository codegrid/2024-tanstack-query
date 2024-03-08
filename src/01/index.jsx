import {
  QueryClient,
  QueryClientProvider,
  createQuery,
} from "@tanstack/solid-query";
import { Switch, Match, For } from "solid-js";

const client = new QueryClient();

export const Root = () => (
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);

const fetchTodos = async () => {
  await new Promise((r) => setTimeout(r, 2000));

  return [{ title: "Buy milk" }, { title: "Buy eggs" }];
};

const App = () => {
  const query = createQuery(() => ({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
  }));

  return (
    <main>
      <Switch>
        <Match when={query.isPending}>
          <p>Loading...</p>
        </Match>
        <Match when={query.isError}>
          <p>Error: {query.error?.message}</p>
        </Match>
        <Match when={query.isSuccess}>
          <p>{query.data?.length} todos</p>
          <ul>
            <For each={query.data}>{(todo) => <li>{todo.title}</li>}</For>
          </ul>
        </Match>
      </Switch>
    </main>
  );
};
