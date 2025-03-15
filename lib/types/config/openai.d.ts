/**
 * OpenAI 配置管理模块
 *
 * @module OpenAIConfig
 * @description 负责管理和加载 OpenAI 相关配置
 */
import { OpenAIConfig } from '../types';
/**
 * 获取 OpenAI 配置
 *
 * @param {string} [configPath] - 自定义配置文件路径
 * @returns {OpenAIConfig} OpenAI 配置对象
 */
export declare function getOpenAIConfig(configPath?: string): OpenAIConfig;
