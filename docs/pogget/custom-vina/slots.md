---
prev:
  text: '内部动作'
  link: '/docs/pogget/custom-vina/actions'
next:
  text: '内置文案'
  link: '/docs/pogget/custom-vina/labels'
---

# 绘制阶段与高级布局

`type` 选择图元，`slot` 选择宿主何时绘制该视图。修改原有标题、文件项目或编辑器时，先找到标准预设的对应组件，保留必要的阶段和元数据，再覆盖目标属性。

一个 slot 不是一套固定外观。它的子节点仍使用[通用图元和属性](./reference)，布局与颜色可以自行声明。以下列出当前标准场景的全部 **45 个 slot**。

## 标题与窗口

| `slot` | 用途 |
| --- | --- |
| `containerFrame` | 整盒收尾阶段，绘制最终边框、玻璃/光效和标签着色；客户区像素尺寸通过 `scale` 换算 |
| `titleSurface` | 标题表面、背景、边框、阴影、分隔线 |
| `titleCollapse` | 折叠按钮的绘制、几何与动作 |
| `titleMore` | 更多菜单按钮 |
| `titlePin` | 悬停展开后的固定按钮 |
| `titlePinBackground` | 固定按钮胶囊的背景 |
| `titlePinHotzone` | 固定按钮胶囊的悬停区域，使用通用 `hoverRegion` |
| `titleTag` | 标题标签表面与文字 |
| `titleTab` | 合并收纳盒的每个标签页，逐项提交 `pogget.tab.*` |
| `titleSearchSurface` | 标题搜索框的外部表面 |
| `titleSearchInput` | 搜索输入框皮肤，`editor` 元数据同步文字测量与输入命中 |
| `titleSearchOptions` | 搜索选项按钮 |
| `inlineSearchSurface` | 内联搜索界面与返回/取消的表面、占位布局 |
| `inlineSearchBack` | 内联搜索返回按钮 |
| `inlineSearchCancel` | 内联搜索取消按钮 |

## 文件项目

| `slot` | 用途 |
| --- | --- |
| `fileIconSurface` | 每个文件项目的背景、选中与悬停表面 |
| `fileIconContent` | Shell 图标、文件夹条目预览、媒体缩略图与拖入提示 |
| `fileIconText` | 文件名布局策略的根阶段，提供 `textLayout` 和 `gridLayout` |
| `fileIconTitle` | 列表等普通标题阶段 |
| `fileIconDetail` | 列表大小、日期等详情文字阶段 |
| `fileGridTitle` | 普通网格和媒体文件名 |
| `fileSearchHighlight` | 每个搜索命中片段的高亮背景 |
| `fileSearchTitle` | 使用原生命中文本布局绘制搜索文件名 |
| `filePreview` | 文本/Markdown 预览卡片、正文、页脚与标题 |
| `fileIconMotion` | 整个图标/拖动虚影的运动与动画策略，不是可见的背景层 |
| `fileGhostSurface` | 列表拖动虚影的额外底板，也接入声明式虚影绘制 |

例如只修改标准文件项目表面的某个子节点，仍需在 `FileIconSurface.view` 的既有路径下覆盖。新增无 slot 的组件不会自动按文件数量重复；不要在普通组件里读取最后一次提交的 `fileIcon.*` 来模拟重复列表。

## 内联内容与工具栏

| `slot` | 用途 |
| --- | --- |
| `inlineContentSurface` | 内联文件夹/编辑器遮罩、背景与布局元数据 |
| `inlineContentSnapshot` | 退出/切换快照的裁切、缩放、不透明度与模糊 |
| `inlineNavigationSurface` | 内联导航和编辑工具栏的整体表面与显隐策略 |
| `inlineNavigationBack` | 后退按钮 |
| `inlineNavigationHome` | 退出内联文件夹、回主页的按钮 |
| `inlineNavigationSave` | 内联编辑保存按钮 |
| `inlineNavigationOpen` | 用外部程序打开当前编辑文件的按钮 |
| `inlineNavigationSearch` | 内联搜索开关按钮 |

