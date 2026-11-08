---
prev:
  text: '接口参考'
  link: '/docs/pogget/custom-vina/reference'
next:
  text: '内部动作'
  link: '/docs/pogget/custom-vina/actions'
---

# 宿主输入

宿主输入由 Pogget 提供，在表达式中用 `${完整路径}` 读取，例如 `${pogget.width}`。以下按用途列出当前可用输入，**均为只读事实**；不能通过在预设里写同名属性来修改真实业务状态。

表中的“数值”默认单位为 DIP，“颜色”是 COLORREF。进度按对应原生动画器提交，不应一律假定为 `0..1`；自定义视图的 `self.hoverProgress` 才明确为 `0..1`。

## 收纳盒与主题

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.width`、`pogget.height` | 数值；收纳盒当前宽高 |
| `pogget.title` | 文本；收纳盒标题 |
| `pogget.isListView` | 布尔；是否为列表视图 |
| `pogget.locked` | 布尔；布局是否锁定，不表示位置也锁定 |
| `pogget.collapsed` | 布尔；普通折叠状态；悬停折叠需结合下表状态判断 |
| `pogget.upward` | 布尔；是否向上展开 |
| `pogget.cornerRadius` | 数值；收纳盒配置的圆角 |
| `pogget.nativeCornerRadius` | 数值；原生窗口实际自定义圆角 |
| `pogget.mode` | 数值；兼容/渲染层，`0..4` 对应默认、静态、模糊、透明、扩展 |
| `pogget.frame` | 数值；透明边框模式，`0..3` 对应无、画布、原生、高光 |
| `pogget.staticMaterial` | 布尔；是否启用 D3D11 静态材质层 |
| `pogget.layoutHidden` | 布尔；当前原生布局隐藏策略的结果，用于标题与内容占位 |
| `pogget.shadowPadding` | 布尔；窗口是否启用阴影留白 |
| `pogget.theme.darknight` | 颜色；当前主题的深层背景色 |
| `pogget.theme.midnight` | 颜色；当前主题的普通表面色 |
| `pogget.theme.midnightplus` | 颜色；当前主题的次级表面色 |
| `pogget.theme.white` | 颜色；当前主题的前景色，会随主题变化，不一定是纯白 |
| `pogget.theme.darken` | 颜色；当前主题的暗部色 |
| `pogget.theme.accent` | 颜色；当前主题强调色 |
| `pogget.theme.monochrome` | 布尔；当前主题的背景红绿通道相等这一原生判定结果 |

## 标题与折叠

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.titleY`、`pogget.titleHeight` | 数值；当前标题纵坐标与高度 |
| `pogget.collapsedHeight` | 数值；原生折叠高度 |
| `pogget.titleTextWidth` | 数值；标题文字测量宽度 |
| `pogget.titleHidden` | 布尔；标题当前是否隐藏 |
| `pogget.titleExtension` | 数值；标题附加占位高度 |
| `pogget.titleVariant` | 数值；当前标题样式分支 |
| `pogget.titleProgress` | 数值；标题折叠动画进度 |
| `pogget.titleTransitioning` | 布尔；标题是否正在切换样式 |
| `pogget.titleOffsetAnim` | 数值；标题显示/隐藏的动画偏移 |
| `pogget.searching` | 布尔；标题当前搜索状态 |
| `pogget.searchExpand` | 数值；标题搜索展开动画值 |
| `pogget.titleColor` | 颜色；当前标题表面的有效颜色 |
| `pogget.titleBorderColor` | 颜色；当前标题边框色 |
| `pogget.titleCustomColor` | 布尔；标题是否使用主题色以外的来源，包括标签色和自定义色 |
| `pogget.buttonColor` | 颜色；标题按钮的有效前景色 |
| `pogget.hoverCollapsed` | 布尔；是否处于悬停展开式折叠模式 |
| `pogget.hoverExpanded` | 布尔；悬停折叠的收纳盒当前是否展开 |
| `pogget.hoverExpandingAnimation` | 布尔；是否正在进行悬停展开动画 |
| `pogget.temporaryTopmost` | 布尔；是否处于临时置顶会话 |
| `pogget.pinProgress` | 数值；固定按钮胶囊的动画进度 |
| `pogget.titleFluidX`、`pogget.titleFluidY` | 数值；标题过渡动画当前表面的起点 |
| `pogget.titleFluidWidth`、`pogget.titleFluidHeight` | 数值；标题过渡动画当前表面的宽高 |
| `pogget.titleFluidRadius` | 数值；标题过渡动画当前圆角 |
| `pogget.titleFluidShadowY` | 数值；标题过渡动画当前阴影纵偏移 |
| `pogget.titleFluidShadowAlpha` | 数值；标题过渡动画当前阴影不透明度 |
| `pogget.titleFluidBorderAlpha` | 数值；标题过渡动画当前边框不透明度 |

