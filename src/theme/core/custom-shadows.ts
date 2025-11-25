import { varAlpha } from 'minimal-shared/utils';

import { grey, info, error, common, primary, success, warning, secondary } from './palette';

import type { ThemeColorScheme } from '../types';

// ----------------------------------------------------------------------

/**
 * TypeScript (type definition and extension)
 * @to {@link file://./../extend-theme-types.d.ts}
 */

export interface CustomShadows {
  z1?: string;
  z4?: string;
  z8?: string;
  z12?: string;
  z16?: string;
  z20?: string;
  z24?: string;
  primary?: string;
  primaryDarker?: string;
  secondary?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
  card?: string;
  dialog?: string;
  dropdown?: string;
}

// ----------------------------------------------------------------------

export function createShadowColor(colorChannel: string, opacity = 0.24): string {
  return `0 8px 16px 0 ${varAlpha(colorChannel, opacity)}`;
}

function createCustomShadows(colorChannel: string, isDark = false): CustomShadows {
  const baseOpacity = isDark ? 0.24 : 0.16;
  const cardOpacity = isDark ? 0.3 : 0.2;
  const dropdownOpacity = isDark ? 0.32 : 0.24;
  
  return {
    z1: `0 1px 2px 0 ${varAlpha(colorChannel, baseOpacity)}`,
    z4: `0 4px 8px 0 ${varAlpha(colorChannel, baseOpacity)}`,
    z8: `0 8px 16px 0 ${varAlpha(colorChannel, baseOpacity)}`,
    z12: `0 12px 24px -4px ${varAlpha(colorChannel, baseOpacity)}`,
    z16: `0 16px 32px -4px ${varAlpha(colorChannel, baseOpacity)}`,
    z20: `0 20px 40px -4px ${varAlpha(colorChannel, baseOpacity)}`,
    z24: `0 24px 48px 0 ${varAlpha(colorChannel, baseOpacity)}`,
    /********/
    dialog: `-40px 40px 80px -8px ${varAlpha(common.blackChannel, isDark ? 0.4 : 0.24)}`,
    card: `0 0 2px 0 ${varAlpha(colorChannel, cardOpacity)}, 0 12px 24px -4px ${varAlpha(colorChannel, isDark ? 0.16 : 0.12)}`,
    dropdown: `0 0 2px 0 ${varAlpha(colorChannel, dropdownOpacity)}, -20px 20px 40px -4px ${varAlpha(colorChannel, dropdownOpacity)}`,
    /********/
    primary: createShadowColor(primary.mainChannel, isDark ? 0.32 : 0.24),
    primaryDarker: createShadowColor(primary.mainChannel, isDark ? 0.48 : 0.36),
    secondary: createShadowColor(secondary.mainChannel, isDark ? 0.32 : 0.24),
    info: createShadowColor(info.mainChannel, isDark ? 0.32 : 0.24),
    success: createShadowColor(success.mainChannel, isDark ? 0.32 : 0.24),
    warning: createShadowColor(warning.mainChannel, isDark ? 0.32 : 0.24),
    error: createShadowColor(error.mainChannel, isDark ? 0.32 : 0.24),
  };
}

export const customShadows: Partial<Record<ThemeColorScheme, CustomShadows>> = {
  light: createCustomShadows(grey['500Channel'], false),
  dark: createCustomShadows(grey['900Channel'], true),
};