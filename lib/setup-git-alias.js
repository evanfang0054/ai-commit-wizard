"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const chalk_1 = __importDefault(require("chalk"));
/**
 * Git别名配置模块
 *
 * @module GitAliasSetup
 * @description 为commit-wizard工具配置Git全局别名
 *
 * @remarks
 * 该模块在工具安装时自动执行，通过设置Git全局别名'cw'来简化工具的调用。
 * 主要功能：
 * - 配置全局Git别名
 * - 提供友好的错误处理
 * - 支持手动配置提示
 *
 * @example
 * 配置成功后可以使用:
 * ```bash
 * git cw  # 等同于 npx commit-wizard
 * ```
 */
/**
 * Git别名配置命令
 * @constant
 * @type {string}
 */
const GIT_ALIAS_COMMAND = 'git config --global alias.cw "!npx commit-wizard"';
try {
    /**
     * 执行Git配置命令
     * @throws {Error} 当配置命令执行失败时抛出
     */
    (0, child_process_1.execSync)(GIT_ALIAS_COMMAND, {
        stdio: 'inherit',
        encoding: 'utf-8'
    });
    console.log(chalk_1.default.green('✨ Git别名配置成功! 现在你可以使用 git cw 来运行ai-commit-wizard'));
}
catch (error) {
    // 错误处理与用户提示
    console.warn(chalk_1.default.yellow('⚠️ Git别名配置失败。你可以手动运行以下命令进行配置:\n') +
        chalk_1.default.cyan(`$ ${GIT_ALIAS_COMMAND}`));
    if (error instanceof Error) {
        console.error(chalk_1.default.red('错误详情:', error.message));
    }
}
//# sourceMappingURL=setup-git-alias.js.map