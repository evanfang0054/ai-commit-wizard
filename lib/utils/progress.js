"use strict";
/**
 * 进度管理模块
 *
 * @module Progress
 * @description 提供统一的进度展示和状态管理功能
 *
 * @remarks
 * 基于 ora 和 log-symbols 实现，提供:
 * - 加载动画显示
 * - 状态更新提示
 * - 成功/失败状态展示
 * - 信息/警告/错误提示
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressManager = void 0;
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const log_symbols_1 = __importDefault(require("log-symbols"));
/**
 * 进度管理器类
 *
 * @class ProgressManager
 * @description 管理命令行界面的进度展示和状态反馈
 *
 * @remarks
 * 提供静态方法用于:
 * - 启动加载动画
 * - 更新加载状态
 * - 显示成功/失败状态
 * - 输出不同级别的信息
 */
class ProgressManager {
    /**
     * 启动加载动画
     *
     * @param {string} id - 加载动画的唯一标识
     * @param {string} text - 显示的文本信息
     */
    static start(id, text) {
        const spinner = (0, ora_1.default)({
            text: chalk_1.default.cyan(text),
            spinner: 'dots',
        }).start();
        this.spinners.set(id, spinner);
    }
    static update(id, text) {
        const spinner = this.spinners.get(id);
        if (spinner) {
            spinner.text = chalk_1.default.cyan(text);
        }
    }
    static succeed(id, text) {
        const spinner = this.spinners.get(id);
        if (spinner) {
            spinner.succeed(chalk_1.default.green(text));
            this.spinners.delete(id);
        }
    }
    static fail(id, text) {
        const spinner = this.spinners.get(id);
        if (spinner) {
            spinner.fail(chalk_1.default.red(text));
            this.spinners.delete(id);
        }
    }
    static info(message) {
        console.log(`${log_symbols_1.default.info} ${chalk_1.default.blue(message)}`);
    }
    static warn(message) {
        console.log(`${log_symbols_1.default.warning} ${chalk_1.default.yellow(message)}`);
    }
    static error(message) {
        console.log(`${log_symbols_1.default.error} ${chalk_1.default.red(message)}`);
    }
    static success(message) {
        console.log(`${log_symbols_1.default.success} ${chalk_1.default.green(message)}`);
    }
}
exports.ProgressManager = ProgressManager;
/** 存储所有活动的加载动画实例 */
ProgressManager.spinners = new Map();
//# sourceMappingURL=progress.js.map