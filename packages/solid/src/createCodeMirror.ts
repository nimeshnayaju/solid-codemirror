import { Accessor, onCleanup, onMount, on, createEffect } from "solid-js";
import { EditorView } from "@codemirror/view";
import {
  Compartment,
  EditorState,
  Extension,
  StateEffect,
} from "@codemirror/state";
import { CodeMirrorProps } from "./types";

export function createCodeMirror(
  props: CodeMirrorProps,
  ref: Accessor<HTMLDivElement | undefined>
) {
  let view: EditorView;

  onMount(() => {
    const state = EditorState.create({
      doc: props.value,
    });

    view = new EditorView({
      state,
      parent: ref(),
      dispatch: (tr): void => {
        view.update([tr]);

        if (tr.docChanged) {
          const newCode = tr.newDoc.sliceString(0, tr.newDoc.length);
          props.onValueChange?.(newCode);
        }
      },
    });

    onCleanup(() => {
      view.destroy();
    });
  });

  createEffect(
    on(
      () => props.value,
      (value) => {
        if (value === view.state.doc.toString()) {
          return;
        }
        view.dispatch({
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: value,
          },
        });
      },
      { defer: true }
    )
  );

  function createExtension(extension: Extension) {
    const compartment = new Compartment();

    onMount(() => {
      view.dispatch({
        effects: StateEffect.appendConfig.of(compartment.of(extension)),
      });
    });

    function reconfigure(extension: Extension) {
      view.dispatch({
        effects: compartment.reconfigure(extension),
      });
    }

    return reconfigure;
  }

  return { createExtension };
}
