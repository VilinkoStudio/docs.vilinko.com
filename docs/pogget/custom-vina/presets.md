---
prev:
  text: '接口参考'
  link: '/docs/pogget/custom-vina/reference'
next:
  text: 'Pogget_Std 字段表'
  link: '/docs/pogget/custom-vina/standard-fields'
---

# 预设文件、图片与继承

## 预设目录

预设位于用户数据目录下的 `Presets/Personalization`。Pogget 查找该目录中的 `.vina`，也查找直接子文件夹中的 `.vina`；不会继续扫描更深层目录。图片等配套资源可与预设放在一起。

```text
Presets/Personalization/
  Pogget_Std.vina             # 名称：Pogget_Std
  Blue.vina                   # 名称：Blue
  MyTheme/
    Blue.vina                 # 名称：MyTheme/Blue
    images/background.png
    nested/Hidden.vina        # 不会出现在列表中，也不能作为依赖
```

名称不含 `.vina` 扩展名。子目录名称以 `文件夹/预设名` 表示，所以根目录与子目录可以有同名预设；Windows 下名称不区分大小写，`/` 与 `\` 表示相同的分隔。不能使用绝对路径、`..`、空目录段、Windows 保留文件名或超过一级的子目录。隐藏、系统和重解析项不参与枚举；子目录不跟随符号链接或目录联接。

## 加载外部图片

`type: "image"` 默认用现有 WIC 后端读取本地文件，支持 PNG、JPEG 等已安装 WIC 解码器可识别的格式。相对路径以**声明该图片来源的预设文件所在文件夹**为基准，与程序工作目录无关。

```text
Preset { dependsOn: "Pogget_Std" }

Wallpaper {
  view {
    type: "image",
    source: "images/background.png",
    x: 16, y: 64, width: 240, height: 160,
    imageFit: "contain"
  }
}
```

如果上面的预设位于 `MyTheme/Blue.vina`，图片位置就是 `MyTheme/images/background.png`。也可用 `../shared/banner.png` 相对上级目录，或 `"D:/Pictures/banner.png"` 这样的完整路径；字符串中的反斜杠须写成 `\\`。不支持 `C:banner.png` 这种依赖当前盘符工作目录的写法，也不下载 HTTP 图片。

| 字段 | 类型、默认值与用途 |
| --- | --- |
| `source` | 字符串；WIC 使用本地绝对/相对文件路径，Shell 使用原始文件路径或图标标识，资源后端使用宿主资源名；可引用文本变量，如 `${pogget.hoveredIcon.path}` |
| `src` | `source` 的兼容别名，显式 `source` 优先 |
| `imageRenderer` | 默认 `"wic"`；`"shell"` 读取文件、文件夹或 Shell 项目的系统图标；`"resource"` 读取宿主本次登记的命名位图 |
| `imageFit` | 默认 `"stretch"` 拉伸；`"contain"` 保持比例，完整居中放入目标区域 |

WIC 图片继承后继续相对父预设目录解析；在子预设中重新声明 `source` 后，该来源相对子预设目录解析。复制为独立预设时，WIC 字面量图片路径会展开为完整路径；使用表达式动态生成的相对路径则以新文件所在目录为基准。

Shell 来源保持原样传入原生图标后端，不拼接预设目录，也不规范化路径。请使用完整文件路径、宿主 `${pogget.fileIcon.path}`，或原生支持的标识，例如 `icon@computer.pogget`、`shell:AppsFolder\应用标识`、`::{GUID}`。复制预设也会保留这些 Shell 来源及宿主命名资源。

位图按渲染目标和解析后的路径缓存，设备/路径或预设重新加载时重建。找不到文件、解码失败、空来源都跳过该图片；修复或替换文件后可点“重新加载”。单张图片最多 16,777,216 像素，宽高同时受当前渲染目标最大位图尺寸限制。AI 隔离预览只允许程序生成的样本图片，不会读取真实本地图片。

完整的裁切、缩放、圆角字段见[图片与同步内容](./reference#图片与同步内容)。

## 为父预设指定参数

在子预设顶部的 `Preset` 声明中用 `parentValues` 指定父预设控件的初始值。它覆盖当前子预设对原生配置的读取，不需要用户先切回父预设调整设置，也不改写父预设文件或其他预设的参数。

```text
Preset {
  dependsOn: "Pogget_Std",
  disableParentPreset: true,
  parentValues {
    Background.ui.RenderStyle: 4,
    Background.ui.CornerRadius: 18,
    Tag.ui.TitleStyle: 2,
    VinaIcon.ui.IconBackground: true,
    VinaIcon.ui.IconBackgroundOpacity: 0.20
  }
}

