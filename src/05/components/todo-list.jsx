import {
  createQuery,
  createMutation,
  useQueryClient,
} from "@tanstack/solid-query";
import { Switch, Match, For } from "solid-js";
import { listTodos, deleteTodo } from "../api";

/** @param {{ id: string; title: string }} props */
const TodoItem = ({ id, title }) => {
  const queryClient = useQueryClient();

  const deleteMutation = createMutation(() => ({
    mutationFn: /** @param {string} id */ (id) => deleteTodo(id),
    onMutate: (deleteId) => {
      // Optimistic update for instant UI feedback
      queryClient.setQueryData(
        ["todos"],
        /** @param {{ id: string }[]} prev */ (prev) =>
          prev.filter((i) => i.id !== deleteId),
      );
    },
    onSettled: () => {
      // After all, update list with real data
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  }));

  return (
    <>
      <button
        disabled={deleteMutation.isPending}
        onClick={() => deleteMutation.mutate(id)}
      >
        💣
      </button>
      {title}
    </>
  );
};

export const TodoList = () => {
  const todosQuery = createQuery(() => ({
    queryKey: ["todos"],
    queryFn: () => listTodos(),
  }));

  return (
    <Switch>
      <Match when={todosQuery.isPending}>Loading...🌀</Match>
      <Match when={todosQuery.isError}>Error!</Match>
      <Match when={todosQuery.isSuccess}>
        <ul classList={{ "-sync": todosQuery.isFetching }}>
          <For each={todosQuery.data}>
            {(todo) => (
              <li>
                <TodoItem {...todo} />
              </li>
            )}
          </For>
        </ul>
      </Match>
    </Switch>
  );
};
