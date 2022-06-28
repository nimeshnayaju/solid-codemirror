import {
  Accessor,
  onCleanup,
  onMount,
  createSignal,
  on,
  createEffect,
  mergeProps,
} from "solid-js";
import { EditorView } from "@codemirror/view";
import { EditorState, Extension } from "@codemirror/state";
import { CodeMirrorProps } from "./types";

export function createCodeMirror(
  props: CodeMirrorProps,
  ref: Accessor<HTMLDivElement | undefined>
): Accessor<EditorView | undefined> {
  const [view, setView] = createSignal<EditorView>();

  onMount(() => {
    const state = EditorState.create({
      doc: props.value,
      extensions: [],
    });

    const cmView = new EditorView({
      state,
      parent: ref(),
      dispatch: (tr): void => {
        cmView.update([tr]);

        if (tr.docChanged) {
          const newCode = tr.newDoc.sliceString(0, tr.newDoc.length);
          props.onChange?.(newCode);
        }
      },
    });

    setView(cmView);

    onCleanup(() => {
      cmView.destroy();
    });
  });

  createEffect(
    on(
      () => props.value,
      (value) => {
        if (value === view()?.state.doc.toString()) {
          return;
        }
        view()?.dispatch({
          changes: {
            from: 0,
            to: view()?.state.doc.length,
            insert: value,
          },
        });
      },
      { defer: true }
    )
  );

  return view;
}
