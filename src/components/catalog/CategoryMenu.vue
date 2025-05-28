<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <h2 class="text-lg font-semibold mb-4">Категория</h2>
    <!-- Хлебные крошки -->
    <nav class="flex flex-col text-sm text-gray-600 mb-2 space-y-1">
      <span
        v-for="(crumb, idx) in breadcrumbs"
        :key="crumb.id || 'all'"
        class="flex items-center cursor-pointer hover:text-blue-600"
        :class="{
          'text-blue-600': crumb.id === selectedId,
          '': crumb.id !== selectedId
        }"
        @click="goToLevel(idx)"
      >
        <span v-if="idx !== 0" class="mr-1">&lt;</span>
        {{ crumb.name }}
      </span>
    </nav>
    <!-- Список подкатегорий -->
    <ul class="space-y-1 mt-2">
      <li
        v-for="cat in currentChildren"
        :key="cat.id"
        class="px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
        :class="{ 'bg-gray-100': cat.id === selectedId }"
        @click="selectCategory(cat)"
      >
        {{ cat.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { categories } from '../../data.js'

export default {
  name: 'CategoryMenu',
  props: {
    value: {
      type: [Number, null],
      default: null
    }
  },
  data() {
    return {
      path: [] // массив id выбранных категорий по уровням
    }
  },
  computed: {
    // Текущий выбранный id
    selectedId() {
      return this.path.length ? this.path[this.path.length - 1] : null
    },
    // Хлебные крошки
    breadcrumbs() {
      let crumbs = [{ id: null, name: 'Все категории', children: categories }]
      let cats = categories
      for (const id of this.path) {
        const found = cats.find(c => c.id === id)
        if (found) {
          crumbs.push(found)
          cats = found.children || []
        } else {
          break
        }
      }
      return crumbs
    },
    // Дочерние категории текущего уровня
    currentChildren() {
      let cats = categories
      for (const id of this.path) {
        const found = cats.find(c => c.id === id)
        if (found && found.children) {
          cats = found.children
        } else {
          cats = []
        }
      }
      return cats
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val === null) {
          this.path = []
        } else {
          // Найти путь до категории по id
          const findPath = (cats, id, acc = []) => {
            for (const c of cats) {
              if (c.id === id) return [...acc, c.id]
              if (c.children) {
                const res = findPath(c.children, id, [...acc, c.id])
                if (res) return res
              }
            }
            return null
          }
          const p = findPath(categories, val)
          this.path = p || []
        }
      }
    }
  },
  methods: {
    selectCategory(cat) {
      this.path.push(cat.id)
      this.$emit('change', cat.id)
    },
    goToLevel(idx) {
      this.path = this.path.slice(0, idx)
      const id = this.path.length ? this.path[this.path.length - 1] : null
      this.$emit('change', id)
    }
  }
}
</script> 