### 原生按钮反馈

以下四组完整路径均可读取。`hover` 是原生按钮反馈值；`pressScale`、`holdScale` 是缩放，`holdY` 是长按位移，`opacity` 是按钮不透明度。

| 输入组 | 用途 |
| --- | --- |
| `pogget.titleCollapse.hover`、`pogget.titleCollapse.pressScale`、`pogget.titleCollapse.holdScale`、`pogget.titleCollapse.holdY`、`pogget.titleCollapse.opacity` | 折叠按钮反馈 |
| `pogget.titleMore.hover`、`pogget.titleMore.pressScale`、`pogget.titleMore.holdScale`、`pogget.titleMore.holdY`、`pogget.titleMore.opacity` | 更多按钮反馈 |
| `pogget.titlePin.hover`、`pogget.titlePin.pressScale`、`pogget.titlePin.holdScale`、`pogget.titlePin.holdY`、`pogget.titlePin.opacity` | 固定按钮反馈 |
| `pogget.titleSearchOptions.hover`、`pogget.titleSearchOptions.pressScale`、`pogget.titleSearchOptions.holdScale`、`pogget.titleSearchOptions.holdY`、`pogget.titleSearchOptions.opacity` | 搜索选项按钮反馈 |

### 标题标签

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.tag.text`、`pogget.tag.oldText` | 文本；当前文字与切换前文字 |
| `pogget.tag.color` | 颜色；标签源颜色 |
| `pogget.tag.active` | 布尔；标签是否可交互 |
| `pogget.tag.emphasized` | 布尔；标签强调状态 |
| `pogget.tag.measuredWidth` | 数值；标签文字测量宽度 |
| `pogget.tag.hover`、`pogget.tag.push` | 数值；原生标签悬停、按压进度 |
| `pogget.tag.textProgress` | 数值；新旧文字切换进度 |
| `pogget.tag.direction` | 数值；文字切换动画方向 |

## 合并标签页 pogget.tab

这些输入在每个标签页的绘制阶段更新，描述**当前项**。

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.tab.index`、`pogget.tab.count` | 数值；当前成员序号与总数 |
| `pogget.tab.cursor` | 数值；布局遍历到当前成员时的横向游标 |
| `pogget.tab.totalWeight` | 数值；全部标签的累计布局权重 |
| `pogget.tab.selected` | 布尔；当前成员是否被选中 |
| `pogget.tab.drawIsland` | 布尔；当前绘制调用是否要求绘制背景岛 |
| `pogget.tab.accent`、`pogget.tab.textColor` | 颜色；当前成员强调色与文字色 |
| `pogget.tab.text` | 文本；当前标签标题 |
| `pogget.tab.displayUnits` | 数值；当前标签的 Unicode 显示单位数 |
| `pogget.tab.x`、`pogget.tab.y` | 数值；当前标签绘制位置 |
| `pogget.tab.width`、`pogget.tab.height` | 数值；当前标签绘制尺寸 |
| `pogget.tab.hover`、`pogget.tab.selection` | 数值；悬停与选中动画进度 |
| `pogget.tab.pressed`、`pogget.tab.dragging` | 布尔；是否按下、是否拖动 |

## 搜索输入框 pogget.editor

