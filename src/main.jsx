import { render } from "solid-js/web";

/** @type {import("solid-js").Component} */
let Root;
try {
  const url = new URL(location.href);
  const id = url.searchParams.get("id") ?? "01";
  Root = await import(`./${id}/index.jsx`).then((m) => m.Root);
} catch {
  Root = () => <p>Invalid ID!</p>;
}

const $root = /** @type {HTMLElement} */ (document.getElementById("root"));

render(() => <Root />, $root);
