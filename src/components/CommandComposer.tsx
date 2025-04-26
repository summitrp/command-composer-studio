
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { Plus } from "lucide-react";
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
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {formData.projectName} - /{formData.commandName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.advancedEditor ? (
            <div className="mt-4 border rounded-md overflow-hidden">
              <Editor
                height="300px"
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
            </div>
          ) : (
            <div className="space-y-4">
              {formData.commands.map((command, index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`command-${index}`}>Command {index + 1}</Label>
                  <Input
                    id={`command-${index}`}
                    value={command}
                    onChange={(e) => updateCommand(index, e.target.value)}
                    placeholder="Enter command"
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addCommand}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Command
              </Button>
            </div>
          )}
          
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

          <FullscreenEditor
            isAdvancedEditor={formData.advancedEditor}
            yaml={yaml}
            commands={formData.commands}
            onCommandAdd={addCommand}
            onCommandUpdate={updateCommand}
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      {isProjectCreated ? (
        renderProjectEditor()
      ) : (
        <ProjectSetupForm
          formData={formData}
          onFormSubmit={handleSubmit}
          onFormDataChange={handleFormDataChange}
        />
      )}
    </div>
  );
};

export default CommandComposer;