这里是标题/内联搜索的单行输入框，Markdown 多行编辑器见后文。

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.editor.x`、`pogget.editor.y` | 数值；输入框实际位置 |
| `pogget.editor.width`、`pogget.editor.height` | 数值；输入框实际尺寸 |
| `pogget.editor.text` | 文本；原生控件提供的显示文字 |
| `pogget.editor.placeholder` | 文本；占位文字 |
| `pogget.editor.focused` | 布尔；是否获得焦点 |
| `pogget.editor.selection` | 布尔；是否有选区 |
| `pogget.editor.cursor` | 数值；控件提供的光标绘制位置 |
| `pogget.editor.textWidth` | 数值；已测量文字宽度 |
| `pogget.editor.selectionStart`、`pogget.editor.selectionEnd` | 数值；选区绘制起止位置 |
| `pogget.editor.scroll` | 数值；水平滚动偏移 |
| `pogget.editor.caretAlpha` | 数值；光标闪烁不透明度 |

## 文件项目 pogget.fileIcon

这些输入在文件图标、文字、预览或拖动虚影的相应阶段逐项更新。普通无 slot 组件不会自动为所有文件重复绘制；应配合[文件项目绘制阶段](./slots#文件项目)使用。

### 几何与状态

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.fileIcon.x`、`pogget.fileIcon.y` | 数值；原生文件项目位置 |
| `pogget.fileIcon.drawX`、`pogget.fileIcon.drawY` | 数值；当前绘制位置 |
| `pogget.fileIcon.size`、`pogget.fileIcon.height` | 数值；图标尺寸与项目高度 |
| `pogget.fileIcon.viewportWidth` | 数值；当前文件视口宽度 |
| `pogget.fileIcon.padding`、`pogget.fileIcon.spacing` | 数值；项目内边距与排列间距 |
| `pogget.fileIcon.customWidth` | 数值；自定义宽度，负值表示未指定 |
| `pogget.fileIcon.textSize` | 数值；当前文件名字号 |
| `pogget.fileIcon.wrapOverflow` | 数值；提前测量得到的文字换行溢出量 |
| `pogget.fileIcon.clipLeft`、`pogget.fileIcon.clipTop`、`pogget.fileIcon.clipRight`、`pogget.fileIcon.clipBottom` | 数值；原生交互单元裁切边界 |
| `pogget.fileIcon.list` | 布尔；当前项目按列表绘制 |
| `pogget.fileIcon.textPreview` | 布尔；当前使用文本预览 |
| `pogget.fileIcon.wrap` | 布尔；项目换行状态 |
| `pogget.fileIcon.clip` | 布尔；是否需要单元裁切 |
| `pogget.fileIcon.selected`、`pogget.fileIcon.hovered` | 布尔；是否选中、是否悬停 |
| `pogget.fileIcon.dimmed` | 布尔；当前项目是否应淡化 |
| `pogget.fileIcon.hover` | 数值；原生悬停动画进度 |
| `pogget.fileIcon.alpha`、`pogget.fileIcon.globalAlpha` | 数值；项目不透明度与全局不透明度输入 |
| `pogget.fileIcon.previewMode` | 数值；原生预览分类，供标准预设选择对应布局 |
| `pogget.fileIcon.ghost` | 布尔；当前调用是否绘制拖动虚影 |
| `pogget.fileIcon.network` | 布尔；是否为网络文本等网络项目 |

