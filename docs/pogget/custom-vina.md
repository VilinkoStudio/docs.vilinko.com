---
prev:
  text: 'Pogget'
  link: '/docs/pogget/index'
next:
  text: 'CustomVina 接口参考'
  link: '/docs/pogget/custom-vina/reference'
---

<script setup>
import CustomVinaPreview from '../../.vitepress/theme/components/CustomVinaPreview.vue'
</script>

# CustomVina：从一个矩形开始

CustomVina 用 `.vina` 文件描述 Pogget 收纳盒的外观和交互。先画一个矩形，再加圆角、文字、自适应宽度和按钮，最后修改原有组件。每一步只引入一组新概念。

已经写过预设，可以直接查表：

| 要找什么 | 入口 |
| --- | --- |
| 图元、布局、颜色、材质、文字、动画、设置控件 | [接口参考](./custom-vina/reference) |
| 窗口、标题、文件项目、搜索、内联内容等只读数据 | [宿主输入](./custom-vina/inputs) |
| 点击或长按可以执行哪些功能 | [内部动作](./custom-vina/actions) |
| 接管原有绘制、测量和动画 | [绘制阶段与高级布局](./custom-vina/slots) |
| 界面已有的多语言文字 | [内置文案](./custom-vina/labels) |

## 准备：创建一个练习预设

1. 打开收纳盒菜单，进入 **个性化 → 高级 → 新建预设**。
2. 名称填写 `MyFirstStyle`，创建方式选 **依赖自**，基础预设选 `Pogget_Std`。
3. 点 **外部打开**，用文本编辑器修改文件。保存为 UTF-8。
4. 回到 Pogget 点 **重新加载**，确认效果，再点 **应用并保存**。

下面每个完整示例都可以单独替换这份练习文件。第一行 `Preset` 保留标准外观，我们只在它上面增加内容。不要把多个示例里的同名组件重复粘贴到一起。

预设存放在数据目录的 `Presets\Personalization` 下，可通过 **管理预设** 打开。普通安装通常位于 `%LOCALAPPDATA%\Vilinko\Pogget\Presets\Personalization`；便携模式位于 `Pogget.exe` 同目录的 `.pogget_config\Presets\Personalization`。

## 第一步：画一个纯色矩形

先只关心位置、大小和颜色：

<CustomVinaPreview variant="rectangle" />

```text
Preset { dependsOn: "Pogget_Std" }

MyCard {
  view {
    type: "rect",
    x: 16,
    y: 64,
    width: 160,
    height: 48,
    background: rgb(32, 116, 154)
  }
}
```

| 这一行 | 用途 |
| --- | --- |
| `MyCard` | 组件名，可以自己起；同一层不能重名 |
| `view` | 组件实际显示的内容 |
| `type: "rect"` | 绘制矩形 |
| `x`、`y` | 相对父节点左上角的位置；根节点相对收纳盒 |
| `width`、`height` | 宽度与高度 |
| `background` | 背景颜色，`rgb()` 的三个参数依次是红、绿、蓝 |

坐标和尺寸默认使用 DIP（设备无关像素）。属性写成 `名称: 值`，同级成员用逗号分隔；最外层的组件之间不需要逗号。可以用 `//` 和 `/* ... */` 写注释。

先把 `160` 改成 `220`，重新加载；再换一次颜色。这样就完成了第一个图形。

## 第二步：增加圆角和边框

保持位置不变，只增加三项外观属性：

<CustomVinaPreview variant="rounded" />

```text
Preset { dependsOn: "Pogget_Std" }

MyCard {
  view {
    type: "rect",
    x: 16,
    y: 64,
    width: 160,
    height: 48,
    background: rgb(32, 116, 154),
    radius: 12,
    border: 1,
    borderColor: rgb(120, 210, 240)
  }
}
```

`radius` 是圆角半径，`border` 是边框宽度，`borderColor` 是边框颜色。需要半透明背景时再加 `fillOpacity: 0.8`；它只控制填充。`opacity` 则会连同子节点一起变淡。

## 第三步：把文字放到卡片里

用 `group` 组织一个背景和一段文字。子节点坐标从组的左上角开始，移动组就能移动整张卡片。

<CustomVinaPreview variant="label" />

```text
Preset { dependsOn: "Pogget_Std" }

MyCard {
  view {
    type: "group",
    x: 16,
    y: 64,
    width: 160,
    height: 48,
    Surface {
      type: "rect",
      width: 160,
      height: 48,
      radius: 12,
      background: rgb(32, 116, 154)
    },
    Caption {
      type: "text",
      x: 12,
      y: 14,
      width: 136,
      height: 20,
      textY: 0,
      label: "我的第一张卡片",
      textLiteral: true,
      textSize: 14,
      color: rgb(255, 255, 255)
    }
  }
}
```

