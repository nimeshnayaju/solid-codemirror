import type { Extension } from "@codemirror/state";
import { createEffect, mergeProps, on } from "solid-js";

export interface ExtensionsProps {
  /**
   * An array of CodeMirror extensions to use
   */
  extensions?: Extension[];
}

export function createExtensions(
  props: ExtensionsProps,
  createExtension: (extension: Extension) => (extension: Extension) => void
) {
  const merged = mergeProps({ extensions: [] }, props);

  const reconfigureExtensions = createExtension(merged.extensions);

  createEffect(
    on(
      () => merged.extensions,
      (extensions) => {
        reconfigureExtensions(extensions);
      },
      { defer: true }
    )
  );
}
