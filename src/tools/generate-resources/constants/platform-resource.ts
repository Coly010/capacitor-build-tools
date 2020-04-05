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
  : {};
