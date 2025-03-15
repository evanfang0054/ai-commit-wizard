"use strict";
/**
 * OpenAI 配置管理模块
 *
 * @module OpenAIConfig
 * @description 负责管理和加载 OpenAI 相关配置
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenAIConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const CONFIG_FILE = '.commit-wizard.json';
const CONFIG_PATHS = [
    process.cwd(),
    os_1.default.homedir(), // 用户主目录
];
/**
 * 加载配置文件
 *
 * @param {string} [customPath] - 自定义配置文件路径
 * @returns {CommitWizardConfig} 配置对象
 * @throws {Error} 当配置文件不存在或格式错误时抛出
 */
function loadConfig(customPath) {
    let configPath;
    if (customPath) {
        // 使用自定义路径
        const absolutePath = path_1.default.resolve(process.cwd(), customPath);
        if (fs_1.default.existsSync(absolutePath)) {
            configPath = absolutePath;
        }
        else {
            throw new Error(`找不到配置文件: ${customPath}`);
        }
    }
    else {
        // 按优先级查找配置文件
        configPath = CONFIG_PATHS.map(dir => path_1.default.join(dir, CONFIG_FILE))
            .find(file => fs_1.default.existsSync(file));
    }
    if (!configPath) {
        throw new Error('找不到配置文件，请确保 .commit-wizard.json 存在于项目目录或用户主目录');
    }
    try {
        const config = JSON.parse(fs_1.default.readFileSync(configPath, 'utf-8'));
        return config;
    }
    catch (error) {
        throw new Error(`配置文件格式错误: ${error instanceof Error ? error.message : String(error)}`);
    }
}
/**
 * 获取 OpenAI 配置
 *
 * @param {string} [configPath] - 自定义配置文件路径
 * @returns {OpenAIConfig} OpenAI 配置对象
 */
function getOpenAIConfig(configPath) {
    var _a, _b, _c;
    const config = loadConfig(configPath);
    const { openai } = config;
    if (!openai) {
        throw new Error('配置文件中缺少 OpenAI 配置');
    }
    // 验证必要的配置项
    const requiredFields = ['apiKey', 'baseURL', 'model'];
    const missingFields = requiredFields.filter(field => !openai[field]);
    if (missingFields.length > 0) {
        throw new Error(`OpenAI 配置缺少必要字段: ${missingFields.join(', ')}`);
    }
    return {
        apiKey: openai.apiKey,
        baseURL: openai.baseURL,
        model: openai.model,
        temperature: (_a = openai.temperature) !== null && _a !== void 0 ? _a : 0.7,
        maxTokens: (_b = openai.maxTokens) !== null && _b !== void 0 ? _b : 150,
        exclude: (_c = openai.exclude) !== null && _c !== void 0 ? _c : []
    };
}
exports.getOpenAIConfig = getOpenAIConfig;
//# sourceMappingURL=openai.js.map