import type { CommitType } from '../types';
/**
 * Git提交类型配置
 *
 * @constant COMMIT_TYPES
 * @description 定义了符合Angular提交规范的标准提交类型列表
 *
 * @type {readonly CommitType[]}
 *
 * @remarks
 * 每个提交类型包含:
 * - name: 带颜色的显示名称
 * - value: 实际使用的类型值
 * - description: 类型说明
 *
 * @example
 * ```ts
 * // 使用提交类型
 * const type = COMMIT_TYPES.find(t => t.value === 'feat');
 * console.log(type.description); // 输出: 新增功能
 * ```
 */
export declare const COMMIT_TYPES: readonly CommitType[];
