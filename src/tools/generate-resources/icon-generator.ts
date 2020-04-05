import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { noTry } from 'no-try';

import { logger } from './../../shared/logger';
import { ANDROID } from './constants/android.const';
import {
  readJimp,
  makeImageRound,
  resizeImage,
  Platform,
} from '../../shared/utils';

const PLATFORM_DIRECTORIES = {
  android: {
    icon: {
      prefix: 'mipmap',
      directories: ['hdpi', 'mdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'],
      fileNames: ['ic_launcher', 'ic_launcher_round', 'ic_launcher_foreground'],
    },
  },
  ios: {
    icon: {
      prefix: '',
      directories: ['hdpi'],
      fileNames: [],
    },
  },
};

export async function generateIcon(iconPath: string, platforms: Platform[]) {
  const { error } = noTry(() => fs.readFileSync(iconPath));

  if (error && (error as any).code === 'ENOENT') {
    logger().error(
      chalk.red('Icon file could not be found, please check the file exits')
    );
    process.exit(2);
  }

  logger().info(chalk.green('Found icon file! Begin processing...'));

  if (platforms.includes('android')) {
    await generateAndroidIcons(iconPath);
  }

  if (platforms.includes('ios')) {
    await generateAndroidIcons(iconPath);
  }
}

async function generateAndroidIcons(iconPath: string) {
  logger().info(`Writing android icon files...`);

  const android = PLATFORM_DIRECTORIES['android'];

  for (const dir of android.icon.directories) {
    logger().verbose(`Processing directory: ${dir}`);

    const outDir = `${path.dirname(iconPath)}/android/${
      android.icon.prefix ? android.icon.prefix + '-' : ''
    }${dir}`;

    if (!fs.existsSync(outDir)) {
      logger().info(
        chalk.yellow('Output directory does not exist. Creating now...')
      );

      fs.mkdirSync(outDir, { recursive: true });
    }

    for (const file of android.icon.fileNames) {
      logger().verbose(`Processing File: ${file}`);

      let outFile = await readJimp(iconPath);

      if (file.includes('_round')) {
        logger().verbose(`Found Circle File: ${file}`);

        outFile = await makeImageRound(outFile);
      }

      outFile = await resizeImage(outFile, ANDROID[dir].icon[file]);

      outFile.writeAsync(`${outDir}/${file}.png`);

      logger().verbose(chalk.green(`Successfully generated ${file}.png`));
    }
  }
}
