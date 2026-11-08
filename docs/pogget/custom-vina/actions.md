---
prev:
  text: '宿主输入'
  link: '/docs/pogget/custom-vina/inputs'
next:
  text: '绘制阶段与高级布局'
  link: '/docs/pogget/custom-vina/slots'
---

# 内部动作

`action` 是短按动作，`holdAction` 是长按动作，值必须是下表中的完整 ID。它们调用 Pogget 已有功能，不是可执行脚本。当前共注册 **62 个动作**，以下逐个说明。

```text
Preset { dependsOn: "Pogget_Std" }

MenuButton {
  view {
    type: "button", interaction: "title", z: 10,
    x: 180, y: 8, width: 100, height: 28,
    label: "收纳盒菜单", textLiteral: true,
    action: pogget.action.container.menu
  }
}
```

有效释放才会执行动作；移出、失焦、隐藏、禁用或按下期间热更新会取消手势。有 `holdAction` 的长按不会再执行短按动作。

## 视图切换

| 内部动作 | 用途与条件 |
| --- | --- |
| `pogget.action.view.toggle` | 在列表视图与图标视图之间切换，并保存设置 |
| `pogget.action.view.list` | 切换到列表视图，并保存设置 |
| `pogget.action.view.grid` | 切换到图标视图，并保存设置 |
| `pogget.action.listViewMenu` | 与 `view.list` 相同，切换到列表视图；不是打开子菜单 |
| `pogget.action.iconViewMenu` | 与 `view.grid` 相同，切换到图标视图；不是打开子菜单 |

这五个动作在内联文件夹视图、自由网格排序或配置不可写时不执行切换。

## 收纳盒与标题

| 内部动作 | 用途与条件 |
| --- | --- |
| `pogget.action.container.lock` | 切换布局锁定状态并保存；不切换位置锁定 |
| `pogget.action.container.personalization` | 打开当前收纳盒的个性化面板 |
| `pogget.action.container.collapse` | 折叠收纳盒；已折叠时不重复切换，包括悬停折叠后尚未展开的状态 |
| `pogget.action.container.expand` | 展开收纳盒；已展开时不重复切换 |
| `pogget.action.container.toggleCollapse` | 调用原生折叠/展开行为，遵循当前标题与悬停折叠状态 |
| `pogget.action.container.menu` | 调用标题“更多”按钮，打开收纳盒菜单 |
| `pogget.action.container.tagMenu` | 调用标题标签的原生点击行为，打开颜色标签相关菜单 |
| `pogget.action.container.searchMenu` | 调用搜索选项按钮，打开搜索选项菜单 |
| `pogget.action.container.hoverCollapse` | 调用折叠按钮的原生长按行为，进入悬停展开式折叠；已在该模式时保持；临时置顶会话中则结束该会话 |
| `pogget.action.container.pin` | 固定悬停展开后的收纳盒：退出悬停折叠并保持展开，保存该状态；不是窗口置顶开关 |
| `pogget.action.container.endTemporarySession` | 结束当前临时置顶会话，按原生规则恢复窗口状态 |

`collapse`、`expand`、`toggleCollapse` 要求配置可写。菜单、标签和固定等动作依赖当前原生控件存在。

## 内联文件夹与编辑器

| 内部动作 | 用途与条件 |
| --- | --- |
| `pogget.action.container.inlineBack` | 内联文件夹视图后退，交给原生导航处理；不在内联视图时无效 |
| `pogget.action.container.exitInlineSearch` | 退出内联文件夹搜索；要求处于搜索中，且不是内联编辑模式 |
| `pogget.action.container.inlineHome` | 清空内联文件夹导航历史并退出到收纳盒主页；编辑模式不执行 |
| `pogget.action.container.inlineSave` | 将当前内联编辑器内容保存为 UTF-8；要求正在编辑且存在文件路径 |
| `pogget.action.container.inlineOpen` | 用外部程序打开当前内联编辑文件；只在编辑模式且有文件路径时执行 |
| `pogget.action.container.toggleInlineSearch` | 开启或关闭内联文件夹/编辑器搜索，并更新输入焦点、搜索内容和滚动状态 |

`inlineHome`、`inlineSave`、`inlineOpen`、`toggleInlineSearch` 都要求内联视图存在、未进入待退出状态且目标文件夹可用。

## 合并布局与窗口层级

以下为原生菜单能力。每次调用都会按当前状态重建菜单并检查父项和子项；菜单中不存在或被禁用的动作不会执行，不会绕过原生限制。

| 内部动作 | 用途与条件 |
| --- | --- |
| `pogget.action.mergedHostUseVerticalLayout` | 将合并收纳盒切换为纵向分隔布局；仅合并宿主提供 |
| `pogget.action.mergedHostUseTabLayout` | 将合并收纳盒切换为标签页布局；仅合并宿主提供 |
| `pogget.action.alwaysOnTopMenu` | 将窗口设为置顶层并保存，解除桌面嵌入 |
| `pogget.action.normalLayerMenu` | 将窗口设为普通层并保存，解除置顶和桌面嵌入 |
| `pogget.action.sendToBackMenu` | 将窗口设为底层并保存；根据全局桌面嵌入设置，嵌入桌面或置底 |