## Markdown 编辑器与分页

| `slot` | 用途 |
| --- | --- |
| `markdownEditorSurface` | 多行编辑器背景与边框 |
| `markdownEditorPlaceholder` | 占位文字 |
| `markdownEditorSelection` | 根据真实字形矩形绘制选区片段 |
| `markdownEditorContent` | 同步正文内容资源 |
| `markdownEditorCaret` | 光标 |
| `markdownEditorScrollbars` | 双轴滚动条 |
| `markdownEditorZoomHint` | 缩放提示 |
| `markdownEditorViewport` | 可选共享视口，统一选区、正文和光标的裁剪、原点与缩放 |
| `pageIndicatorSurface` | 分页指示器根阶段与重复点数策略 |
| `pageIndicatorDot` | 每个普通分页点 |
| `pageIndicatorActive` | 活动分页标记 |

### 完整接管与回退

| 功能 | 接管要求与边界 |
| --- | --- |
| 内联导航 | `inlineNavigationSurface` 加 Back、Home、Save、Open、Search 五个按钮 slot 全部存在；不完整时使用整套原生工具栏 |
| 内联内容 | `inlineContentSurface` 与 `inlineContentSnapshot` 配合，旧/不完整声明保留原生背景和快照路径 |
| Markdown 皮肤 | Surface、Placeholder、Selection、Content、Caret、Scrollbars、ZoomHint 七阶段完整；缺少时保留整套原生皮肤 |
| Markdown 共享视口 | 可选 `markdownEditorViewport` 组中必须有唯一的同名 `content` 资源；使用原生 `zoom` 作为独立输入 |
| 分页指示器 | Surface、Dot、Active 三阶段与 `repeat.count` 完整；不完整时使用原生指示器 |
| 文件文字与预览 | 对应根 slot 和测量策略共同决定接入；缺少时保留对应原生阶段 |
| 整盒收尾 | 缺少 `containerFrame` 时保留原生绘制；已声明但隐藏时主动隐藏该阶段；非法帧会请求原生回退 |

原生仍负责文件资源、拖放排序、编辑、IME、撤销、动画触发和生命周期。Markdown 语义内的表格、代码、图片等样式仍由原生处理。

## 动画与布局元数据

以下块是宿主读取的布局/动画策略，不会生成额外绘制或点击节点。**同名字段在不同块下含义不同，必须放在表中指定的路径。** 依赖模式可只覆盖需要修改的项；从零声明时，应参照标准预设保留完整策略。

### 标题组件的 motion

位置是组件下的 `motion`，例如 `TitleSurface.motion`，不在 `view` 中。

| 字段 | 用途与范围 |
| --- | --- |
| `enabled` | 是否使用声明式折叠进度目标 |
| `targetProgress` | 折叠进度目标，由宿主限制到 `0..1` |
| `duration` | 折叠时长，`0..10` 秒，默认 `0.4` |
| `transitionDuration`、`searchDuration` | 标题样式切换、搜索展开时长，`0..10` 秒，默认均为 `0.4` |
| `searchFrom`、`searchTo` | 搜索展开起止值，±256，默认 `-4`、`0` |
| `targetX`、`targetY` | 目标位置，±32768 |
| `targetWidth`、`targetHeight`、`targetRadius` | 目标宽、高、圆角，`0..32768` |
| `targetShadowY` | 目标阴影纵偏移，±256 |
| `targetShadowAlpha`、`targetBorderAlpha` | 目标阴影、边框不透明度，`0..1` |

### titleTab 的 view.motion

