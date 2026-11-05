<script setup>
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({ variant: { type: String, default: 'overview' } })
const accent = ref('#2aa9be')
const radius = ref(12)
const buttonLeft = ref(280)
const listView = ref(false)
const canvas = ref(null)
const scale = ref(1)
let observer

// Keep the same 400 × 240 DIP scene at every viewport size.
onMounted(() => {
  const resize = () => {
    const bounds = canvas.value.getBoundingClientRect()
    scale.value = bounds.width / 400
  }
  observer = new ResizeObserver(resize)
  observer.observe(canvas.value)
  resize()
})
onBeforeUnmount(() => observer?.disconnect())

const asset = name => withBase(`/docs/pogget/custom-vina/${name}.png`)

// Native materials preserve the application's text, glyph and glass rendering.
const NativeLayer = (layerProps) => h('span', {
  class: 'cv-native',
  role: layerProps.label ? 'img' : undefined,
  'aria-label': layerProps.label,
  'aria-hidden': layerProps.label ? undefined : 'true'
}, ['light', 'dark'].map(theme => h('img', {
  class: `cv-native__${theme}`,
  src: asset(`${layerProps.name}-${theme}`),
  srcset: `${asset(`${layerProps.name}-${theme}-2x`)} 2x`,
  alt: '',
  draggable: false
})))
NativeLayer.props = ['name', 'label']

const files = [
  { name: '设计稿', kind: 'folder' },
  { name: '封面.png', kind: 'image' },
  { name: '说明.txt', kind: 'document' }
]
const captions = {
  overview: '标准收纳盒外观。将指针移到文件上，查看悬停边框。',
  badge: '在标题右侧添加标签，保留原来的标题、菜单和折叠按钮。',
  card: '上方和两侧留出 16 的间距，卡片高 48，圆角为 12。',
  header: '标题和右侧菜单放在同一个标签里，整个标签居中；折叠按钮保持原位。',
  tokens: '调整强调色和圆角，观察标题表面的变化。',
  button: '点击标题中的按钮切换视图，或拖动滑块调整按钮的位置。',
  capsule: '圆角为 20 的半透明标题表面，保留原来的标签和右侧控件。',
  hover: '将指针移到文件上，或用 Tab 聚焦文件，查看强调色边框。',
  glass: '纯色收纳盒上的玻璃卡片，位置、圆角和边缘效果与示例一致。'
}
const floatingTitle = computed(() => ['tokens', 'capsule'].includes(props.variant))
const hasHover = computed(() => ['overview', 'hover'].includes(props.variant))
const previewStyle = computed(() => {
  const channels = accent.value.match(/[\da-f]{2}/gi).map(value => parseInt(value, 16))
  // Vina fade() reverses its adjustment for colors brighter than 128.
  const adjustment = Math.floor(channels.reduce((sum, value) => sum + value, 0) / 3) > 128 ? 35 : -35
  return {
    '--cv-accent': accent.value,
    '--cv-accent-rgb': channels.join(', '),
    '--cv-surface-rgb': channels.map(value => Math.min(255, Math.max(0, value + adjustment))).join(', '),
    '--cv-radius': `${radius.value}px`,
    '--cv-button-left': `${buttonLeft.value}px`,
    '--cv-scale': scale.value,
    '--cv-title-offset': floatingTitle.value ? '8px' : '0px'
  }
})
</script>

