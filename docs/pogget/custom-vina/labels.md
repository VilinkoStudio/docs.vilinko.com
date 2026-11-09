---
prev:
  text: '绘制阶段与高级布局'
  link: '/docs/pogget/custom-vina/slots'
next:
  text: '组件编组'
  link: '/docs/pogget/group'
---

# 内置文案

`pogget.label.*` 是已有界面文字的多语言标识符。用于 `label`、`description`、`notice` 等文案字段时，Pogget 按当前语言解析它。它不是宿主数值引用，也不是可以执行的动作。

```text
Preset { dependsOn: "Pogget_Std" }

MySettings {
  label: pogget.label.titleSectionTitle,
  ui {
    Radius {
      label: "我的圆角",
      type: "number", control: "slider",
      min: 0, max: 32, step: 1, default: 12
    }
  }
}
```

自己提供的用户文字可用 `textLiteral: true` 按原文绘制；无需为每段自定义文字寻找一个近似文案 ID。下表列出当前注册的全部 **406 个标识符**，按名称分组，右侧为简体中文内容，便于核对准确含义。菜单装饰图标标记和多余排版空格已省略；格式化占位符（如 `%d`、`%s`）保留，引用本身不会自动补入参数。

## A–C

| 标识符 | 简体中文内容 |
| --- | --- |
| `pogget.label.adsorbTip` | 吸附 |
| `pogget.label.ahAlwaysShow` | 始终常驻 |
| `pogget.label.ahAutoShow` | 自动常驻（默认） |
| `pogget.label.ahHideOnly` | 仅隐藏 |
| `pogget.label.ahHideReflow` | 隐藏并调整排版 |
| `pogget.label.ahbCollapse` | 自动折叠 |
| `pogget.label.ahbDisabled` | 关闭（默认） |
| `pogget.label.ahbFadeOut` | 自动淡化 |
| `pogget.label.allowTextWrapOverflow` | 允许文本换行溢出 |
| `pogget.label.alwaysOnTopMenu` | &lt;置顶&gt; |
| `pogget.label.autoHideBehaviorTitle` | 自动隐藏 |
| `pogget.label.autoHideTitleBarTitle` | 自动隐藏标题栏 |
| `pogget.label.backgroundColorTitle` | 背景颜色 |
| `pogget.label.badgeCancel` | :✕: 取消 |
| `pogget.label.badgeCopy` | 复制 |
| `pogget.label.badgeMap` | 映射 |
| `pogget.label.badgeMove` | :→: 移动 |
| `pogget.label.badgeOpen` | 打开 |
| `pogget.label.badgeRecycle` | 回收 |
| `pogget.label.badgeStow` | 收纳 |
| `pogget.label.behaviorSectionSubtitle` | 自动隐藏 · 快捷展开折叠 · 内联视图 |
| `pogget.label.behaviorSectionTitle` | 行为 |
| `pogget.label.bgOpacityTitle` | 背景不透明度 |
| `pogget.label.bgSectionSubtitle` | 渲染样式 · 材质透明度 · 合成 |
| `pogget.label.bgSectionTitle` | 背景 |
| `pogget.label.borderCanvas` | 画布 |
| `pogget.label.borderColorTitle` | 边框颜色 |
| `pogget.label.borderHighlight` | 高光 |
| `pogget.label.borderNative` | 原生边框 |
| `pogget.label.borderNone` | 无边框（默认） |
| `pogget.label.borderOpacityTitle` | 边框不透明度 |
| `pogget.label.btnDontSave` | 不保存 |
| `pogget.label.btnFind` | 查找 |
| `pogget.label.btnHide` | 隐藏 |
| `pogget.label.btnOK` | 确定 |
| `pogget.label.btnPaste` | 粘贴 |
| `pogget.label.btnRefresh` | 刷新 |
| `pogget.label.cancel` | 取消 |
| `pogget.label.clearBtn` | 清除按钮的图标标记 `:\uf014:`，无文字 |
| `pogget.label.collapseDirectionAuto` | 自动（默认） |
| `pogget.label.collapseDirectionDown` | 始终向下 |
| `pogget.label.collapseDirectionTitle` | 折叠方向 |
| `pogget.label.collapseDirectionUp` | 始终向上 |
| `pogget.label.colorBlack` | 黑色 |
| `pogget.label.colorSourceCustom` | 自定义 |
| `pogget.label.colorSourceTag` | 标签色 |
| `pogget.label.colorSourceTheme` | 主题 |
| `pogget.label.colorTagStyleTitle` | 颜色标签样式 |
| `pogget.label.colorTheme` | 主题（默认） |
| `pogget.label.colorWhite` | 白色 |
| `pogget.label.confirm` | 确定 |
| `pogget.label.containerDeleteMenu` | 删除 |
| `pogget.label.containerDeleteSubmenu` | 删除 :›: |
| `pogget.label.containerSettingsMenu` | :⚙: 设置 :›: |
| `pogget.label.containerSettingsTitle` | 收纳盒设置 |
| `pogget.label.customHorizontalPaged` | 横向分页 |
| `pogget.label.customVerticalContinuous` | 纵向不分页 |
| `pogget.label.customVerticalPaged` | 纵向分页 |

