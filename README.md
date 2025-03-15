<p align="center">
  <img width="400px" src="https://cdn.jsdelivr.net/gh/evanfang0054/blogImage@master/img/mmexport1741946028985.png">
</p>

# 🎯 Ai Commit Wizard

🚀 支持多种ai模型自动、手动生成 Git 提交信息生成工具，让团队提交更规范、更高效

## 📋 目录

- [Ai Commit Wizard 工具](#ai-commit-wizard-工具)
  - [📋 目录](#-目录)
  - [🌟 背景](#-背景)
  - [🛠️ 安装](#️-安装)
  - [🚀 使用说明](#-使用说明)
    - [启动提交向导](#启动提交向导)
    - [选择提交类型](#选择提交类型)
    - [输入修改范围](#输入修改范围)
    - [输入简短描述](#输入简短描述)
    - [添加文档链接](#添加文档链接)
  - [⚙️ 高级配置](#️-高级配置)
    - [OpenAI 配置](#openai-配置)
  - [📖 API 文档](#api-文档)
    - [CLI 选项](#cli-选项)
  - [📚 示例](#-示例)
  - [🤝 贡献](#-贡献)
  - [📄 许可证](#-许可证)

## 🌟 背景

在团队协作中，规范的提交信息对于代码审查、版本追踪和自动化发布至关重要。Ai Commit Wizard 基于 Angular Commit Convention 设计，集成了 AI 辅助功能，旨在：

- 📝 **规范统一**: 确保团队提交信息风格一致
- 🤖 **智能辅助**: 集成 AI 分析，自动生成规范提交信息
- ⚡ **工程效率**: 简化提交流程，提高开发效率
- 🔍 **可追溯性**: 便于代码 review 和版本追踪
```

## 🛠️ 安装

在使用 Ai Commit Wizard 之前，请确保你的计算机上已经安装了 [Node.js](http://nodejs.org) 和 [NPM](https://npmjs.com)。然后通过以下命令安装该工具：

```sh
npm install ai-commit-wizard -g
```

## 🚀 使用说明

安装完成后，你可以通过命令行启动提交向导。以下是详细的使用步骤：

### 启动提交向导

在你的项目根目录下，打开终端并输入以下命令启动提交向导：

```sh
git cw
```

### 选择提交类型

启动后，系统会提示你选择提交类型。使用键盘的方向键上下移动选择合适的类型，然后按回车键确认。常见的提交类型包括：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（不影响功能）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 增加测试
- `build`: 构建
- `chore`: 构建过程或辅助工具的变动
- `ci`: 持续集成
- `merge`: 合并分支
- `revert`: 回退
- `upd`: 更新

### 输入修改范围

接下来，系统会提示你输入修改的范围。这是一个可选项，你可以描述此次提交影响的代码模块或功能。如果不需要，可以直接按回车键跳过。

### 输入简短描述

然后，输入对本次提交的简短描述。这是一个必填项，描述应简洁明了，概括本次提交的主要内容。输入完成后按回车键确认。

### 添加文档链接

系统会询问你是否需要添加相关文档的链接。如果选择“是”，请在接下来的提示中输入有效的 URL 地址（以 `http://` 或 `https://` 开头）。如果不需要，可以选择“否”。

## ⚙️ 高级配置

### OpenAI 配置(你可以选择使用openai、deepseek、字节等系列模型)

在项目根目录或用户主目录创建 `.commit-wizard.json`:

```json
{
  "openai": {
    "apiKey": "your_api_key",
    "baseURL": "https://api.openai.com/v1",
    "model": "gpt-3.5-turbo",
    "temperature": 0.7,
    "maxTokens": 150,
    "exclude": ["node_modules", "dist", "build", ".git"]
  }
}
```

配置文件查找顺序：

1. 命令行指定的路径 (-c 选项)
2. 当前工作目录
3. 用户主目录

## 📖 API 文档

### CLI 选项

```bash
commit-wizard [options]

选项：
  -a, --ai            启用 AI 辅助生成
  -d, --debug         启用调试模式
  -c, --config <path> 指定配置文件路径
  -h, --help          显示帮助信息
  -v, --version       显示版本信息
```

## 📚 示例

以下是一个使用 Ai Commit Wizard 的示例：

1. 确保所有更改的文件已被添加到暂存区：

   ```sh
   git add .
   ```

2. 启动工具：

   ```sh
   git cw
   ```

   ```sh
   欢迎使用提交向导，请根据提示完成提交信息的填写。
    ? 请选择提交类型（使用方向键选择或输入关键字搜索）: (Use
    arrow keys or type to search)
    ❯ feat: 新功能
      fix: Bug修复
      init: 初始化
      docs: 文档变更
      style: 代码风格（不影响功能，例如空格、分号等格式修正）
      refactor: 代码重构（不包括 bug 修复或新功能）
      perf: 性能优化
      test: 增加测试
      revert: 回退
      build: 打包构建
    (Move up and down to reveal more choices)
   ```

3. 选择提交类型：`feat`
4. 输入修改范围：`user-auth`
5. 输入简短描述：`添加用户登录功能`
6. 是否添加文档链接：`是`
7. 输入文档地址：`https://example.com/docs/user-auth`
8. 是否直接推送到远程仓库：`是`

完成后，工具会自动生成提交信息并执行 `git commit` 命令，并推送到远程仓库。
