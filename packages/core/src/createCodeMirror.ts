import { Accessor, onCleanup, onMount, on, createEffect } from "solid-js";
import { EditorView } from "@codemirror/view";
import {
  Compartment,
  EditorState,
  StateEffect,
  type Extension,
} from "@codemirror/state";
import { CodeMirrorProps } from "./types";

/**
 * Creates a CodeMirror editor view instance (the editor's user interface).
 * @param props See {@link CodeMirrorProps} for details.
 * @param ref the element to attach the editor to on creation.
 */
export function createCodeMirror(
  props: CodeMirrorProps,
  ref: Accessor<HTMLDivElement | undefined>
) {
  let view: EditorView | undefined;

  onMount(() => {
    const state = EditorState.create({
      doc: props.value,
    });

    // Construct a new EditorView instance
    view = new EditorView({
      state,
      parent: ref(),
      dispatch: (tr): void => {
        if (!view) return;

        view.update([tr]);

        if (tr.docChanged && props.onValueChange) {
          const newCode = tr.newDoc.sliceString(0, tr.newDoc.length);
          props.onValueChange(newCode);
        }
      },
    });

    props.onEditorMount?.(view);

    onCleanup(() => {
      if (!view) return;
      view.destroy();
    });
  });

  createEffect(
    on(
      () => props.value,
      (value) => {
        if (!view || value === view.state.doc.toString()) {
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

  /**
   * Creates a compartment instance with the given extension and appends it to the top-level configuration of the editor.
   * See {@link https://codemirror.net/examples/config/| CodeMirror Configuration} and {@link https://codemirror.net/docs/ref/#state.Compartment| Compartment} for details on editor configuration.
   * @param extension the extension to append
   */
  function createExtension(extension: Extension) {
    const compartment = new Compartment();

    onMount(() => {
      if (!view) return;

      view.dispatch({
        effects: StateEffect.appendConfig.of(compartment.of(extension)),
      });
    });

    /**
     * Reconfigures the extension compartment with the given extension.
     * @param extension the extension to reconfigure the extension compartment with.
     */
    function reconfigure(extension: Extension) {
      if (!view) return;

      view.dispatch({
        effects: compartment.reconfigure(extension),
      });
    }

    return reconfigure;
  }

  return { createExtension };
}
