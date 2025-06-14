<template>
    <div class="dropdown w-full">
        <div tabindex="0" role="button" class="btn btn-ghost shadow w-full justify-between">
            {{ selectedLabel || placeholder }}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
        </div>
        <ul tabindex="0"
            class="dropdown-content z-[1] menu menu-vertical p-2 shadow bg-base-100 rounded-box w-full block">
            <li v-if="search" class="lg:sticky lg:top-0 bg-base-100 z-10">
                <input type="text" v-model="searchQuery" :placeholder="searchPlaceholder"
                    class="input input-bordered input-sm w-full" @click.stop>
            </li>
            <div class="max-h-60 overflow-y-auto">
                <li v-for="option in filteredOptions" :key="option.value" @click="selectOption(option)">
                    <a :class="{ 'active': modelValue === option.value }">
                        {{ option.label }}
                    </a>
                </li>
                <li v-if="filteredOptions.length === 0" class="text-center text-gray-500 py-2">
                    {{ noResultsText }}
                </li>
            </div>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Select',
    props: {
        modelValue: {
            type: [String, Number],
            default: ''
        },
        options: {
            type: Array,
            required: true,
            validator: (value) => {
                return value.every(option =>
                    typeof option === 'object' &&
                    'value' in option &&
                    'label' in option
                )
            }
        },
        placeholder: {
            type: String,
            default: 'Выберите...'
        },
        searchPlaceholder: {
            type: String,
            default: 'Поиск...'
        },
        noResultsText: {
            type: String,
            default: 'Ничего не найдено'
        },
        clearable: {
            type: Boolean,
            default: false
        },
        search: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'change'],
    data() {
        return {
            searchQuery: ''
        }
    },
    computed: {
        selectedLabel() {
            const selected = this.options.find(opt => opt.value === this.modelValue)
            return selected ? selected.label : ''
        },
        filteredOptions() {
            if (!this.searchQuery) {
                return this.options
            }
            const query = this.searchQuery.toLowerCase()
            return this.options.filter(option =>
                option.label.toLowerCase().includes(query)
            )
        }
    },
    methods: {
        selectOption(option) {
            this.$emit('update:modelValue', option.value)
            this.$emit('change', option)
            this.searchQuery = ''
        }
    }
}
</script>
