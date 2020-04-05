#!/usr/bin/env node
import chalk from 'chalk';
import path from 'path';

import { standardEntry } from '../../shared/standard-entry';
import { logger } from './../../shared/logger';
import { Platform } from './constants/platform-resource';
import { generateIcon } from './icon-generator';

const program = standardEntry(
  'Generate Resources',
  'Generate Icon and Splash for Apps',
  (program) =>
    program
      .option('--android', 'Generate Android Resources', true)
      .option('--ios', 'Generate iOS Resources', true)
      .option('-i --icon <path>', 'Path to Icon file', '')
      .option('-s --splash <path>', 'Path to Splash file', '')
      .option('-v --verbose', 'Verbose Logging', false)
);

if (program.verbose) {
  logger('debug');
}

if (!program.icon && !program.splash) {
  logger().error(chalk.red("You didn't specify the path to the resourcs"));
  process.exit(1);
}

// setup the platforms to generate
const platforms: Platform[] = [];
program.android && platforms.push('android');
program.ios && platforms.push('ios');

// fetch the icon file
const iconFilePath = path.resolve(process.cwd(), program.icon);
logger().info(`Icon file path: ${iconFilePath}`);

generateIcon(iconFilePath, platforms);
