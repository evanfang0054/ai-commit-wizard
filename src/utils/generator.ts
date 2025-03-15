import type { CommitAnswers } from '../types';

/**
 * 生成规范化的提交信息
 *
 * @function generateCommitMessage
 * @description 根据用户输入生成符合约定式提交规范的提交信息
 *
 * @param {CommitAnswers} answers - 用户输入的提交信息
 * @returns {string} 格式化后的提交信息
 *
 * @example
 * ```ts
 * const message = generateCommitMessage({
 *   type: 'feat',
 *   scope: 'user',
 *   subject: '添加登录功能',
 *   addDocLink: true,
 *   docLink: 'http://example.com/docs'
 * });
 * // 返回: feat(user): 添加登录功能\n\nDocs: http://example.com/docs
 * ```
 */
export function generateCommitMessage(answers: CommitAnswers): string {
  const { type, scope, subject, docLink } = answers;

  // 生成范围部分
  const scopePart = scope ? `(${scope})` : '';

  // 生成提交信息主体
  const commitMsg = `${type}${scopePart}: ${subject}`;

  // 添加文档链接
  if (docLink) {
    return `${commitMsg}\n\nDocs: ${docLink}`;
  }

  return commitMsg;
}
