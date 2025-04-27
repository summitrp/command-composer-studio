
import { Code, Download, Save, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

interface ProjectSidebarProps {
  onCopyCode: () => void;
  onDownloadYaml: () => void;
  onToggleEditor: () => void;
  onToggleSettings: () => void;
  isAdvancedEditor: boolean;
}

export const ProjectSidebar = ({
  onCopyCode,
  onDownloadYaml,
  onToggleEditor,
  onToggleSettings,
  isAdvancedEditor,
}: ProjectSidebarProps) => {
  return (
    <Sidebar className="border-none bg-[#221F26]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Project</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onToggleEditor} tooltip={isAdvancedEditor ? "Simple Editor" : "Advanced Editor"} className="text-gray-300 hover:bg-[#333333] hover:text-white">
                <Code className="h-4 w-4" />
                <span>Editor</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onToggleSettings} tooltip="Settings" className="text-gray-300 hover:bg-[#333333] hover:text-white">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <Separator className="my-4 bg-[#403E43]" />
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Actions</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onCopyCode} tooltip="Copy YAML" className="text-gray-300 hover:bg-[#333333] hover:text-white">
                <Save className="h-4 w-4" />
                <span>Copy YAML</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onDownloadYaml} tooltip="Download YAML" className="text-gray-300 hover:bg-[#333333] hover:text-white">
                <Download className="h-4 w-4" />
                <span>Download YAML</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
