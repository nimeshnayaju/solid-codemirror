import type { EditorView } from "@codemirror/view";

export interface CodeMirrorProps {
  /**
   * The initial value of the editor.
   */
  value?: string;
  /**
   * Called whenever the editor code value changes.
   */
  onValueChange?: (value: string) => void;
  /**
   * Called when the editor first mounts, receiving the current EditorView instance.
   */
  onEditorMount?: (editor: EditorView) => void;
}
