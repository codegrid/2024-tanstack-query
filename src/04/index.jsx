import {
  QueryClient,
  QueryClientProvider,
  createMutation,
} from "@tanstack/solid-query";
import { Switch, Match } from "solid-js";

const client = new QueryClient();

export const Root = () => (
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);

/** @param {{ title: string }} todo */
const addTodo = async (todo) => {
  console.log("📚", `addTodo(${JSON.stringify(todo)})`);
  await new Promise((r) => setTimeout(r, 2000));

  return { id: Date.now(), ...todo };
};

const App = () => {
  const mutation = createMutation(() => ({
    mutationFn: /** @param {string} title */ (title) => addTodo({ title }),
  }));

  return (
    <main>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          const $title =
            /** @type {HTMLInputElement} */
            (ev.currentTarget.elements.namedItem("title"));
          mutation.mutate($title?.value);
        }}
      >
        <input type="text" name="title" />
        <button type="submit" disabled={mutation.isPending}>
          Add
        </button>
      </form>
      <Switch>
        <Match when={mutation.isError}>
          <p>Error: {mutation.error?.message}</p>
        </Match>
        <Match when={mutation.isSuccess}>
          <p>Success!</p>
        </Match>
      </Switch>
    </main>
  );
};
