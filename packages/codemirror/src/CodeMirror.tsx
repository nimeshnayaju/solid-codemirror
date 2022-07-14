import { onMount, splitProps } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { mergeRefs } from "@solid-primitives/refs";
import { type CodeMirrorProps, createCodeMirror  } from "@solid-codemirror/core";
import { 
  createExtensions, 
  createLineNumbers, 
  createReadOnly, 
  createTheme, 
  createWrapLine, 
  createLinter,
  ExtensionsProps,
  LineNumbersProps, 
  ReadOnlyProps, 
  ThemeProps, 
  LinterProps,
  WrapLineProps, 
} from "./utils";

export type Props = CodeMirrorProps & LineNumbersProps & ReadOnlyProps & WrapLineProps & ExtensionsProps & ThemeProps  & LinterProps & JSX.HTMLAttributes<HTMLDivElement>;

export function CodeMirror(
  props: Props
) {
  let ref: HTMLDivElement | undefined;

  const [codemirrorProps, lineNumberProps, readOnlyProps, wrapLineProps, extensionProps, themeProps, linterProps, others] = splitProps(props, ["value", "onValueChange", "onEditorMount"], ["showLineNumbers"], ["readOnly"], ["wrapLine"], ["extensions"], ["theme"], ["linter"]);
  
  const { createExtension } = createCodeMirror(codemirrorProps, () => ref);

  createLineNumbers(lineNumberProps, createExtension);
  createReadOnly(readOnlyProps, createExtension);
  createWrapLine(wrapLineProps, createExtension); 
  createTheme(themeProps, createExtension); 
  createExtensions(extensionProps, createExtension); 
  createLinter(linterProps, createExtension);

  return <div ref={mergeRefs(el => (ref = el), props.ref)} {...others} />;
}


