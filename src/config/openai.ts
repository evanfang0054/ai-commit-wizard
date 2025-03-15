/**
 * OpenAI 配置管理模块
 * 
 * @module OpenAIConfig
 * @description 负责管理和加载 OpenAI 相关配置
 */

import { OpenAIConfig, CommitWizardConfig } from '../types';
import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_FILE = '.commit-wizard.json';
const CONFIG_PATHS = [
  process.cwd(), // 当前工作目录
  os.homedir(), // 用户主目录
];

/**
 * 加载配置文件
 * 
 * @param {string} [customPath] - 自定义配置文件路径
 * @returns {CommitWizardConfig} 配置对象
 * @throws {Error} 当配置文件不存在或格式错误时抛出
 */
function loadConfig(customPath?: string): CommitWizardConfig {
  let configPath: string | undefined;

  if (customPath) {
    // 使用自定义路径
    const absolutePath = path.resolve(process.cwd(), customPath);
    if (fs.existsSync(absolutePath)) {
      configPath = absolutePath;
    } else {
      throw new Error(`找不到配置文件: ${customPath}`);
    }
  } else {
    // 按优先级查找配置文件
    configPath = CONFIG_PATHS.map(dir => path.join(dir, CONFIG_FILE))
      .find(file => fs.existsSync(file));
  }

  if (!configPath) {
    throw new Error('找不到配置文件，请确保 .commit-wizard.json 存在于项目目录或用户主目录');
  }

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return config;
  } catch (error) {
    throw new Error(`配置文件格式错误: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * 获取 OpenAI 配置
 * 
 * @param {string} [configPath] - 自定义配置文件路径
 * @returns {OpenAIConfig} OpenAI 配置对象
 */
export function getOpenAIConfig(configPath?: string): OpenAIConfig {
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
    temperature: openai.temperature ?? 0.7,
    maxTokens: openai.maxTokens ?? 150,
    exclude: openai.exclude ?? []
  };
}
