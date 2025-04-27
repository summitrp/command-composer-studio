
import { Code, Download, Save, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
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
    <Sidebar className="border-none">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onToggleEditor} tooltip={isAdvancedEditor ? "Simple Editor" : "Advanced Editor"}>
                  <Code className="h-4 w-4" />
                  <span>Editor</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onToggleSettings} tooltip="Settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator className="my-4" />
        <SidebarGroup>
          <SidebarGroupLabel>Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onCopyCode} tooltip="Copy YAML">
                  <Save className="h-4 w-4" />
                  <span>Copy YAML</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={onDownloadYaml} tooltip="Download YAML">
                  <Download className="h-4 w-4" />
                  <span>Download YAML</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
