import { Button } from "@/components/ui/button";
import { Copy, Download, Maximize2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
interface ActionButtonsProps {
  yaml: string;
  projectName: string;
  onFullscreen: () => void;
}
export const ActionButtons = ({
  yaml,
  projectName,
  onFullscreen
}: ActionButtonsProps) => {
  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(yaml);
  };
  const handleSaveYaml = () => {
    const blob = new Blob([yaml], {
      type: 'text/yaml'
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName}.yaml`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  return <div className="flex gap-2 mt-4">
      <Button variant="outline" onClick={handleCopyCode} className="text-slate-800">
        <Copy className="mr-2 h-4 w-4" />
        Copy Code
      </Button>
      <Button variant="outline" onClick={handleSaveYaml} className="text-slate-800">
        <Download className="mr-2 h-4 w-4" />
        Save as YAML
      </Button>
      <Button variant="outline" onClick={onFullscreen} className="text-slate-900">
        <Maximize2 className="mr-2 h-4 w-4" />
        Fullscreen
      </Button>
    </div>;
};