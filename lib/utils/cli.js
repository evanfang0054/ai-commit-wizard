"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArguments = void 0;
const commander_1 = require("commander");
const version_1 = require("./version");
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
function parseArguments() {
    const program = new commander_1.Command()
        .name('commit-wizard')
        .description('一个智能的 Git 提交信息生成工具')
        .version(version_1.VERSION)
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
    return program.opts();
}
exports.parseArguments = parseArguments;
//# sourceMappingURL=cli.js.map