## 间距与分页

| 内部动作 | 用途与条件 |
| --- | --- |
| `pogget.action.spacingCompact` | 选择紧凑图标间距 |
| `pogget.action.spacingStandard` | 选择标准图标间距 |
| `pogget.action.spacingLoose` | 选择宽松图标间距 |
| `pogget.action.spacingPaged` | 启用分页布局，并打开分页布局设置窗口 |
| `pogget.action.spacingFixed` | 将间距类型设为固定；分页模式同时保存固定布局参数 |
| `pogget.action.spacingDynamic` | 将间距类型设为动态；分页模式同时保存动态布局参数 |
| `pogget.action.iconSpacingMenu` | 打开图标间距子菜单 |

## 排序

| 内部动作 | 用途与条件 |
| --- | --- |
| `pogget.action.sortFree` | 切换为自由排序，保留手动排列方式 |
| `pogget.action.sortNameAsc` | 按名称正序排序 |
| `pogget.action.sortNameDesc` | 按名称倒序排序 |
| `pogget.action.sortTimeAsc` | 按时间正序排序，较旧项在前 |
| `pogget.action.sortTimeDesc` | 按时间倒序排序，较新项在前 |
| `pogget.action.sortExtAsc` | 按扩展名正序排序 |
| `pogget.action.sortExtDesc` | 按扩展名倒序排序 |
| `pogget.action.sortSizeAsc` | 按文件大小正序排序，较小项在前 |
| `pogget.action.sortSizeDesc` | 按文件大小倒序排序，较大项在前 |
| `pogget.action.sortFreeGrid` | 启用自由网格排序；受实验室功能权限限制，未启用时进入相应功能入口 |
| `pogget.action.sortMenu` | 打开排序子菜单 |

统一合并宿主的排序受原生策略限制。剪贴板收纳盒仅提供时间排序；自由网格还要求当前收纳盒支持该模式。

## 锁定与设置菜单

| 内部动作 | 用途与条件 |
| --- | --- |
| `pogget.action.unlockLayoutMenu` | 解除布局和位置锁定；当前存在任意锁定时提供 |
| `pogget.action.lockLayoutAndPosition` | 同时锁定布局与位置；在可用的锁定子菜单中提供 |
| `pogget.action.lockLayoutOnly` | 只锁定布局，位置保持未锁定 |
| `pogget.action.lockPositionOnly` | 只锁定位置，布局保持未锁定 |
| `pogget.action.lockLayoutMenu` | 打开锁定子菜单；当前未锁定时提供 |
| `pogget.action.personalizationMenu` | 打开当前收纳盒的个性化面板，与 `container.personalization` 对应同一功能 |
| `pogget.action.containerSettingsMenu` | 打开收纳盒设置子菜单 |

合并宿主的锁定子菜单可能仅提供位置锁定。切勿把这些指定目标状态的动作解释成统一的“开关”。

## 剪贴板与删除

| 内部动作 | 用途与条件 |
| --- | --- |
| `pogget.action.pasteBoardCapacityTitle` | 打开剪贴容量设置窗口；仅剪贴板收纳盒提供 |
| `pogget.action.pasteBoardCategoryText` | 切换是否捕获文本；修改剪贴板捕获类别设置 |
| `pogget.action.pasteBoardCategoryImage` | 切换是否捕获图片 |
| `pogget.action.pasteBoardCategoryOtherFiles` | 切换是否捕获其他文件 |
| `pogget.action.pasteBoardFileCategories` | 打开剪贴板文件类别子菜单 |
| `pogget.action.pasteBoardClearAction` | 清空剪贴历史；成功后清空当前项目并刷新，保留剪贴板功能 |
| `pogget.action.pasteBoardClearAndCloseAction` | 清空剪贴历史，关闭剪贴板功能并移除该窗口 |
| `pogget.action.pasteBoardCloseOnlyAction` | 关闭剪贴板功能并移除窗口，保留已保存的剪贴历史 |
| `pogget.action.containerDeleteSubmenu` | 打开剪贴板收纳盒的清空/关闭子菜单 |
| `pogget.action.containerDeleteMenu` | 对普通收纳盒发起原生删除流程，具体确认与处理遵循该流程 |

剪贴板相关菜单动作仅在剪贴板收纳盒提供。动作 ID 中保留 `Menu`、`Title` 等历史命名；实际用途以上表为准。

本页根据 `PersonalizationActions.hpp`、`PersonalizationMenuActions.inl` 的完整注册表，以及 `PoggetDesktopContainer.hpp` 的分派和菜单声明核对（2026-11-08）。其他模块即使使用相似的 `pogget.action.*` 名称，也不能作为 CustomVina 动作调用。
