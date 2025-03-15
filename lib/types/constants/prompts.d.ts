/**
 * 提示信息配置
 *
 * @constant PROMPTS
 * @description 定义了所有用户交互过程中的提示信息
 *
 * @property {object} type - 提交类型相关提示
 * @property {object} scope - 影响范围相关提示
 * @property {object} subject - 提交描述相关提示
 * @property {object} docLink - 文档链接相关提示
 * @property {object} push - 推送相关提示
 * @property {object} success - 成功提示信息
 * @property {object} error - 错误提示信息
 * @property {object} ai - AI相关提示
 *
 * @remarks
 * 所有提示信息都使用 chalk 进行颜色样式处理，提供更好的视觉体验：
 * - 蓝色(blue)：交互提示，用于用户输入引导
 * - 绿色(green)：成功信息，表示操作完成
 * - 黄色(yellow)：警告信息，提示潜在问题
 * - 红色(red)：错误信息，表示操作失败
 * - 青色(cyan)：进度信息，表示操作进行中
 *
 * @example
 * ```ts
 * // 成功提示
 * console.log(PROMPTS.success.commit); // ✨ 提交成功！
 *
 * // 错误提示
 * console.log(PROMPTS.error.prefix); // ❌ 发生错误:
 *
 * // 交互提示
 * console.log(PROMPTS.type.message); // 请选择提交类型:
 * ```
 */
export declare const PROMPTS: {
    /**
     * 提交类型相关提示
     */
    readonly type: {
        readonly message: string;
        readonly error: "提交类型选择有误";
    };
    /**
     * 影响范围相关提示
     */
    readonly scope: {
        readonly message: string;
        readonly error: "影响范围格式有误";
    };
    /**
     * 提交描述相关提示
     */
    readonly subject: {
        readonly message: string;
        readonly error: "描述内容不能为空";
    };
    /**
     * 文档链接相关提示
     */
    readonly docLink: {
        readonly message: string;
        readonly urlMessage: string;
    };
    /**
     * 推送相关提示
     */
    readonly push: {
        readonly message: string;
        readonly pushing: string;
        readonly noUpstream: string;
    };
    /**
     * 成功提示信息
     */
    readonly success: {
        readonly commit: string;
        readonly push: string;
        readonly final: string;
    };
    /**
     * 错误提示信息
     */
    readonly error: {
        readonly prefix: string;
        readonly retry: string;
    };
    /**
     * AI相关提示
     */
    readonly ai: {
        readonly analyzing: string;
        readonly suggestion: string;
        readonly typeLabel: string;
        readonly scopeLabel: string;
        readonly subjectLabel: string;
        readonly confirm: string;
        readonly process: {
            readonly title: string;
            readonly analyzing: string;
            readonly result: string;
        };
    };
};
