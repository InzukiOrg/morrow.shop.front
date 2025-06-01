<template>
    <button class="flex flex-col items-center text-gray-600 hover:text-gray-800 relative    ">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span class="text-xs mt-1 lg:block hidden">Избранное</span>
        <span
            class="absolute -top-1 -right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
        </span>
    </button>
</template>
<script>
export default {

}
</script>