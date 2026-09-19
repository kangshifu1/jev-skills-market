# Jev Skills Market

**一个面向自动化、软件测试、金融研究和语音助手的 Jev 技能市场。**

以 TypeSafe 的 Skill 形式组织可安装能力，提供助手入口、技能目录和可测试的辅助工具。
首个登记的技能是独立项目 [Jev Computer Use](https://github.com/kangshifu1/jev-computer-use)。
社区项目，与 TypeSafe、OpenAI 无隶属关系。

> v0.1.1 是仓库形式的技能市场与助手开发预览，不是已上线的商店网站或完整聊天客户端。

## 安装后的使用实测与截图

已在隔离目录从 GitHub 安装 **v0.1.1 的五个 Skill**。真实 Jev 路由 **5/5 通过**，覆盖浏览器、
自动化测试、金融研究、语音架构和普通聊天；另有 **6/6 本地使用检查通过**，包括目录、
外部技能查询、预览、诊断、金融计算和语音打断逻辑。

下图是**根据实际测试 JSON 生成的证据报告截图**，不是已上线的市场应用界面。
所有任务、金融数据均为合成数据，不包含账户、密钥或用户文件路径。

![安装后技能使用与真实 Jev 路由的脱敏证据报告](docs/screenshots/usage-evidence.png)

[测试矩阵与未覆盖范围](docs/TESTING.md) · [原始脱敏记录](docs/usage-verification-2026-09-19.json) · [报告渲染脚本](scripts/render-evidence.mjs)

## 两个仓库，各自独立

| 仓库 | 负责什么 |
| --- | --- |
| [jev-computer-use](https://github.com/kangshifu1/jev-computer-use) | 浏览器引擎、Chrome／Chromium 适配器、Computer Use Skill、独立版本 |
| **jev-skills-market** | 技能登记与发现、助手调度、测试／金融／语音工作流 |

市场只登记 Computer Use 的地址和发布版本，不包含其运行时代码。Computer Use 可以独立安装，
也可被其他助手调用；这里的技能不会依赖另一个仓库的本地相对路径。

## 安装

```sh
# 安装本仓库中的五个 Skill；可在安装器里选择
npx skills add https://github.com/kangshifu1/jev-skills-market/tree/v0.1.1 -g -a codex

# 单独安装首个外部技能
npx skills add https://github.com/kangshifu1/jev-computer-use/tree/v0.1.1 --skill jev-computer-use -g -a codex
```

如果只需要助手入口，可加 `--skill jev-assistant`。其他工作流技能按需安装。
使用支持插件市场的 Codex CLI 时，也可选择原生插件形式，二者选一种以免重复：

```sh
codex plugin marketplace add kangshifu1/jev-skills-market
codex plugin add jev-assistant@jev-skills-market
```

原生插件包含本仓库的五个 Skill；外部 Computer Use 仍需独立安装。
安装不会自动建立浏览器连接、配置 API 凭据或连接语音服务。

## 技能目录

| 技能 | 作用 | 交付状态 |
| --- | --- | --- |
| **jev-computer-use** | Jev 决策与浏览器操作，独立仓库 | 外部开发预览 |
| **jev-assistant** | 组合工作流，发现适合的技能 | 指引＋可执行路由 CLI |
| **jev-automation-test** | 回归／冒烟／接口测试，证据与断言 | 工作流 Skill |
| **jev-finance-research** | 可追溯研究、历史与模拟绩效分析 | 工作流＋本地收益／回撤计算 |
| **jev-voice-assistant** | 语音聊天和工具执行的分层设计 | 架构＋可取消会话状态机 |
| **typesafe-ai** | TypeSafe 官方开发指引，保留来源与许可 | 原文导入 |

机器可读目录：[catalog.json](plugins/jev-assistant/skills/jev-assistant/references/catalog.json)。
目录状态不是安装状态，也不是实测能力承诺。

## 运行助手工具

```sh
git clone https://github.com/kangshifu1/jev-skills-market.git
cd jev-skills-market
git checkout v0.1.1
npm ci
npm run jev -- list
npm run jev -- show jev-computer-use
npm run jev -- route "帮我测试浏览器里的报表筛选功能"
npm run demo
```

默认路由只展示将提交给 Jev 的请求，不消耗 API、不伪造推荐结果。
在本地环境安全配置 `TYPESAFE_API_KEY` 后，添加 `--live` 可实际调用 TypeSafe。
路由返回推荐、无匹配或需复核，**不会自动执行推荐技能**。阈值是待评估的启发式参数。

## 语音聊天如何接入

```mermaid
flowchart LR
    Voice[语音 / 文字] --> STT[转写 / 对话模型]
    STT --> Jev[Jev 选择有界动作]
    Jev --> Host[宿主授权与会话检查]
    Host --> Browser[独立 Computer Use]
    Browser --> Evidence[核验结果]
    Evidence --> Reply[对话回复 / TTS]
```

Jev 负责选择动作；对话模型负责连续聊天；STT/TTS 负责音频。
已提供打断、过期结果丢弃、一次性执行和具体动作确认的状态机。实际麦克风、对话模型、
STT/TTS 接口和聊天 UI 尚待接入。见 [语音架构](plugins/jev-assistant/skills/jev-voice-assistant/references/architecture.md)。

金融方向首版聚焦数据与研究，不提供实盘下单。指标工具假定净值已扣除成本且没有外部现金流，
不是完整回测引擎；示例数据为合成数据。

## 贡献与验证

```sh
npm test
npm run validate
# 可选：设置 TYPESAFE_API_KEY 后进行真实 API 测试
npm run test:live
```

注册新技能的流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。独立技能应保留自己的仓库、许可证与
发布版本，市场登记其可核查的能力和依赖。来源校验见 [upstream.lock.json](upstream.lock.json)。
设计记录见 [设计文档](docs/plans/2026-09-19-design.md)，发布说明见 [CHANGELOG.md](CHANGELOG.md)。

真实 Jev 路由冒烟测试 3/3 通过，包含普通聊天不加载技能的案例。见 [脱敏记录](docs/live-smoke-2026-09-19.json)。这些合成样例不是通用准确率基准。
