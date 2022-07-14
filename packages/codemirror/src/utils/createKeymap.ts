import type { Extension } from "@codemirror/state";
import { createEffect, createMemo, mergeProps, on } from "solid-js";
import { KeyBinding, keymap } from "@codemirror/view";


export interface KeymapProps {
  /**
   * The CodeMirror keymap extension to use
   */
  keymap?: Extension;
}

export function createKeymap(
  props: KeymapProps,
  createExtension: (extension: Extension) => (extension: Extension) => void
) {
  const merged = mergeProps({ keymap: [] }, props);


  const isKeyBindingArray = (km : Extension | KeyBinding[]) : km is KeyBinding[] => {
    const first = Array.isArray(km) ? km[0] : km;
    // AFAIK KeyBinding[] always have a run-callback as part of their interface
    return "run" in first
  }

  const getKeymap = (km: Extension | KeyBinding[]) => isKeyBindingArray(km) ? keymap.of(km) : km

  const keymaps = createMemo(()=>
    Array.isArray(merged.keymap) 
    ? merged.keymap.map(km => getKeymap(km)) 
    : getKeymap(merged.keymap)
  )

  const reconfigureKeymap = createExtension(keymaps());

  createEffect(
    on(
      () => keymaps,
      (keymap) => {
        reconfigureKeymap(keymaps());
      },
      { defer: true }
    )
  );
}
