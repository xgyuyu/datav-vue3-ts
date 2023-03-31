<template>
  <div :class="['g-aside component-panel-wp', { '--hide': !visiblePanel }]">
    <div class="components-panel">
      <div class="panel-title">
        <span class="panel-text">{{ visiblePanel ? '全部组件' : '组件' }}</span>
        <n-tooltip :delay="500" v-if="!isFocus">
          <template #trigger>
            <n-icon title="搜索" class="btn-icon" @click="focusHandle(true)">
              <IconSearch />
            </n-icon>
          </template>
          搜索
        </n-tooltip>
        <div v-show="isFocus" class="chart-search go-transition" :class="{ 'chart-search-focus': isFocus }">
          <n-popover
              class="chart-search-popover"
              :show-arrow="false"
              :show="showPopover"
              :to="false"
              trigger="hover"
              placement="bottom-start"
          >
            <template #trigger>
              <n-input-group>
                <n-input
                    size="small"
                    placeholder="搜索组件"
                    v-model:value.trim="search"
                    :loading="loading"
                    ref="searchInput"
                    autofocus
                    @blur="focusHandle(false)"
                    @update:value="searchHandle"
                >
                  <template #suffix>
                    <n-icon v-show="!loading" :component="IconSearch" />
                  </template>
                </n-input>
              </n-input-group>
            </template>

            <div class="search-list-box">
              <n-scrollbar style="max-height: 500px">
                <n-empty v-show="!searchRes.length" size="small" description="没有找到组件~"></n-empty>
                <div
                    class="list-item go-flex-items-center go-ellipsis-1"
                    v-for="item in searchRes"
                    :key="item.alias"
                    :title="item.alias"
                    @click="toAddCom(item.name, item.used)"
                >
                  <chart-glob-image class="list-item-img" :chartConfig="item"></chart-glob-image>
                  <n-text class="list-item-fs" depth="2">{{ item.alias }}</n-text>
                </div>
              </n-scrollbar>
              <div class="popover-modal"></div>
            </div>
          </n-popover>
        </div>
        <n-tooltip :delay="500">
          <template #trigger>
            <n-icon title="收起" class="btn-icon" @click="changeVisible">
              <IconBack />
            </n-icon>
          </template>
          收起
        </n-tooltip>
      </div>
      <div class="components-panel-wrapper" @dragover="dragOver">
        <el-tabs tab-position="left" @tab-click="handleTabClick">
          <el-tab-pane v-for="cate in categories" :key="cate.type">
            <template #label>
              <n-tooltip placement="left" :delay="500">
                <template #trigger>
                  <div>
                    <g-com-icon :icon="cate.icon" class="com-tab-icon" />
                    <span class="com-tab-title">{{ cate.name }}</span>
                  </div>
                </template>
                {{ cate.name }}
              </n-tooltip>
            </template>

            <el-tabs v-if="cate.data.length > 2" tab-position="left" class="el-tabs-l2">
              <el-tab-pane v-for="subcate in (cate.data as ComDataType[])" :key="subcate.type">
                <template #label>
                  <span class="com-tab-title">{{ subcate.name }}</span>
                </template>
                <div class="components-single-menu-wp">
                  <div class="components-single-menu">
                    <ul class="components-single-menu-list">
                      <li
                        v-for="com in (subcate.data as ComDataDto[])"
                        :key="com.name"
                        :title="com.alias"
                        :draggable="com.used"
                        class="components-item double"
                        @dragstart="dragStart($event, com.name)"
                        @click="toAddCom(com.name, com.used)"
                      >
                        <div class="components-item-text">
                          {{ com.alias }}
                        </div>
                        <div
                          class="components-item-img"
                          :style="`background-image: url(${com.img});`"
                        >
                          <span v-if="!com.used" class="mask" @click.stop>
                            <n-tooltip>
                              <template #trigger>
                                <n-icon class="datav-icon">
                                  <IconLock />
                                </n-icon>
                              </template>
                              正在开发中。。。🚀
                            </n-tooltip>
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>

            <div v-else class="components-multi-menu">
              <div class="components-single-menu --wider">
                <ul class="components-single-menu-list">
                  <li
                    v-for="com in ((cate.data[0]).data as ComDataDto[])"
                    :key="com.name"
                    :title="com.alias"
                    :draggable="com.used"
                    class="components-item double"
                    @dragstart="dragStart($event, com.name)"
                    @click="toAddCom(com.name, com.used)"
                  >
                    <div class="components-item-text">
                      {{ com.alias }}
                    </div>
                    <div
                      class="components-item-img"
                      :style="`background-image: url(${com.img});`"
                    >
                      <span v-if="!com.used" class="mask" @click.stop>
                        <n-tooltip>
                          <template #trigger>
                            <n-icon class="datav-icon">
                              <IconLock />
                            </n-icon>
                          </template>
                          正在开发中。。。🚀
                        </n-tooltip>
                      </span>
                    </div>
                  </li>
                </ul>
                <template v-if="(cate.data[0]).data.length === 0">
                  <div v-if="cate.type === 'favorite'" class="favorite-empty">
                    没有收藏组件
                  </div>
                </template>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {ref, computed, defineComponent, onMounted, getCurrentInstance} from 'vue'
import { cloneDeep } from 'lodash-es'

