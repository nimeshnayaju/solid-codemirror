import type { Extension } from "@codemirror/state";
import { createEffect, mergeProps, on } from "solid-js";

export interface LanguageProps {
  /**
   * The CodeMirror language extension to use
   */
  language?: Extension;
}

export function createLanguage(
  props: LanguageProps,
  createExtension: (extension: Extension) => (extension: Extension) => void
) {
  const merged = mergeProps({ language: [] }, props);

  const reconfigureLanguage = createExtension(merged.language);

  createEffect(
    on(
      () => merged.language,
      (language) => {
        reconfigureLanguage(language);
      },
      { defer: true }
    )
  );
}
