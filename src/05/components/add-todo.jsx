import { createMutation, useQueryClient } from "@tanstack/solid-query";
import { createSignal } from "solid-js";
import { addTodo } from "../api";

export const AddTodo = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = createSignal("");
  const [onceFocus, setOnceFocus] = createSignal(false);
  const addMutation = createMutation(() => ({
    mutationFn: /** @param {string} title */ (title) => addTodo(title),
    onSuccess: () => {
      setTitle("");
      setOnceFocus(false);
      // Update list!
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  }));

  const message = () => {
    if (onceFocus()) return "";
    if (addMutation.isSuccess) return "✨ Success!";
    if (addMutation.isError) return "💥 Error!";
    return "";
  };

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        addMutation.mutate(title());
      }}
    >
      <input
        type="text"
        value={title()}
        onInput={(ev) => setTitle(ev.currentTarget.value)}
        onFocus={() => setOnceFocus(true)}
      />
      <button type="submit" disabled={addMutation.isPending}>
        Add
      </button>
      <span>{message()}</span>
    </form>
  );
};