<template>
  <figure class="cv-preview" :class="`cv-preview--${variant}`" :style="previewStyle" aria-label="CustomVina 效果预览">
    <div class="cv-preview__heading">
      <span>效果预览</span>
      <span class="cv-preview__format">CustomVina</span>
    </div>

    <div class="cv-preview__desktop">
      <div ref="canvas" class="cv-preview__canvas">
        <div class="cv-preview__window">
          <template v-if="variant !== 'card'">
            <div v-if="!floatingTitle" class="cv-preview__divider" aria-hidden="true"></div>
            <NativeLayer v-if="variant === 'capsule'" name="capsule-surface" class="cv-preview__title-material" />
            <svg v-if="variant === 'tokens'" class="cv-preview__token-surface" width="400" height="64" viewBox="0 0 400 64" aria-hidden="true">
              <rect v-for="layer in 5" :key="layer" :x="8 - (layer - 1) * 2" :y="13 - (layer - 1) * 2" :width="384 + (layer - 1) * 4" :height="40 + (layer - 1) * 4" :rx="radius + (layer - 1) * 2" fill="var(--cv-text)" :fill-opacity="0.5 / 45 * (1 - (layer - 1) / 5)" />
              <rect x="8" y="8" width="384" height="40" :rx="radius" fill="rgb(var(--cv-surface-rgb))" fill-opacity="0.88" stroke="rgb(var(--cv-accent-rgb))" stroke-opacity="0.45" stroke-width="1" />
            </svg>
            <NativeLayer :name="variant === 'header' ? 'centered-tag' : 'tag'" label="设计素材" class="cv-preview__label" />
            <NativeLayer name="more" label="菜单" class="cv-preview__menu cv-preview__glyph" />
            <NativeLayer name="collapse" label="折叠" class="cv-preview__collapse cv-preview__glyph" />
            <NativeLayer v-if="variant === 'badge'" name="badge-surface" label="CustomVina" class="cv-preview__badge" />
            <button
              v-if="variant === 'button'"
              class="cv-preview__toggle"
              type="button"
              :aria-label="listView ? '切换为图标视图' : '切换为列表视图'"
              :aria-pressed="listView"
              @click="listView = !listView"
            >
              <NativeLayer :name="listView ? 'toggle-list' : 'toggle-grid'" />
            </button>
            <div class="cv-preview__files" :class="{ 'is-list': listView, 'has-hover': hasHover }">
              <div v-for="file in files" :key="file.name" class="cv-preview__file" :tabindex="hasHover ? 0 : undefined" :aria-label="hasHover ? `${file.name}，聚焦查看边框效果` : undefined">
                <span class="cv-preview__file-icon" aria-hidden="true">
                  <img :src="asset(file.kind)" width="64" height="64" alt="" draggable="false" />
                </span>
                <span class="cv-preview__filename">{{ file.name }}</span>
              </div>
            </div>
            <NativeLayer v-if="variant === 'glass'" name="glass-surface" label="玻璃卡片" class="cv-preview__glass" />
          </template>
          <NativeLayer v-else name="card-surface" label="间距为 16、圆角为 12 的卡片" class="cv-preview__sample-card" />
        </div>
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
  --cv-background: #f2f2f2;
  --cv-text: #1e1e1e;
  --cv-divider: #d2d2d2;
  margin: 24px 0;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
}

.dark .cv-preview {
  --cv-background: #181818;
  --cv-text: #f0f0f0;
  --cv-divider: #3c3c3c;
}

.cv-preview__heading,
.cv-preview__controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
}

.cv-preview__heading,
.cv-preview__format,
.cv-preview__view-state {
  font-size: 12px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}

.cv-preview__heading > :first-child {
  color: var(--vp-c-text-1);
}

.cv-preview__desktop {
  display: flex;
  justify-content: center;
  padding: 24px 16px;
  background: var(--vp-c-bg-soft);
}

.cv-preview__canvas {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 5 / 3;
}

.cv-preview__window {
  position: absolute;
  width: 400px;
  height: 240px;
  overflow: hidden;
  border-radius: 4px;
  outline: 1px solid var(--cv-divider);
  background: var(--cv-background);
  color: var(--cv-text);
  font: 14px/normal 'Segoe UI', sans-serif;
  transform: scale(var(--cv-scale));
  transform-origin: top left;
}

.cv-native {
  position: absolute;
  display: block;
  pointer-events: none;
}

.cv-native :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  user-select: none;
}

.cv-native :deep(.cv-native__dark),
.dark .cv-native :deep(.cv-native__light) {
  display: none;
}

.dark .cv-native :deep(.cv-native__dark) {
  display: block;
}

.cv-preview__divider {
  position: absolute;
  top: 40px;
  width: 400px;
  height: 1px;
  background: var(--cv-divider);
}

