import type { Extension } from "@codemirror/state";
import { createEffect, createMemo, mergeProps, on } from "solid-js";
import { linter } from "@codemirror/lint";

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

  const getLinter = (l: Extension ) => typeof l === "function" ? linter(l) : l

  const linters = createMemo(()=>
    Array.isArray(merged.linter) 
      ? merged.linter.map(l => getLinter(l)) 
      : getLinter(merged.linter)
  
  )

  const reconfigureLinter = createExtension(linters());

  createEffect(
    on(
      () => linters(),
      (linter) => {
        reconfigureLinter(linter);
      },
      { defer: true }
    )
  );
}
