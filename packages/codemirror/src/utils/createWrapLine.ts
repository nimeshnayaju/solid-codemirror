import  type { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { createEffect, mergeProps, on } from "solid-js";

export interface WrapLineProps {
  wrapLine?: boolean;
}

export function createWrapLine(
  props: WrapLineProps,
  createExtension: (extension: Extension) => (extension: Extension) => void
) {
  const merged = mergeProps({ wrapLine: false }, props);

  const reconfigureWrapLine = createExtension(getWrapLine(merged.wrapLine));

  createEffect(
    on(
      () => merged.wrapLine,
      (wrapLine) => {
        reconfigureWrapLine(getWrapLine(wrapLine));
      },
      { defer: true }
    )
  );
}

function getWrapLine(wrapLine: boolean) {
  return wrapLine ? EditorView.lineWrapping : [];
}
