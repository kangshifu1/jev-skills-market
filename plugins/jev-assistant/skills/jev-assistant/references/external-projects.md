# 使用每日发现的外部项目

每日发现目录记录独立项目的地址和 Jev 接入证据，不捆绑第三方运行时代码。
新增项目位于市场的 `main`；固定版本安装不会自动获得后续目录更新。

在市场 main 检出目录中查看条目：

```sh
npm run jev -- list
npm run jev -- show jev-ultrafast
npm run jev -- show jev-voice-browser
npm run jev -- show quantdinger
```

已安装 main 版本助手 Skill 时，也可在其目录执行 `node scripts/run.mjs show <id>`。
查询不会安装项目、发送模型请求或执行推荐。

## 三种类型

| kind | 含义 | show 中的 install |
| --- | --- | --- |
| `skill` | 已确认名称和路径的独立 SKILL.md | 固定到提交的 Skills CLI 命令；不代表已安装或实测 |
| `tool` | 应用、SDK、MCP 服务或依赖专属运行时的插件包 | `null`，阅读 `usageUrl` 的上游说明 |
| `catalog` | 多项目、多 Skill 或开发示例集合 | `null`，逐个检查其中的组件 |

例如 `jev` 条目对应 `dbreunig/building-with-jev-skill` 的 `skills/jev/SKILL.md`，
其 frontmatter 名称已核对。`jev-cu` 虽然也含 Skill，但需要仓库根目录脚本，
因此按工具登记；`hermes-jev-skills` 需要 Hermes 的插件与运行时。

## 从来源检查到实际使用

1. 通过 `repository`、`revision` 和 `evidence` 确认用途与本次检查的源码版本。
2. 阅读 `usageUrl` 中该版本的依赖、数据发送范围、凭据配置与安装步骤。
   不把本市场使用的 Node.js 版本当成所有上游项目的要求。
3. 检查 `license` 和 `licenseStatus`。GitHub API 的缺失值或 `NOASSERTION`
   不等于授予开源许可；这里只登记地址和原创介绍。
4. 需要使用时，在明确的任务范围内单独安装和验证；使用合成输入记录实际结果。

所有本轮条目都标为 `source-reviewed-not-run`、`routable: false`：
已核实 README 或代码中的接入证据，未运行上游测试。浏览器、语音和 SDK 的
兼容性还需各自验证；上游演示、速度、准确率和盈利声明不作为市场实测结果。

金融条目只是项目发现，不将账户或订单接入本市场。`jev-trader` 的默认模型是
mock，Jev 模式需另行配置；`quackd` 的上游明确标注 Jev 路径尚未完成真实 API
或硬件验证。上下文工具可能向提供商提交会话或命令输出，应先阅读对应数据范围。

`evaluation` 类条目收录的是仓库内真实 Jev 的比较入口；本地替代模型本身不被
标记为 Jev。模型路由只使用原有、单独评估过的候选，新发现项目可通过 list/show 查询。