## D–H

| 标识符 | 简体中文内容 |
| --- | --- |
| `pogget.label.deleteComponentMsg` | 确定要删除组件嘛？（此操作不可撤销）＞︿＜ |
| `pogget.label.deletePermanentOpt` | 彻底删除 |
| `pogget.label.deleteRecordUndoStep` | 记录撤销步骤 |
| `pogget.label.deleteRecycleOpt` | 移动到回收站 |
| `pogget.label.deleteSelectedMsg` | 确定要删除选中的文件？<br>（文件将从本地移除） |
| `pogget.label.deleteSelectedTitle` | 删除选中 |
| `pogget.label.deleteSingleMsg` | 确定要删除此文件吗？<br>（将会删除本地文件） |
| `pogget.label.deleteTitle` | 删除 |
| `pogget.label.detailDate` | 修改日期 |
| `pogget.label.detailNone` | 无 |
| `pogget.label.detailSize` | 文件大小（默认） |
| `pogget.label.dwmCornerNormal` | 正常圆角 |
| `pogget.label.dwmCornerSmall` | 小圆角（默认） |
| `pogget.label.dwmCornerTitle` | 圆角合成 |
| `pogget.label.enableStaticLayerText` | 启用静态材质层 |
| `pogget.label.errorTitle` | 错误 |
| `pogget.label.fadeDisabled` | 关闭（默认） |
| `pogget.label.fadeEnabled` | 开启 |
| `pogget.label.fadeTransitionTitle` | 渐隐效果 |
| `pogget.label.fileErrorAccessDenied` | 权限不足，无法完成此操作。请检查文件权限或以适当权限重试。 |
| `pogget.label.fileErrorAlreadyExists` | 目标位置已存在同名文件或文件夹。 |
| `pogget.label.fileErrorCancelled` | 操作已被取消。 |
| `pogget.label.fileErrorDiskFull` | 磁盘可用空间不足，无法完成此操作。 |
| `pogget.label.fileErrorInUse` | 文件或文件夹正在被其他程序使用，请关闭占用它的程序后重试。 |
| `pogget.label.fileErrorInvalidPath` | 文件名或路径无效。 |
| `pogget.label.fileErrorNetworkUnavailable` | 网络位置当前不可用，请检查网络连接后重试。 |
| `pogget.label.fileErrorNotFound` | 找不到文件或文件夹，它可能已被移动、重命名或删除。 |
| `pogget.label.fileErrorOperationBusy` | 另一个文件操作仍在进行，请等待它完成后重试。 |
| `pogget.label.fileErrorReadOnly` | 文件、文件夹或磁盘处于只读状态。 |
| `pogget.label.fileErrorUnknown` | 发生了未知的文件系统错误。 |
| `pogget.label.fileNameColorTitle` | 文件名颜色 |
| `pogget.label.fileNameHideAll` | 不显示文件名 |
| `pogget.label.fileNameHideExt` | 隐藏文件扩展名 |
| `pogget.label.fileNameShowExt` | 显示文件扩展名（默认） |
| `pogget.label.fileNameTitle` | 文件名称 |
| `pogget.label.fileOpActionAdd` | 添加 |
| `pogget.label.fileOpActionCopy` | 复制 |
| `pogget.label.fileOpActionDelete` | 删除 |
| `pogget.label.fileOpActionEdit` | 编辑 |
| `pogget.label.fileOpActionMove` | 移动 |
| `pogget.label.fileOpActionRecycle` | 回收 |
| `pogget.label.fileOpActionRemove` | 移除 |
| `pogget.label.fileOpActionRename` | 重命名 |
| `pogget.label.fileOpActionReorder` | 移动图标 |
| `pogget.label.fileOpCopied` | 已复制 |
| `pogget.label.fileOpCountSuffix` | 个文件 |
| `pogget.label.fileOpCut` | 已剪切 |
| `pogget.label.fileOpDeleted` | 已删除 |
| `pogget.label.fileOpFolderCountSuffix` | 个文件夹 |
| `pogget.label.fileOpIconCountSuffix` | 个图标 |
| `pogget.label.fileOpMixedCountSuffix` | 个文件（夹） |
| `pogget.label.fileOpMoved` | 已移动 |
| `pogget.label.fileOpOperationCountSuffix` | 项操作 |
| `pogget.label.fileOpPasted` | 已粘贴 |
| `pogget.label.fileOpRecycled` | 已回收 |
| `pogget.label.fileOpRedone` | 已重做 |
| `pogget.label.fileOpRemoved` | 已移除 |
| `pogget.label.fileOpUndone` | 已撤销 |
| `pogget.label.fileSharedProfileDesktopFallback` | 尝试将文件复制到公共目录时访问被拒绝。是否将其放置到桌面？ |
| `pogget.label.fileSharedProfileSourceRetained` | 文件已成功复制到目标位置，但系统未允许 Pogget 删除原文件。请手动删除以下原文件： |
| `pogget.label.folderPreview` | 显示文件夹预览（默认） |
| `pogget.label.folderSystem` | 显示系统图标 |
| `pogget.label.folderViewTitle` | 文件夹视图 |
| `pogget.label.fontDefaultText` | 默认 |
| `pogget.label.fontSelectionTitle` | 字体选择 |
| `pogget.label.fontSelectorText` | 选择字体... |
| `pogget.label.globalPersonalizationTitle` | 全局个性化 |
| `pogget.label.gridViewMenu` | 网格视图 |
| `pogget.label.groupKeysActionConflict` | 两个编组动作不能使用同一个快捷键。 |
| `pogget.label.groupKeysMemberSuffix` | 个收纳盒 |
| `pogget.label.groupKeysMenu` | 编组键 |
| `pogget.label.groupKeysMixed` | 当前编组内设置不一致，保存后将统一。 |
| `pogget.label.groupKeysTitle` | 编组键 |
| `pogget.label.groupMergeRestoreHotKey` | 合并 / 还原 |
| `pogget.label.groupTemporaryTopmostHotKey` | 临时置顶 |
| `pogget.label.helpAfterGroupedHold` | 编组后可按住 |
| `pogget.label.helpDragFiles` | 拖动来放置文件或移出文件 |
| `pogget.label.helpHoldKey` | 按住 |
| `pogget.label.helpPressKey` | 按下 |
| `pogget.label.helpToCopyFiles` | 来复制文件 |
| `pogget.label.helpToSetGroup` | 来设置编组 |
| `pogget.label.helpToTempUngroup` | 临时解除编组 |
| `pogget.label.hoverPressHotkey` | 悬停并按下组合键... |

