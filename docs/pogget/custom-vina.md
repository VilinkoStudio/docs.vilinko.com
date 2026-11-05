---
prev:
  text: 'Pogget'
  link: '/docs/pogget/index'
next:
  text: '组件编组'
  link: '/docs/pogget/group'
---

<script setup>
import CustomVinaPreview from '../../.vitepress/theme/components/CustomVinaPreview.vue'
</script>

# CustomVina：编写 Pogget 个性化预设

CustomVina 让你用 `.vina` 文件自定义 Pogget 收纳盒的外观和交互。你可以从颜色、圆角和标题开始，也可以继续调整文件图标、按钮和布局。

下面从创建第一个预设开始，逐步介绍常用写法。示例旁的效果示意可以直接查看，部分示例还可以调整参数或体验交互。

<CustomVinaPreview />

## 先做出第一个预设

### 1. 从设置面板创建

1. 打开一个收纳盒的菜单，选择 **个性化**。
2. 展开 **高级**。面板标题会显示“自定义 · 编写样式”。
3. 选择 **新建预设**，填写预设名称。
4. 选择创建方式：
   - **复制自**：复制一份完整的当前样式，之后基础预设的修改不会影响它。
   - **依赖自**：只保存对某个独立预设的修改，适合做小幅改色或加一个按钮。
5. 对下面的第一个例子，选择 **依赖自**，基础预设选 `Pogget_Std`，创建一个名为 `MyFirstStyle` 的预设。
6. 在高级编辑器中点 **外部打开**，用文本编辑器修改；回到 Pogget 后点 **重新加载**，确认效果，再点 **应用并保存**。

面板中的 **属性作用域** 还分为 **独立属性** 和 **全局属性**。独立属性只写当前收纳盒；全局属性写入全局个性化配置，修改完成后点 **同步更改**，让使用全局作用域的收纳盒重新加载。第一次写样式时先使用独立属性，确认外观后再同步到全局。

预设文件位于数据目录的 `Presets\Personalization` 下：

- 普通安装通常是 `%LOCALAPPDATA%\Vilinko\Pogget\Presets\Personalization`；
- 便携模式是 `Pogget.exe` 同目录的 `.pogget_config\Presets\Personalization`。

也可以在 **管理预设** 中直接打开这个文件夹。文件名就是预设名加上 `.vina`，例如 `MyFirstStyle.vina`。

### 2. 先从一个安全的小改动开始

复制下面的代码到新预设中。它保留基础预设的全部内容，只在标题区域增加一个小标签。这个例子使用依赖模式，所以保留第一行 `Preset` 声明：

<CustomVinaPreview variant="badge" />

```text
Preset { dependsOn: "Pogget_Std" }

FirstBadge {
  view {
    type: "group",
    interaction: "title",
    z: 10,
    x: ${pogget.width} - 185,
    y: 8,
    width: 110,
    height: 28,
    Badge {
      type: "rect",
      width: 110,
      height: 28,
      radius: 14,
      background: rgb(28, 116, 154),
      fillOpacity: 0.92,
      border: 1,
      borderColor: ${pogget.theme.white},
      borderOpacity: 0.22
    },
    Text {
      type: "text",
      x: 10,
      y: 5,
      width: 90,
      height: 18,
      textY: 0,
      label: "CustomVina",
      textLiteral: true,
      textSize: 12,
      color: ${pogget.theme.white},
      font: "Segoe UI",
      align: "center"
    }
  }
}
```

`interaction: "title"` 让这个元素跟随标题的隐藏、折叠和向上展开状态；`z: 10` 把它放到标题控件上方。保存后如果语法有问题，Pogget 会显示行号和列号，原来的最后一个有效预设会继续工作。

## 复制和继承（依赖）有什么不同

| 操作 | 文件里保存什么 | 基础预设变化后 | 适合什么情况 |
| --- | --- | --- | --- |
| 复制自 | 完整、独立的有效样式 | 不跟随 | 想把当前外观冻结下来，再长期独立修改 |
| 依赖自 | `Preset { dependsOn: "基础名" }` 加属性覆盖和新组件 | 会跟随基础预设 | 只想改几项，或者给标准样式加装饰 |

