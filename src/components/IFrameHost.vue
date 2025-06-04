<template>
  <iframe :src="src" class="w-full h-full border-none" data-testid="embedded-iframe" />
</template>

<script setup lang="ts">
const { src } = defineProps<{ src: string }>();
</script>
