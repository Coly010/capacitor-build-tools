import { IOS } from './constants/ios.const';
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { noTry } from 'no-try';

import { logger } from './../../shared/logger';
import { ANDROID } from './constants/android.const';
import { Platform, coverImage, resizeImage } from '../../shared/utils';

const ANDROID_DIRECTORIES = {
  splash: {
    prefix: 'drawable',
    orientation: ['land', 'port'],
    directories: ['hdpi', 'mdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'],
    fileNames: ['splash'],
  },
};

export async function generateSplash(
  splashPath: string,
  platforms: Platform[]
) {
  const { error } = noTry(() => fs.readFileSync(splashPath));

  if (error && (error as any).code === 'ENOENT') {
    logger().error(
      chalk.red('Splash file could not be found, please check the file exits')
    );
    process.exit(2);
  }

  logger().info(chalk.green('Found splash file! Begin processing...'));

  if (platforms.includes('android')) {
    logger().info(`Writing android icon files...`);

    let orientation: 'land' | 'port' = 'land';
    await generateAndroidSplash(splashPath, orientation);

    orientation = 'port';
    await generateAndroidSplash(splashPath, orientation);
  }

  if (platforms.includes('ios')) {
    await generateIosSplash(splashPath);
  }
}

async function generateAndroidSplash(
  splashPath: string,
  orientation: 'land' | 'port'
) {
  const android = ANDROID_DIRECTORIES;
  for (const dir of android.splash.directories) {
    logger().verbose(`Processing directory: ${dir}`);

    const outDir = `${path.dirname(splashPath)}/android/${
      android.splash.prefix
    }-${orientation}-${dir}`;

    if (!fs.existsSync(outDir)) {
      logger().info(
        chalk.yellow('Output directory does not exist. Creating now...')
      );

      fs.mkdirSync(outDir, { recursive: true });
    }

    for (const file of android.splash.fileNames) {
      logger().verbose(`Processing File: ${file}`);

      const outFile = await coverImage(
        splashPath,
        ANDROID[dir].splash[orientation]
      );

      outFile.writeAsync(`${outDir}/${file}.png`);

      logger().verbose(chalk.green(`Successfully generated ${file}.png`));
    }
  }

  orientation = 'port';
}

async function generateIosSplash(splashPath: string) {
  logger().info(`Writing iOS splash files...`);

  for (const file of Object.keys(IOS.splash)) {
    const outDir = `${path.dirname(splashPath)}/ios/splash`;

    if (!fs.existsSync(outDir)) {
      logger().info(
        chalk.yellow('Output directory does not exist. Creating now...')
      );

      fs.mkdirSync(outDir, { recursive: true });
    }

    const outFile = await resizeImage(splashPath, IOS.splash[file]);

    outFile.writeAsync(`${outDir}/${file}.png`);

    logger().verbose(chalk.green(`Successfully generated ${file}.png`));
  }
}
