import {
  QueryClient,
  QueryClientProvider,
  createQuery,
} from "@tanstack/solid-query";
import { Show, createSignal } from "solid-js";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: Infinity,
      // gcTime: 0,
    },
  },
});

export const Root = () => (
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);

const fetchNow = async () => {
  console.log("⏳", "fetchNow()");
  await new Promise((r) => setTimeout(r, 2000));

  return new Date().toLocaleTimeString();
};

const Now = () => {
  const query = createQuery(() => ({
    queryKey: ["now"],
    queryFn: () => fetchNow(),
  }));

  return (
    <>
      ⏰: <strong>{query.data ?? "..."}</strong>
      <pre>{JSON.stringify(query, null, 2)}</pre>
    </>
  );
};

const App = () => {
  const [visible, setVisible] = createSignal(false);

  return (
    <main>
      <button onClick={() => setVisible((v) => !v)}>Toggle visible</button>
      <hr />
      <Show when={visible()} fallback={<p>Hidden</p>}>
        <Now />
      </Show>
    </main>
  );
};
