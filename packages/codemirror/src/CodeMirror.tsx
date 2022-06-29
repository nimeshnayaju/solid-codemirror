import { splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { mergeRefs } from "@solid-primitives/refs";
import { type CodeMirrorProps, createCodeMirror  } from "@solid-codemirror/core";
import { createExtensions, createLineNumbers, createReadOnly, createWrapLine, ExtensionsProps, LineNumbersProps, ReadOnlyProps, WrapLineProps } from "./utils";

type Props = CodeMirrorProps & LineNumbersProps & ReadOnlyProps & WrapLineProps & ExtensionsProps & JSX.HTMLAttributes<HTMLDivElement>

export function CodeMirror(
  props: Props
) {
  let ref: HTMLDivElement | undefined;

  const [codemirrorProps, lineNumberProps, readOnlyProps, wrapLineProps, extensionProps, others] = splitProps(props, ["value", "onValueChange"], ["showLineNumbers"], ["readOnly"], ["wrapLine"], ["extensions"]);
  const { createExtension } = createCodeMirror(codemirrorProps, () => ref);

  createLineNumbers(lineNumberProps, createExtension);
  createReadOnly(readOnlyProps, createExtension);
  createWrapLine(wrapLineProps, createExtension); 
  createExtensions(extensionProps, createExtension); 

  return <div ref={mergeRefs(el => (ref = el), props.ref)} {...others} />;
}


