import type { CommitAnswers } from '../types';
import { GitService } from '../services/git-service';
/**
 * 提交信息收集器
 *
 * @class CommitCollector
 * @description 负责通过交互式命令行收集用户的提交信息
 *
 * @remarks
 * 使用 Inquirer 提供交互式界面，收集以下信息：
 * - 提交类型（支持搜索过滤）
 * - 影响范围（可选）
 * - 提交描述
 * - 文档链接（可选）
 * - 是否推送
 *
 * 支持AI辅助生成提交信息：
 * - 自动分析已暂存的文件变更
 * - 智能推荐提交类型
 * - 生成符合规范的提交描述
 */
export declare class CommitCollector {
    private readonly gitService;
    private readonly configPath?;
    constructor(gitService: GitService, configPath?: string);
    /**
     * 收集完整的提交信息
     *
     * @async
     * @param {boolean} useAI - 是否使用AI辅助生成提交信息
     * @returns {Promise<CommitAnswers>} 收集到的所有提交相关信息
     *
     * @example
     * ```ts
     * const collector = new CommitCollector(gitService);
     *
     * // 使用AI辅助
     * const aiAnswers = await collector.collect(true);
     *
     * // 手动输入
     * const manualAnswers = await collector.collect(false);
     * ```
     */
    collect(useAI?: boolean): Promise<CommitAnswers>;
    /**
     * 生成AI建议的提交信息
     *
     * @private
     * @async
     * @description 基于Git暂存区的文件变更，使用AI生成提交信息建议
     * @returns {Promise<CommitAnswers>} AI生成的提交信息建议
     */
    private generateAISuggestion;
    /**
     * 获取Git变更信息
     *
     * @private
     * @async
     * @description 获取暂存区的文件变更详情
     * @returns {Promise<GitChanges>} Git变更信息
     */
    private getGitChanges;
    /**
     * 调用AI服务
     *
     * @private
     * @async
     * @description 调用AI服务分析Git变更并生成提交信息
     * @param {GitChanges} changes - Git变更信息
     * @returns {Promise<CommitAnswers>} AI生成的提交信息
     */
    private callAIService;
    private generatePrompt;
    private callOpenAI;
    /**
     * 解析 AI 返回的提交建议
     *
     * @private
     * @description 将 AI 返回的字符串解析为结构化的提交信息对象
     * 支持两种格式:
     * 1. Markdown 代码块中的 JSON 格式
     * 2. 纯 JSON 字符串格式
     *
     * @param {string} suggestion - AI 返回的原始建议字符串
     * @returns {CommitAnswers} 解析后的提交信息对象
     *
     * @example
     * // Markdown 格式示例:
     * ```json
     * {
     *   "type": "feat",
     *   "scope": "user",
     *   "subject": "添加用户登录功能"
     * }
     * ```
     *
     * @example
     * // 纯 JSON 格式示例:
     * {
     *   "type": "fix",
     *   "scope": "auth",
     *   "subject": "修复认证失败问题"
     * }
     *
     * @throws {Error} 当解析失败时会捕获错误并返回默认值
     *
     * @remarks
     * 解析失败时的默认返回值:
     * - type: 'chore'
     * - subject: '更新代码'
     * - addDocLink: false
     * - shouldPush: false
     */
    private parseAISuggestion;
    /**
     * 确认AI生成的提交信息
     *
     * @private
     * @async
     * @description 让用户确认或修改AI生成的提交信息
     * @param {CommitAnswers} aiSuggestion - AI生成的提交信息建议
     * @returns {Promise<CommitAnswers>} 最终的提交信息
     */
    private confirmAISuggestion;
    /**
     * 收集提交类型
     *
     * @private
     * @async
     * @description 提供搜索功能的提交类型选择器
     * @returns {Promise<string>} 选择的提交类型
     */
    private collectType;
    /**
     * 收集影响范围
     *
     * @private
     * @async
     * @description 收集可选的影响范围信息
     * @returns {Promise<string>} 输入的影响范围
     */
    private collectScope;
    /**
     * 收集提交描述
     *
     * @private
     * @async
     * @description 收集必填的提交描述信息
     * @returns {Promise<string>} 输入的提交描述
     */
    private collectSubject;
    /**
     * 收集文档信息
     *
     * @private
     * @async
     * @description 收集可选的文档链接信息
     * @returns {Promise<{addDocLink: boolean; docLink?: string}>} 文档相关信息
     */
    private collectDocInfo;
    /**
     * 收集推送信息
     *
     * @private
     * @async
     * @description 询问是否需要推送到远程仓库
     * @returns {Promise<boolean>} 是否需要推送
     */
    private collectPushInfo;
}
