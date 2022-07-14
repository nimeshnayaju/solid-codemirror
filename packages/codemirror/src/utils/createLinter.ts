import type { Extension } from "@codemirror/state";
import { createEffect, mergeProps, on } from "solid-js";

export interface LinterProps {
  /**
   * The CodeMirror linter extension to use
   */
  linter?: Extension;
}

export function createLinter(
  props: LinterProps,
  createExtension: (extension: Extension) => (extension: Extension) => void
) {
  const merged = mergeProps({ linter: [] }, props);

  const reconfigureLinter = createExtension(merged.linter);

  createEffect(
    on(
      () => merged.linter,
      (linter) => {
        reconfigureLinter(linter);
      },
      { defer: true }
    )
  );
}
