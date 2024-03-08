import {
  QueryClient,
  QueryClientProvider,
  createQuery,
} from "@tanstack/solid-query";
import { Switch, Match, createSignal } from "solid-js";

const client = new QueryClient();

export const Root = () => (
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);

/** @param {number} id */
const fetchTodo = async (id) => {
  console.log("🕺", `fetchTodo(${id})`);
  await new Promise((r) => setTimeout(r, 2000));

  if (id % 2 === 0)
    return { id, title: "Greetings from Solid.js" + "!".repeat(id) };

  return null;
};

const App = () => {
  const [id, setId] = createSignal(0);
  const query = createQuery(() => ({
    // THIS DOESN'T WORK!
    // queryKey: ["todo"],
    // queryFn: () => fetchTodo(id()),
    queryKey: ["todo", id()],
    queryFn: ({ queryKey: [, id] }) => fetchTodo(Number(id)),
  }));

  return (
    <main>
      <input
        type="number"
        value={id()}
        onInput={(ev) => setId(ev.target.valueAsNumber)}
      />
      <Switch>
        <Match when={query.isPending}>
          <p>Loading...</p>
        </Match>
        <Match when={query.isError}>
          <p>Error: {query.error?.message}</p>
        </Match>
        <Match when={query.isSuccess}>
          <p>{query.data?.title ?? "Not found..."}</p>
        </Match>
      </Switch>
    </main>
  );
};
