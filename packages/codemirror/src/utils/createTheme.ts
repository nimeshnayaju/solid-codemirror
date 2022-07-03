import type { Extension } from "@codemirror/state";
import { createEffect, mergeProps, on } from "solid-js";

export interface ThemeProps {
  theme?: Extension;
}

export function createTheme(
  props: ThemeProps,
  createExtension: (extension: Extension) => (extension: Extension) => void
) {
  const merged = mergeProps({ theme: [] }, props);

  const reconfigureTheme = createExtension(merged.theme);

  createEffect(
    on(
      () => merged.theme,
      (theme) => {
        reconfigureTheme(theme);
      },
      { defer: true }
    )
  );
}
