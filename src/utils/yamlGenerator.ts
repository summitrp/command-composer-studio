
interface YamlConfig {
  projectName: string;
  commandName: string;
  type: string;
  commands: string[];
  register: boolean;
  permissionRequired: boolean;
}

export const generateYaml = ({
  projectName,
  commandName,
  type,
  commands,
  register,
  permissionRequired,
}: YamlConfig): string => {
  return `${projectName}:
  command: /${commandName}
  type: ${type}
  runcmd:
${commands.map(cmd => `  - ${cmd}`).join('\n')}
  register: ${register}
  permission-required: ${permissionRequired}`;
};
