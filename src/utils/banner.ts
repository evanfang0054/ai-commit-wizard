/**
 * 命令行界面展示模块
 */

import chalk from 'chalk';
import boxen from 'boxen';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { VERSION } from './version';

/**
 * 显示欢迎界面
 * 
 * @function showBanner
 * @description 生成并显示带有样式的欢迎界面
 * 
 */
export function showBanner(): void {
  const asciiArt = figlet.textSync('A C W', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  });

  const title = gradient.pastel.multiline(asciiArt);

  const message = boxen(
    `${title}\n\n${chalk.cyan('AI Commit Wizard')} ${chalk.gray('v' + VERSION)}`,
    {
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan',
      float: 'center',
    }
  );

  console.clear();
  console.log(message);
} 