依赖预设只支持一个独立基础预设。不能依赖另一个已经依赖别人的预设，也不能用差异文件删除基础组件。匹配到同名组件后，同路径的属性会覆盖；新组件和新子节点会按声明顺序追加。

独立复制的文件不需要 `Preset` 块；它必须包含自己要使用的完整组件。把带 `Preset` 的差异代码保存成独立副本会被当作依赖预设处理。

例如：

```text
Preset { dependsOn: "Pogget_Std" }

// 只覆盖 Panel 的一个属性
Panel { width: 480 }

// 新组件会追加到合成后的视图树
CornerMark {
  view { type: "rect", x: 8, y: 8, width: 6, height: 6, radius: 3, background: rgb(255, 170, 0) }
}
```

依赖模式下，编辑器显示和保存的是差异文件；Pogget 在加载、保存和热更新时合成完整场景。外部编辑基础文件时，依赖预设也会重新计算。若你需要完全不受基础预设更新影响，请使用 **复制自**。

## Vina 文件的基本写法

### 块、属性和逗号

最外层是一个或多个组件块。块里可以放属性，也可以放子块。属性使用 `名称: 值`，同级成员之间用逗号分隔，最后一个成员后可以保留逗号。

下面的卡片通过 `vars` 集中设置间距和圆角，再在 `view` 中引用：

<CustomVinaPreview variant="card" />

```text
Card {
  vars {
    padding: 16,
    radius: 12
  },
  view {
    type: "rect",
    x: ${vars.padding},
    y: ${vars.padding},
    width: ${pogget.width} - ${vars.padding} * 2,
    height: 48,
    radius: ${vars.radius},
    background: rgb(32, 40, 55)
  }
}
```

块名和属性名建议使用英文、数字、下划线和点，并且同一层不能重名。字符串建议使用双引号。可以使用 `//` 或 `/* ... */` 注释。文件请保存为 UTF-8。

### 引用和表达式

引用写成 `${...}`。常用的宿主输入包括：

| 引用 | 含义 |
| --- | --- |
| `${pogget.width}` / `${pogget.height}` | 收纳盒当前尺寸，单位是 DIP |
| `${pogget.title}` | 标题文字 |
| `${pogget.isListView}` | 是否为列表视图 |
| `${pogget.collapsed}` / `${pogget.upward}` | 是否折叠、是否向上展开 |
| `${pogget.locked}` | 是否锁定布局 |
| `${pogget.mode}` / `${pogget.frame}` | 当前渲染层和透明边框模式 |
| `${pogget.theme.white}` / `${pogget.theme.midnight}` / `${pogget.theme.accent}` | 当前主题颜色 |

在组件内部可以使用 `${self.width}`、`${parent.width}`、`${ui.field.value}` 和 `${vars.name}`。表达式支持：

```text
+ - * / % ^
== != < <= > >= && || ! ?:
min max clamp abs floor ceil round sqrt hypot trunc f32 pow
rgb fade red green blue average
```

时间属性可以写 `160ms`，它等于 0.16 秒。表达式没有循环、脚本或任意函数调用；动作也只能调用 Pogget 已注册的白名单。

颜色使用 Windows `COLORREF` 整数。最容易读的写法是 `rgb(红, 绿, 蓝)`，例如 `rgb(30, 144, 255)`；`fade(color, amount)` 可按亮度方向调整颜色。

## 可以使用哪些样式

### 通用视图图元

| `type` | 用途 | 常用属性 |
| --- | --- | --- |
| `group` | 只负责组织子节点 | `x`、`y`、`width`、`height`、`clip`、`z` |
| `rect` / `rectangle` / `button` / `container` | 圆角矩形、边框和阴影 | `background`、`radius`、`border`、`shadowOpacity` |
| `solid` | 实色矩形 | `background`、`fillOpacity` |
| `texture` | 带纹理的表面 | `texture`、`background`、`radius` |
| `glass` | 玻璃高光材质 | `glassRenderer`、`glassOpacity`、`glassBorder` |
| `text` | 普通文字 | `label`、`font`、`textSize`、`color`、`align` |
| `icon` | 用字体绘制图标 | `icon`、`font`、`textSize`、`color` |
| `image` | WIC、Shell 或资源图片 | `source`、`imageRenderer`、`imageFit` |
| `content` | 宿主提供的同步内容资源 | `source`、`contentScale` |

