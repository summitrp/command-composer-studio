
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectSetupForm } from './ProjectSetupForm';

const CommandComposer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    commandName: '',
    projectName: '',
    type: 'RUN_COMMAND',
    register: false,
    permissionRequired: false,
    advancedEditor: false,
    commands: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/editor');
  };

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <ProjectSetupForm
        formData={formData}
        onFormSubmit={handleSubmit}
        onFormDataChange={handleFormDataChange}
      />
    </div>
  );
};

export default CommandComposer;