### 图像与拖入资源

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.fileIcon.path` | 文本；当前文件路径，可交给 Shell 图标绘制 |
| `pogget.fileIcon.folder0`、`pogget.fileIcon.folder1`、`pogget.fileIcon.folder2`、`pogget.fileIcon.folder3` | 文本；原生筛选后的前四个目录条目路径，用于文件夹预览 |
| `pogget.fileIcon.folder` | 布尔；是否为文件夹 |
| `pogget.fileIcon.thumbnail` | 布尔；是否有媒体缩略图 |
| `pogget.fileIcon.thumbnailVisible` | 布尔；缩略图当前是否可见 |
| `pogget.fileIcon.media` | 数值；原生媒体分类，用于区分图片、视频、音频等布局 |
| `pogget.fileIcon.dragX`、`pogget.fileIcon.dragY` | 数值；拖动偏移 |
| `pogget.fileIcon.draggedCount` | 数值；外部拖入项目数量 |

### 文件名、搜索与预览

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.fileIcon.title` | 文本；当前文件标题 |
| `pogget.fileIcon.detail` | 文本；原生已格式化的大小/日期等详情 |
| `pogget.fileIcon.drawTitle` | 文本；经过原生省略或布局测量后的绘制标题 |
| `pogget.fileIcon.font` | 文本；文件名字体族 |
| `pogget.fileIcon.detailType` | 数值；详情类别，`0` 大小、`1` 无、`2` 日期 |
| `pogget.fileIcon.colorMode` | 数值；文件名颜色策略，`0` 主题、`1` 白、`2` 黑 |
| `pogget.fileIcon.renderMode` | 数值；文件名阴影策略，`0..3` 对应无、厚、轻、主题 |
| `pogget.fileIcon.omitOffset` | 数值；原生文件名省略预算偏移 |
| `pogget.fileIcon.inlineView` | 布尔；是否在内联视图 |
| `pogget.fileIcon.gridWrap` | 布尔；网格文件名换行偏好 |
| `pogget.fileIcon.detailMeasuredWidth` | 数值；详情文字测量宽度 |
| `pogget.fileIcon.gridMeasuredHeight` | 数值；网格文字测量高度 |
| `pogget.fileIcon.searchActive` | 布尔；当前是否有搜索查询 |
| `pogget.fileIcon.searchExpanded` | 布尔；搜索展开状态 |
| `pogget.fileIcon.searchLayout` | 布尔；原生命中文本布局是否可用 |
| `pogget.fileIcon.searchMaxHeight` | 数值；搜索标题测量的高度预算 |
| `pogget.fileIcon.hitX`、`pogget.fileIcon.hitY`、`pogget.fileIcon.hitWidth`、`pogget.fileIcon.hitHeight` | 数值；本次查询命中片段的真实字形矩形，用于高亮绘制 |
| `pogget.fileIcon.markdown` | 布尔；当前预览是否为 Markdown |
| `pogget.fileIcon.previewText` | 文本；宿主提供的文本预览摘要 |
| `pogget.fileIcon.previewTitle` | 文本；预览卡片标题 |
| `pogget.fileIcon.previewTitleMeasuredHeight` | 数值；预览标题实际测量高度 |

### 整体运动

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.fileIcon.inputX`、`pogget.fileIcon.inputY` | 数值；传入运动公式的原始位置 |
| `pogget.fileIcon.push` | 数值；按压进度 |
| `pogget.fileIcon.deform` | 数值；排序形变进度 |
| `pogget.fileIcon.deformAxis` | 数值；排序形变轴 |
| `pogget.fileIcon.cursorX` | 数值；列表摆动使用的鼠标横坐标 |
| `pogget.fileIcon.pressX` | 数值；按压横坐标 |

## 内联导航与搜索

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.inlineNavigation` | 布尔；是否显示内联导航 |
| `pogget.inlineEditing` | 布尔；是否处于内联编辑模式 |
| `pogget.inlineNavigationOffset` | 数值；内联工具栏显隐的当前偏移 |
| `pogget.inlineAlpha` | 数值；内联界面不透明度 |
| `pogget.inlineColor` | 颜色；内联界面有效颜色 |
| `pogget.inlineAvailable` | 布尔；内联目标是否可用 |
| `pogget.inlinePendingExit` | 布尔；是否等待退出内联视图 |
| `pogget.inlineSearch` | 布尔；当前是否使用内联搜索界面 |
| `pogget.inlineNavigationBack.hover` | 数值；内联后退按钮悬停进度 |
| `pogget.inlineNavigationHome.hover` | 数值；内联主页按钮悬停进度 |
| `pogget.inlineNavigationSave.hover` | 数值；内联保存按钮悬停进度 |
| `pogget.inlineNavigationOpen.hover` | 数值；内联外部打开按钮悬停进度 |
| `pogget.inlineNavigationSearch.hover` | 数值；内联搜索按钮悬停进度 |
| `pogget.inlineSearchBack.hover` | 数值；内联搜索返回按钮悬停进度 |
| `pogget.inlineSearchCancel.hover` | 数值；内联搜索取消按钮悬停进度 |

