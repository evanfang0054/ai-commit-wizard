import chalk from 'chalk';
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
export const COMMIT_TYPES: readonly CommitType[] = [
  { name: chalk.green('feat: 新功能'), value: 'feat', description: '新增功能' },
  { name: chalk.green('fix: Bug修复'), value: 'fix', description: '修复Bug' },
  { name: chalk.green('init: 初始化'), value: 'init', description: '初始化项目' },
  { name: chalk.green('docs: 文档变更'), value: 'docs', description: '文档更新' },
  { name: chalk.green('style: 代码风格'), value: 'style', description: '不影响功能，例如空格、分号等格式修正' },
  { name: chalk.green('refactor: 代码重构'), value: 'refactor', description: '不包括 bug 修复或新功能' },
  { name: chalk.green('perf: 性能优化'), value: 'perf', description: '性能相关优化' },
  { name: chalk.green('test: 增加测试'), value: 'test', description: '添加测试用例' },
  { name: chalk.green('revert: 回退'), value: 'revert', description: '代码回退' },
  { name: chalk.green('build: 打包构建'), value: 'build', description: '构建相关' },
  { name: chalk.green('chore: 构建/工程依赖/工具'), value: 'chore', description: '构建过程或辅助工具的变动' },
  { name: chalk.green('ci: 持续集成'), value: 'ci', description: '持续集成相关' }
] as const;
