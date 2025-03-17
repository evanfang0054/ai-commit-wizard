"use strict";
/**
 * 命令行界面展示模块
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showBanner = void 0;
const chalk_1 = __importDefault(require("chalk"));
const boxen_1 = __importDefault(require("boxen"));
const figlet_1 = __importDefault(require("figlet"));
const gradient_string_1 = __importDefault(require("gradient-string"));
const version_1 = require("./version");
/**
 * 显示欢迎界面
 *
 * @function showBanner
 * @description 生成并显示带有样式的欢迎界面
 *
 */
function showBanner() {
    const asciiArt = figlet_1.default.textSync('A I C W', {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    });
    const title = gradient_string_1.default.pastel.multiline(asciiArt);
    const message = (0, boxen_1.default)(`${title}\n\n${chalk_1.default.cyan('AI Commit Wizard')} ${chalk_1.default.gray('v' + version_1.VERSION)}`, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'cyan',
        float: 'center',
    });
    console.clear();
    console.log(message);
}
exports.showBanner = showBanner;
//# sourceMappingURL=banner.js.map