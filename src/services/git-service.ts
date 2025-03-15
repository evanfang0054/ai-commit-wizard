import simpleGit, { SimpleGit, StatusResult } from 'simple-git';
import { IGitService } from '../types';
import { PROMPTS } from '../constants';

/**
 * Git服务实现类
 *
 * @class GitService
 * @implements {IGitService}
 * @description 提供Git操作的具体实现，包括提交、推送等功能
 *
 * @remarks
 * 该服务封装了 simple-git 库，提供以下核心功能：
 * - Git状态检查
 * - 提交更改
 * - 远程推送
 * - 自动设置上游分支
 *
 * @example
 * ```ts
 * const gitService = new GitService();
 *
 * // 检查状态
 * await gitService.checkStatus();
 *
 * // 提交更改
 * await gitService.commit('feat: 新功能');
 *
 * // 推送到远程
 * await gitService.push();
 * ```
 */
export class GitService implements IGitService {
  /**
   * SimpleGit实例
   * @private
   * @type {SimpleGit}
   */
  private git: SimpleGit;

  /**
   * 创建GitService实例
   *
   * @constructor
   * @description 初始化SimpleGit实例，配置基本参数
   *
   * @remarks
   * 配置参数包括：
   * - binary: 使用的Git命令
   * - maxConcurrentProcesses: 最大并发进程数
   * - progress: 进度回调函数，用于显示commit和push的进度
   * - outputHandler: 处理Git命令的输出流
   */
  constructor() {
    this.git = simpleGit({
      binary: 'git',
      maxConcurrentProcesses: 1,
      progress: ({ method, stage, progress }: any) => {
        if (method && (method.includes('push') || method.includes('commit'))) {
          console.log(`${method} ${stage ?? ''} ${progress ?? ''}`);
        }
      }
    }).outputHandler((_command, _stdout, stderr) => {
      // 只处理错误输出流
      stderr.pipe(process.stderr);
    });
  }

  /**
   * 检查Git仓库状态
   *
   * @public
   * @async
   * @description 检查是否有暂存的更改可以提交
   *
   * @throws {Error} 当仓库中没有暂存的更改时抛出错误
   * @returns {Promise<void>}
   *
   * @example
   * ```ts
   * try {
   *   await gitService.checkStatus();
   *   console.log('有暂存的更改可以提交');
   * } catch (error) {
   *   console.error('请先使用 git add 添加要提交的文件');
   * }
   * ```
   */
  public async checkStatus(): Promise<void> {
    const status = await this.git.status();

    if (!status.staged.length) {
      throw new Error('没有暂存的更改。请先使用 git add 添加要提交的文件。');
    }
  }

  /**
   * 执行Git提交
   *
   * @public
   * @async
   * @description 使用指定的提交信息执行Git提交
   *
   * @param {string} message - 提交信息
   * @returns {Promise<void>}
   *
   * @example
   * ```ts
   * await gitService.commit('feat(user): 添加用户登录功能');
   * ```
   */
  public async commit(message: string): Promise<void> {
    await this.git.commit(message);
    console.log(PROMPTS.success.commit);
  }

  /**
   * 推送到远程仓库
   *
   * @public
   * @async
   * @description 将提交推送到远程仓库，自动处理首次推送时设置上游分支的情况
   *
   * @throws {Error} 当推送失败且不是因为缺少上游分支时抛出错误
   * @returns {Promise<void>}
   *
   * @example
   * ```ts
   * try {
   *   await gitService.push();
   *   console.log('推送成功');
   * } catch (error) {
   *   console.error('推送失败:', error.message);
   * }
   * ```
   */
  public async push(): Promise<void> {
    try {
      await this.git.push();
    } catch (error: any) {
      if (error.message.includes('no upstream branch')) {
        console.log(PROMPTS.push.noUpstream);
        const currentBranch = (await this.git.branch()).current;
        await this.git.push(['-u', 'origin', currentBranch]);
      } else {
        throw error;
      }
    }
    console.log(PROMPTS.success.push);
  }

  /**
   * 获取暂存区文件的详细变更
   *
   * @public
   * @async
   * @description 获取暂存区文件的具体改动内容
   * @returns {Promise<string>} 变更的详细信息
   */
  public async getStagedDiffs(files?: string[]): Promise<string> {
    const args = ['--cached'];
    if (files && files.length > 0) {
      args.push('--');
      args.push(...files);
    }
    return this.git.diff(args);
  }

  /**
   * 获取Git状态信息
   *
   * @public
   * @async
   * @description 获取当前仓库的状态信息
   * @returns {Promise<StatusResult>} Git状态信息
   */
  public async getStatus(): Promise<StatusResult> {
    return this.git.status();
  }
}