MyControls {
  label: "我的样式",
  ui {
    Strength {
      label: "装饰强度", type: "number", control: "slider",
      min: 0, max: 1, step: 0.01, default: 0.5
    }
  },
  view {
    type: "rect", x: 16, y: 64, width: 140, height: 40,
    background: rgb(90, 140, 230),
    opacity: ${ui.Strength.value}, radius: 12
  }
}
```

| `Preset` 字段 | 类型与行为 |
| --- | --- |
| `dependsOn` | 必填字符串字面量，不带扩展名；例如 `"Pogget_Std"`、`"MyTheme/Base"`。只支持单层依赖，父预设必须独立，不能依赖自身 |
| `parentValues { ... }` | 可选参数表，键为父预设已有控件的完整路径，如 `Background.ui.CornerRadius`，不加 `.value` 或 `.default`；省略时保持原来的配置读取行为 |
| `disableParentPreset` | 布尔字面量，默认 `false`。`true` 时个性化页只显示子预设显式声明的自定义控件；父预设视图和控件值仍参与计算 |

`parentValues` 的值只接受数值、布尔或字符串字面量，包括负数；不接受引用或运算表达式，颜色可写 COLORREF 整数。类型必须与父控件默认值一致，数值必须在控件范围内，选项/颜色必须为整数；`TitleBlurRadius` 的自动值 `-1` 也是有效值。未知字段或无效值会拒绝整个新版本，并保留上一次可用预设。

父控件的值按以下顺序决定：

1. 当前收纳盒为该子预设保存的控件值。
2. 子预设在普通组件覆盖块中显式声明的 `default` / `value`。
3. `Preset.parentValues` 指定的值。
4. 父控件默认值。

该顺序针对 `parentValues` 列出的控件；其余带 `bind` 的控件继续读取原有原生配置。`parentValues` 中的背景、标题、边框颜色默认使用“自定义”来源，该子预设后续的颜色来源选择也独立保存。

`disableParentPreset` 隐藏所有继承来的控件；子预设在同名组件的 `ui` 中显式声明的控件仍显示，包括显式覆盖的同名控件。父分组没有子预设控件时，整个折叠分组不显示。搜索同样只覆盖可显示的子控件。“高级”预设管理区仍可使用。

`Pogget_Std` 的每个控件及其选项值见[完整字段表](./standard-fields)。

## 日期与当前图标

| 引用 | 返回类型与含义 |
| --- | --- |
| `${pogget.date.year}` | 数值，系统本地日期的完整年份，如 `2026` |
| `${pogget.date.month}` | 数值，月份 `1..12` |
| `${pogget.date.day}` | 数值，当月日期 `1..31` |
| `${pogget.hoveredIcon.path}` | 文本，当前收纳盒中悬停图标的完整文件/文件夹路径；无悬停返回空字符串 |
| `${pogget.selectedIcon.path}` | 文本，当前收纳盒恰好选中一个图标时的完整路径；未选中、多选或选中项失效时返回空字符串 |

图标路径跟随当前普通、搜索或内联文件夹视图，编辑文档时返回空字符串；文件路径包含文件名，不是其父文件夹。它们是读取状态的输入，不会选中、打开或扫描磁盘文件。日期在绘制与现有预设轮询时刷新，跨天会触发重绘；静态文档预览的占位日期为 `2000/1/1`，图标路径为空。

```text
DateLabel {
  view {
    type: "text", x: 16, y: 16, width: 220, height: 28,
    label: ${pogget.date.year} + "/" + ${pogget.date.month} + "/" + ${pogget.date.day},
    textLiteral: true
  }
}
```

字符串中的 `"${pogget.date.year}"` 仍是普通文本；应像示例一样在字符串外引用，并用 `+` 拼接。更多输入见[宿主输入](./inputs)。

## 路径边框与滑条端点

路径图元 `type: "path"` 的 `border` 默认 `0`，省略时不描边；开放路径若需要可见线条，必须显式写 `border: 1` 等正值。`borderColor`、`borderOpacity` 本身不会启用边框。关闭边框也不会关闭显式背景填充。

个性化滑条使用四舍五入显示百分比，并在拖到两端时直接取最小/最大值，修复了接近 `100%` 时显示或停留在 `99%` 的问题。
