---
prev:
  text: '从一个矩形开始'
  link: '/docs/pogget/custom-vina'
next:
  text: '宿主输入'
  link: '/docs/pogget/custom-vina/inputs'
---

# CustomVina 接口参考

本页按类型列出当前语言的图元、属性、表达式、状态和面板控件。每张表左侧为可填写的名称，右侧说明用途；数值范围来自当前绘制与布局校验。另见[宿主输入](./inputs)、[内部动作](./actions)、[绘制阶段](./slots)和[内置文案](./labels)。

## 文件结构与值类型

| 声明位置 | 用途 |
| --- | --- |
| `Preset { dependsOn: "名称" }` | 单层依赖声明；只能有一个独立基础，不带扩展名和路径 |
| `组件名 { ... }` | 顶层组件，名称自定义；同层不允许重复 |
| 组件的 `label`、`description`、`icon` | 设置面板中该组件分组的标题、说明和图标 |
| `ui { ... }` | 声明可保存的面板参数 |
| `vars { ... }` | 声明可引用的表达式，适合尺寸、颜色等派生值 |
| `state { ... }` | 声明每个收纳盒独立的会话状态 |
| `view { ... }` | 声明视图树；子块默认是子视图，专用元数据块除外 |
| `Panel { ... }` | 个性化设置面板的专用布局组件，见本页末尾 |

| 值类型 | 示例与含义 |
| --- | --- |
| 数值 | `12`、`-4.5`，必须有限；尺寸默认 DIP，时间默认秒 |
| 毫秒 | `160ms` 等于数值 `0.16` |
| 布尔 | `true`、`false` |
| 字符串 | `"Segoe UI"`；支持 `\n`、`\r`、`\t`、`\uXXXX`、`\"`、`\\` 转义 |
| 标识符 | `pogget.action.view.toggle`、`pogget.label.titleClassic`，作为文本 ID 使用 |
| 引用 | `${vars.radius}`、`${pogget.width}`，取其他属性或宿主输入的值 |
| 颜色 | `rgb(30, 144, 255)` 或 `0..16777215` 的 COLORREF 整数；不是 CSS 颜色字符串 |

## 图元类型 type

| `type` | 用途与默认行为 |
| --- | --- |
| `group` | 组织子视图；坐标、不透明度、可见性、启用状态和裁剪影响子节点，默认不画背景 |
| `rect` | 矩形/圆角矩形，默认绘制填充，可加边框和阴影 |
| `rectangle` | `rect` 的别名 |
| `button` | 与 `rect` 相同的绘制类型；通过 `action`、`holdAction` 或 `toggle` 接入交互 |
| `container` | `rect` 的别名，不会额外创建一个 Pogget 收纳盒 |
| `solid` | 实色方角矩形；保留方角，不使用 `radius` 绘制圆角 |
| `text` | 绘制 `label` 提供的文字 |
| `icon` | 绘制字体图标字符，使用 `icon` 与对应 `font` |
| `image` | 绘制 WIC 图片、Shell 图标或本次绘制的命名位图 |
| `glass` | 玻璃高光/光效层，`background` 参与亮度计算，不自动填充背景 |
| `content` | 绘制宿主登记的命名内容资源，如 Markdown；只在当前绘制调用中使用 |

建议始终显式填写 `type`。省略时，有子视图的节点默认为 `group`，没有子视图的节点默认为 `text`。旧的 `type: "texture"` 已移除，应保留原图元并使用 `texture` 属性。