`rect` 和 `glass` 默认会参与绘制；`group` 本身不画背景。要让子节点不越出圆角区域，可以在父组上设置 `clip: true` 和 `clipRadius`。

### Pogget 已接入的场景范围

标准预设已经把收纳盒拆成多个可替换阶段。常用范围如下：

| 范围 | slot 或组件 | 典型用途 |
| --- | --- | --- |
| 整体背景 | `containerFrame` | 背景、透明层、玻璃和最终边框 |
| 标题区 | `titleSurface`、`titleCollapse`、`titleMore`、`titlePin`、`titleTag` | 标题表面、折叠/菜单/固定按钮、颜色标签 |
| 标签页和搜索 | `titleTab`、`titleSearchSurface`、`titleSearchInput` | 标签页分配、搜索框皮肤和布局 |
| 文件项目 | `fileIconSurface`、`fileIconContent`、`fileIconText`、`filePreview`、`fileIconMotion` | 图标表面、缩略图、文件名、预览和动画 |
| 内联内容 | `inlineContentSurface`、`inlineContentSnapshot`、`inlineNavigationSurface` | 文件夹/编辑器内联视图及工具栏 |
| 编辑器与分页 | `markdownEditorSurface`、`markdownEditorContent`、`markdownEditorCaret`、`pageIndicatorSurface` 等 | Markdown 编辑器皮肤、滚动条、分页点 |

缺少 slot 的旧预设会保留对应的原生绘制。需要完整接管的阶段必须声明完整的 slot 组合；例如内联导航需要 surface 加上返回、主页、保存、打开、搜索五个按钮 slot，声明不完整时会回退整套原生工具栏。这样可以先从一个普通 `view` 组件开始，不必一次重写整个收纳盒。

### 让标题和右侧菜单作为一个标签居中

如果只需要调整标签和菜单的位置，可以使用一个 `pogget.native.Header` 兼容组件。它改变的是布局，不会替换原生点击、长按和菜单行为；同一预设只能声明一个 Header。

下面为标准的“色块＋标题”标签预留右侧菜单的位置，再把整个标签居中。菜单仍然紧跟在标题右侧，折叠按钮保留在收纳盒右上角：

<CustomVinaPreview variant="header" />

```text
HeaderLayout {
  vars {
    tagWidth: ${pogget.titleTextWidth} + 58,
    tagLeft: (${pogget.width} - ${vars.tagWidth}) / 2
  },
  view {
    type: "pogget.native.Header",
    tagX: ${vars.tagLeft},
    tagY: 6,
    tagWidth: ${vars.tagWidth},
    tagHeight: 28,
    moreX: ${vars.tagLeft} + ${vars.tagWidth} - 22,
    moreY: 18
  }
}
```

## 用 `ui` 添加可调参数

在 `ui` 中声明的字段会显示在预设的高级面板里。没有 `bind` 的字段只保存到当前预设，不会修改 Pogget 的原生设置；字段值通过 `${ui.字段名.value}` 参与表达式。

下面为强调色和圆角各添加一个控件，再用 `vars` 集中引用。试着调整预览下方的参数，观察标题表面的变化：

<CustomVinaPreview variant="tokens" />

```text
ThemeTokens {
  ui {
    Accent {
      label: "强调色",
      type: "number",
      control: "color",
      min: 0,
      max: 16777215,
      step: 1,
      default: rgb(42, 169, 190)
    },
    Radius {
      label: "圆角",
      type: "number",
      control: "slider",
      min: 0,
      max: 32,
      step: 1,
      default: 12
    }
  },
  vars {
    accent: ${ui.Accent.value},
    surface: fade(${ui.Accent.value}, -35),
    radius: ${ui.Radius.value}
  }
}

TitleSurface {
  vars { style: 1 },
  view {
    Surface {
      radius: ${ThemeTokens.vars.radius},
      background: ${ThemeTokens.vars.surface},
      fillOpacity: 0.88,
      border: 1,
      borderColor: ${ThemeTokens.vars.accent},
      borderOpacity: 0.45
    },
    Highlight { visible: false }
  }
}
```

