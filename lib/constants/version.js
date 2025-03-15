"use strict";
/**
 * 版本号管理模块
 *
 * @module Version
 * @description 从 package.json 中动态获取版本号
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
/**
 * 获取包的版本号
 *
 * @returns {string} 当前包的版本号
 */
function getPackageVersion() {
    try {
        const packagePath = (0, path_1.resolve)(__dirname, '../../package.json');
        const packageJson = JSON.parse((0, fs_1.readFileSync)(packagePath, 'utf-8'));
        return packageJson.version;
    }
    catch (error) {
        console.warn('无法读取 package.json 版本号，使用默认版本');
        return '0.0.0';
    }
}
/**
 * 当前包的版本号
 */
exports.VERSION = getPackageVersion();
//# sourceMappingURL=version.js.map