| 字段 | 用途与范围 |
| --- | --- |
| `x`、`y`、`width`、`height` | 当前标签目标矩形；坐标 ±32768，尺寸 `0..32768` |
| `islandX`、`islandY`、`islandWidth`、`islandHeight` | 标签背景岛矩形，范围同上 |
| `islandRadius` | 背景岛圆角，`0..32768` |
| `nextX` | 下一个成员的横向布局游标，±32768 |
| `stripX`、`stripWidth` | 标签条起点和宽度，分别为 ±32768、`0..32768` |
| `weight` | 当前成员布局权重，`0..32768`；宿主累计权重供分配宽度 |
| `contentReserve`、`titleExtension` | 内容区、标题的附加占位，`0..32768` |
| `minimumHeight`、`collapsedGap` | 显示门槛高度与折叠间距，`0..32768` |
| `hoverDuration`、`unhoverDuration` | 悬停进入/离开时长，`0..10` 秒 |
| `selectionDuration`、`deselectionDuration` | 选中/取消选中时长，`0..10` 秒 |
| `layoutDuration` | 布局过渡时长，`0..10` 秒 |

### titleSearchInput 的 editor

| 字段 | 用途与范围 |
| --- | --- |
| `padding` | 文字测量与命中的内边距，`0..32768` |
| `textSize` | 测量字号，`1..256` |
| `font` | 非空字体族，最多 256 个字符 |
| `caretDuration` | 光标动画周期参数，`0.001..10` 秒 |

文字的绘制字号和布局测量应保持一致，避免点击位置、选区和 IME 坐标错位。

### inlineSearchSurface 的 motion

| 字段 | 用途与范围 |
| --- | --- |
| `backSurfaceX`、`cancelSurfaceX`、`surfaceY` | 返回、取消按钮表面的横坐标和共同纵坐标，±32768 |
| `surfaceWidth` | 按钮表面宽度，`0..32768` |
| `backButtonX`、`cancelButtonX`、`buttonY` | 返回、取消按钮坐标，±32768 |
| `searchX`、`searchY`、`searchWidth` | 搜索框位置与宽度，坐标 ±32768、宽度 `0..32768` |
| `resultsExtraY` | 结果区增加的纵向占位，`0..32768` |
| `usesSecondRow` | 布尔；窄窗口是否使用第二行布局 |

这 12 个字段需要完整提供。

### fileIconText 的 textLayout 与 gridLayout

| 块与字段 | 用途与范围 |
| --- | --- |
| `textLayout.titleWidth` | 列表标题测量宽度，`0..32768` |
| `textLayout.titleSize`、`textLayout.detailSize` | 标题、详情测量字号，`1..256` |
| `textLayout.font` | 标题/详情字体族，非空且最多 256 字符 |
| `textLayout.omitOffset` | 省略预算偏移，±32768 |
| `textLayout.omitScale` | 省略预算比例，`0.001..256` |
| `textLayout.measureDetail` | 布尔；是否测量详情宽度 |
| `gridLayout.width`、`gridLayout.textSize` | 网格标题测量宽度与字号，分别 `0..32768`、`1..256` |
| `gridLayout.font` | 网格标题字体族 |
| `gridLayout.centered`、`gridLayout.wrap` | 布尔；是否居中、是否换行 |
| `gridLayout.interactionWidth`、`gridLayout.interactionTextSize` | 提前测量悬停溢出的宽度与字号，范围同网格标题 |
| `gridLayout.searchHeight` | 搜索标题测量高度预算，`0..32768` |

### filePreview 的 previewLayout

| 字段 | 用途与范围 |
| --- | --- |
| `excerptUnits` | 摘要的 Unicode 显示单位预算，整数 `1..32768`，必需 |
| `titleWidth` | 预览标题测量宽度，`0..32768` |
| `titleSize` | 标题测量字号，`0.001..256` |
| `titleFont` | 标题字体族 |
| `titleWrap` | 布尔；标题是否换行 |

### fileIconMotion 的 motion 与 animation

