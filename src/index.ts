#!/usr/bin/env node
/**
 * Ai Commit Wizard
 * 
 * @module CommitWizard
 * @description 一个智能的 Git 提交信息生成工具
 * 
 * @remarks
 * 该工具旨在:
 * - 规范化 Git 提交信息
 * - 提供交互式提交体验
 * - 支持 AI 辅助生成提交信息
 * - 自动化提交流程
 * 
 * 主要特性:
 * - 符合 Conventional Commits 规范
 * - 交互式命令行界面
 * - AI 智能分析
 * - 优雅的错误处理
 */

import { showBanner } from './utils/banner';
import { parseArguments } from './utils/cli';
import { ProgressManager } from './utils/progress';
import { CommitWizard } from './commit-wizard';

/**
 * 程序入口函数
 * 
 * @async
 * @function main
 * @description 初始化并运行提交向导
 * 
 * @remarks
 * 执行流程:
 * 1. 显示欢迎界面
 * 2. 解析命令行参数
 * 3. 运行提交向导
 * 4. 处理可能的错误
 */
async function main() {
  // 显示欢迎界面
  showBanner();

  // 解析命令行参数
  const options = parseArguments();

  try {
    // 创建提交向导实例
    const wizard = new CommitWizard(options);

    // 运行向导
    await wizard.run();

    // 显示完成信息
    ProgressManager.success('提交完成！感谢使用 Ai Commit Wizard');
  } catch (error) {
    ProgressManager.error(error instanceof Error ? error.message : '未知错误');
    if (options.debug) {
      console.error(error);
    }
    process.exit(1);
  }
}

// 启动程序
main();
