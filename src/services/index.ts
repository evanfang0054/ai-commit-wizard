/**
 * 服务模块
 *
 * @module Services
 * @description 提供核心服务实现
 *
 * @remarks
 * 集中管理所有服务类，包括：
 * - Git服务
 * - 提交信息收集器
 *
 * @example
 * ```ts
 * import { GitService, CommitCollector } from './services';
 * ```
 */

export * from './git-service';
export * from './commit-collector';
