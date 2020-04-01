import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';
import path from 'path';
import program from 'commander';

const VERSION = '0.0.0';
export const standardEntry = (
  name: string = 'Capacitor Build Tools',
  description: string = 'Build tools to aid automated CI/CD of capacitor apps'
) => {
  clear();
  console.log(chalk.red(figlet.textSync(name, 'Star Wars')));
  console.log(chalk.cyan(chalk.italic(`\nVersion: ${VERSION}`)));

  return program.version(VERSION).description(description);
};
