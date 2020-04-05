import fs from 'fs';
import chalk from 'chalk';
import Jimp from 'jimp';
import path from 'path';
import { noTry } from 'no-try/tuple';

import { logger } from './../../shared/logger';
import { Platform, ResourceSize } from './constants/platform-resource';
import { ANDROID } from './constants/android.const';

const PLATFORM_DEFAULTS = {
  android: ANDROID,
  ios: ANDROID,
};

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
      prefix: 'mipmap',
      directories: ['hdpi'],
      fileNames: [],
    },
  },
};

export async function generateIcon(iconPath: string, platforms: Platform[]) {
  const [iconFile, error] = noTry(() => fs.readFileSync(iconPath));
  if (error && (error as any).code === 'ENOENT') {
    logger().error(
      chalk.red('Icon file could not be found, please check the file exits')
    );
    process.exit(2);
  }
  logger().info(chalk.green('Found icon file! Begin processing...'));

  for (const platform of platforms) {
    const directoryConfig = PLATFORM_DIRECTORIES[platform];

    logger().info(`Writing ${platform} icon files...`);

    for (const dir of directoryConfig.icon.directories) {
      logger().verbose(`Processing directory: ${dir}`);
      const outDir = `${path.dirname(iconPath)}/android/mipmap-${dir}`;

      if (!fs.existsSync(outDir)) {
        logger().info(
          chalk.yellow('Output directory does not exist. Creating now...')
        );

        fs.mkdirSync(outDir, { recursive: true });
      }

      for (const file of directoryConfig.icon.fileNames) {
        logger().verbose(`Processing File: ${file}`);
        let outFile = await readJimp(iconPath);
        if (file.includes('_round')) {
          logger().verbose(`Found Circle File: ${file}`);
          outFile = await makeImageRound(outFile);
        }
        outFile = await resizeImage(
          outFile,
          PLATFORM_DEFAULTS[platform][dir].icon[file]
        );

        outFile.writeAsync(`${outDir}/${file}.png`);
        logger().verbose(chalk.green(`Successfully generated ${file}.png`));
      }
    }
  }
}

function readJimp(imagePath: string) {
  return Jimp.read(imagePath);
}

async function getJimp(image: string | Jimp) {
  return typeof image === 'string' ? await readJimp(image) : image;
}

async function resizeImage(
  image: string | Jimp,
  { bleed, size }: ResourceSize
) {
  const img = (await getJimp(image)).resize(
    size[0] - bleed[0] * 2,
    size[1] - bleed[1] * 2
  );
  return new Jimp(size[0], size[1]).blit(img, bleed[0], bleed[1]);
}

async function makeImageRound(image: string | Jimp) {
  const img = typeof image === 'string' ? await getJimp(image) : image;
  return img.circle();
}
