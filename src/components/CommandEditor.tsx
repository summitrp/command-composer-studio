
import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProjectSidebar } from './ProjectSidebar';
import { SidebarProvider } from './ui/sidebar';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from './ui/resizable';
import { generateYaml } from '@/utils/yamlGenerator';

export const CommandEditor = () => {
  const [formData, setFormData] = useState({
    commandName: '',
    projectName: '',
    type: 'RUN_COMMAND',
    register: false,
    permissionRequired: false,
    advancedEditor: false,
    commands: ['']
  });

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const addCommand = () => {
    setFormData(prev => ({
      ...prev,
      commands: [...prev.commands, '']
    }));
  };

  const updateCommand = (index: number, value: string) => {
    const newCommands = [...formData.commands];
    newCommands[index] = value;
    setFormData(prev => ({
      ...prev,
      commands: newCommands
    }));
  };

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
    a.download = `${formData.projectName}.yaml`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const yaml = generateYaml({
    projectName: formData.projectName,
    commandName: formData.commandName,
    type: formData.type,
    commands: formData.commands,
    register: formData.register,
    permissionRequired: formData.permissionRequired,
  });

  return (
    <div className="fixed inset-0 bg-[#1A1F2C] text-white">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-full w-full">
          <ProjectSidebar 
            onCopyCode={handleCopyCode}
            onDownloadYaml={handleSaveYaml}
            onToggleEditor={() => handleFormDataChange({ advancedEditor: !formData.advancedEditor })}
            onToggleSettings={() => {}} // We'll handle this differently now
            isAdvancedEditor={formData.advancedEditor}
          />
          <ResizablePanelGroup direction="horizontal" className="w-full">
            {!formData.advancedEditor && (
              <>
                <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
                  <div className="h-full overflow-y-auto p-4 bg-[#221F26]">
                    <div className="space-y-4">
                      {formData.commands.map((command, index) => (
                        <Input
                          key={index}
                          value={command}
                          onChange={(e) => updateCommand(index, e.target.value)}
                          placeholder="Enter command"
                          className="bg-[#333333] border-[#403E43] text-white placeholder:text-gray-500"
                        />
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addCommand}
                        className="w-full border-[#403E43] text-gray-300 hover:bg-[#333333] hover:text-white transition-colors"
                      >
                        Add Command
                      </Button>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
              </>
            )}
            <ResizablePanel defaultSize={formData.advancedEditor ? 100 : 80}>
              <div className="h-full">
                <Editor
                  height="100vh"
                  defaultLanguage="yaml"
                  value={yaml}
                  theme="vs-dark"
                  options={{
                    fontSize: 14,
                    fontFamily: 'JetBrains Mono, monospace',
                    minimap: { enabled: true },
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    padding: { top: 20 },
                    renderLineHighlight: 'all',
                    smoothScrolling: true,
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                  }}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </SidebarProvider>
    </div>
  );
};
