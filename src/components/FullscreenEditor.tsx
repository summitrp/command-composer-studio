
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Editor from "@monaco-editor/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";

interface FullscreenEditorProps {
  isAdvancedEditor: boolean;
  yaml: string;
  commands: string[];
  onCommandAdd: () => void;
  onCommandUpdate: (index: number, value: string) => void;
}

export const FullscreenEditor = ({
  isAdvancedEditor,
  yaml,
  commands,
  onCommandAdd,
  onCommandUpdate,
}: FullscreenEditorProps) => {
  return (
    <Sheet>
      <SheetContent side="bottom" className="h-[90vh] w-full">
        <div className="h-full pt-6">
          {isAdvancedEditor ? (
            <Editor
              height="90%"
              defaultLanguage="yaml"
              value={yaml}
              theme="vs-light"
              options={{
                minimap: { enabled: false },
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
              }}
            />
          ) : (
            <div className="space-y-4 h-full overflow-y-auto pr-4">
              {commands.map((command, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={command}
                    onChange={(e) => onCommandUpdate(index, e.target.value)}
                    placeholder="Enter command"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={onCommandAdd}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Command
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
