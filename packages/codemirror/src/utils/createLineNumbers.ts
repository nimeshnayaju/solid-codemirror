import  type { Extension } from "@codemirror/state";
import { lineNumbers } from "@codemirror/view";
import { createEffect, mergeProps, on } from "solid-js";

export interface LineNumbersProps {
  showLineNumbers?: boolean;
}

export function createLineNumbers(
  props: LineNumbersProps,
  createExtension: (extension: Extension) => (extension: Extension) => void
) {
  const merged = mergeProps({ showLineNumbers: true }, props);

  const reconfigureLineNumbers = createExtension(
    getLineNumbers(merged.showLineNumbers)
  );

  createEffect(
    on(
      () => merged.showLineNumbers,
      (showLineNumbers) => {
        reconfigureLineNumbers(getLineNumbers(showLineNumbers));
      },
      { defer: true }
    )
  );
}

function getLineNumbers(showLineNumbers: boolean) {
  return showLineNumbers ? lineNumbers() : [];
}
