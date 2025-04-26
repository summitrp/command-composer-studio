
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Editor from "@monaco-editor/react";
import { Plus } from "lucide-react";
import { ActionButtons } from './ActionButtons';
import { FullscreenEditor } from './FullscreenEditor';

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

  const generateYaml = () => {
    return `${formData.projectName}:
  command: /${formData.commandName}
  type: ${formData.type}
  runcmd:
${formData.commands.map(cmd => `  - ${cmd}`).join('\n')}
  register: ${formData.register}
  permission-required: ${formData.permissionRequired}`;
  };

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

  const renderProjectSetup = () => {
    return (
      <Card className="bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="commandName">Command name</Label>
                <Input
                  id="commandName"
                  value={formData.commandName}
                  onChange={(e) => setFormData(prev => ({ ...prev, commandName: e.target.value }))}
                  placeholder="Enter command name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectName">Project name</Label>
                <Input
                  id="projectName"
                  value={formData.projectName}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                  placeholder="Enter project name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RUN_COMMAND">RUN_COMMAND</SelectItem>
                    <SelectItem value="RUN_CONSOLE">RUN_CONSOLE</SelectItem>
                    <SelectItem value="BROADCAST_TEXT">BROADCAST_TEXT</SelectItem>
                    <SelectItem value="RUN_AS_OPERATOR">RUN_AS_OPERATOR</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="register">Register</Label>
                  <p className="text-sm text-muted-foreground">Enable registration for this command</p>
                </div>
                <Switch
                  id="register"
                  checked={formData.register}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, register: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="permission">Permission required</Label>
                  <p className="text-sm text-muted-foreground">Require permissions to use this command</p>
                </div>
                <Switch
                  id="permission"
                  checked={formData.permissionRequired}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, permissionRequired: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="advanced">Advanced Editor</Label>
                  <p className="text-sm text-muted-foreground">Enable advanced YAML editor</p>
                </div>
                <Switch
                  id="advanced"
                  checked={formData.advancedEditor}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, advancedEditor: checked }))}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Project
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  };

  const renderProjectEditor = () => {
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
                value={generateYaml()}
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
            yaml={generateYaml()} 
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
            yaml={generateYaml()}
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
      {isProjectCreated ? renderProjectEditor() : renderProjectSetup()}
    </div>
  );
};

export default CommandComposer;