`pogget.native.Header` 是[布局兼容接口](./slots#header-兼容布局)。`pogget.native.Background`、`pogget.native.Tag`、`pogget.native.VinaIcon`、`pogget.native.Behavior` 是保留的旧组件标识，走兼容路径，不是通用绘图类型；新组件使用上表图元和对应 slot。

## 布局与可见性

| 属性 | 类型、默认值与用途 |
| --- | --- |
| `x`、`y` | 数值，默认 `0`，范围 ±32768；相对父视图的坐标 |
| `width`、`height` | 数值，默认 `40`，范围 `0..32768`；视图尺寸，不会自动撑满父节点 |
| `w`、`h` | 宽、高的兼容别名；同时存在时 `width`、`height` 优先 |
| `z` | 数值，默认 `0`，范围 ±32768；同级绘制层级，相同值按声明顺序排列 |
| `visible` | 布尔，默认 `true`；隐藏后不绘制、不命中，影响子视图 |
| `enabled` | 布尔，默认 `true`；控制交互是否启用，影响子视图 |
| `opacity` | 数值，默认 `1`，范围 `0..1`；整体不透明度，与父节点不透明度相乘 |
| `slot` | 字符串；指定宿主绘制阶段，子节点默认继承，见[完整表](./slots) |
| `interaction` | 字符串；标记宿主交互范围，`title` 跟随标题状态，`icon` 用于文件图标范围；不产生重复绘制 |
| `role` | `interaction` 的兼容别名，显式 `interaction` 优先 |

### 裁剪

| 属性 | 类型、默认值与用途 |
| --- | --- |
| `clip` | 布尔，默认 `false`；按当前视图矩形裁剪自身及后代，并限制命中 |
| `clipRadius` | 数值，默认 `0`，范围 `0..32768`；裁剪圆角半径，需要启用 `clip` |
| `clipLayer` | 布尔，默认 `false`；使用共享蒙版合成层；正圆角也会启用该方式 |
| `clipAntialias` | `"perPrimitive"`（默认）或 `"aliased"`；裁剪抗锯齿方式 |

## 背景、纹理与边框

| 属性 | 类型、默认值与用途 |
| --- | --- |
| `background` | 颜色，默认主题 `midnight`；指定填充颜色；非矩形图元需显式声明才有背景，`glass` 除外 |
| `fillOpacity` | 数值，默认 `1`，范围 `0..1`；填充不透明度；普通玻璃也读取此参数 |
| `radius` | 数值，默认 `0`，范围 `0..32768`；矩形、玻璃及受支持位图的圆角 |
| `cornerRadius` | `radius` 的兼容别名，显式 `radius` 优先 |
| `texture` | 布尔或 `0..64`；省略/`false` 为普通填充，`true`/数值 `0` 启用立体纹理，数值同时指定纹理描边宽度 |
| `border` | 数值，默认 `0`，范围 `0..64`；独立边框宽度 |
| `borderColor` | 颜色，默认主题 `white`；边框颜色 |
| `borderOpacity` | 数值，默认 `1`，范围 `0..1`；边框不透明度；光效也用它控制基础边缘 |
| `borderStyle` | `"solid"`（默认）或 `"dash"`；实线或虚线边框 |
| `borderOnly` | 布尔，默认 `false`；只画边框，跳过背景与纹理填充 |
| `blur` | 数值，默认 `0`，范围 `0..64`；使用现有材质后端绘制背景模糊 |
| `blurRenderer` | `"title"`（默认）或 `"snapshot"`；分别选择标题材质和快照模糊后端；快照采样原点须非负 |

`rect`、`rectangle`、`button`、`container`、`solid` 可直接使用 `texture`。`group`、`text`、`icon`、`image`、`content` 还需显式 `background`。纹理不替代独立边框，仍可搭配虚线；`glass` 没有背景填充，不能靠 `texture` 生成实体表面。

### 阴影

| 属性 | 默认值、范围与用途 |
| --- | --- |
| `shadowOpacity` | `0`，`0..1`；外阴影不透明度 |
| `shadowColor` | 黑色 COLORREF；外阴影颜色 |
| `shadowX`、`shadowY` | `0`、`4`，±256；外阴影水平、垂直偏移 |
| `shadowBlur` | `16`，`0..128`；外阴影模糊范围 |
| `shadowQuality` | `4`，`1..32`；外阴影绘制采样质量 |
| `innerShadowOpacity` | `0`，`0..1`；内阴影不透明度 |
| `innerShadowInset` | `0.5`，`0..256`；内阴影内缩量 |
| `innerShadowDepth` | `2`，`0..256`；内阴影深度 |
| `innerShadowLowerOpacity` | `0`，`0..1`；下沿内阴影强度 |

### 玻璃与光效

| 属性 | 默认值、范围与用途 |
| --- | --- |
| `glassRenderer` | `"standard"` 或 `"lightEffect"`；默认 `standard`，旧值 `liquid` 已迁移 |
| `glassActive` | `false`；普通玻璃高光开关；`lightEffect` 不受此开关控制 |
| `glassOpacity` | `1`，`0..1`；玻璃/光效强度 |
| `glassBorder` | `1`，`0..64`；玻璃边缘宽度 |
| `glassPointerX`、`glassPointerY` | 数值，±32768；显式指针目标坐标，必须同时声明；省略则使用原有鼠标采样 |
| `glassTintEnabled` | 布尔；默认在声明 `glassTintColor` 时启用，否则关闭；控制是否着色 |
| `glassTintColor` | 颜色，默认黑色；着色颜色 |
| `glassTintAmount` | `0`，`0..1`；着色比例 |
| `glassCustomEdge` | `false`；光效使用 `borderColor` 作为自定义基础边缘颜色 |

玻璃层的 `background` 用于亮度计算。需要底色时先画 `rect` 再叠加 `glass`。光效的基础边缘读取 `borderOpacity`；普通玻璃继续读取 `fillOpacity`。完整示例见[入门教程](../custom-vina#叠加玻璃高光)。

## 文字与字体图标

| 属性 | 默认值、范围与用途 |
| --- | --- |
| `label` | 字符串或内置文案 ID；文字内容 |
| `icon` | 字符串；字体图标字符；与 `label` 同时存在时优先使用 `icon` |
| `font` | `"Segoe UI"`；字体族；Font Awesome 图标使用 `"Font Awesome 6 Free Solid"` |
| `textSize` | `14`，`0.001..256`；字号，单位 DIP |
| `color` | 主题 `white`；文字颜色 |
| `textX` | `0`，±32768；文字相对视图的水平偏移 |
| `textY` | 默认 `(height - textSize) / 2`，±32768；文字垂直偏移 |
| `align` | 默认 `"center"`；文字对齐，通用布局使用 `"left"`、`"center"`、`"right"`，具体由文字后端读取 |
| `emphasized` | `false`；强调状态，供对应原生文字/标签绘制使用 |
| `textLiteral` | `false`；启用后文字按原文显示，不解析为多语言文案 ID |
| `textNoWrap` | `false`；禁止自动换行，用于支持此选项的文字后端 |
| `textClip` | `false`；命名文本布局绘制时启用 DirectWrite 的 CLIP 标志 |
| `textFloatPosition` | `false`；普通文字使用浮点位置 |
| `textOmitUnits` | `0`，`0..32768`；正数时按 Unicode 显示单位预算省略文字，`0` 不启用 |
| `textColorFont` | `false`；直接布局后端启用彩色字体 |
| `textAppFonts` | `false`；直接布局后端使用应用字体集合 |
| `textRenderer` | 默认空字符串；选取下表文字后端 |

| `textRenderer` | 用途 |
| --- | --- |
| 省略或 `""` | 默认文字/图标绘制路径 |
| `"glyph"` | 原生图标字符绘制 |
| `"dwrite2"` | 现有普通文字与阴影后端 |
| `"dwrite3"` | 现有半粗文字与阴影后端 |
| `"direct"` | 原始 DirectWrite 布局，支持浮点字号、彩色/应用字体和零宽布局；祖先组负责裁剪 |
| `"resource"` | 使用 `source` 指定的本次绘制命名文本布局；字体和对齐来自宿主测量策略 |

### 文字阴影

| 属性 | 默认值、范围与用途 |
| --- | --- |
| `textShadowOpacity` | `0`，`0..1`；文字阴影不透明度 |
| `textShadowColor` | 黑色；文字阴影颜色 |
| `textShadowX`、`textShadowY` | `0`、`1`，±256；文字阴影偏移 |
| `textShadowBlur` | `2`，`0..128`；文字阴影模糊范围 |
| `textShadowQuality` | `3`，`1..32`；文字阴影采样质量 |
| `textShadowOnly` | `false`；只画文字阴影 |
| `textShadowRingOpacity` | `1`，`0..1`；文字阴影环的不透明度 |
| `textShadowScaleX`、`textShadowScaleY` | `1`，`0..8`；文字阴影的横向、纵向缩放 |

## 图片与同步内容

| 属性 | 默认值、范围与用途 |
| --- | --- |
| `source` | 图片路径或宿主资源名；`content` 和资源文字也使用此字段 |
| `src` | `source` 的别名，显式 `source` 优先 |
| `imageRenderer` | `"wic"`（默认）：WIC 图片；`"shell"`：Shell 图标；`"resource"`：本次绘制的命名位图 |
| `imageFit` | `"stretch"`（默认）：拉伸；`"contain"`：保持比例完整放入目标矩形 |
| `imageCrop` | `false`；对 WIC/资源位图启用源矩形裁切 |
| `imageSourceX`、`imageSourceY` | `0`，`0..32768`；源图中的裁切起点，单位源图 DIP |
| `imageSourceWidth`、`imageSourceHeight` | `0`，`0..32768`；源裁切大小；启用裁切但矩形为空时不绘制 |
| `imageScaleX`、`imageScaleY` | `1`，`0.001..8`；位图横纵缩放，与宿主变换组合 |
| `imagePivotX`、`imagePivotY` | `0`，±32768；缩放中心，使用宿主 DIP 坐标 |
| `contentScale` | `1`，`0.001..256`；同步内容缩放，以内容左上角为中心，在祖先裁剪建立后生效 |

WIC/资源位图支持 `radius` 圆角；Shell 图标需要圆角时使用祖先组的 `clip` 与 `clipRadius`。裁切后的 `contain` 按源裁切区域比例排版。`resource`、`content` 只访问宿主本次登记的资源；缺少资源时不绘制，不能通过字符串创建原生函数。可用资源名见[资源表](./slots#命名资源)。

## 点击、悬停与动画

| 属性或块 | 默认值、范围与用途 |
| --- | --- |
| `action` | 短按执行的内部动作 ID，见[完整动作表](./actions) |
| `holdAction` | 达到长按阈值后，有效释放时执行的动作 ID |
| `holdDelay` | `0.4` 秒，`0..10`；长按判定阈值 |
| `hitPaddingX`、`hitPaddingY` | `0`，`0..256`；点击区域在横纵方向向外扩展的距离 |
| `toggle` | 字符串字面量，如 `"state.expanded"`；短按翻转已声明的布尔状态，再执行可选 `action` |
| `hover { ... }` | 悬停目标属性；支持的数值与颜色由现有悬停进度插值 |
| `transition` | `0.2` 秒，`0..10`；进入悬停时长 |
| `unhoverTransition` | 默认跟随 `transition`，`0..10`；离开悬停时长 |
| `pressDuration` | `0.15` 秒，`0..10`；原生按钮按压动画时长 |
| `releaseDuration` | `0.3` 秒，`0..10`；原生按钮释放动画时长 |
| `pressScale` | `0.85`，`0..8`；原生按钮按压目标缩放 |
| `holdDuration` | `0.3` 秒，`0..10`；原生按钮长按反馈动画时长 |
| `holdScale` | `0.9`，`0..8`；原生按钮长按目标缩放 |
| `holdOffset` | `5`，±256；原生按钮长按反馈位移 |

通用节点的 `hover` 使用悬停动画器；`press*`、`hold*` 反馈参数由接入对应能力的原生按钮读取，不会自动给所有矩形增加按压形变。可通过下列只读悬停输入自行计算几何：

| 引用 | 用途 |
| --- | --- |
| `${self.hovered}` | 当前视图是否处于悬停目标状态，布尔值 |
| `${self.hoverProgress}` | 当前悬停动画进度，`0..1` |
| `${parent.hovered}`、`${parent.hoverProgress}` | 父视图的相同输入 |
| `${组件.view.节点.hovered}`、`${组件.view.节点.hoverProgress}` | 按完整视图路径读取悬停状态 |

### 自定义悬停区域 hoverRegion

在视图下添加 `hoverRegion { ... }` 可区分进入区域与保持区域。这里使用**世界 DIP 坐标**，不是相对父节点坐标。

| 字段 | 用途 |
| --- | --- |
| `x`、`y`、`width`、`height` | 指针进入悬停的矩形；省略字段使用当前视图矩形；宽高非负 |
| `retainX`、`retainY`、`retainWidth`、`retainHeight` | 悬停后保持状态的矩形；省略字段跟随进入矩形，适合展开后扩大保持范围 |
| `enabled` | 是否启用该区域；视图隐藏、禁用或指针离开会取消悬停 |

### 本地状态 state

```text
Preset { dependsOn: "Pogget_Std" }

ExpandableCard {
  state { expanded: false, count: 0, caption: "详情" },
  view {
    type: "button", x: 16, y: 64,
    width: ${state.expanded} ? 240 : 100,
    height: 40,
    label: ${state.caption}, textLiteral: true,
    toggle: "state.expanded"
  }
}
```

状态默认值只接受布尔、有限数值或字符串字面量，可用负数。`toggle` 只翻转布尔变量；长按执行 `holdAction` 时不翻转。状态按收纳盒隔离，同一预设兼容热更新时保留，重启或切换预设时重置。要持久保存真实视图/折叠设置，应使用内部动作；要保存面板参数，使用 `ui`。

## 表达式与函数

| 写法 | 用途 |
| --- | --- |
| `+`、`-`、`*`、`/`、`%`、`^` | 加、减、乘、除、浮点余数、幂；除数不能为零 |
| `==`、`!=`、`<`、`<=`、`>`、`>=` | 比较，返回布尔值 |
| `&&`、`\|\|`、`!` | 逻辑与、或、非 |
| `条件 ? 值一 : 值二` | 条件选择；表达式采用栈式求值，不要依赖分支短路来避开除零等错误 |
| `pi` | 圆周率常量 |
| `min(a,b)`、`max(a,b)` | 两个值的较小/较大值 |
| `clamp(v,lo,hi)` | 将数值限制在闭区间内，要求 `lo <= hi` |
| `abs(v)` | 绝对值 |
| `floor(v)`、`ceil(v)` | 向下/向上取整 |
| `round(v)` | 四舍五入到整数，半值按 C++ `round` 规则远离零 |
| `trunc(v)` | 向零截断，如 `trunc(-1.8) = -1` |
| `f32(v)` | 转为单精度再返回数值，用于保留原生浮点布局的舍入 |
| `sqrt(v)` | 平方根，输入须非负 |
| `pow(a,b)` | 幂，与 `a ^ b` 相同 |
| `hypot(x,y)` | 计算 `sqrt(x*x + y*y)` |
| `rgb(r,g,b)` | 构造 COLORREF，各通道截断并限制到 `0..255` |
| `red(c)`、`green(c)`、`blue(c)` | 读取 COLORREF 的红、绿、蓝通道 |
| `average(c)` | 读取颜色通道的整数平均亮度 |
| `fade(c,amount)` | 兼容原生亮度调整：平均亮度大于 128 时减去 `amount`，否则加上；调整量先向零截断，范围 ±255，各通道限制到 `0..255` |

`fade()` 不是不透明度函数，也不是始终变亮/变暗。字符串、布尔与数值的最终使用必须符合目标属性类型。没有循环、脚本和任意函数调用。

| 引用形式 | 查找范围 |
| --- | --- |
| `${self.width}` | 当前块的属性；兼容形式 `${self.width.value}` 也可用 |
| `${parent.width}` | 父块属性 |
| `${vars.name}` | 当前组件的派生变量 |
| `${ui.Name.value}` | 当前组件的面板参数值 |
| `${state.name}` | 当前组件的会话状态 |
| `${Component.vars.name}` | 其他组件的完整属性路径 |
| `${pogget.width}` 等 | 宿主只读输入，见[完整输入表](./inputs) |

## 设置控件 ui

每个 `ui` 子块声明一个控件，显式写 `type` 和 `control`。除按钮外提供 `default`，数值滑块同时填写 `min`、`max`、`step`。`choice` 的默认值是从 0 开始的选项序号。

| `control` | `type` 与用途 |
| --- | --- |
| `slider` | `number`；数值滑块 |
| `number` | `number`；当前映射到同一数值滑块 |
| `switch` | `boolean`；开关，默认值须为布尔 |
| `toggle` | `switch` 的别名 |
| `choice` | 通常为 `number`；通过 `choices` 或 `options` 声明下拉选项 |
| `select` | `choice` 的别名 |
| `text` | `string`；文本编辑控件 |
| `edit` | `text` 的别名 |
| `color` | `number`；颜色编辑器，值为 COLORREF |
| `button` | 动作按钮，通过 `action` 调用内部动作，无需 `default` |
| `font` | `string`；字体选择，保存字体族名称 |

### 控件字段

| 字段 | 用途 |
| --- | --- |
| `label` | 控件标题，可用内置文案 ID |
| `type` | 值类型，常用 `number`、`boolean`、`string` |
| `control` | 上表控件名称 |
| `default` | 初始值，必须与控件类型匹配 |
| `min`、`max`、`step` | 数值下限、上限、步进，步进须大于零 |
| `bind` | 原生设置绑定名，见下表；省略则保存该预设自己的参数 |
| `value` | 运行时当前值，通常用 `${ui.字段名.value}` 读取，不用它代替 `default` |
| `visible` | 是否在面板显示，可使用表达式 |
| `choices`、`options` | 选项块，按声明顺序编号，可使用 `c0: 文案`，也可用含 `label` 的子块 |
| `invert` | 对二选一选项的显示索引和值进行 `1 - value` 转换，常见于布尔设置 |
| `action` | `button` 调用的内部动作 |
| `offsetY` | 数值滑块的垂直绘制偏移 |
| `notice` | 控件下方提示文案 |
| `noticeHeight`、`noticeGap` | 提示高度、提示之后的布局增量，默认 `50`、`58` |
| `effectiveDefault` | 原生默认值哨兵的有效回退，例如 `TitleBlurRadius` 的 `-1`；应按标准控件使用 |
| `display` | 数值滑块设为 `"percent"` 时，将标题中的数值显示为百分比 |

### 原生设置绑定 bind

以下 **39 个**绑定来自当前标准预设的完整控件集合，大小写需一致。原生设置与通用视图属性是不同层次，例如 `cornerRad` 是窗口设置，`radius` 是某个图元的圆角。

| `bind` | 类型/值与用途 |
| --- | --- |
| `CompatibleLayer` | `0..4`；默认、静态、模糊、透明、扩展渲染层 |
| `BackgroundColor` | COLORREF；收纳盒背景色 |
| `bgAlpha` | `0..1`；收纳盒背景不透明度 |
| `DwmCornerPreference` | `0` 小圆角、`1` 普通圆角；DWM 圆角偏好 |
| `cornerRad` | 标准控件 `0..20`；窗口自定义圆角 |
| `EnableStaticMaterialLayerForD3D11` | 布尔；启用 D3D11 静态材质层 |
| `shadowBlur` | 标准控件 `0..32`；扩展窗口阴影模糊 |
| `shadowAlpha` | `0..1`；窗口阴影不透明度 |
| `shadowOffsetX`、`shadowOffsetY` | 标准控件 ±32；窗口阴影横纵偏移 |
| `TransparentFrameMode` | `0` 无边框、`1` 画布、`2` 原生、`3` 高光边框 |
| `BorderColor` | COLORREF；窗口边框色 |
| `BorderOpacity` | `0..1`；窗口边框不透明度 |
| `TitleType` | 标准 `0` 经典、`1` 悬浮、`2` 胶囊；新声明路径支持 `0..65535`，扩展值需要自行声明样式 |
| `TitleBarColor` | COLORREF；标题栏颜色 |
| `titleAlpha` | `0..1`；标题背景不透明度 |
| `TitleBlurRadius` | 标准控件 `0..32`；标题模糊半径；默认 `-1` 表示使用有效默认值 |
| `tagAlpha` | `0..1`；标签不透明度 |
| `tagTextAlpha` | `0..1`；标签文字不透明度 |
| `TagStyle` | 标准 `0` 贴纸、`1` 轮廓、`2` 荧光笔、`3` 纯色、`4` 文字；新路径支持 `0..65535`，扩展样式由预设声明 |
| `tagFontFamily` | 字符串；标签字体族 |
| `ShowDefaultFolderIcon` | 布尔；`false` 使用文件夹内容预览，`true` 使用系统文件夹图标 |
| `ShowTextPreview` | 布尔；是否显示文本预览 |
| `ShowMediaPreview` | 布尔；是否显示媒体预览 |
| `HideFileExtension` | `0` 显示扩展名、`1` 隐藏扩展名、`2` 隐藏全部文件名 |
| `FileNameColorMode` | `0` 主题、`1` 白色、`2` 黑色文字 |
| `TextRenderMode` | `0` 无阴影、`1` 厚阴影、`2` 轻阴影、`3` 主题阴影 |
| `ListDetailType` | `0` 大小、`1` 不显示详情、`2` 日期 |
| `fontFamily` | 字符串；文件名字体族 |
| `textSize` | 标准控件 `6..18`、步进 `0.5`；文件名字号 |
| `TextOmitOffset` | 标准控件 `-6..6`；文件名省略预算偏移 |
| `AllowTextWrapOverflow` | 布尔；允许文件名换行溢出 |
| `FadeOutSwitch` | 布尔；启用渐隐效果 |
| `AutoHideTitleBar` | `0` 自动显示、`1` 隐藏并重排、`2` 仅隐藏、`3` 始终显示 |
| `QuickExpandCollapse` | `0` 不使用快捷展开、`1` 双击、`2` 单击 |
| `CollapseDirection` | `0` 自动、`1` 向上、`2` 向下 |
| `AutoFade` | `0` 禁用、`1` 自动淡出、`2` 自动折叠 |
| `FolderOpenMode` | `0` 不启用内联、`1` 启用内联文件夹/文档查看 |
| `SwipeUpSearchEnabled` | 布尔；是否启用上滑搜索 |

颜色控件还使用原生配套来源设置，见下一段；它们不是新增的 `bind` 项。不要随意把任意配置键填入 `bind`。

### 原生颜色来源

`BackgroundColor`、`BorderColor`、`TitleBarColor` 的颜色控件会同时处理配套来源选择：

| 配套设置 | 用途 |
| --- | --- |
| `CustomBackgroundColor`、`CustomBorderColor` | 布尔；背景/边框是否使用自定义颜色，由对应颜色控件管理 |
| `TitleBarColorSource` | `0` 主题、`1` 标签、`2` 自定义；标题栏颜色来源，由对应颜色控件管理 |

## 设置面板 Panel

`Panel` 调整个性化设置窗口，不是收纳盒内容区。以下为当前面板读取的全部布局项，数值默认单位 DIP：

| 属性 | 标准值与用途 |
| --- | --- |
| `width`、`height` | `400`、`630`；设置窗口尺寸 |
| `top`、`globalTop` | `140`、`64`；普通/全局专用面板的内容起点 |
| `footer` | `70`；底部区域预留高度 |
| `margin`、`padding` | `20`、`16`；外侧留白与组内间距 |
| `header`、`gap` | `52`、`12`；分组标题高度与组间距 |
| `bodyTop`、`bodyBottom` | `14`、`16`；组内顶部、底部留白 |
| `contentTop`、`contentBottom` | `15`、`50`；滚动内容顶部与底部余量 |
| `labelHeight`、`labelSize`、`labelFade` | `18`、`12`、`45`；字段标题高度、字号与颜色调整量 |
| `optionY`、`optionHeight`、`optionSize`、`optionGap` | `20`、`36`、`14`、`65`；选项控件偏移、高度、字号和布局增量 |
| `sliderHeight`、`sliderGap`、`sliderFade` | `32`、`50`、`50`；滑块高度、布局增量、颜色调整量 |
| `toggleWidth`、`toggleHeight`、`toggleTextX`、`toggleGap` | `40`、`22`、`54`、`40`；开关大小、文字横偏移与布局增量 |
| `colorY`、`colorHeight`、`colorGap` | `22`、`34`、`70`；颜色来源切换控件的偏移、高度和布局增量 |
| `editorHeight`、`editorGap` | `200`、`210`；颜色编辑区域高度和布局增量 |
| `groupOpacity`、`groupHoverOpacity` | `0.35`、`0.45`；分组普通/悬停背景不透明度 |

标准文件还声明 `Panel.background`、`Panel.groupBackground` 供表达式引用；当前面板绘制本身仍直接使用原生主题色，不会因只覆盖这两个声明就自动换色。

## 原生组件兼容属性

旧预设的 `pogget.native.Background`、`pogget.native.Tag`、`pogget.native.VinaIcon`、`pogget.native.Behavior` 在 `view` 下向原生模型传递以下属性。它们不是新增图元，字段大小写与原生配置一致。相同含义的设置绑定已在上文解释；这里补充兼容路径本身的接受范围，避免与某个标准滑块的范围混淆。

| `view` 属性 | 用途与兼容范围 |
| --- | --- |
| `backgroundAlpha`、`titleAlpha`、`tagAlpha`、`tagTextAlpha` | 背景、标题、标签、标签文字不透明度，`0..1` |
| `CompatibleLayer`、`TransparentFrameMode`、`DwmCornerPreference` | 渲染层 `0..4`、边框模式 `0..3`、DWM 圆角偏好 `0..1` |
| `cornerRad` | 窗口圆角，`0..512` |
| `shadowBlur`、`shadowAlpha` | 窗口阴影模糊 `0..128`、不透明度 `0..1` |
| `shadowOffsetX`、`shadowOffsetY` | 窗口阴影偏移，±256 |
| `EnableStaticMaterialLayerForD3D11` | 静态材质层开关，`0/1` |
| `TitleType`、`TagStyle` | 标题、标签样式编号，`0..65535`，外观由对应声明实现 |
| `ShowDefaultFolderIcon`、`ShowTextPreview`、`ShowMediaPreview` | 默认文件夹图标、文本预览、媒体预览开关，`0/1` |
| `HideFileExtension`、`FileNameColorMode`、`ListDetailType` | 文件名显示、颜色、详情策略，分别为 `0..2`，含义同绑定表 |
| `TextRenderMode` | 文字阴影策略，`0..3` |
| `textSize` | 原生文件名字号，`6..72` |
| `TextOmitOffset` | 文件名省略预算偏移，`-6..6` |
| `AllowTextWrapOverflow`、`FadeOutSwitch` | 换行溢出、渐隐开关，`0/1` |
| `AutoHideTitleBar` | 自动隐藏标题策略，`0..3` |
| `QuickExpandCollapse`、`CollapseDirection`、`AutoFade` | 快捷展开、展开方向、自动隐藏行为，分别 `0..2` |
| `FolderOpenMode`、`SwipeUpSearchEnabled` | 内联模式、上滑搜索，`0/1` |
| `fontFamily`、`tagFontFamily` | 原生文件名、标签字体族字符串 |
| `BorderOpacity`、`TitleBlurRadius` | 原生颜色样式的边框不透明度、标题模糊半径，通常保留标准控件的合法范围与默认值策略 |

### 标准 VinaIcon 的附加外观字段

以下字段位于标准预设的 `VinaIcon.view`，由 `FileIconSurface` 读取；缺少新表面 slot 的旧预设也会读取这些字段。它们是该组件的样式参数，不能填写到 `bind`。

| 字段 | 用途与标准控件范围 |
| --- | --- |
| `IconBackground` | 布尔；启用图标背景 |
| `IconBackgroundColor` | COLORREF；图标背景颜色 |
| `IconBackgroundOpacity`、`IconBackgroundHoverOpacity` | `0..1`；背景普通/悬停不透明度 |
| `IconBackgroundRadius` | `0..128`；图标背景圆角 |
| `IconBackgroundExpandX` | `0..64` DIP，步长 `1`，初始默认 `4`；向左、右各扩展此距离，背景总宽增加两倍该值，高度不变 |
| `IconBackgroundExpandY` | `0..64` DIP，步长 `1`，初始默认 `4`；向上、下各扩展此距离，背景总高增加两倍该值，宽度不变 |
| `IconBackgroundExpand` | 旧版单值兼容入口；未单独覆盖的 X/Y 轴沿用此值，通常为 `4` DIP。标准面板已隐藏此控件，新修改使用 X/Y |
| `IconBorder` | 布尔；启用图标边框 |
| `IconBorderColor` | COLORREF；图标边框颜色 |
| `IconBorderWidth` | `0..8`；图标边框宽度 |
| `IconBorderOpacity` | `0..1`；图标边框不透明度 |

标准面板的两个滑块分别位于 `VinaIcon.ui.IconBackgroundExpandX` 和 `VinaIcon.ui.IconBackgroundExpandY`，开启图标背景或图标边框时显示。背景与边框共用扩展后的表面；这不会放大图标位图，也不会改变文件名布局、图标间距或点击区域。圆角上限为表面较短边的一半。

修改预设时，建议覆盖对应 `ui` 字段的 `default`，保留 `view` 与滑块的连接，见[分别调整图标背景 X/Y](../custom-vina#icon-background-axes)。已有的预设内保存值优先于默认值；只改一个方向时，仅覆盖该轴。旧保存值和旧依赖预设的 `IconBackgroundExpand` 覆盖仍可沿用，单独设置的轴（包括 `0`）优先。

本页按 `VinaStyle.hpp`、`VinaView.hpp`、`PoggetPersonalizationPanel.inl`、`PoggetPersonalizationRuntime.hpp` 和 `Pogget_Std.vina` 核对（2026-11-09）。`pressed`、`shadow`、`border`、`background`、`variants` 等同名子块属于保留元数据，不作为子视图绘制；当前普通外观使用上表扁平属性，不应把保留块名当成自动生效的样式接口。
