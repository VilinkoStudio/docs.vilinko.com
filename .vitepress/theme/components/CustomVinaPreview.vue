<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'overview' }
})

const accent = ref('#2aa9be')
const radius = ref(12)
const buttonLeft = ref(12)
const listView = ref(false)
const files = [
  { name: '设计稿', kind: 'folder' },
  { name: '封面.png', kind: 'image' },
  { name: '说明.md', kind: 'document' }
]
const captions = {
  overview: '标题、文件悬停和玻璃卡片的组合效果。将指针移到文件上试试看。',
  badge: '标题区域新增 CustomVina 标签，收纳盒内容继续保留。',
  card: '上方和两侧留出 16 的间距，卡片宽度随收纳盒变化。',
  header: '颜色标签居中，菜单移到标签下方。',
  tokens: '调整下面的强调色和圆角，观察标题表面的变化。',
  button: '点击左上角的按钮切换列表与图标视图，也可以调整按钮位置。',
  capsule: '半透明的胶囊标题，保留两侧的标题控件。',
  hover: '将指针移到文件图标上，或用 Tab 聚焦文件，查看强调色边框。',
  glass: '底部的半透明玻璃卡片，透出背景的颜色与光影。'
}
const hasGlass = computed(() => ['overview', 'glass'].includes(props.variant))
const hasHover = computed(() => ['overview', 'hover'].includes(props.variant))
const previewStyle = computed(() => {
  const channels = accent.value.match(/[\da-f]{2}/gi).map(value => parseInt(value, 16))
  return {
    '--cv-accent': accent.value,
    '--cv-surface': `rgb(${channels.map(value => Math.max(0, value - 35)).join(', ')})`,
    '--cv-radius': `${radius.value}px`,
    '--cv-button-left': `${buttonLeft.value}px`
  }
})
</script>

<template>
  <figure class="cv-preview" :class="`cv-preview--${variant}`" :style="previewStyle" aria-label="CustomVina 效果示意">
    <div class="cv-preview__heading">
      <span class="cv-preview__eyebrow"><span aria-hidden="true"></span>效果示意</span>
      <span class="cv-preview__format">CustomVina</span>
    </div>

    <div class="cv-preview__desktop">
      <div class="cv-preview__window">
        <div class="cv-preview__header">
          <span v-if="variant === 'badge'" class="cv-preview__badge">CustomVina</span>
          <button
            v-if="variant === 'button'"
            class="cv-preview__toggle"
            type="button"
            :aria-label="listView ? '切换为图标视图' : '切换为列表视图'"
            :aria-pressed="listView"
            @click="listView = !listView"
          >
            <svg v-if="listView" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" /></svg>
            <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h3v3H3zm5 0h13v3H8zM3 11h3v3H3zm5 0h13v3H8zM3 17h3v3H3zm5 0h13v3H8z" /></svg>
          </button>
          <span v-else-if="variant !== 'badge' && variant !== 'header'" class="cv-preview__chevron" aria-hidden="true">⌄</span>
          <span class="cv-preview__title">设计素材</span>
          <span class="cv-preview__tag" aria-hidden="true"></span>
          <span class="cv-preview__menu" aria-hidden="true">···</span>
        </div>

        <div v-if="variant === 'card'" class="cv-preview__sample-card" aria-label="间距为 16、圆角为 12 的卡片"></div>

        <div v-else class="cv-preview__files" :class="{ 'is-list': listView, 'has-hover': hasHover }">
          <div
            v-for="file in files"
            :key="file.name"
            class="cv-preview__file"
            :tabindex="hasHover ? 0 : undefined"
            :aria-label="hasHover ? `${file.name}，聚焦查看边框效果` : undefined"
          >
            <span class="cv-preview__file-icon" :class="`cv-preview__file-icon--${file.kind}`" aria-hidden="true">
              <svg v-if="file.kind === 'folder'" viewBox="0 0 48 48"><path fill="#e3a338" d="M4 12a4 4 0 0 1 4-4h11l5 5h16a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" /><path fill="#f5c868" d="M4 20a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v17a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" /></svg>
              <svg v-else-if="file.kind === 'image'" viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="7" fill="#7eabd9" /><circle cx="32" cy="17" r="4" fill="#e1f0ff" /><path d="m9 36 11-15 9 11 5-6 8 10v3H9z" fill="#c3e4e4" /></svg>
              <svg v-else viewBox="0 0 48 48"><path d="M11 4h18l9 9v28a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3" fill="#e5eaf4" /><path d="M29 4v9h9" fill="#b4c2d9" /><path d="M16 23h14M16 29h14M16 35h9" stroke="#8d9cb6" stroke-width="2.5" stroke-linecap="round" /></svg>
            </span>
            <span class="cv-preview__filename">{{ file.name }}</span>
            <span v-if="listView" class="cv-preview__file-detail">{{ file.kind === 'folder' ? '文件夹' : '文件' }}</span>
          </div>
        </div>

        <div v-if="hasGlass" class="cv-preview__glass" aria-label="玻璃卡片"></div>
      </div>
    </div>

    <div v-if="variant === 'tokens'" class="cv-preview__controls">
      <label class="cv-preview__control">
        <span>强调色</span>
        <input v-model="accent" type="color" aria-label="强调色" />
      </label>
      <label class="cv-preview__control cv-preview__control--range">
        <span>圆角 <output>{{ radius }}</output></span>
        <input v-model.number="radius" type="range" min="0" max="32" step="1" aria-label="圆角" />
      </label>
    </div>
    <div v-if="variant === 'button'" class="cv-preview__controls">
      <label class="cv-preview__control cv-preview__control--range">
        <span>按钮 X 坐标 <output>{{ buttonLeft }}</output></span>
        <input v-model.number="buttonLeft" type="range" min="0" max="300" step="1" aria-label="按钮 X 坐标" />
      </label>
      <span class="cv-preview__view-state" aria-live="polite">{{ listView ? '列表视图' : '图标视图' }}</span>
    </div>

    <figcaption class="cv-preview__caption">{{ captions[variant] }}</figcaption>
  </figure>
