---
prev:
  text: '预设文件与继承'
  link: '/docs/pogget/custom-vina/presets'
next:
  text: '文件图标提示气泡'
  link: '/docs/pogget/custom-vina/tooltips'
---

# Pogget_Std 个性化字段表

本页逐项对应 `Pogget_Std.vina` 的个性化控件。表中的完整路径可用作 `Preset.parentValues` 的键；表达式读取时在后面加 `.value`，例如 `${Background.ui.CornerRadius.value}`。界面按“背景、标签、图标、行为”四组排列。

`number` 是有限数值，`boolean` 必须写 `true` 或 `false`，`text` 是带引号的字符串。`choice` 是下拉选项，`slider` 是滑条，`switch` 是开关，`font` 是字体选择器，`color` 使用 `0..16777215` 的整数 COLORREF（可写 `rgb(r, g, b)`）。布尔选项请填写真实布尔值；菜单顺序与存储值不一定相同。

`rgb(...)` 可用于普通 `ui.default` 或 `view` 表达式；`parentValues` 只接受字面量，颜色请换算成整数 `r + 256 * g + 65536 * b` 后填写，例如纯红色是 `255`。

滑条的取值范围、步长如下；不透明度用 `0..1` 表示，`0` 完全透明、`1` 完全不透明。两端可直接取到最小值和最大值，即使步长不能整除范围。表中默认值是未保存过参数时的默认；已有配置会覆盖普通 `ui.default`。[父预设参数](./presets#为父预设指定参数)会建立当前子预设独立的参数值。

## 背景

| 完整字段路径 / 界面项目 | 类型 / 控件 | 默认值 | 值、范围与选项 | 原生配置绑定 |
| --- | --- | --- | --- | --- |
| `Background.ui.RenderStyle`<br>渲染样式 | `number` / `choice` | `0` | `0`：默认；`1`：静态材质层（兼容）；`2`：模糊 (D3D11)；`3`：透明 (D3D11)；`4`：扩展（D3D11） | `CompatibleLayer` |
| `Background.ui.BackgroundColor`<br>背景颜色 | `number` / `color` | `0` | 整数 `0..16777215`，COLORREF；`rgb(r, g, b)` | `BackgroundColor` |
| `Background.ui.BackgroundOpacity`<br>背景不透明度 | `number` / `slider` | `1` | `0..1`，步长 `0.01` | `bgAlpha` |
| `Background.ui.DwmCorner`<br>圆角合成 | `number` / `choice` | `0` | `0`：小圆角（默认）；`1`：正常圆角 | `DwmCornerPreference` |
| `Background.ui.CornerRadius`<br>窗口圆角大小:  | `number` / `slider` | `16` | `0..20`，步长 `1` | `cornerRad` |
| `Background.ui.StaticLayer`<br>启用静态材质层 | `boolean` / `switch` | `false` | `false`：关闭；`true`：开启 | `EnableStaticMaterialLayerForD3D11` |
| `Background.ui.ShadowBlur`<br>阴影模糊度:  | `number` / `slider` | `16` | `0..32`，步长 `1` | `shadowBlur` |
| `Background.ui.ShadowOpacity`<br>阴影不透明度:  | `number` / `slider` | `0.2` | `0..1`，步长 `0.01` | `shadowAlpha` |
| `Background.ui.ShadowX`<br>阴影偏移 X:  | `number` / `slider` | `0` | `-32..32`，步长 `1` | `shadowOffsetX` |
| `Background.ui.ShadowY`<br>阴影偏移 Y:  | `number` / `slider` | `4` | `-32..32`，步长 `1` | `shadowOffsetY` |
| `Background.ui.WindowBorder`<br>窗口边框 | `number` / `choice` | `0` | `0`：无边框（默认）；`1`：画布；`2`：原生边框；`3`：高光；扩展层 `4` 的菜单不提供原生边框 `2` | `TransparentFrameMode` |
| `Background.ui.BorderColor`<br>边框颜色 | `number` / `color` | `0` | 整数 `0..16777215`，COLORREF；`rgb(r, g, b)` | `BorderColor` |
| `Background.ui.BorderOpacity`<br>边框不透明度 | `number` / `slider` | `1` | `0..1`，步长 `0.01` | `BorderOpacity` |

## 标签与标题

| 完整字段路径 / 界面项目 | 类型 / 控件 | 默认值 | 值、范围与选项 | 原生配置绑定 |
| --- | --- | --- | --- | --- |
| `Tag.ui.TitleStyle`<br>标签样式 | `number` / `choice` | `0` | `0`：VinaUI（默认）；`1`：悬浮；`2`：胶囊 | `TitleType` |
| `Tag.ui.TitleColor`<br>标题栏颜色 | `number` / `color` | `0` | 整数 `0..16777215`，COLORREF；`rgb(r, g, b)` | `TitleBarColor` |
| `Tag.ui.TitleOpacity`<br>标题栏不透明度 | `number` / `slider` | `1` | `0..1`，步长 `0.01` | `titleAlpha` |
| `Tag.ui.TitleBlur`<br>模糊半径 | `number` / `slider` | `-1` | `0..32`，步长 `1`；默认 `-1` 为自动：默认/静态层取 `14`，模糊/透明/扩展层取 `5` | `TitleBlurRadius` |
| `Tag.ui.TagOpacity`<br>标签不透明度 | `number` / `slider` | `1` | `0..1`，步长 `0.01` | `tagAlpha` |
| `Tag.ui.TagTextOpacity`<br>标签文本不透明度 | `number` / `slider` | `1` | `0..1`，步长 `0.01` | `tagTextAlpha` |
| `Tag.ui.TagStyle`<br>颜色标签样式 | `number` / `choice` | `0` | `0`：贴纸（默认）；`1`：描边；`2`：荧光笔；`3`：无装饰；`4`：文本 | `TagStyle` |
| `Tag.ui.TagFont`<br>标签字体 | `text` / `font` | `"Segoe UI"` | 字体族名称，例如 `"Segoe UI"`、`"微软雅黑"` | `tagFontFamily` |

## 图标

| 完整字段路径 / 界面项目 | 类型 / 控件 | 默认值 | 值、范围与选项 | 原生配置绑定 |
| --- | --- | --- | --- | --- |
| `VinaIcon.ui.FolderView`<br>文件夹视图 | `boolean` / `choice` | `false` | `false`：显示文件夹预览（默认）；`true`：显示系统图标 | `ShowDefaultFolderIcon` |
| `VinaIcon.ui.TextPreview`<br>文本预览视图 | `boolean` / `choice` | `true` | `true`：显示文本预览（默认）；`false`：显示系统图标 | `ShowTextPreview` |
| `VinaIcon.ui.MediaPreview`<br>媒体预览视图 | `boolean` / `choice` | `true` | `true`：显示媒体预览（默认）；`false`：显示系统图标 | `ShowMediaPreview` |
| `VinaIcon.ui.FileName`<br>文件名称 | `number` / `choice` | `0` | `0`：显示文件扩展名（默认）；`1`：隐藏文件扩展名；`2`：不显示文件名 | `HideFileExtension` |
| `VinaIcon.ui.FileNameColor`<br>文件名颜色 | `number` / `choice` | `0` | `0`：主题（默认）；`1`：白色；`2`：黑色 | `FileNameColorMode` |
| `VinaIcon.ui.TextShadow`<br>文本阴影 | `number` / `choice` | `0` | `0`：无阴影（默认）；`1`：厚阴影；`2`：浅阴影；`3`：主题色阴影 | `TextRenderMode` |
| `VinaIcon.ui.ListDetails`<br>列表详细信息 | `number` / `choice` | `0` | `0`：文件大小（默认）；`1`：无；`2`：修改日期 | `ListDetailType` |
| `VinaIcon.ui.Font`<br>字体选择 | `text` / `font` | `"Segoe UI"` | 字体族名称，例如 `"Segoe UI"`、`"微软雅黑"` | `fontFamily` |
| `VinaIcon.ui.TextSize`<br>文本大小: 100% (默认) | `number` / `slider` | `10` | `6..18`，步长 `0.5`；`10` 对应界面 `100%`，`6..18` 对应 `60%..180%` | `textSize` |
| `VinaIcon.ui.TextOmit`<br>文字省略: 当前基准 | `number` / `slider` | `0` | `-6..6`，步长 `1`；相对当前省略基准的显示单位偏移，`0` 使用基准 | `TextOmitOffset` |
| `VinaIcon.ui.TextOverflow`<br>允许文本换行溢出 | `boolean` / `switch` | `false` | `false`：关闭；`true`：开启 | `AllowTextWrapOverflow` |
| `VinaIcon.ui.FadeTransition`<br>渐隐效果 | `boolean` / `choice` | `false` | `false`：关闭（默认）；`true`：开启 | `FadeOutSwitch` |
| `VinaIcon.ui.IconBackground`<br>图标背景 | `boolean` / `switch` | `false` | `false`：关闭；`true`：开启 | 预设独立参数 |
| `VinaIcon.ui.IconBackgroundColor`<br>图标背景颜色 | `number` / `color` | 当前主题表面色 | 整数 `0..16777215`，COLORREF；`rgb(r, g, b)` | 预设独立参数 |
| `VinaIcon.ui.IconBackgroundOpacity`<br>图标背景不透明度 | `number` / `slider` | `0.16` | `0..1`，步长 `0.01` | 预设独立参数 |
| `VinaIcon.ui.IconBackgroundHoverOpacity`<br>图标悬停不透明度 | `number` / `slider` | `0.24` | `0..1`，步长 `0.01` | 预设独立参数 |
| `VinaIcon.ui.IconBackgroundRadius`<br>图标背景圆角 | `number` / `slider` | `8` | `0..128`，步长 `1` | 预设独立参数 |
| `VinaIcon.ui.IconBackgroundExpand`<br>图标背景扩展 | `number` / `slider` | `4` | `0..64`，步长 `1`；隐藏的旧兼容值，作为未单独设置 X/Y 时的初始值 | 预设独立参数 |
| `VinaIcon.ui.IconBackgroundExpandX`<br>图标背景 X 扩展 | `number` / `slider` | 继承兼容扩展值（初始 `4`） | `0..64`，步长 `1`；每侧扩展量，整个宽/高增加两倍该值 | 预设独立参数 |
| `VinaIcon.ui.IconBackgroundExpandY`<br>图标背景 Y 扩展 | `number` / `slider` | 继承兼容扩展值（初始 `4`） | `0..64`，步长 `1`；每侧扩展量，整个宽/高增加两倍该值 | 预设独立参数 |
| `VinaIcon.ui.IconBackgroundOffsetY`<br>图标背景 Y 偏移 | `number` / `slider` | `0` | `-64..64`，步长 `1`；正值向下、负值向上，背景与边框一起移动 | 预设独立参数 |
| `VinaIcon.ui.IconBorder`<br>图标边框 | `boolean` / `switch` | `false` | `false`：关闭；`true`：开启 | 预设独立参数 |
| `VinaIcon.ui.IconBorderColor`<br>图标边框颜色 | `number` / `color` | 当前主题前景色 | 整数 `0..16777215`，COLORREF；`rgb(r, g, b)` | 预设独立参数 |
| `VinaIcon.ui.IconBorderWidth`<br>图标边框宽度 | `number` / `slider` | `0` | `0..8`，步长 `1`；`0` 不绘制独立边框 | 预设独立参数 |
| `VinaIcon.ui.IconBorderOpacity`<br>图标边框不透明度 | `number` / `slider` | `0.18` | `0..1`，步长 `0.01` | 预设独立参数 |

## 行为

| 完整字段路径 / 界面项目 | 类型 / 控件 | 默认值 | 值、范围与选项 | 原生配置绑定 |
| --- | --- | --- | --- | --- |
| `Behavior.ui.AutoHideTitle`<br>自动隐藏标题栏 | `number` / `choice` | `0` | `0`：自动常驻（默认）；`1`：隐藏并调整排版；`2`：仅隐藏；`3`：始终常驻 | `AutoHideTitleBar` |
| `Behavior.ui.QuickCollapse`<br>快捷展开折叠 | `number` / `choice` | `1` | `0`：无；`1`：双击（默认）；`2`：单击 | `QuickExpandCollapse` |
| `Behavior.ui.CollapseDirection`<br>折叠方向 | `number` / `choice` | `0` | `0`：自动（默认）；`1`：始终向上；`2`：始终向下 | `CollapseDirection` |
| `Behavior.ui.AutoHide`<br>自动隐藏 | `number` / `choice` | `0` | `0`：关闭（默认）；`1`：自动淡化；`2`：自动折叠 | `AutoFade` |
| `Behavior.ui.InlineViewer`<br>内联视图 | `number` / `choice` | `0` | `0`：关闭；`1`：启用 | `FolderOpenMode` |
| `Behavior.ui.SwipeSearch`<br>上滑搜索 | `boolean` / `choice` | `true` | `false`：关闭；`true`：启用（默认） | `SwipeUpSearchEnabled` |

## 显示条件和颜色来源

| 控件 | 何时显示 |
| --- | --- |
| 背景不透明度 | 渲染层 `mode > 0` |
| 系统圆角 | `mode <= 2` |
| 窗口圆角 | 扩展层 `mode == 4`，或透明层 `mode == 3` 且非原生边框 |
| 静态材质层、窗口边框 | `mode >= 3` |
| 阴影模糊、不透明度、X/Y 偏移 | 扩展层 `mode == 4` |
| 边框颜色、不透明度 | `mode >= 3` 且边框选画布 `1` 或高光 `3` |
| 标题模糊 | `mode <= 2` 或启用静态材质层 |
| 图标背景颜色、普通/悬停不透明度、圆角 | 开启图标背景 |
| 图标背景 X/Y 扩展、Y 偏移 | 开启图标背景或图标边框 |
| 图标边框颜色、宽度、不透明度 | 开启图标边框 |
| 旧 `IconBackgroundExpand` | 始终隐藏，供兼容读取 |

颜色来源与颜色值是两项设置。普通背景/边框颜色编辑器的来源为主题 `0`、自定义 `1`；标题颜色为主题 `0`、标签色 `1`、自定义 `2`。这些来源不是额外的 `Pogget_Std.ui` 字段，不能作为 `parentValues` 的目标。用 `parentValues` 指定这三种颜色时，当前子预设默认选中“自定义”；后续在该子预设中切换来源仍可独立保存，不会改写父预设的来源选择。图标背景/边框颜色直接使用 COLORREF，没有来源选择页签。

## 原生字段与自定义控件的关系

`bind` 是原生配置的存储键，不是 `${}` 的引用路径。例如背景不透明度的存储键是 `bgAlpha`，对应的视图字段是 `Background.view.backgroundAlpha`，表达式应读取 `${Background.ui.BackgroundOpacity.value}`。不要把三者混写。

`Background.view`、`Tag.view`、`VinaIcon.view`、`Behavior.view` 将这些 UI 值接入原生配置；修改 `ui` 默认值可以保留控件联动，直接覆盖 `view` 属性则由该表达式接管渲染结果。`IconBackground*`、`IconBorder*` 没有原生 `bind`，各收纳盒按所选预设单独保存。

## Panel 与场景布局字段

`Panel` 是设置窗口的布局参数，不是新增个性化选项。尺寸、间距、字号、透明度等完整名称见[面板布局表](./reference#设置面板-panel)。`ContainerFrame`、`TitleSurface`、`TitleButtons`、`TitleTag`、`TitleTabs`、`TitleSearch`、`FileIconSurface` 等组件的 `vars` 和 `view` 则描述具体绘制几何与效果；通用字段见[接口参考](./reference)，各绘制阶段和高级布局的专用字段见[绘制阶段与高级布局](./slots)。它们不是可放入 `parentValues` 的控件字段。

本页按当前 `Pogget_Std.vina` 与个性化面板核对（2026-11-17）。
