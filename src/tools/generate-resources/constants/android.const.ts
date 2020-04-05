import { PlatformResources } from '../../../shared/utils';

export const ANDROID: PlatformResources<'android'> = {
  hdpi: {
    icon: {
      ic_launcher_foreground: {
        size: [162, 162],
        bleed: [26, 26],
      },
      ic_launcher_round: {
        size: [72, 72],
        bleed: [2, 2],
      },
      ic_launcher: {
        size: [72, 72],
        bleed: [7, 7],
      },
    },
    splash: {
      land: {
        size: [800, 480],
        bleed: [0, 0],
      },
      port: {
        size: [480, 800],
        bleed: [0, 0],
      },
    },
  },
  mdpi: {
    icon: {
      ic_launcher_foreground: {
        size: [108, 108],
        bleed: [14, 14],
      },
      ic_launcher_round: {
        size: [48, 48],
        bleed: [1, 1],
      },
      ic_launcher: {
        size: [48, 48],
        bleed: [4, 4],
      },
    },
    splash: {
      port: {
        size: [320, 480],
        bleed: [0, 0],
      },
      land: {
        size: [480, 320],
        bleed: [0, 0],
      },
    },
  },
  xhdpi: {
    icon: {
      ic_launcher_foreground: {
        size: [216, 216],
        bleed: [35, 35],
      },
      ic_launcher_round: {
        size: [96, 96],
        bleed: [3, 3],
      },
      ic_launcher: {
        size: [96, 96],
        bleed: [9, 9],
      },
    },
    splash: {
      port: {
        size: [720, 1280],
        bleed: [0, 0],
      },
      land: {
        size: [1280, 720],
        bleed: [0, 0],
      },
    },
  },
  xxhdpi: {
    icon: {
      ic_launcher_foreground: {
        size: [324, 324],
        bleed: [52, 52],
      },
      ic_launcher_round: {
        size: [144, 144],
        bleed: [5, 5],
      },
      ic_launcher: {
        size: [144, 144],
        bleed: [14, 14],
      },
    },
    splash: {
      port: {
        size: [960, 1600],
        bleed: [0, 0],
      },
      land: {
        size: [1600, 960],
        bleed: [0, 0],
      },
    },
  },
  xxxhdpi: {
    icon: {
      ic_launcher_foreground: {
        size: [432, 432],
        bleed: [69, 69],
      },
      ic_launcher_round: {
        size: [192, 192],
        bleed: [7, 7],
      },
      ic_launcher: {
        size: [192, 192],
        bleed: [19, 19],
      },
    },
    splash: {
      port: {
        size: [1280, 1920],
        bleed: [0, 0],
      },
      land: {
        size: [1920, 1280],
        bleed: [0, 0],
      },
    },
  },
};
