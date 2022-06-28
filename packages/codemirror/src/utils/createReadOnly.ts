import { Extension } from "@codemirror/state";
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
} from "@codemirror/view";
import { createEffect, mergeProps, on } from "solid-js";

export interface ReadOnlyProps {
  readOnly?: boolean;
}

export function createReadOnly(
  props: ReadOnlyProps,
  createExtension: (extension: Extension) => (extension: Extension) => void
) {
  const merged = mergeProps({ readOnly: false }, props);

  const reconfigureLineNumbers = createExtension(getReadOnly(merged.readOnly));

  createEffect(
    on(
      () => merged.readOnly,
      (readOnly) => {
        reconfigureLineNumbers(getReadOnly(readOnly));
      },
      { defer: true }
    )
  );
}

function getReadOnly(readOnly: boolean) {
  return readOnly
    ? EditorView.editable.of(false)
    : [highlightActiveLine(), highlightActiveLineGutter()];
}