import 'element-plus/es/components/tabs/style/css'
import 'element-plus/es/components/tab-pane/style/css'
import { ElTabs, ElTabPane } from 'element-plus'

import { PanelType, useToolbarStore } from '@/store/toolbar'
import { useEditorStore } from '@/store/editor'
import {classifications, ComDataType, ComDataDto, findComByName} from '@/data/system-components'
import { createComponent } from '@/components/datav'
import { loadCom } from '@/components/_utils/component-util'
import { IconSearch, IconBack, IconLock } from '@/icons'
import { isString } from 'lodash-es'

// 组件数组提取
const listFormatHandle = (options: any[]) => {
  const arr = []
  for (const item of options.value) {
    arr.push(...item.data[0].data)
  }
  return arr
}


export default defineComponent({
  name: 'componentsPanel',
  components: {
    IconSearch,
    IconBack,
    IconLock,
    ElTabs,
    ElTabPane,
  },
  setup(props) {
    let currentInstance = null
    onMounted(() => {
      currentInstance = getCurrentInstance()
    })
    const isFocus = ref<boolean>(false)
    const loading = ref<boolean | undefined>(undefined)
    const showPopover = ref<boolean>(false)
    const search = ref<string | null>(null)
    const searchRes = ref<any[]>([])

    const toolbarStore = useToolbarStore()
    const editorStore = useEditorStore()

    const favoriteComs = ref([])
    const visiblePanel = computed(() => toolbarStore.components.show)

    const first: ComDataType = {
      type: 'all',
      name: '全部',
      icon: 'v-icon-view-grid',
      data: [],
    }
    const cloneCfs = cloneDeep(classifications)
    cloneCfs.forEach(item => {
      item.data.unshift({
        ...first,
        data: (item.data as ComDataType[]).flatMap(m => m.data),
      })
    })

    const categories = computed<ComDataType[]>(() => {
      return [
        ...cloneCfs,
        {
          type: 'favorite',
          name: '收藏',
          icon: 'v-icon-favorite',
          data: [{ ...first, data: favoriteComs.value }],
        },
      ]
    })

    // 聚焦设置
    const focusHandle = (value: boolean) => {
      if (value) {
        isFocus.value = value
        setTimeout(() => {
          currentInstance.ctx.$refs.searchInput.focus()
        })
      } else {
        setTimeout(()=>{
          isFocus.value = value
        }, 200)
      }
    }
    // 搜索处理
    const searchHandle = (key: string | null) => {
      if (!isString(key) || !key.length) {
        closeHandle()
        return
      }
      loading.value = true
      showPopover.value = true
      // searchRes.value = categories.filter((e) => !key || e.title.toLowerCase().includes(key.toLowerCase()))
      const allMenus = listFormatHandle(categories);
      const res = allMenus.filter(r => r.alias.includes(key))
      searchRes.value = res
      setTimeout(() => {
        loading.value = undefined
      }, 500)
    }

    // 关闭处理
    const closeHandle = () => {
      loading.value = undefined
      showPopover.value = false
      search.value = null
      searchRes.value = []
    }

    const changeVisible = () => {
      toolbarStore.setPanelState(PanelType.components, !visiblePanel.value)
    }

    const handleTabClick = () => {
      if (!visiblePanel.value) {
        toolbarStore.setPanelState(PanelType.components, true)
      }
    }

    const toAddCom = async (comName: string, used: boolean) => {
      if (used) {
        toolbarStore.addLoading()
        const com = await createComponent(comName)
        com.attr.x = Math.floor((editorStore.pageConfig.width - com.attr.w) / 2)
        com.attr.y = Math.floor((editorStore.pageConfig.height - com.attr.h) / 2)
        console.log('com=====', com);
        await loadCom(com)
        toolbarStore.removeLoading()
        isFocus.value = false
      }
    }

    const dragStart = (ev: any, comName: string) => {
      ev.dataTransfer.setData('text', comName)
    }

    const dragOver = (ev: DragEvent) => {
      ev.preventDefault()
      ev.stopPropagation()
      ev.dataTransfer.dropEffect = 'none'
    }

    return {
      categories,
      visiblePanel,
      favoriteComs,
      isFocus,
      loading,
      showPopover,
      search,
      searchRes,
      handleTabClick,
      focusHandle,
      searchHandle,
      changeVisible,
      toAddCom,
      dragStart,
      dragOver,
      IconSearch,
    }
  }
})

</script>

<style lang="scss">
@import './style';
@import './tabs';
.chart-search-popover {
  padding-left: 5px;
  padding-right: 8px;
  background-color: #48484e !important;
  .search-list-box {
    width: 163px;
    .list-item {
      z-index: 2;
      position: relative;
      cursor: pointer;
      padding: 2px;
      padding-left: 6px;
      margin-bottom: 5px;
      &-fs {
        font-size: 12px;
        color: #fff !important;
      }
      &-img {
        height: 28px;
        margin-right: 5px;
        border-radius: 5px;
        vertical-align: middle;
      }
      &:hover {
        &::before {
          content: '';
          position: absolute;
          width: 3px;
          height: 100%;
          left: 0;
          top: 0;
          border-radius: 2px;
          background-color: #2682ff;
        }
        &::after {
          z-index: -1;
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.1;
          left: 0;
          top: 0;
          border-radius: 5px;
          background-color: #2682ff;
        }
      }
    }
  }
}
</style>
