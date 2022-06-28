import { splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { mergeRefs } from "@solid-primitives/refs";
import { type CodeMirrorProps, createCodeMirror  } from "@solid-codemirror/core";
import { createLineNumbers, createReadOnly, LineNumbersProps, ReadOnlyProps } from "./utils";

type Props = CodeMirrorProps & LineNumbersProps & ReadOnlyProps & JSX.HTMLAttributes<HTMLDivElement>

export function CodeMirror(
  props: Props
) {
  let ref: HTMLDivElement | undefined;

  const [codemirrorProps, lineNumberProps, readOnlyProps, others] = splitProps(props, ["value", "onValueChange"], ["showLineNumbers"], ["readOnly"]);
  const { createExtension } = createCodeMirror(codemirrorProps, () => ref);

  createLineNumbers(lineNumberProps, createExtension);
  createReadOnly(readOnlyProps, createExtension);

  return <div ref={mergeRefs(el => (ref = el), props.ref)} {...others} />;
}