## I–P

| 标识符 | 简体中文内容 |
| --- | --- |
| `pogget.label.iconBackgroundColorTitle` | 图标背景颜色 |
| `pogget.label.iconBackgroundExpandTitle` | 图标背景扩展 |
| `pogget.label.iconBackgroundExpandXTitle` | 图标背景 X 扩展 |
| `pogget.label.iconBackgroundExpandYTitle` | 图标背景 Y 扩展 |
| `pogget.label.iconBackgroundHoverOpacityTitle` | 图标悬停不透明度 |
| `pogget.label.iconBackgroundOffsetYTitle` | 图标背景 Y 偏移 |
| `pogget.label.iconBackgroundOpacityTitle` | 图标背景不透明度 |
| `pogget.label.iconBackgroundRadiusTitle` | 图标背景圆角 |
| `pogget.label.iconBackgroundTitle` | 图标背景 |
| `pogget.label.iconBorderColorTitle` | 图标边框颜色 |
| `pogget.label.iconBorderOpacityTitle` | 图标边框不透明度 |
| `pogget.label.iconBorderTitle` | 图标边框 |
| `pogget.label.iconBorderWidthTitle` | 图标边框宽度 |
| `pogget.label.iconSectionSubtitle` | 视图预览 · 文件名称 · 字体排版 · 详细信息 |
| `pogget.label.iconSectionTitle` | 图标 |
| `pogget.label.iconSpacingMenu` | 图标间隔 :›: |
| `pogget.label.inlineDisabled` | 关闭 |
| `pogget.label.inlineDocumentViewerNotice` | 开启后，打开文件夹、文本文件以及 Markdown 文件时，<br>会优先使用收纳盒内置编辑视图。 |
| `pogget.label.inlineDocumentViewerTitle` | 内联视图 |
| `pogget.label.inlineEnabled` | 启用 |
| `pogget.label.inlineForceDisabled` | 关闭（强制） |
| `pogget.label.labelCurrentComponent` | 当前组件 |
| `pogget.label.labelCurrentDirectory` | 当前目录 |
| `pogget.label.labelFailureReason` | 失败原因： |
| `pogget.label.labelFolder` | 文件夹 |
| `pogget.label.labelModifiedUnknown` | 修改于 : 未知 |
| `pogget.label.labelOtherComponents` | 其他组件 |
| `pogget.label.labelUngrouped` | 未编组 |
| `pogget.label.listDetailsTitle` | 列表详细信息 |
| `pogget.label.listViewMenu` | 列表视图 |
| `pogget.label.lockLayoutAndPosition` | 锁定布局和位置 |
| `pogget.label.lockLayoutMenu` | 锁定 :›: |
| `pogget.label.lockLayoutOnly` | 仅锁定布局 |
| `pogget.label.lockPositionOnly` | 仅锁定位置 |
| `pogget.label.mediaPreviewShow` | 显示媒体预览（默认） |
| `pogget.label.mediaPreviewSystem` | 显示系统图标 |
| `pogget.label.mediaPreviewTitle` | 媒体预览视图 |
| `pogget.label.menuCancelSelection` | :✕: 取消选择 |
| `pogget.label.menuCommandLine` | 命令行 |
| `pogget.label.menuControlPanel` | 控制面板 |
| `pogget.label.menuConvertToFinalLocation` | 转为最终位置 |
| `pogget.label.menuCopy` | 复制 |
| `pogget.label.menuCopyFile` | 复制文件 |
| `pogget.label.menuCopyGroup` | 复制 |
| `pogget.label.menuCopyPath` | 复制路径 |
| `pogget.label.menuCopyPlainText` | 复制纯文本 |
| `pogget.label.menuCopySelected` | 复制选中 |
| `pogget.label.menuCopyToCurrentContainer` | 复制到当前收纳盒 |
| `pogget.label.menuCreateCopy` | 创建副本 |
| `pogget.label.menuCustom` | 自定义 |
| `pogget.label.menuCut` | 剪切 |
| `pogget.label.menuCutGroup` | 剪切 |
| `pogget.label.menuCutSelected` | 剪切选中 |
| `pogget.label.menuDelete` | 删除 |
| `pogget.label.menuDeleteSelected` | 删除选中 |
| `pogget.label.menuEditPath` | 编辑路径 |
| `pogget.label.menuEmptyRecycleBin` | 清空回收站 |
| `pogget.label.menuFile` | 文件 |
| `pogget.label.menuInsertIcon` | 插入图标 |
| `pogget.label.menuInsertSubmenu` | 插入 :›: |
| `pogget.label.menuLinkToMainContainer` | 映射到主收纳盒 |
| `pogget.label.menuMergeSameColor` | 合并同色收纳盒 |
| `pogget.label.menuMergeSameColorNoGroup` | 合并同色收纳盒&lt;请设置颜色以编组&gt; |
| `pogget.label.menuMoveToCurrentContainer` | 移动到当前收纳盒 |
| `pogget.label.menuNetwork` | 网络 |
| `pogget.label.menuNewExcelDoc` | Excel 表格 |
| `pogget.label.menuNewFolder` | 文件夹 |
| `pogget.label.menuNewMarkdown` | Markdown |
| `pogget.label.menuNewPowerPointDoc` | PowerPoint 文稿 |
| `pogget.label.menuNewSubmenu` | 新建 :›: |
| `pogget.label.menuNewTextDoc` | 文本文件 |
| `pogget.label.menuNewWordDoc` | Word 文档 |
| `pogget.label.menuNewZipFile` | Zip 压缩文件 |
| `pogget.label.menuOpen` | 打开 |
| `pogget.label.menuOpenDir` | 打开目录 |
| `pogget.label.menuOpenDirectory` | 打开目录 |
| `pogget.label.menuOpenFinalLocation` | 打开最终位置 |
| `pogget.label.menuOpenWith` | 打开方式 |
| `pogget.label.menuOpenWithSubmenu` | 打开方式 :›: |
| `pogget.label.menuOverwrite` | 直接覆盖 |
| `pogget.label.menuPaste` | 粘贴 |
| `pogget.label.menuPathSubmenu` | 路径 :›: |
| `pogget.label.menuPrint` | 打印 |
| `pogget.label.menuRecycleBin` | 回收站 |
| `pogget.label.menuRedo` | 重做 |
| `pogget.label.menuRefresh` | 刷新 |
| `pogget.label.menuRemove` | 移除 |
| `pogget.label.menuRemoveSelected` | 移除选中 |
| `pogget.label.menuRename` | 重命名 |
| `pogget.label.menuRestore` | 归位 |
| `pogget.label.menuRestoreIndependent` | 还原为独立收纳盒 |
| `pogget.label.menuRunAsAdministrator` | 管理员 |
| `pogget.label.menuSetAlias` | 别名 |
| `pogget.label.menuStow` | 收纳 :›: |
| `pogget.label.menuThisPC` | 此电脑 |
| `pogget.label.menuTitle` | 标题 |
| `pogget.label.menuUndo` | 撤销 |
| `pogget.label.menuViewPath` | 查看路径 |
| `pogget.label.mergedHostUseTabLayout` | :tab: &lt;标签分隔&gt; |
| `pogget.label.mergedHostUseVerticalLayout` | &lt;纵向分隔&gt; |
| `pogget.label.msgConfirmRetryOperation` | 点击“确定”重试，点击“取消”放弃本次操作。 |
| `pogget.label.msgHideComponentNotice` | 本操作可以隐藏单个组件。<br>稍后可通过组件可见性快捷键重新显示。 |
| `pogget.label.msgMissingMappedFiles` | 映射的文件可能已经被删除或移动，<br>是否移除无效的图标？ |
| `pogget.label.msgPasteConflict` | 选择处理同名文件冲突的操作: |
| `pogget.label.msgRedoingFileOp` | 正在重做文件操作 |
| `pogget.label.msgSaveChanges` | 是否保存相关内容的更改？ |
| `pogget.label.msgTargetFolderMissing` | 收纳盒的目标文件夹可能已被删除或移动 |
| `pogget.label.msgUndoRedoFailed` | 撤销/重做未执行。该条记录已停止重试，<br>以避免文件反复移动。请检查日志和目标路径。 |
| `pogget.label.msgUndoingFileOp` | 正在撤销文件操作 |
| `pogget.label.nameClipboardImage` | 剪贴板图片 |
| `pogget.label.nameClipboardText` | 剪贴板文本 |
| `pogget.label.nameNewExcelDoc` | 新建 Excel 表格 |
| `pogget.label.nameNewFolder` | 新建文件夹 |
| `pogget.label.nameNewMarkdown` | 新建 Markdown |
| `pogget.label.nameNewPowerPointDoc` | 新建 PowerPoint 演示文稿 |
| `pogget.label.nameNewTextDoc` | 新建 文本文档 |
| `pogget.label.nameNewWordDoc` | 新建 Word 文档 |
| `pogget.label.nameNewZipFile` | 新建 Zip |
| `pogget.label.normalLayerMenu` | &lt;分层&gt; |
| `pogget.label.overviewContainerBusy` | 收纳盒正在折叠或展开，请稍后重试。 |
| `pogget.label.pagedLayoutTitle` | 自定义图标布局 |
| `pogget.label.pagedMaxColumns` | 横向最多 |
| `pogget.label.pagedMaxRows` | 纵向最多 |
| `pogget.label.pasteBoardCapacityDays` | 保留天数 |
| `pogget.label.pasteBoardCapacityEntries` | 保留条目数 |
| `pogget.label.pasteBoardCapacityTitle` | 剪贴容量 |
| `pogget.label.pasteBoardCapacityUnlimited` | 无限 |
| `pogget.label.pasteBoardCapacityWindowTitle` | 剪贴盒容量 |
| `pogget.label.pasteBoardCategoriesSaveFailed` | 无法保存文件类别设置，请重试。 |
| `pogget.label.pasteBoardCategoryImage` | 图片 |
| `pogget.label.pasteBoardCategoryOtherFiles` | 其他文件 |
| `pogget.label.pasteBoardCategoryText` | 文本 |
| `pogget.label.pasteBoardClearAction` | 清理 |
| `pogget.label.pasteBoardClearAndCloseAction` | 清理并关闭 |
| `pogget.label.pasteBoardCloseOnlyAction` | 仅关闭 |
| `pogget.label.pasteBoardCopied` | 已复制到剪贴板 |
| `pogget.label.pasteBoardCopyFailed` | 复制失败，请检查记录或源文件 |
| `pogget.label.pasteBoardCreateFailed` | 无法创建或更新剪贴盒，请检查收纳目录是否可用。 |
| `pogget.label.pasteBoardFileCategories` | 文件类别 |
| `pogget.label.pasteBoardGroupingUnavailable` | 剪贴盒当前暂不支持编组 |
| `pogget.label.pasteBoardImageName` | 剪贴板图片 |
| `pogget.label.pasteBoardPasteBlocked` | 系统拒绝了模拟粘贴，请检查 Pogget 与目标应用的权限级别。 |
| `pogget.label.pasteBoardPasteFailed` | 自动粘贴未完成，请重试。 |
| `pogget.label.pasteBoardPasteInterrupted` | 剪贴板内容已变化，已取消本次自动粘贴。 |
| `pogget.label.pasteBoardReleaseKeys` | 请松开快捷键和鼠标后重试。 |
| `pogget.label.pasteBoardSummonHotKey` | 召唤键 |
| `pogget.label.pasteBoardSummonRequiresEnabled` | 请先开启剪贴盒，再设置召唤键。 |
| `pogget.label.pasteBoardTargetUnavailable` | 原应用的输入焦点已改变或暂不可用，请定位光标后重试。 |
| `pogget.label.pasteBoardTextName` | 剪贴板文本 |
| `pogget.label.pasteBoardTitle` | 剪贴盒 |
| `pogget.label.pasteBoardToday` | 今天 |
| `pogget.label.pasteBoardUnknownDate` | 日期未知 |
| `pogget.label.pasteBoardYesterday` | 昨天 |
| `pogget.label.personalizationMenu` | 个性化 |
| `pogget.label.placeholderSearchFiles` | 搜索文件... |
| `pogget.label.placeholderSearchText` | 搜索文本... |
| `pogget.label.prefixModifiedAt` | 修改于 : |
| `pogget.label.prefixRedo` | 重做: |
| `pogget.label.prefixUndo` | 撤销: |

