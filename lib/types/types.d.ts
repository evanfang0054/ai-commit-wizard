import { StatusResult } from 'simple-git';
/**
 * Git提交类型定义
 *
 * @interface CommitType
 * @description 定义了标准的Git提交类型结构
 *
 * @property {string} name - 显示给用户的提交类型名称，包含颜色样式
 * @property {string} value - 实际用于提交的类型标识符
 * @property {string} description - 提交类型的详细描述
 *
 * @example
 * ```ts
 * const commitType: CommitType = {
 *   name: chalk.green('feat: 新功能'),
 *   value: 'feat',
 *   description: '新增功能'
 * };
 * ```
 */
export interface CommitType {
    readonly name: string;
    readonly value: string;
    readonly description: string;
}
/**
 * 提交答案接口
 *
 * @interface CommitAnswers
 * @description 定义了用户在交互过程中的所有输入信息
 *
 * @property {string} type - 提交类型
 * @property {string} [scope] - 可选的影响范围
 * @property {string} subject - 提交描述
 * @property {boolean} addDocLink - 是否添加文档链接
 * @property {string} [docLink] - 可选的文档链接
 * @property {boolean} shouldPush - 是否需要推送到远程
 *
 * @example
 * ```ts
 * const answers: CommitAnswers = {
 *   type: 'feat',
 *   scope: 'user',
 *   subject: '添加用户登录功能',
 *   addDocLink: true,
 *   docLink: 'http://example.com/docs',
 *   shouldPush: true
 * };
 * ```
 */
export interface CommitAnswers {
    type: string;
    scope?: string;
    subject: string;
    addDocLink: boolean;
    docLink?: string;
    shouldPush: boolean;
}
/**
 * Git服务接口
 *
 * @interface IGitService
 * @description 定义了Git操作的标准接口
 *
 * @method commit - 执行Git提交
 * @method push - 推送到远程仓库
 * @method checkStatus - 检查Git仓库状态
 * @method getStagedDiffs - 获取暂存区文件的变更内容
 * @method getStatus - 获取Git仓库状态信息
 *
 * @example
 * ```ts
 * class GitService implements IGitService {
 *   async commit(message: string): Promise<void> {
 *     // 实现提交逻辑
 *   }
 * }
 * ```
 */
export interface IGitService {
    commit(message: string): Promise<void>;
    push(): Promise<void>;
    checkStatus(): Promise<void>;
    getStagedDiffs(): Promise<string>;
    getStatus(): Promise<StatusResult>;
}
/**
 * Git变更信息
 */
export interface GitChanges {
    /** 暂存区的文件列表 */
    staged: string[];
    /** 暂存区文件的详细变更 */
    diffs: string;
    /** OpenAI 配置 */
    openAIConfig?: OpenAIConfig;
}
/**
 * AI生成的提交信息建议
 */
export interface AISuggestion {
    /** 建议的提交类型 */
    type: string;
    /** 建议的影响范围 */
    scope?: string;
    /** 建议的提交描述 */
    subject: string;
}
/**
 * OpenAI 配置接口
 *
 * @interface OpenAIConfig
 * @description OpenAI API 的配置选项
 */
export interface OpenAIConfig {
    apiKey: string;
    baseURL: string;
    model: string;
    temperature: number;
    maxTokens: number;
    exclude?: string[];
    [key: string]: string | number | string[] | undefined;
}
/**
 * 配置文件完整接口
 *
 * @interface CommitWizardConfig
 * @description 完整的配置文件结构
 */
export interface CommitWizardConfig {
    openai: OpenAIConfig;
}