`group` 默认不画背景。`label` 提供文字，`textLiteral: true` 表示按原文显示。文字和图标都使用 `font`、`textSize`、`color`；图标还需要对应字体中的字符。

## 第四步：让宽度跟随收纳盒

固定宽度改成表达式，用 `vars` 集中保存反复使用的数值：

<CustomVinaPreview variant="card" />

```text
Preset { dependsOn: "Pogget_Std" }

MyCard {
  vars { padding: 16, radius: 12 },
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

`${pogget.width}` 是收纳盒当前宽度，`${vars.padding}` 是本组件的变量。两边各留 16，宽度就是 `收纳盒宽度 - 16 × 2`。本例把卡片移到 `y: 16`，用于观察两侧留白。

组件内还可以引用 `${self.width}`、`${parent.width}`；跨组件写完整路径，例如 `${MyCard.vars.radius}`。表达式支持四则运算、比较、条件表达式和内置函数，完整用法见[表达式表](./custom-vina/reference#表达式与函数)。

## 第五步：添加一个按钮

把矩形改成 `button`，加上文字、点击动作和悬停效果：

<CustomVinaPreview variant="simple-button" />

```text
Preset { dependsOn: "Pogget_Std" }

ViewToggle {
  view {
    type: "button",
    interaction: "title",
    x: 180,
    y: 8,
    width: 100,
    height: 28,
    z: 10,
    radius: 6,
    background: rgb(32, 116, 154),
    color: rgb(255, 255, 255),
    label: "切换视图",
    textLiteral: true,
    textSize: 12,
    action: pogget.action.view.toggle,
    transition: 160ms,
    hover { opacity: 0.75 }
  }
}
```

`button` 使用矩形绘制；真正接入点击的是 `action`。这里调用 Pogget 的“切换列表/图标视图”。动作写完整 ID，无需括号。每个已注册动作的用途和可用条件见[内部动作表](./custom-vina/actions)。

`hover` 定义悬停时的目标属性，`transition` 是进入悬停的时长；`160ms` 等于 `0.16` 秒。`interaction: "title"` 让新增按钮跟随标题隐藏、折叠和向上展开，`z: 10` 设置所在层级。同级 `z` 越大越靠上；子节点不能越过父组的层叠范围。

长按可再设置 `holdAction` 和 `holdDelay`，动作在有效释放时执行一次。需要扩大点击范围时，用 `hitPaddingX`、`hitPaddingY`。

## 第六步：把参数放进设置面板

在 `ui` 中声明控件，用户就能在高级面板调整参数。下面给按钮位置增加一个滑块：

<CustomVinaPreview variant="button" />

```text
Preset { dependsOn: "Pogget_Std" }

