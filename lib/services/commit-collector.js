"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitCollector = void 0;
const prompts_1 = require("@inquirer/prompts");
const constants_1 = require("../constants");
const validators_1 = require("../validators");
const chalk_1 = __importDefault(require("chalk"));
const openai_1 = __importDefault(require("openai"));
const openai_2 = require("../config/openai");
const ora_1 = __importDefault(require("ora"));
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
class CommitCollector {
    constructor(gitService, configPath) {
        this.gitService = gitService;
        this.configPath = configPath;
    }
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
    async collect(useAI = false) {
        var _a;
        if (useAI) {
            const changes = await this.getGitChanges();
            if (!((_a = changes.openAIConfig) === null || _a === void 0 ? void 0 : _a.apiKey)) {
                console.error(chalk_1.default.red('错误: 未配置OpenAI API Key'));
                console.log(chalk_1.default.yellow('\n请通过以下方式之一配置API Key:'));
                console.log(chalk_1.default.cyan('1. 环境变量:'));
                console.log('   export OPENAI_API_KEY=your_api_key');
                console.log(chalk_1.default.cyan('\n2. 配置文件 (.commit-wizard.json):'));
                console.log(`   {
          "openai": {
            "apiKey": "your_api_key",
            "model": "gpt-3.5-turbo",    // 可选
            "temperature": 0.7,          // 可选
            "maxTokens": 150             // 可选
          }
        }`);
                process.exit(1);
            }
            const aiSuggestion = await this.generateAISuggestion();
            return this.confirmAISuggestion(aiSuggestion);
        }
        // 原有的手动收集逻辑
        const type = await this.collectType();
        const scope = await this.collectScope();
        const subject = await this.collectSubject();
        const { addDocLink, docLink } = await this.collectDocInfo();
        const shouldPush = await this.collectPushInfo();
        return {
            type,
            scope,
            subject,
            addDocLink,
            docLink,
            shouldPush,
        };
    }
    /**
     * 生成AI建议的提交信息
     *
     * @private
     * @async
     * @description 基于Git暂存区的文件变更，使用AI生成提交信息建议
     * @returns {Promise<CommitAnswers>} AI生成的提交信息建议
     */
    async generateAISuggestion() {
        // 获取Git暂存区的变更信息
        const changes = await this.getGitChanges();
        // 调用AI服务分析变更并生成提交信息
        const aiSuggestion = await this.callAIService(changes);
        return {
            type: aiSuggestion.type,
            scope: aiSuggestion.scope,
            subject: aiSuggestion.subject,
            addDocLink: false,
            shouldPush: false,
        };
    }
    /**
     * 获取Git变更信息
     *
     * @private
     * @async
     * @description 获取暂存区的文件变更详情
     * @returns {Promise<GitChanges>} Git变更信息
     */
    async getGitChanges() {
        const status = await this.gitService.getStatus();
        const openAIConfig = (0, openai_2.getOpenAIConfig)(this.configPath);
        // 过滤掉被排除的文件
        const filteredStaged = status.staged.filter(file => {
            if (!openAIConfig.exclude)
                return true;
            return !openAIConfig.exclude.some(excludePath => file.startsWith(excludePath) || file.includes(`/${excludePath}/`));
        });
        // 只获取未被排除的文件的差异
        const diffs = await this.gitService.getStagedDiffs(filteredStaged);
        return {
            staged: filteredStaged,
            diffs,
            openAIConfig,
        };
    }
    /**
     * 调用AI服务
     *
     * @private
     * @async
     * @description 调用AI服务分析Git变更并生成提交信息
     * @param {GitChanges} changes - Git变更信息
     * @returns {Promise<CommitAnswers>} AI生成的提交信息
     */
    async callAIService(changes) {
        const spinner = (0, ora_1.default)({
            text: chalk_1.default.cyan('  正在调用 AI 分析中...'),
            spinner: 'dots',
        });
        try {
            const { staged, diffs, openAIConfig } = changes;
            // 显示分析标题
            console.log(constants_1.PROMPTS.ai.process.title);
            console.log(constants_1.PROMPTS.ai.process.analyzing);
            // 显示分析步骤
            console.log(chalk_1.default.cyan('  1. 分析文件类型和路径...'));
            console.log(chalk_1.default.cyan('\n    📁 分析文件列表:'));
            staged.forEach((file, index) => {
                const fileIcon = file.endsWith('/') ? '📂' : '📄';
                console.log(chalk_1.default.green(`      ${index + 1}. ${fileIcon} ${file}`));
            });
            console.log(chalk_1.default.gray('\n    共计: ' + staged.length + ' 个文件\n'));
            // 准备 OpenAI 提示内容
            const prompt = this.generatePrompt(staged, diffs);
            // 创建loading spinner
            spinner.start();
            // 调用 OpenAI API
            const suggestion = await this.callOpenAI(prompt, openAIConfig);
            // 停止loading并显示成功
            spinner.succeed(chalk_1.default.green('  AI 分析完成'));
            // 解析 AI 返回结果
            console.log(chalk_1.default.cyan('\n  2. 解析 AI 建议...'));
            const { type, scope, subject } = this.parseAISuggestion(suggestion);
            // 显示最终结果
            console.log(constants_1.PROMPTS.ai.suggestion);
            console.log(`${constants_1.PROMPTS.ai.typeLabel}${type}`);
            if (scope)
                console.log(`${constants_1.PROMPTS.ai.scopeLabel}${scope}`);
            console.log(`${constants_1.PROMPTS.ai.subjectLabel}${subject}\n`);
            return {
                type,
                scope,
                subject,
                addDocLink: false,
                shouldPush: false,
            };
        }
        catch (error) {
            // 如果发生错误，确保spinner停止并显示错误状态
            if (spinner) {
                spinner.fail(chalk_1.default.red('  AI 分析失败'));
            }
            console.error('AI服务调用失败:', error);
            throw new Error('AI服务调用失败');
        }
    }
    // 生成 OpenAI 提示
    generatePrompt(staged, diffs) {
        return `
      By default, all responses must be in Chinese.
      As a professional Git commit information generation assistant, please generate structured commit information according to the following development changes and strictly follow the Angular Commit specification. Follow this process:

      1. Change Analysis Phase:
      - Deep analysis of the change file path: ${staged.join('n')}
      - Double-check the code diffs: ${diffs}
      - Identify core modification intent (new features/bug fixes/document updates/style adjustments, etc.)
      - Locate affected functional modules (up to 3 critical modules identified)

      2. Decision Generation Stage:
      <Decision-making framework>
      Type Selection Criteria:
      feat     → 新增产品功能（非测试代码）
      fix      → 修复缺陷/BUG
      init     → 初始化项目
      docs     → 仅文档变更（README/CHANGELOG等）
      style    → 代码格式调整（空格/缩进/分号，无逻辑变更）
      refactor → 代码重构（功能不变的结构调整）
      perf     → 性能优化类变更
      test     → 测试代码相关变更
      revert   → 代码回退
      build    → 构建相关
      chore    → 构建/工程依赖/工具等维护性变更
      ci       → 持续集成相关

      Scope Determination Principle:
      - Inference modules based on file paths (e.g. src/user → user modules)
      - Select the most core or leave blank when there are multiple modules
      - Null if there is no explicit range

      Subject Specification:
      - Use Chinese imperative sentences with lowercase initials
      - Punctuation at the end is prohibited, within 50 words in length
      - Accurately summarize the nature of the change (rather than a record of the operation)
      - Include problem/solution keywords
      </Decision-making framework>

      3. Output Specification Requirements:
      - Strictly use Chinese Simplified Chinese
      - Strictly follow the JSON format, do not return any other messages, and include and only the following keys:
      {
      "type": "Required, select from predefined type",
      "scope": "optional, module name or null",
      "subject": "Required, normalized topic description"
      }
      - Escape special characters to ensure that JSON is parseable
      - If the type cannot be determined, "chore" is used by default.
    `;
    }
    // 调用 OpenAI API
    async callOpenAI(prompt, config) {
        var _a, _b;
        if (!(config === null || config === void 0 ? void 0 : config.apiKey)) {
            throw new Error('未配置 OpenAI API Key');
        }
        const openai = new openai_1.default({
            baseURL: config.baseURL,
            apiKey: config.apiKey,
        });
        const response = await openai.chat.completions.create({
            // 使用的模型名称,默认使用 gpt-3.5-turbo
            model: config.model || 'gpt-3.5-turbo',
            // 对话消息列表
            messages: [
                {
                    // system 角色用于设置 AI 助手的行为和身份
                    role: 'system',
                    content: 'You are a helpful Git commit message generator.',
                },
                {
                    // user 角色用于发送用户的实际提示内容
                    role: 'user',
                    content: prompt,
                },
            ],
            // 控制输出的随机性,0-2之间,值越大随机性越强,默认0.7
            temperature: config.temperature || 0.7,
            // 限制生成的最大token数,默认150
            max_tokens: config.maxTokens || 150,
            // 控制核采样概率,1表示考虑所有可能的token
            top_p: 1,
            // 控制重复惩罚度,0表示不惩罚
            frequency_penalty: 0,
            // 控制新主题惩罚度,0表示不惩罚
            presence_penalty: 0,
            // 为每个输入消息生成的完成数量
            n: 1,
            // 是否启用流式响应
            stream: false,
        });
        return ((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || '';
    }
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
    parseAISuggestion(suggestion) {
        // 使用正则提取 Markdown 代码块中的 JSON
        const codeBlockRegex = /```json\n([\s\S]*?)\n```/;
        const match = suggestion.match(codeBlockRegex);
        try {
            let result;
            if (match) {
                // 优先解析 Markdown 代码块中的 JSON
                result = JSON.parse(match[1]);
            }
            else {
                // 降级处理:尝试直接解析整个字符串
                result = JSON.parse(suggestion);
            }
            // 返回解析结果,使用默认值兜底
            return {
                type: result.type || 'chore',
                scope: result.scope,
                subject: result.subject || '更新代码',
                addDocLink: false,
                shouldPush: false,
            };
        }
        catch (error) {
            // 解析失败时打印错误并返回默认值
            console.error('解析 AI 建议失败:', error);
            return {
                type: 'chore',
                subject: '更新代码',
                addDocLink: false,
                shouldPush: false,
            };
        }
    }
    /**
     * 确认AI生成的提交信息
     *
     * @private
     * @async
     * @description 让用户确认或修改AI生成的提交信息
     * @param {CommitAnswers} aiSuggestion - AI生成的提交信息建议
     * @returns {Promise<CommitAnswers>} 最终的提交信息
     */
    async confirmAISuggestion(aiSuggestion) {
        console.log('\nAI生成的提交信息建议:');
        console.log(`${constants_1.PROMPTS.ai.typeLabel}${aiSuggestion.type}`);
        console.log(`${constants_1.PROMPTS.ai.scopeLabel}${aiSuggestion.scope || '(无)'}`);
        console.log(`${constants_1.PROMPTS.ai.subjectLabel}${aiSuggestion.subject}\n`);
        const useAISuggestion = await (0, prompts_1.confirm)({
            message: constants_1.PROMPTS.ai.confirm,
            default: true,
        });
        if (useAISuggestion) {
            // 使用AI建议，但仍然询问是否需要文档链接和推送
            const { addDocLink, docLink } = await this.collectDocInfo();
            const shouldPush = await this.collectPushInfo();
            return {
                ...aiSuggestion,
                addDocLink,
                docLink,
                shouldPush,
            };
        }
        // 如果不使用AI建议，切换到手动输入模式
        return this.collect(false);
    }
    /**
     * 收集提交类型
     *
     * @private
     * @async
     * @description 提供搜索功能的提交类型选择器
     * @returns {Promise<string>} 选择的提交类型
     */
    async collectType() {
        return (0, prompts_1.search)({
            message: constants_1.PROMPTS.type.message,
            source: (input = '') => {
                const searchTerm = input.toLowerCase();
                return Promise.resolve(constants_1.COMMIT_TYPES.filter((type) => type.value.includes(searchTerm) ||
                    type.description.toLowerCase().includes(searchTerm)));
            },
            pageSize: 10,
            validate: (value) => {
                if (!value) {
                    return constants_1.PROMPTS.type.error;
                }
                return true;
            },
        });
    }
    /**
     * 收集影响范围
     *
     * @private
     * @async
     * @description 收集可选的影响范围信息
     * @returns {Promise<string>} 输入的影响范围
     */
    async collectScope() {
        return (0, prompts_1.input)({
            message: constants_1.PROMPTS.scope.message,
            validate: (value) => {
                if (value && value.length > 50) {
                    return constants_1.PROMPTS.scope.error;
                }
                return true;
            },
        });
    }
    /**
     * 收集提交描述
     *
     * @private
     * @async
     * @description 收集必填的提交描述信息
     * @returns {Promise<string>} 输入的提交描述
     */
    async collectSubject() {
        return (0, prompts_1.input)({
            message: constants_1.PROMPTS.subject.message,
            validate: validators_1.CommitValidator.validateSubject,
        });
    }
    /**
     * 收集文档信息
     *
     * @private
     * @async
     * @description 收集可选的文档链接信息
     * @returns {Promise<{addDocLink: boolean; docLink?: string}>} 文档相关信息
     */
    async collectDocInfo() {
        const addDocLink = await (0, prompts_1.confirm)({
            message: constants_1.PROMPTS.docLink.message,
            default: false,
        });
        let docLink;
        if (addDocLink) {
            docLink = await (0, prompts_1.input)({
                message: constants_1.PROMPTS.docLink.urlMessage,
                validate: validators_1.CommitValidator.validateUrl,
            });
        }
        return { addDocLink, docLink };
    }
    /**
     * 收集推送信息
     *
     * @private
     * @async
     * @description 询问是否需要推送到远程仓库
     * @returns {Promise<boolean>} 是否需要推送
     */
    async collectPushInfo() {
        return (0, prompts_1.confirm)({
            message: constants_1.PROMPTS.push.message,
            default: false,
        });
    }
}
exports.CommitCollector = CommitCollector;
//# sourceMappingURL=commit-collector.js.map