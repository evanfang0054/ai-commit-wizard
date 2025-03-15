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
import { CLIOptions } from './utils/cli';
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
export declare class CommitWizard {
    private readonly gitService;
    private readonly commitCollector;
    private readonly options;
    /**
     * 创建提交向导实例
     *
     * @constructor
     * @param {CLIOptions} options - 命令行选项
     */
    constructor(options: CLIOptions);
    /**
     * 运行提交向导
     *
     * @public
     * @async
     * @description 执行完整的提交流程
     *
     * @throws {Error} 当提交过程中出现错误时抛出
     */
    run(): Promise<void>;
}