## 内联内容 pogget.inlineContent

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.inlineContent.width`、`pogget.inlineContent.height` | 数值；内联内容的宿主尺寸 |
| `pogget.inlineContent.startX`、`pogget.inlineContent.startY` | 数值；展开动画起始位置 |
| `pogget.inlineContent.startWidth`、`pogget.inlineContent.startHeight` | 数值；展开动画起始尺寸 |
| `pogget.inlineContent.progress` | 数值；进入/退出动画进度 |
| `pogget.inlineContent.switchProgress` | 数值；层级切换动画进度 |
| `pogget.inlineContent.titleOffset` | 数值；标题占位偏移 |
| `pogget.inlineContent.color` | 颜色；内容遮罩有效颜色 |
| `pogget.inlineContent.compatible` | 数值；内联内容使用的兼容/渲染层 |
| `pogget.inlineContent.visible` | 布尔；内容是否可见 |
| `pogget.inlineContent.exiting`、`pogget.inlineContent.switching` | 布尔；是否退出、是否切换层级 |
| `pogget.inlineContent.exitSnapshot`、`pogget.inlineContent.switchSnapshot` | 布尔；退出/切换快照是否可用 |
| `pogget.inlineContent.search` | 布尔；内联搜索状态 |
| `pogget.inlineContent.searchChrome` | 布尔；是否使用内联搜索配套布局 |
| `pogget.inlineContent.searchExtraY` | 数值；搜索布局对结果区增加的纵向占位 |
| `pogget.inlineContent.scrollDepth` | 数值；当前滚动深度 |
| `pogget.inlineContent.upward` | 布尔；当前内联布局是否向上展开 |

## Markdown 编辑器 pogget.markdownEditor

这些输入在布局与相应绘制请求时更新。正文通过命名内容资源绘制；这些接口不开放脚本或 Markdown 语义内部样式。

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.markdownEditor.width`、`pogget.markdownEditor.height` | 数值；控件尺寸 |
| `pogget.markdownEditor.x`、`pogget.markdownEditor.y` | 数值；绘制请求的位置 |
| `pogget.markdownEditor.zoom` | 数值；原生用户缩放输入，适合定义自定义视口倍率 |
| `pogget.markdownEditor.layoutZoom` | 数值；布局使用的缩放值 |
| `pogget.markdownEditor.layoutScale` | 数值；布局采用的实际倍率 |
| `pogget.markdownEditor.scale` | 数值；本次内容绘制的实际倍率 |
| `pogget.markdownEditor.drawX`、`pogget.markdownEditor.drawY` | 数值；内容实际绘制原点 |
| `pogget.markdownEditor.masterAlpha` | 数值；本次绘制的整体不透明度 |
| `pogget.markdownEditor.textWidth`、`pogget.markdownEditor.textHeight` | 数值；正文真实测量尺寸 |
| `pogget.markdownEditor.nativeMargin`、`pogget.markdownEditor.nativeTextSize` | 数值；原生默认边距与字号 |
| `pogget.markdownEditor.wrap` | 布尔；是否换行 |
| `pogget.markdownEditor.nativeRadius`、`pogget.markdownEditor.nativeBorder` | 数值；原生圆角与边框宽度 |
| `pogget.markdownEditor.nativeBgAlpha`、`pogget.markdownEditor.nativeBorderAlpha` | 数值；原生背景、边框不透明度 |
| `pogget.markdownEditor.background`、`pogget.markdownEditor.textColor`、`pogget.markdownEditor.borderColor` | 颜色；当前有效背景、文字、边框色 |
| `pogget.markdownEditor.scrollX`、`pogget.markdownEditor.scrollY` | 数值；横纵滚动偏移 |
| `pogget.markdownEditor.caretX`、`pogget.markdownEditor.caretY`、`pogget.markdownEditor.caretHeight` | 数值；真实光标位置与高度 |
| `pogget.markdownEditor.caretOpacity` | 数值；光标不透明度 |
| `pogget.markdownEditor.selectionX`、`pogget.markdownEditor.selectionY`、`pogget.markdownEditor.selectionWidth`、`pogget.markdownEditor.selectionHeight` | 数值；本次选区片段矩形，来自真实字形测量 |
| `pogget.markdownEditor.placeholder` | 文本；占位文字 |
| `pogget.markdownEditor.hintOpacity` | 数值；缩放提示不透明度 |
| `pogget.markdownEditor.staticText` | 布尔；是否以静态文本模式显示 |
| `pogget.markdownEditor.editing` | 布尔；是否正在编辑 |
| `pogget.markdownEditor.selected` | 布尔；是否有选区 |
| `pogget.markdownEditor.hasLayout` | 布尔；正文布局是否可用 |
| `pogget.markdownEditor.verticalHover`、`pogget.markdownEditor.horizontalHover` | 布尔；竖向/横向滚动条是否悬停 |
| `pogget.markdownEditor.verticalDrag`、`pogget.markdownEditor.horizontalDrag` | 布尔；竖向/横向滚动条是否拖动 |
| `pogget.markdownEditor.zoomEnabled` | 布尔；是否启用缩放 |