ViewToggle {
  label: "我的视图按钮",
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

`${ui.Left.value}` 读取滑块当前值。没有 `bind` 的控件保存为当前配置中该预设的参数；声明了 `bind` 才会修改对应的 Pogget 设置。控件、字段和全部可用绑定见[设置控件](./custom-vina/reference#设置控件-ui)。

`${pogget.isListView}` 读取真实视图状态，`条件 ? 值一 : 值二` 根据它选择图标。真实折叠、视图状态应读取宿主输入；自己添加的展开开关可以使用[本地状态](./custom-vina/reference#本地状态-state)。

## 第七步：修改已有标题

前面都是新增组件。接下来覆盖标准预设的同名组件：

<CustomVinaPreview variant="capsule" />

```text
Preset { dependsOn: "Pogget_Std" }

TitleSurface {
  vars { style: 1, alpha: 0.78, radius: 20 },
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

`TitleSurface` 和 `Surface` 必须与基础预设的路径一致。依赖模式会保留未提到的内容，只覆盖这些属性，因此原有标题按钮与搜索布局仍然存在。这里的组件名和 `vars.style` 属于 `Pogget_Std` 的声明，并非所有预设都拥有的语言关键字。

### 复制与依赖

| 创建方式 | 保存内容 | 基础预设更新后 | 使用场景 |
| --- | --- | --- | --- |
| 依赖自 | `Preset` 声明和差异 | 跟随基础，继续应用自己的覆盖 | 改颜色、调布局、增加组件 |
| 复制自 | 展开后的完整独立样式 | 不跟随 | 需要独立维护整套外观 |

目前只能依赖一个独立预设，不能形成依赖链。`dependsOn` 写预设名称，不带 `.vina` 或路径。差异可以覆盖属性、追加组件和子节点，不能删除继承内容，也不能把属性替换成块，或把块替换成属性。独立预设不写 `Preset`，需要自行包含所需组件。

## 继续深入：纹理、玻璃与绘制阶段

### 给矩形加立体纹理

纹理是背景的绘制属性。沿用原来的 `rect` 类型，在其 `view` 中增加 `texture: true` 即可：

```text
Preset { dependsOn: "Pogget_Std" }

TexturedCard {
  view {
    type: "rect",
    x: 16, y: 64, width: 160, height: 48,
    radius: 12,
    background: rgb(32, 116, 154),
    texture: true
  }
}
```

省略 `texture` 或写 `false` 使用普通填充；`true` 或数值 `0` 都启用立体纹理，数值 `0..64` 还指定纹理自身的描边宽度。不要再写旧的 `type: "texture"`。

### 叠加玻璃高光

`glass` 绘制高光或光效，`background` 在这里用于亮度计算，不会自动画一块底色。需要实体卡片时，先画矩形，再叠加 `glass`：

<CustomVinaPreview variant="glass" />

```text
Preset { dependsOn: "Pogget_Std" }

GlassCard {
  view {
    type: "group",
    x: 18, y: ${pogget.height} - 74,
    width: ${pogget.width} - 36, height: 52,
    Surface {
      type: "rect",
      width: ${parent.width}, height: ${parent.height},
      radius: 16,
      background: ${pogget.theme.midnight},
      fillOpacity: 0.28
    },
    Highlight {
      type: "glass",
      width: ${parent.width}, height: ${parent.height},
      radius: 16,
      background: ${pogget.theme.midnight},
      glassRenderer: "standard",
      glassActive: true,
      glassBorder: 1,
      glassOpacity: 0.8,
      fillOpacity: 0.28
    }
  }
}
```

`glassRenderer` 只接受 `standard`（普通玻璃高光）和 `lightEffect`（光效）；旧值 `liquid` 已迁移为 `lightEffect`。`standard` 的高光受 `glassActive` 控制，`lightEffect` 独立绘制，无需开启它。全部参数见[玻璃与光效](./custom-vina/reference#玻璃与光效)。

### 接管原有绘制

`slot` 指定原生绘制阶段，例如 `titleSurface` 是标题表面，`fileIconSurface` 是每个文件项目的表面。它与 `type` 的职责不同：`type` 决定画什么，`slot` 决定在哪个宿主阶段绘制。

文件项目、标签页等会逐项提交宿主输入。要修改每个文件的悬停边框，应修改标准预设 `FileIconSurface` 下的声明；普通无 `slot` 组件不会自动为每个文件重复绘制。完整阶段和配套测量参数见[绘制阶段与高级布局](./custom-vina/slots)。

## 保存与排错

每次只改一个目标，重新加载后检查普通、列表、折叠、向上展开和窄窗口状态。**独立属性** 只作用于当前收纳盒；**全局属性** 写入全局配置，再点 **同步更改** 更新使用全局作用域的收纳盒。

外部文件变化会被定时检查。解析或实时表达式失败时保留最后有效场景；编辑器会显示错误位置。保存时若发现文件已被外部修改，应先重新加载，再合并自己的改动。

| 现象 | 检查方法 |
| --- | --- |
| `unexpected token` | 检查逗号、引号、花括号和 `${...}` 是否完整 |
| `unknown reference` | 检查完整路径和作用域；`${...}` 用于取值，动作和文案 ID 本身不用包起来 |
| 颜色不对或报错 | 使用 `rgb(r, g, b)`；底层是 COLORREF，不接受 `#RRGGBB` 字符串 |
| 纹理或玻璃加载失败 | 纹理用 `texture` 属性；光效用 `glassRenderer: "lightEffect"` |
| 按钮没有反应 | 检查可见性、启用状态、尺寸、裁剪、动作 ID 及动作适用条件 |
| 同名组件没有覆盖 | 检查基础预设中是否存在该路径；复制模式不会跟随基础修改 |
| 依赖加载失败 | 检查基础存在且独立，名称不带扩展名，没有依赖链 |
| 文件图标装饰只出现一次或位置异常 | 使用文件项目对应的 slot，在逐项绘制阶段读取 `pogget.fileIcon.*` |
| 高级绘制仍使用原生外观 | 检查该功能要求的 slot 组合和元数据是否完整 |

标准文件 `Presets\Personalization\Pogget_Std.vina` 可以作为完整场景参考。发布前保留 `.vina` 原文件，并在上述几种状态下核对外观与点击行为。
