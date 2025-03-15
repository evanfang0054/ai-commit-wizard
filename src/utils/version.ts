/**
 * 版本号管理模块
 * 
 * @module Version
 * @description 从 package.json 中动态获取版本号
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * 获取包的版本号
 * 
 * @returns {string} 当前包的版本号
 */
function getPackageVersion(): string {
  try {
    const packagePath = resolve(__dirname, '../../package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
    return packageJson.version;
  } catch (error) {
    console.warn('无法读取 package.json 版本号，使用默认版本');
    return '0.0.0';
  }
}

/**
 * 当前包的版本号
 */
export const VERSION = getPackageVersion(); 