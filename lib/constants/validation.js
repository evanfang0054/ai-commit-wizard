"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_RULES = void 0;
/**
 * 验证规则配置
 *
 * @constant VALIDATION_RULES
 * @description 定义了各种输入验证的规则和错误提示信息
 *
 * @property {object} subject - 提交描述验证规则
 * @property {object} url - URL地址验证规则
 *
 * @example
 * ```ts
 * if (!input.trim()) {
 *   return VALIDATION_RULES.subject.required;
 * }
 * ```
 */
exports.VALIDATION_RULES = {
    subject: {
        required: '描述不能为空，请重新输入。',
        maxLength: '描述不能超过100个字符，请精简描述。'
    },
    url: {
        protocol: '请输入有效的URL地址(以http://或https://开头)。',
        format: '请输入有效的URL格式。'
    }
};
//# sourceMappingURL=validation.js.map