| 块与字段 | 用途与范围 |
| --- | --- |
| `motion.x`、`motion.y` | 整体位置，±32768 |
| `motion.scaleX`、`motion.scaleY` | 整体横纵缩放，`0.001..8` |
| `motion.pivotX`、`motion.pivotY` | 缩放中心，±32768 |
| `motion.active` | 布尔；是否应用整体运动；上述七项需完整提供 |
| `animation.hoverDuration`、`animation.unhoverDuration` | 原生悬停进出时长，`0..10` 秒 |
| `animation.pressDuration`、`animation.releaseDuration` | 按压/释放时长，`0..10` 秒 |
| `animation.rightPressDuration`、`animation.rightReleaseDuration` | 右键按压/回弹时长，`0..10` 秒 |
| `animation.rightPush` | 右键按压目标进度，`0..1` |

### inlineNavigationSurface 的 motion

| 字段 | 用途与范围 |
| --- | --- |
| `hideOffset`、`showOffset` | 隐藏、显示目标偏移，±32768 |
| `duration` | 显隐时长，`0..10` 秒 |
| `scrollDelta` | 触发显隐的滚动变化阈值，`0..32768` |
| `pointerArea` | 指针触发显示的区域阈值，`0..32768` |
| `topThreshold` | 顶部显示阈值，`0..32768` |

这六项需要完整提供。

### inlineContentSurface 的 hostLayout

| 字段 | 用途与范围 |
| --- | --- |
| `editorX`、`editorY` | 原生编辑器输入矩形的位置，±32768 |
| `editorWidth`、`editorHeight` | 编辑器输入矩形尺寸，`0..32768` |
| `iconsX` | 图标管理器横坐标，±32768，向零截断为整数 |
| `iconsY` | 包含滚动的图标管理器纵坐标，±1073741823，向零截断为整数 |
| `layoutWidth` | 原生排列测量宽度，`0..32768`，按整数使用 |
| `viewportWidth`、`viewportHeight` | 资源加载与绘制视口尺寸，`0..32768` |
| `iconsAlpha` | 图标不透明度，`0..1` |
| `viewTop`、`viewBottom` | 可见范围上下边界，±32768 |
| `cullMargin`、`expansionMargin` | 剔除余量、展开余量，`0..32768` |

这 14 项作为完整布局提供。它们同时影响输入矩形、测量和资源加载，不只是绘图位置。

### inlineContentSurface 的 animation

| 字段 | 用途与范围 |
| --- | --- |
| `enterDuration`、`exitDuration`、`switchDuration` | 进入、退出、层级切换时长，`0..10` 秒 |
| `enterX1`、`enterY1`、`enterX2`、`enterY2` | 进入动画三次贝塞尔控制点，均为 `0..1` |
| `exitX1`、`exitY1`、`exitX2`、`exitY2` | 退出动画控制点，均为 `0..1` |
| `switchX1`、`switchY1`、`switchX2`、`switchY2` | 层级切换动画控制点，均为 `0..1` |

这 15 项作为完整策略提供。原生负责触发、取消和快照生命周期。

### inlineContentSurface 的 editor

这是 Markdown 多行编辑器的几何策略，与搜索框的 `editor` 不同。全部字段及非空 `font` 需要完整提供。

| 字段 | 用途与范围 |
| --- | --- |
| `padding`、`margin` | 编辑器内边距、测量边距，`0..2048` |
| `contentWidth`、`contentHeight` | 内容可用宽高，`1..32768` |
| `baseHeight` | 不扣除横向滚动条时的基础高度，`1..32768` |
| `layoutWidth` | 排版测量宽度，`1..65536` |
| `font`、`textSize` | 测量字体族和字号，字号 `1..256`，字体最多 256 字符 |
| `verticalTrack`、`verticalThumb` | 纵向滚动条轨道、滑块长度，`0..32768`，滑块不大于轨道 |
| `horizontalTrack`、`horizontalThumb` | 横向滚动条轨道、滑块长度，范围同上 |
| `verticalHitLeft`、`verticalHitTop`、`verticalHitRight`、`verticalHitBottom` | 纵向滚动条命中边界，±32768 |
| `horizontalHitLeft`、`horizontalHitTop`、`horizontalHitRight`、`horizontalHitBottom` | 横向滚动条命中边界，±32768 |
| `caretDuration`、`zoomHintDuration` | 光标动画、缩放提示时长，`0.001..10` 秒 |
| `scrollDuration`、`zoomDuration` | 滚动、缩放时长，`0..10` 秒 |

