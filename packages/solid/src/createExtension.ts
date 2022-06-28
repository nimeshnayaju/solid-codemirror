import { Compartment, Extension, StateEffect } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { Accessor, createEffect, on } from "solid-js";

export function createExtension<T>(view: Accessor<EditorView | undefined>) {
  const compartment = new Compartment();

  createEffect(
    on(
      view,
      (view) => {
        console.log(view);
        if (view) {
          view.dispatch({
            effects: StateEffect.appendConfig.of(compartment.of([])),
          });
        }
      },
      { defer: true }
    )
  );

  createEffect(
    on(
      [
        /* dependency */
      ],
      (value) => {
        console.log(view());
        view()?.dispatch({
          effects: compartment.reconfigure([]),
        });
      },
      { defer: true }
    )
  );
}