自定义视口请以 `zoom` 为独立输入。`scale`、`drawX`、`drawY`、`layoutScale` 是已经计算后的输出事实，不能反向用来定义自身视口，否则会形成布局反馈。

## 分页指示器 pogget.pageIndicator

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.pageIndicator.width`、`pogget.pageIndicator.height` | 数值；分页指示器宿主尺寸 |
| `pogget.pageIndicator.count` | 数值；真实页数 |
| `pogget.pageIndicator.position` | 数值；当前页的动画位置 |
| `pogget.pageIndicator.visible` | 布尔；是否需要显示 |
| `pogget.pageIndicator.vertical` | 布尔；是否纵向排列 |
| `pogget.pageIndicator.index` | 数值；当前重复点序号，Surface 和 Active 阶段为 `0` |

## 整盒收尾 pogget.containerFrame

这里的像素宽高和 `scale` 是显式例外：需要通过 `widthPixels / scale`、`heightPixels / scale` 换算为 DIP。

| 输入 | 类型与用途 |
| --- | --- |
| `pogget.containerFrame.widthPixels`、`pogget.containerFrame.heightPixels` | 数值；客户区实际像素宽高 |
| `pogget.containerFrame.scale` | 数值；像素到 DIP 的缩放因子 |
| `pogget.containerFrame.mode`、`pogget.containerFrame.frame` | 数值；本次收尾的渲染层和边框模式 |
| `pogget.containerFrame.nativeRadius` | 数值；原生窗口圆角 |
| `pogget.containerFrame.background` | 颜色；窗口有效背景色 |
| `pogget.containerFrame.borderColor` | 颜色；窗口有效边框色 |
| `pogget.containerFrame.borderOpacity` | 数值；边框不透明度 |
| `pogget.containerFrame.customBorder` | 布尔；是否启用自定义边框色 |
| `pogget.containerFrame.pointerX`、`pogget.containerFrame.pointerY` | 数值；原生追踪的指针位置，用于光效 |
| `pogget.containerFrame.spotlight` | 数值；原生聚光反馈值 |
| `pogget.containerFrame.tag` | 布尔；是否有标签着色上下文 |
| `pogget.containerFrame.tagColor` | 颜色；标签着色颜色 |
| `pogget.containerFrame.upward` | 布尔；向上展开方向 |

以上输入与 `PersonalizationInputs.hpp` 的完整类型表，以及运行时各上下文提交点核对（2026-11-08）。重复项、搜索布局、缩略图和快照只在对应调用中有效，不是可任意查询所有文件或保留资源的接口。
