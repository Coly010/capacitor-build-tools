type ResourceSize = {
  size: [number, number];
  bleed: [number, number];
};

export type Platform = 'ios' | 'android';

export type PlatformResources = {
  [dpi: string]: {
    icon: {
      ic_launcher_foreground: ResourceSize;
      ic_launcher_round: ResourceSize;
      ic_launcher: ResourceSize;
    };
    splash: ResourceSize;
  };
};