</template>

<style scoped>
.cv-preview {
  --cv-accent: #2aa9be;
  margin: 24px 0;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  background: var(--vp-c-bg);
  font-family: var(--vp-font-family-base);
}

.cv-preview__heading,
.cv-preview__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 18px;
}

.cv-preview__eyebrow,
.cv-preview__format,
.cv-preview__view-state {
  font-size: 12px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.cv-preview__eyebrow {
  display: flex;
  align-items: center;
  gap: 7px;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.cv-preview__eyebrow > span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--cv-accent);
}

.cv-preview__format {
  letter-spacing: 0.04em;
}

.cv-preview__desktop {
  display: flex;
  justify-content: center;
  padding: 30px 20px;
  background:
    radial-gradient(ellipse at 12% 85%, #719eac66, transparent 60%),
    radial-gradient(ellipse at 85% 12%, #7a82b947, transparent 65%),
    #e5eaf2;
}

.dark .cv-preview__desktop {
  background:
    radial-gradient(ellipse at 12% 85%, #407b8c55, transparent 60%),
    radial-gradient(ellipse at 85% 12%, #676c9e44, transparent 65%),
    #1d2638;
}

.cv-preview__window {
  position: relative;
  width: 100%;
  max-width: 380px;
  min-width: 0;
  min-height: 184px;
  overflow: hidden;
  border: 1px solid #ffffff36;
  border-radius: 18px;
  background: linear-gradient(140deg, #334c63ee, #222c43ed);
  box-shadow: 0 12px 28px #16273e24;
  color: #f1f5fc;
  font: 13px/1.4 'Segoe UI', var(--vp-font-family-base);
}

.cv-preview__header {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 44px;
  margin: 0;
  padding: 0 16px;
  border-bottom: 1px solid #ffffff12;
  background: #16203740;
}

.cv-preview__title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-weight: 600;
  white-space: nowrap;
}

.cv-preview__chevron {
  align-self: flex-start;
  font-size: 22px;
  line-height: 35px;
  color: #dce6f4;
}

.cv-preview__tag {
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--cv-accent);
}

.cv-preview__menu {
  font-size: 19px;
  font-weight: 600;
  line-height: 1;
}

.cv-preview__badge {
  flex: none;
  width: 110px;
  height: 28px;
  border: 1px solid #ffffff38;
  border-radius: 14px;
  background: rgb(28 116 154 / 92%);
  font-size: 12px;
  font-weight: 400;
  line-height: 26px;
  text-align: center;
}

.cv-preview__files {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  padding: 20px 14px;
}

.cv-preview__file {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}

.cv-preview__file-icon {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 48px;
  height: 48px;
}

.cv-preview__file-icon svg {
  display: block;
  width: 44px;
  height: 44px;
  filter: drop-shadow(0 3px 4px #00000018);
}

.cv-preview__filename {
  max-width: 100%;
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.has-hover .cv-preview__file-icon::after {
  position: absolute;
  inset: -4px;
  border: 2px solid var(--cv-accent);
  border-radius: 12px;
  opacity: 0;
  content: '';
}

.has-hover .cv-preview__file:hover .cv-preview__file-icon::after,
.has-hover .cv-preview__file:focus-visible .cv-preview__file-icon::after {
  opacity: 0.8;
}

.has-hover .cv-preview__file:focus-visible {
  outline: none;
}

.cv-preview__glass {
  position: relative;
  height: 52px;
  margin: 4px 18px 22px;
  border: 1px solid #ffffff59;
  border-radius: 16px;
  background: linear-gradient(115deg, #ffffff20, #ffffff06 55%, #89c8da16);
  box-shadow: inset 0 1px 0 #ffffff24, 0 6px 16px #101a2c1a;
  backdrop-filter: blur(14px);
}

.cv-preview--overview .cv-preview__window,
.cv-preview--glass .cv-preview__window {
  background:
    radial-gradient(ellipse at 90% 100%, #638faa80, transparent 60%),
    radial-gradient(ellipse at 10% 80%, #8e84924d, transparent 55%),
    linear-gradient(140deg, #334c63ee, #222c43ed);
}

.cv-preview--overview .cv-preview__header,
.cv-preview--capsule .cv-preview__header {
  height: 36px;
  margin: 8px 12px 0;
  border: 1px solid #ffffff2e;
  border-radius: 20px;
  background: #406c8dc7;
}

.cv-preview--tokens .cv-preview__header {
  height: 34px;
  margin: 8px 16px 0;
  border: 1px solid var(--cv-accent);
  border-radius: var(--cv-radius);
  background: var(--cv-surface);
}

.cv-preview--tokens .cv-preview__header > span {
  opacity: 0.9;
}

.cv-preview--header .cv-preview__header {
  position: relative;
  justify-content: center;
  height: 56px;
  background: transparent;
}

.cv-preview--header .cv-preview__title {
  flex: none;
  align-self: flex-start;
  padding-top: 3px;
}

.cv-preview--header .cv-preview__tag {
  position: absolute;
  top: 0;
  left: calc(50% - 48px);
  width: 96px;
  height: 24px;
  border-radius: 6px;
  background: #467b9866;
}

.cv-preview--header .cv-preview__menu {
  position: absolute;
  top: 30px;
  left: calc(50% - 7px);
}

.cv-preview--card .cv-preview__header {
  visibility: hidden;
}

.cv-preview__sample-card {
  position: absolute;
  top: 16px;
  right: 16px;
  left: 16px;
  height: 48px;
  border-radius: 12px;
  background: rgb(32 40 55);
}

.cv-preview__toggle {
  position: absolute;
  top: 8px;
  left: min(var(--cv-button-left), calc(100% - 28px));
  z-index: 1;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 6px;
  border: 0;
  border-radius: 6px;
  background: #172033;
  color: #fff;
  cursor: pointer;
  transition: opacity 160ms;
}

.cv-preview__toggle svg {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.cv-preview__toggle:hover {
  opacity: 0.75;
}

.cv-preview__toggle:focus-visible {
  outline: 2px solid var(--cv-accent);
  outline-offset: 3px;
}

.cv-preview--button .cv-preview__title {
  padding-left: 36px;
}

.is-list {
  grid-template-columns: minmax(0, 1fr);
  gap: 3px;
  padding-top: 12px;
  padding-bottom: 12px;
}

.is-list .cv-preview__file {
  flex-direction: row;
  gap: 10px;
  padding: 3px 8px;
}

.is-list .cv-preview__file-icon,
.is-list .cv-preview__file-icon svg {
  width: 24px;
  height: 24px;
}

.cv-preview__file-detail {
  margin-left: auto;
  font-size: 11px;
  color: #c0ccdc;
}

.cv-preview__controls {
  flex-wrap: wrap;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.cv-preview__control {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  line-height: 24px;
  color: var(--vp-c-text-1);
}

.cv-preview__control--range {
  flex: 1;
  flex-wrap: wrap;
}

.cv-preview__control span {
  white-space: nowrap;
}

.cv-preview__control output {
  display: inline-block;
  min-width: 2ch;
  margin-left: 6px;
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

.cv-preview__control input[type='color'] {
  width: 32px;
  height: 26px;
  padding: 2px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background: var(--vp-c-bg);
  cursor: pointer;
}

.cv-preview__control input[type='range'] {
  flex: 1;
  min-width: 80px;
  height: 24px;
  margin: 0;
  accent-color: var(--cv-accent);
  cursor: pointer;
}

.cv-preview__control input:focus-visible {
  outline: 2px solid var(--cv-accent);
  outline-offset: 3px;
}

.cv-preview__caption {
  padding: 12px 18px;
  font-size: 12px;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

@media (max-width: 480px) {
  .cv-preview__desktop {
    padding: 24px 12px;
  }

  .cv-preview__header {
    gap: 8px;
    padding-right: 12px;
    padding-left: 12px;
  }

  .cv-preview__heading,
  .cv-preview__controls,
  .cv-preview__caption {
    padding-right: 12px;
    padding-left: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cv-preview__toggle {
    transition: none;
  }
}
</style>
