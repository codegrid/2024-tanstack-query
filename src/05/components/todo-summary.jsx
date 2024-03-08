import { createQuery } from "@tanstack/solid-query";
import { listTodos } from "../api";
import { Show } from "solid-js";

export const TodoSummary = () => {
  const todosQuery = createQuery(() => ({
    queryKey: ["todos"],
    queryFn: () => listTodos(),
    select: (data) => {
      if (data.length === 0) return "No todos! ☕️";
      if (data.length === 1) return "Only 1 todo left, get to it!";
      return `${data.length} todos left.`;
    },
  }));

  return (
    <p>
      Summary:{" "}
      <Show when={todosQuery.isSuccess} fallback={"..."}>
        {todosQuery.data}
      </Show>
    </p>
  );
};
