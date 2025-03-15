/**
 * 命令行参数解析模块
 * 
 * @module CLI
 * @description 处理命令行参数的解析和验证
 * 
 * @remarks
 * 基于 Commander.js 实现，提供:
 * - 命令行参数定义和解析
 * - 帮助信息生成
 * - 版本信息显示
 * - 选项验证
 */

import { Command } from 'commander';
import { VERSION } from './version';

/**
 * 命令行选项接口
 * 
 * @interface CLIOptions
 * @description 定义了所有支持的命令行选项
 * 
 * @property {boolean} [ai] - 是否使用 AI 辅助生成提交信息
 * @property {boolean} [debug] - 是否启用调试模式
 * @property {string} [config] - 自定义配置文件路径
 */
export interface CLIOptions {
  ai?: boolean;
  debug?: boolean;
  config?: string;
}

/**
 * 解析命令行参数
 * 
 * @function parseArguments
 * @description 解析并验证命令行参数
 * 
 * @returns {CLIOptions} 解析后的命令行选项对象
 * 
 * @example
 * ```ts
 * const options = parseArguments();
 * if (options.ai) {
 *   // 使用 AI 模式
 * }
 * ```
 */
export function parseArguments(): CLIOptions {
  const program = new Command()
    .name('commit-wizard')
    .description('一个智能的 Git 提交信息生成工具')
    .version(VERSION)
    .option('-a, --ai', '使用 AI 辅助生成提交信息', false)
    .option('-d, --debug', '启用调试模式', false)
    .option('-c, --config <path>', '指定配置文件路径 (.commit-wizard.json)')
    .addHelpText('after', `
示例:
  $ commit-wizard                 # 启动交互式提交向导
  $ commit-wizard --ai           # 使用 AI 辅助生成提交信息
  $ commit-wizard -c ./config.json  # 使用自定义配置文件
  $ git cw                       # 使用 Git 别名启动向导
    `)
    .parse();

  return program.opts<CLIOptions>();
} 