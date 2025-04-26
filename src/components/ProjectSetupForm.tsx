
import React from 'react';
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

interface ProjectSetupFormProps {
  formData: {
    commandName: string;
    projectName: string;
    type: string;
    register: boolean;
    permissionRequired: boolean;
    advancedEditor: boolean;
  };
  onFormSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (updates: Partial<ProjectSetupFormProps['formData']>) => void;
}

export const ProjectSetupForm = ({ formData, onFormSubmit, onFormDataChange }: ProjectSetupFormProps) => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onFormSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="commandName">Command name</Label>
              <Input
                id="commandName"
                value={formData.commandName}
                onChange={(e) => onFormDataChange({ commandName: e.target.value })}
                placeholder="Enter command name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectName">Project name</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => onFormDataChange({ projectName: e.target.value })}
                placeholder="Enter project name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => onFormDataChange({ type: value })}
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
                onCheckedChange={(checked) => onFormDataChange({ register: checked })}
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
                onCheckedChange={(checked) => onFormDataChange({ permissionRequired: checked })}
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
                onCheckedChange={(checked) => onFormDataChange({ advancedEditor: checked })}
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