.cv-preview__divider::after {
  position: absolute;
  top: 1px;
  width: 100%;
  height: 1px;
  background: var(--cv-divider);
  opacity: 0.5;
  content: '';
}

.cv-preview__label {
  top: calc(6px + var(--cv-title-offset));
  left: calc(8px + var(--cv-title-offset));
  width: 114px;
  height: 28px;
}

.cv-preview__glyph {
  width: 14px;
  height: 14px;
}

.cv-preview__menu {
  top: calc(18px + var(--cv-title-offset));
  left: calc(335px - var(--cv-title-offset));
}

.cv-preview__collapse {
  top: calc(19px + var(--cv-title-offset));
  left: calc(368px - var(--cv-title-offset));
}

.cv-preview--header .cv-preview__label { left: 143px; }
.cv-preview--header .cv-preview__menu { left: 235px; }

.cv-preview__badge {
  top: 7px;
  left: 214px;
  width: 112px;
  height: 30px;
}

.cv-preview__title-material {
  top: 0;
  left: 0;
  width: 400px;
  height: 60px;
}

.cv-preview__token-surface {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 64px;
  overflow: visible;
}

.cv-preview__files {
  position: absolute;
  top: 70px;
  left: 40px;
  display: grid;
  grid-template-columns: repeat(3, 64px);
  gap: 64px;
}

.cv-preview__file {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  width: 64px;
}

.cv-preview__file-icon {
  position: relative;
  display: block;
  flex: none;
  width: 64px;
  height: 64px;
}

.cv-preview__file-icon img {
  display: block;
  width: 100%;
  height: 100%;
  user-select: none;
}

.cv-preview__filename {
  max-width: 100%;
  overflow: hidden;
  font: 10px/14px 'Segoe UI', sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.has-hover .cv-preview__file-icon::after {
  position: absolute;
  inset: -5px;
  border: 2px solid rgb(82 121 251 / 80%);
  border-radius: 13px;
  opacity: 0;
  content: '';
}

.has-hover .cv-preview__file:hover .cv-preview__file-icon::after,
.has-hover .cv-preview__file:focus-visible .cv-preview__file-icon::after { opacity: 1; }
.has-hover .cv-preview__file:focus-visible { outline: none; }

.cv-preview__glass {
  top: 166px;
  left: 18px;
  width: 364px;
  height: 52px;
}

.cv-preview__sample-card {
  top: 15px;
  left: 15px;
  width: 370px;
  height: 50px;
}

.cv-preview__toggle {
  position: absolute;
  top: 8px;
  left: var(--cv-button-left);
  z-index: 1;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: opacity 160ms;
}

.cv-preview__toggle > .cv-native { inset: 0; }
.cv-preview__toggle:hover { opacity: 0.75; }

.cv-preview__toggle:focus-visible,
.cv-preview__control input:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 3px;
}

.is-list {
  top: 64px;
  left: 20px;
  grid-template-columns: 360px;
  gap: 8px;
}

.is-list .cv-preview__file {
  flex-direction: row;
  gap: 10px;
  width: 360px;
}

.is-list .cv-preview__file-icon { width: 24px; height: 24px; }

.cv-preview__controls {
  flex-wrap: wrap;
  border-top: 1px solid var(--vp-c-divider);
}

.cv-preview__control {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  line-height: 24px;
  color: var(--vp-c-text-1);
}

.cv-preview__control--range { flex: 1; flex-wrap: wrap; }
.cv-preview__control span { white-space: nowrap; }

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
  border-radius: 4px;
  background: var(--vp-c-bg);
  cursor: pointer;
}

.cv-preview__control input[type='range'] {
  flex: 1;
  min-width: 80px;
  height: 24px;
  margin: 0;
  accent-color: var(--vp-c-brand-1);
  cursor: pointer;
}

.cv-preview__caption {
  padding: 12px 16px;
  font-size: 12px;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

@media (prefers-reduced-motion: reduce) {
  .cv-preview__toggle { transition: none; }
}
</style>
