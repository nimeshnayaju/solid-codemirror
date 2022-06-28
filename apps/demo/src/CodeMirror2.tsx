import { createEffect, mergeProps, on, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { mergeRefs } from "@solid-primitives/refs";
import { type CodeMirrorProps, createCodeMirror  } from "@solid-codemirror/core";
import { lineNumbers } from "@codemirror/view";

export function CodeMirror2(
  props: CodeMirrorProps & JSX.HTMLAttributes<HTMLDivElement> & { showLineNumbers?: boolean },
) {
  let ref: HTMLDivElement | undefined;

  const [codemirrorProps, local, others] = splitProps(props, ["value", "onValueChange"], ["showLineNumbers"]);
  const { createExtension } = createCodeMirror(codemirrorProps, () => ref);

  const merged = mergeProps({ showLineNumbers: true, readOnly: false }, local);

  const reconfigureLineNumbers = createExtension(getLineNumbers(merged.showLineNumbers));

  createEffect(on(() => merged.showLineNumbers, (showLineNumbers) => {
    reconfigureLineNumbers(getLineNumbers(showLineNumbers));
  }, { defer: true }));

  return <div ref={mergeRefs(el => (ref = el), props.ref)} {...others} />;
}

function getLineNumbers(showLineNumbers: boolean) {
  return showLineNumbers ? lineNumbers() : [];
}


