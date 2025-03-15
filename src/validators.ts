import { VALIDATION_RULES } from './constants';

/**
 * 提交信息验证器
 *
 * @class CommitValidator
 * @description 提供各种提交信息的验证方法
 *
 * @remarks
 * 包含以下验证功能：
 * - 提交描述验证
 * - URL格式验证
 */
export class CommitValidator {
  /**
   * 验证提交描述
   *
   * @static
   * @param {string} input - 待验证的提交描述
   * @returns {true | string} 验证通过返回true，否则返回错误信息
   *
   * @example
   * ```ts
   * const result = CommitValidator.validateSubject('');
   * if (result !== true) {
   *   console.error(result); // 输出: 描述不能为空，请重新输入。
   * }
   * ```
   */
  static validateSubject(input: string): true | string {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      return VALIDATION_RULES.subject.required;
    }
    if (trimmedInput.length > 100) {
      return VALIDATION_RULES.subject.maxLength;
    }
    return true;
  }

  /**
   * 验证URL格式
   *
   * @static
   * @param {string} input - 待验证的URL
   * @returns {true | string} 验证通过返回true，否则返回错误信息
   *
   * @example
   * ```ts
   * const result = CommitValidator.validateUrl('invalid-url');
   * if (result !== true) {
   *   console.error(result); // 输出: 请输入有效的URL地址...
   * }
   * ```
   */
  static validateUrl(input: string): true | string {
    if (!input.startsWith('http://') && !input.startsWith('https://')) {
      return VALIDATION_RULES.url.protocol;
    }
    try {
      new URL(input);
      return true;
    } catch {
      return VALIDATION_RULES.url.format;
    }
  }
}
