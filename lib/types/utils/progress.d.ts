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
export declare class ProgressManager {
    /** 存储所有活动的加载动画实例 */
    private static spinners;
    /**
     * 启动加载动画
     *
     * @param {string} id - 加载动画的唯一标识
     * @param {string} text - 显示的文本信息
     */
    static start(id: string, text: string): void;
    static update(id: string, text: string): void;
    static succeed(id: string, text: string): void;
    static fail(id: string, text: string): void;
    static info(message: string): void;
    static warn(message: string): void;
    static error(message: string): void;
    static success(message: string): void;
}
