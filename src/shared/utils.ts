import Jimp from 'jimp';

export type HashMap = { [key: string]: any };

export type ResourceSize = {
  size: [number, number];
  bleed: [number, number];
};

export type Platform = 'ios' | 'android';

type AndroidIcon = {
  [key: string]: ResourceSize;
  ic_launcher_foreground: ResourceSize;
  ic_launcher_round: ResourceSize;
  ic_launcher: ResourceSize;
};

type IosResource = {
  [key: string]: ResourceSize;
};

export type PlatformResources<T extends Platform> = T extends 'android'
  ? {
      [dpi: string]: {
        icon: AndroidIcon;
        splash: {
          port: ResourceSize;
          land: ResourceSize;
        };
      };
    }
  : {
      icon: IosResource;
      splash: IosResource;
    };

export function readJimp(imagePath: string) {
  return Jimp.read(imagePath);
}

export async function getJimp(image: string | Jimp) {
  return typeof image === 'string' ? await readJimp(image) : image;
}

export async function resizeImage(
  image: string | Jimp,
  { bleed, size }: ResourceSize
) {
  const img = (await getJimp(image)).resize(
    size[0] - bleed[0] * 2,
    size[1] - bleed[1] * 2
  );
  return new Jimp(size[0], size[1]).blit(img, bleed[0], bleed[1]);
}

export async function makeImageRound(image: string | Jimp) {
  const img = await getJimp(image);
  return img.circle();
}

export async function coverImage(
  image: string | Jimp,
  { bleed, size }: ResourceSize
) {
  const img = await getJimp(image);
  return img.cover(size[0], size[1]);
}
