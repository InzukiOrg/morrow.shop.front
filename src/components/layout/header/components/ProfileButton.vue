<template>
    <router-link to="/profile" class="flex flex-col items-center text-gray-600 hover:text-gray-800">
        <svg class="w-6 h-6" :class="activeClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-xs mt-1 lg:block hidden" :class="activeClass">Профиль</span>
    </router-link>
</template>

<script>
export default {
    name: 'ProfileButton',
    computed: {
        activeClass() {
            return this.$route.path === '/profile' ? 'text-blue-600' : ''
        }
    }
}
</script>