## Q–S

| 标识符 | 简体中文内容 |
| --- | --- |
| `pogget.label.qceDoubleClick` | 双击（默认） |
| `pogget.label.qceNone` | 无 |
| `pogget.label.qceSingleClick` | 单击 |
| `pogget.label.quickCollapseExpandTitle` | 快捷展开折叠 |
| `pogget.label.renderStyleBlur` | 模糊 (D3D11) |
| `pogget.label.renderStyleDefault` | 默认 |
| `pogget.label.renderStyleExtended` | 扩展（D3D11） |
| `pogget.label.renderStyleNotice` | 渲染样式决定收纳盒的背景画刷。<br>D3D11 将提供更加丰富的外观选项。 |
| `pogget.label.renderStyleStatic` | 静态材质层（兼容） |
| `pogget.label.renderStyleTitle` | 渲染样式 |
| `pogget.label.renderStyleTransparent` | 透明 (D3D11) |
| `pogget.label.richBlockquote` | &lt;引用&gt; |
| `pogget.label.richBold` | &lt;加粗&gt; |
| `pogget.label.richCopy` | &lt;复制&gt; |
| `pogget.label.richCut` | &lt;剪切&gt; |
| `pogget.label.richHeading` | &lt;标题&gt; |
| `pogget.label.richItalic` | &lt;斜体&gt; |
| `pogget.label.richPaste` | &lt;粘贴&gt; |
| `pogget.label.richStrikethrough` | &lt;删除线&gt; |
| `pogget.label.richUnderline` | &lt;下划线&gt; |
| `pogget.label.scopeGlobal` | 全局属性 |
| `pogget.label.scopeIndividual` | 独立属性 |
| `pogget.label.searchExcludeOthers` | 排除其他收纳盒 |
| `pogget.label.searchFileContents` | 搜索文件内容 |
| `pogget.label.searchIncludeAll` | 包括全部收纳盒 |
| `pogget.label.searchNoExpansion` | 不扩展搜索 |
| `pogget.label.searchPinyin` | 拼音检索 |
| `pogget.label.searchSpaceAnd` | 空格"与"逻辑 |
| `pogget.label.searchSubfolders` | 搜索子文件夹 |
| `pogget.label.sendToBackMenu` | &lt;置底&gt; |
| `pogget.label.settingsScopeTitle` | 属性作用域 |
| `pogget.label.settingsSearchEmpty` | 没有找到匹配的设置 |
| `pogget.label.settingsSearchEmptyHint` | 试试更短的关键词，或清空搜索以查看全部设置。 |
| `pogget.label.settingsSearchPlaceholder` | 搜索设置（Ctrl+F） |
| `pogget.label.shadowBlurPrefix` | 阴影模糊度: |
| `pogget.label.shadowBlurSuffix` | px |
| `pogget.label.shadowLight` | 浅阴影 |
| `pogget.label.shadowNone` | 无阴影（默认） |
| `pogget.label.shadowOffsetXPrefix` | 阴影偏移 X: |
| `pogget.label.shadowOffsetXSuffix` | px |
| `pogget.label.shadowOffsetYPrefix` | 阴影偏移 Y: |
| `pogget.label.shadowOffsetYSuffix` | px |
| `pogget.label.shadowOpacityPrefix` | 阴影不透明度: |
| `pogget.label.shadowOpacitySuffix` | % |
| `pogget.label.shadowTheme` | 主题色阴影 |
| `pogget.label.shadowThick` | 厚阴影 |
| `pogget.label.sortExtAsc` | 扩展名正序 |
| `pogget.label.sortExtDesc` | 扩展名倒序 |
| `pogget.label.sortFree` | 自由排序 |
| `pogget.label.sortFreeGrid` | 自由网格 |
| `pogget.label.sortMenu` | 排序方式 :›: |
| `pogget.label.sortNameAsc` | 名称正序 |
| `pogget.label.sortNameDesc` | 名称倒序 |
| `pogget.label.sortSizeAsc` | 大小正序 |
| `pogget.label.sortSizeDesc` | 大小倒序 |
| `pogget.label.sortTimeAsc` | 时间正序 |
| `pogget.label.sortTimeDesc` | 时间倒序 |
| `pogget.label.spacingCompact` | 紧凑 |
| `pogget.label.spacingDynamic` | 动态 |
| `pogget.label.spacingFixed` | 固定 |
| `pogget.label.spacingLoose` | 宽松 |
| `pogget.label.spacingPaged` | 自定义 |
| `pogget.label.spacingStandard` | 标准 |
| `pogget.label.susDisabled` | 关闭 |
| `pogget.label.susEnabled` | 启用（默认） |
| `pogget.label.swipeUpSearchTitle` | 上滑搜索 |
| `pogget.label.syncChangesBtn` | 同步更改 |