这里的 `ThemeTokens` 会在高级面板里显示两个控件；改动控件时，依赖它们的视图会重新计算。颜色使用 `rgb(42, 169, 190)`，圆角直接填写 `12` 这样的数值。

## 从零写一个可交互的按钮

### 1. 用 `ui` 声明可调整的位置

`ui` 支持 `slider`、`number`、`switch`、`choice`/`select`、`text`、`color`、`button` 和 `font`。数字控件至少要有 `default`、`min`、`max`、`step`。

### 2. 用 `view` 显示按钮

<CustomVinaPreview variant="button" />

```text
ViewToggle {
  ui {
    Left {
      label: "按钮 X 坐标",
      type: "number",
      control: "slider",
      min: 0,
      max: 300,
      step: 1,
      default: 280
    }
  },
  view {
    type: "button",
    interaction: "title",
    x: ${ui.Left.value},
    y: 8,
    width: 28,
    height: 28,
    z: 10,
    radius: 6,
    background: ${pogget.theme.midnight},
    color: ${pogget.theme.white},
    font: "Font Awesome 6 Free Solid",
    icon: ${pogget.isListView} ? "\uf03a" : "\uf00a",
    action: pogget.action.view.toggle,
    transition: 160ms,
    hover { opacity: 0.75 }
  }
}
```

`hover` 里的属性是悬停目标，Pogget 会在 `transition` 指定的时间内插值。`action` 只写动作 ID，不写函数名、不写脚本。常用动作包括：

| Action | 作用 |
| --- | --- |
| `pogget.action.view.toggle` | 在列表和图标视图之间切换 |
| `pogget.action.view.list` / `pogget.action.view.grid` | 切换到指定视图 |
| `pogget.action.container.toggleCollapse` | 折叠或展开收纳盒 |
| `pogget.action.container.menu` | 打开收纳盒菜单 |
| `pogget.action.container.tagMenu` | 打开颜色标签菜单 |
| `pogget.action.container.pin` | 固定或取消固定 |
| `pogget.action.container.personalization` | 打开个性化面板 |
| `pogget.action.container.inlineBack` / `inlineHome` | 内联视图后退或回到主页 |
| `pogget.action.container.toggleInlineSearch` | 打开或关闭内联搜索 |

完整动作集合由 Pogget 固定注册。未知 Action 会被拒绝，因此预设不能调用任意 Windows API 或执行命令。

### 3. 正确处理点击区域

按钮的可点击区域就是有 `action` 或 `holdAction` 的视图。需要扩大命中范围时，可以设置 `hitPaddingX` 和 `hitPaddingY`；需要长按时再加 `holdAction`、`holdDelay`、`holdDuration` 和 `holdScale`。不要用一个假的变量模拟折叠状态；直接读取 `${pogget.collapsed}`、`${pogget.isListView}` 等宿主事实。

## 三个可以直接改的例子

### 让标题变成半透明胶囊

这是依赖标准预设时的最小覆盖示例。它覆盖 `TitleSurface` 的一部分属性，并保留原来的标题按钮和搜索布局：

<CustomVinaPreview variant="capsule" />

```text
Preset { dependsOn: "Pogget_Std" }

TitleSurface {
  vars {
    style: 1,
    alpha: 0.78,
    radius: 20
  },
  view {
    Surface {
      background: ${pogget.titleColor},
      fillOpacity: ${vars.alpha},
      radius: ${vars.radius},
      border: 1,
      borderColor: ${pogget.theme.white},
      borderOpacity: 0.18
    }
  }
}
```

如果基础组件中同名属性是一个块而不是属性，不能用属性替换它；反过来也一样。此时应当复制完整组件再修改，或者把新内容放在自己的组件里。

### 只给文件项目加一个悬停边框

文件图标的宿主输入已经包含 `${pogget.fileIcon.hovered}`、`${pogget.fileIcon.selected}` 和 `${pogget.fileIcon.x}` 等事实。下面的组件不会接管文件拖拽和排序，只绘制一个装饰层：

<CustomVinaPreview variant="hover" />

