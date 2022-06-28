import { CodeMirrorProps, createCodeMirror } from "@cm/solid";

interface Props extends CodeMirrorProps {
  name?: string;
}

export default function CodeMirror(props: Props) {
  let ref: HTMLDivElement | undefined;

  const view = createCodeMirror(props, () => ref);

  return <div ref={ref} />;
}
