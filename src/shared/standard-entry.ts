import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import path from 'path';
import program, { CommanderStatic } from 'commander';

const VERSION = '0.0.0';
export const standardEntry = (
  name: string = 'Capacitor Build Tools',
  description: string = 'Build tools to aid automated CI/CD of capacitor apps',
  programConfig: (program: CommanderStatic) => CommanderStatic
) => {
  clear();
  console.log(chalk.yellow(figlet.textSync(name)));
  console.log(chalk.cyan(chalk.italic(`\nVersion: ${VERSION}`)));

  program.version(VERSION).description(description);

  // Call the tool specifics configuration
  programConfig(program);

  program.parse(process.argv);

  return program;
};
