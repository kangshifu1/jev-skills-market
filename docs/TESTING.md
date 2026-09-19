# 已测范围与证据

## v0.1.2：QuantSkills 目录接入

- 八项本地测试、目录与 Skill 校验通过。
- 从当前工作树通过 `skills add` 安装助手后，七项目录 listing、QuantSkills 查询、`install: null` 及路由预览均验证通过。
- 真实 Jev 路由 6/6 通过：浏览器、软件测试、QuantSkills 中英文发现、已有净值指标、普通聊天无匹配。
- 首次运行曾因金融条目描述未明确覆盖指标计算而出现一次无匹配；补充真实已实现的能力描述后重跑全部用例，未降低置信度门槛。
- [本次记录](quantskills-routing-2026-09-19.json)仅证明这些样例可路由，不证明上游 214 项资产可执行、已安装或原生支持 Jev。

## v0.1.1：历史安装实测与截图

被测对象为通过 `skills add` 从 GitHub v0.1.1 安装的五个 Skill。
所有用例都是合成任务，金融序列也为虚构数据。

| 项目 | 结果 | 能说明什么 |
| --- | --- | --- |
| 安装五个 Skill | 通过 | 公开仓库可发现并安装 |
| 目录 listing／外部 skill 查询／请求预览／诊断 | 四项通过 | 安装后的助手工具可运行 |
| 真实 Jev 路由 | 5/5 通过 | 这五个任务能路由到预期技能或无匹配 |
| 本地收益／回撤计算 | 通过：10% 收益、25% 最大回撤 | 该合成序列的确定性计算正确，不是投资收益 |
| 语音会话打断 | 通过 | 取消信号及过期结果处理正确，不是音频对话测试 |
| 既有单元／合约测试 | 七项通过 | 已覆盖的输入、错误、状态与计算规则有效 |
| 自动化测试 Skill 的真实项目交付 | 尚未完成代表性业务验收 | 测试指引存在，不等于所有测试场景已验证 |
| 金融研究／完整回测／实盘 | 尚未完成研究质量评测；没有实盘适配器 | 不能视为完整金融助手已验证 |
| 麦克风／STT／对话模型／TTS | 尚未接通 | 仅架构和会话逻辑可测试 |
| 原生 Codex 插件安装／浏览器连接 | 未实测，只有清单与结构校验 | 不能用 Skill 安装成功替代运行时连接成功 |

## 报告截图

[usage-evidence.png](screenshots/usage-evidence.png) 由[脱敏 JSON](usage-verification-2026-09-19.json)
渲染为报告后截图。它是实际测试结果的展示，**不是市场应用界面或上线截图**。
置信度直接来自模型返回，但不是工作流成功率；报告上的 PASS 是预期路由与实际路由对比结果。

真实 Computer Use 的截图和浏览器结果在它的[独立仓库](https://github.com/kangshifu1/jev-computer-use/blob/main/docs/TESTING.md)维护。

## 复现

```sh
npm ci
# 在本地安全配置 TYPESAFE_API_KEY；此命令会真实调用 API
node scripts/verify-installed-usage.mjs
# 仅渲染已记录的结果，不调用模型；首次需安装 Chromium
npx playwright install chromium
node scripts/render-evidence.mjs
```

通过 `JEV_SKILLS_DIR` 指定通过安装器安装的 skills 目录。不设置时测试当前工作树，
结果中的 `installedViaSkillsCli` 为 false。开发依赖 Playwright 仅用于报告截图，
不是助手路由的运行时依赖。真实 API 测试不加入默认 CI。