## T–Z

| 标识符 | 简体中文内容 |
| --- | --- |
| `pogget.label.tagFontSelectionTitle` | 标签字体 |
| `pogget.label.tagHighlighter` | 荧光笔 |
| `pogget.label.tagOpacityTitle` | 标签不透明度 |
| `pogget.label.tagOutline` | 描边 |
| `pogget.label.tagPlain` | 无装饰 |
| `pogget.label.tagSectionSubtitle` | 标签样式 · 不透明度 · 标题栏 |
| `pogget.label.tagSectionTitle` | 标签 |
| `pogget.label.tagSticker` | 贴纸（默认） |
| `pogget.label.tagStickerShort` | 贴纸 |
| `pogget.label.tagText` | 文本 |
| `pogget.label.tagTextOpacityTitle` | 标签文本不透明度 |
| `pogget.label.temporaryTopmostHotKeyConflict` | 快捷键已被其他功能或程序占用，请更换组合键。 |
| `pogget.label.textOmitDefault` | 文字省略: 当前基准 |
| `pogget.label.textOmitFormat` | 文字省略: 当前基准 %+d |
| `pogget.label.textPreviewShow` | 显示文本预览（默认） |
| `pogget.label.textPreviewSystem` | 显示系统图标 |
| `pogget.label.textPreviewTitle` | 文本预览视图 |
| `pogget.label.textShadowTitle` | 文本阴影 |
| `pogget.label.textSizeDefault` | 文本大小: 100% (默认) |
| `pogget.label.textSizeFormat` | 文本大小: %d%% |
| `pogget.label.titleBarColorTitle` | 标题栏颜色 |
| `pogget.label.titleBarStyleTitle` | 标签样式 |
| `pogget.label.titleBlurRadiusTitle` | 模糊半径 |
| `pogget.label.titleCapsule` | 胶囊 |
| `pogget.label.titleClassic` | VinaUI（默认） |
| `pogget.label.titleFileOperationFailed` | 文件操作失败 |
| `pogget.label.titleFindTargetFolder` | 查找目标文件夹 |
| `pogget.label.titleFloating` | 悬浮 |
| `pogget.label.titleOpacityTitle` | 标题栏不透明度 |
| `pogget.label.titlePasteConflict` | 解决冲突 |
| `pogget.label.titlePublicDirectoryOperation` | 公共目录文件 |
| `pogget.label.titleSave` | 保存 |
| `pogget.label.tooltipMapMode` | &lt;映射模式:<br>仅在收纳盒建立虚拟镜像，<br>类似快捷方式。&gt; |
| `pogget.label.tooltipMergeMode` | &lt;合并模式:<br>将相同颜色的收纳盒合并为一个大收纳盒。<br>管理更加快捷。&gt; |
| `pogget.label.tooltipSyncMode` | &lt;同步模式:<br>实时与收纳盒所在目录同步。<br>文件操作将直接作用于文件（夹）。&gt; |
| `pogget.label.unlockLayoutMenu` | 解除锁定 |
| `pogget.label.windowBorderTitle` | 窗口边框 |
| `pogget.label.windowCornerRadiusPrefix` | 窗口圆角大小: |
| `pogget.label.windowCornerRadiusSuffix` | px |

注册范围核对自 `PoggetPersonalizationLabels.inl`，中文内容取自 `MultiLanguage.hpp` 的当前简体中文默认文本（2026-11-09）。程序切换语言时按实际语言显示。
