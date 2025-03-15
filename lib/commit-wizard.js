"use strict";
/**
 * Git 提交向导核心模块
 *
 * @module CommitWizard
 * @description 提供完整的 Git 提交流程管理
 *
 * @remarks
 * 作为核心模块，负责:
 * - 协调各个子模块的工作
 * - 管理提交流程
 * - 处理错误情况
 * - 提供用户反馈
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitWizard = void 0;
const git_service_1 = require("./services/git-service");
const commit_collector_1 = require("./services/commit-collector");
const generator_1 = require("./utils/generator");
const progress_1 = require("./utils/progress");
/**
 * 提交向导类
 *
 * @class CommitWizard
 * @description 提供完整的 Git 提交流程控制
 *
 * @remarks
 * 主要职责:
 * - 初始化必要的服务
 * - 执行提交流程
 * - 处理异常情况
 * - 提供进度反馈
 */
class CommitWizard {
    /**
     * 创建提交向导实例
     *
     * @constructor
     * @param {CLIOptions} options - 命令行选项
     */
    constructor(options) {
        this.gitService = new git_service_1.GitService();
        this.commitCollector = new commit_collector_1.CommitCollector(this.gitService, options.config);
        this.options = options;
    }
    /**
     * 运行提交向导
     *
     * @public
     * @async
     * @description 执行完整的提交流程
     *
     * @throws {Error} 当提交过程中出现错误时抛出
     */
    async run() {
        try {
            // 检查Git状态
            progress_1.ProgressManager.start('git-check', '检查 Git 状态...');
            await this.gitService.checkStatus();
            progress_1.ProgressManager.succeed('git-check', '检查完成');
            // 收集提交信息
            const answers = await this.commitCollector.collect(this.options.ai);
            // 生成提交信息
            progress_1.ProgressManager.start('commit', '正在提交...');
            const commitMsg = (0, generator_1.generateCommitMessage)(answers);
            await this.gitService.commit(commitMsg);
            progress_1.ProgressManager.succeed('commit', '提交成功');
            // 根据需要推送
            if (answers.shouldPush) {
                progress_1.ProgressManager.start('push', '正在推送到远程仓库...');
                await this.gitService.push();
                progress_1.ProgressManager.succeed('push', '推送成功');
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CommitWizard = CommitWizard;
//# sourceMappingURL=commit-wizard.js.map