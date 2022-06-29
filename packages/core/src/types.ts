import type { Extension } from "@codemirror/state";

export interface CodeMirrorProps {
  value?: string;
  onValueChange?: (value: string) => void;
}
