import chalk from 'chalk';

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
export const PROMPTS = {
  /**
   * 提交类型相关提示
   */
  type: {
    message: chalk.blue.bold('请选择提交类型:'),
    error: '提交类型选择有误'
  },

  /**
   * 影响范围相关提示
   */
  scope: {
    message: chalk.blue.bold('请输入影响范围(可选):'),
    error: '影响范围格式有误'
  },

  /**
   * 提交描述相关提示
   */
  subject: {
    message: chalk.blue.bold('请输入简短描述（必填）:'),
    error: '描述内容不能为空'
  },

  /**
   * 文档链接相关提示
   */
  docLink: {
    message: chalk.blue.bold('是否需要输入相关文档地址？'),
    urlMessage: chalk.blue.bold('请输入文档地址（以http://或https://开头）:')
  },

  /**
   * 推送相关提示
   */
  push: {
    message: chalk.blue.bold('是否直接推送到远程仓库？'),
    pushing: chalk.cyan('正在推送到远程仓库...'),
    noUpstream: chalk.yellow('⚠️ 当前分支没有设置上游分支，正在设置...')
  },

  /**
   * 成功提示信息
   */
  success: {
    commit: chalk.green('\n✨ 提交成功！'),
    push: chalk.green('✨ 推送成功！'),
    final: chalk.green('感谢您的贡献。')
  },

  /**
   * 错误提示信息
   */
  error: {
    prefix: chalk.red('\n❌ 发生错误:'),
    retry: chalk.red('请检查您的输入并重试。')
  },

  /**
   * AI相关提示
   */
  ai: {
    analyzing: chalk.blue('正在分析变更并生成提交信息...'),
    suggestion: chalk.blue.bold('\n分析完成！生成提交建议：'),
    typeLabel: chalk.cyan('类型: '),
    scopeLabel: chalk.cyan('范围: '),
    subjectLabel: chalk.cyan('描述: '),
    confirm: chalk.blue.bold('是否使用AI生成的提交信息？'),
    process: {
      title: chalk.blue.bold('\n=== 变更分析过程 ==='),
      analyzing: chalk.blue.bold('\n执行分析:'),
      result: chalk.blue.bold('\n分析结果:')
    }
  }
} as const;
