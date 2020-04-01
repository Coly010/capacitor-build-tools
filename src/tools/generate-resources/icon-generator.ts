import fs from 'fs';

import { Platform } from './constants/platform-resource';
import { ANDROID } from './constants/android.const';

const PLATFORM_DEFAULTS = {
  android: ANDROID,
};

export function generateIcon(iconPath: string, platforms: Platform[]) {
  const iconFile = fs.readFileSync(iconPath);

  for (const platform of platforms) {
    console.log(iconFile);
  }
}