### pageIndicatorSurface 的 repeat

| 字段 | 用途与范围 |
| --- | --- |
| `count` | `repeat { count: ... }` 声明实际绘制的普通点数量，整数 `0..256`；可与真实页数不同 |

宿主只按此数量提交 `pageIndicatorDot`，将序号放入 `pogget.pageIndicator.index`，最后绘制 Active。点数上限、间距、边缘缩小和活动标记几何均由预设计算。

## 命名资源

资源仅在对应同步绘制中可用，缺少时不画。资源名不是文件路径，也不是允许调用的函数名。

| 资源名 | 配套类型与用途 |
| --- | --- |
| `thumbnail` | `image` + `imageRenderer: "resource"`；当前文件缩略图/媒体封面 |
| `fileTitle` | `text` + `textRenderer: "resource"`；搜索命中的原生文件名布局 |
| `markdown` | `content`；当前文件的 Markdown 预览正文 |
| `inlineExit`、`inlineSwitch` | `image` + `imageRenderer: "resource"`；内联退出、层级切换快照 |
| `markdownEditor` | `content`；当前多行编辑器正文 |
| `markdownEditorViewport` | `content`；调度编辑器共享视口内的选区、正文和光标；同名 slot 内只能声明一个 |

## Header 兼容布局

`pogget.native.Header` 只调整已有标题控件的位置，保留原生点击、长按和菜单。一个预设最多声明一个 Header。

```text
Preset { dependsOn: "Pogget_Std" }

HeaderLayout {
  vars {
    tagWidth: ${pogget.titleTextWidth} + 58,
    tagLeft: (${pogget.width} - ${vars.tagWidth}) / 2
  },
  view {
    type: "pogget.native.Header",
    tagX: ${vars.tagLeft}, tagY: 6,
    tagWidth: ${vars.tagWidth}, tagHeight: 28,
    moreX: ${vars.tagLeft} + ${vars.tagWidth} - 22,
    moreY: 18
  }
}
```

| 字段 | 用途 |
| --- | --- |
| `tagAlign` | `"left"` 或 `"center"`；标题标签的兼容对齐方式 |
| `tagX`、`tagY` | 标签横纵位置，±32768 |
| `tagWidth`、`tagHeight` | 标签尺寸，`0..32768` |
| `moreX`、`moreY` | 更多按钮位置，±32768 |
| `collapseX`、`collapseY` | 折叠按钮位置，±32768 |

### 旧布局映射字段

标准视图节点上的下列元数据把 Header 的字段映射到普通视图。通常保留标准声明，只覆盖 Header；新布局可以直接修改普通节点。

| 字段 | 用途 |
| --- | --- |
| `legacyX`、`legacyY`、`legacyWidth`、`legacyHeight` | 指定 Header 中用于覆盖节点相应几何的字段名 |
| `legacyOriginX`、`legacyOriginY`、`legacyOriginWidth`、`legacyOriginHeight` | 对兼容覆盖值增加的原点/尺寸补偿 |
| `legacyExtraWidth` | 宽度覆盖的额外补偿 |
| `legacyAlignX` | 指定 Header 横向对齐字段；值为 `center` 时参与居中计算 |
| `legacyCenterWidth` | 未从 Header 指定宽度时的居中宽度 |

映射先整体校验再发布，移除 Header 覆盖会恢复普通视图声明。本页根据当前 `VinaView.hpp`、`VinaMarkdownGeometry.hpp`、运行时接入点和 `Pogget_Std.vina` 核对（2026-11-08）。