```text
FileHoverRing {
  view {
    type: "rect",
    interaction: "icon",
    z: 4,
    x: ${pogget.fileIcon.x} - 4,
    y: ${pogget.fileIcon.y} - 4,
    width: ${pogget.fileIcon.size} + 8,
    height: ${pogget.fileIcon.size} + 8,
    radius: 12,
    background: 0,
    fillOpacity: 0,
    borderOnly: true,
    border: 2,
    borderColor: ${pogget.theme.accent},
    borderOpacity: ${pogget.fileIcon.hovered} ? 0.8 : 0
  }
}
```

文件项目的完整声明式绘制还涉及 `fileIconSurface`、`fileIconContent`、`fileIconText` 和 `fileIconMotion`。如果只是加装饰，先用独立组件；如果要重排文件名、缩略图或拖动动画，再按标准预设对应的 slot 逐步接管。

### 用玻璃材质做一个信息卡

<CustomVinaPreview variant="glass" />

```text
GlassCard {
  view {
    type: "glass",
    x: 18,
    y: ${pogget.height} - 74,
    width: ${pogget.width} - 36,
    height: 52,
    radius: 16,
    background: ${pogget.theme.midnight},
    glassRenderer: "standard",
    glassBorder: 1,
    glassOpacity: 0.8,
    fillOpacity: 0.28,
    borderOpacity: 0.35,
    borderColor: ${pogget.theme.white}
  }
}
```

`glassRenderer` 只能写 `standard` 或 `liquid`。使用液态玻璃并自己提供指针位置时，`glassPointerX` 和 `glassPointerY` 必须同时存在；只写其中一个会被拒绝。

## 保存、热更新和排错

### 建议的修改循环

1. 先用 **复制自** 建一个工作副本，或者对依赖预设做很小的差异。
2. 每次只改一个目标：颜色、尺寸、交互动作分开验证。
3. 保存前确认逗号、括号和 `${...}` 成对出现。
4. 回到 Pogget 点 **重新加载**，分别测试普通、列表、折叠、向上展开和锁定状态。
5. 通过后再把预设应用到全局，或把 `.vina` 文件交给其他人。

外部文件变更会被定时检查，解析成功后替换当前视图；解析失败时保留最后一个有效场景，不会把半截文件直接画到窗口上。保存使用临时文件和原子替换，编辑器检测到文件已被别人修改时会要求先重新加载。

### 常见错误

| 现象 | 检查方法 |
| --- | --- |
| “unexpected token” | 属性之间是否漏了逗号；字符串是否少了引号 |
| “unknown reference” | 路径是否真的存在；组件内部优先使用 `self.`、`parent.`、`ui.` 或 `vars.` |
| 颜色报错 | 使用 `rgb(r,g,b)` 或 0 到 `16777215` 的整数，不能使用 `#RRGGBB` |
| 按钮没有反应 | 是否写了白名单 Action；视图是否 `visible`、`enabled` 且有正的宽高 |
| 新组件挡住原来的按钮 | 调整 `z`；标题装饰通常使用 `interaction: "title"` 和 `z: 10` |
| 修改了基础预设却没有变化 | 当前预设可能是复制模式；复制不会跟随基础预设 |
| 依赖预设加载失败 | `dependsOn` 必须是一个存在的独立预设名，不能写 `.vina`、路径或第二层依赖 |
| 文件项目绘制不完整 | 对应 slot 声明不完整时会回退原生绘制；先参照标准预设的完整 slot 组合 |

## 发布前检查清单

- [ ] 预设名不含路径分隔符、控制字符或 Windows 保留设备名。
- [ ] 文件使用 UTF-8，块名和同级属性没有重复。
- [ ] 所有尺寸、坐标、不透明度和颜色都在合理范围内。
- [ ] 至少在图标视图、列表视图、折叠、向上展开和窄窗口下各看一次。
- [ ] 每个交互元素都使用已注册的 Action，并测试移出、失焦、按下后热更新等情况。
- [ ] 依赖预设只保存必要差异；需要冻结外观时改用独立复制。
- [ ] 发布前保留 `.vina` 原文件和一个可回退的 `Pogget_Std` 副本。

标准预设 `Presets\Personalization\Pogget_Std.vina` 是最完整的参考文件。遇到高级 slot 时，先复制其中同名组件，再逐项删减；这样可以保留宿主已经接好的拖动、输入、动画和资源生命周期。
