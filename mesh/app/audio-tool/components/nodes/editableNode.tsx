import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

type EditableNodeProps = {
  code: string;
  onCodeChange: (code: string) => void;
};

export default function EditableNode({ code, onCodeChange }: EditableNodeProps) {
  return (
    <AceEditor
      mode="javascript"  // replace this with custom "supercollider" if available
      theme="github"
      value={code}
      onChange={onCodeChange}
      name="editable-node-editor"
      editorProps={{ $blockScrolling: true }}
    />
  );
}
