import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ActionButtons } from './ActionButtons';
import { FullscreenEditor } from './FullscreenEditor';
import { ProjectSetupForm } from './ProjectSetupForm';
import { generateYaml } from '@/utils/yamlGenerator';

const CommandComposer = () => {
  const [formData, setFormData] = useState({
    commandName: '',
    projectName: '',
    type: 'RUN_COMMAND',
    register: false,
    permissionRequired: false,
    advancedEditor: false,
    commands: ['']
  });

  const [isProjectCreated, setIsProjectCreated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProjectCreated(true);
    console.log('Project created:', formData);
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

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleDiscard = () => {
    setIsProjectCreated(false);
    setFormData({
      commandName: '',
      projectName: '',
      type: 'RUN_COMMAND',
      register: false,
      permissionRequired: false,
      advancedEditor: false,
      commands: ['']
    });
  };

const renderProjectEditor = () => {
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
      <div className="flex flex-col h-full">
        <header className="flex items-center justify-between px-4 py-2 bg-[#222222] border-b border-[#333333]">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-400">Project:</span>
            <span className="text-sm text-white">{formData.projectName}</span>
            <span className="text-sm text-gray-400">Command:</span>
            <span className="text-sm text-white">/{formData.commandName}</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleDiscard}
            className="hover:bg-red-500/20 text-red-400 hover:text-red-300"
            aria-label="Discard project"
          >
            <X className="h-4 w-4" />
          </Button>
        </header>
        
        <main className="flex-1 overflow-hidden">
          {formData.advancedEditor ? (
            <Editor
              height="100%"
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
              className="h-full"
            />
          ) : (
            <div className="p-6 space-y-4 bg-[#1A1F2C] h-full overflow-y-auto">
              {formData.commands.map((command, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`command-${index}`} className="text-gray-300">Command {index + 1}</Label>
                  <Input
                    id={`command-${index}`}
                    value={command}
                    onChange={(e) => updateCommand(index, e.target.value)}
                    placeholder="Enter command"
                    className="bg-[#222222] border-[#333333] text-white placeholder:text-gray-500"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addCommand}
                className="w-full border-[#333333] text-gray-300 hover:bg-[#333333] hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Command
              </Button>
            </div>
          )}
        </main>
        
        <footer className="px-4 py-2 bg-[#222222] border-t border-[#333333]">
          <ActionButtons 
            yaml={yaml}
            projectName={formData.projectName}
            onFullscreen={() => {
              const editorSheet = document.querySelector('[data-state="closed"]');
              if (editorSheet) {
                (editorSheet as HTMLButtonElement).click();
              }
            }}
          />
        </footer>
      </div>
      
      <FullscreenEditor
        isAdvancedEditor={formData.advancedEditor}
        yaml={yaml}
        commands={formData.commands}
        onCommandAdd={addCommand}
        onCommandUpdate={updateCommand}
      />
    </div>
  );
};

return (
  <div className="h-screen">
    {isProjectCreated ? (
      renderProjectEditor()
    ) : (
      <div className="container mx-auto p-6 max-w-3xl">
        <ProjectSetupForm
          formData={formData}
          onFormSubmit={handleSubmit}
          onFormDataChange={handleFormDataChange}
        />
      </div>
    )}
  </div>
);
};

export default CommandComposer;
