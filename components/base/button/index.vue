<template>
  <button
    :class="{
      'app-btn': true,
    }"
    :disabled="disabled"
    type="button"
  >
    <slot>Submit</slot>
  </button>
</template>
<script setup lang="ts">
interface Props {
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})
</script>
<style lang="scss" scoped>
.app-btn {
  display: inline-block;
  padding: $bs-btn-padding-y $bs-btn-padding-x;
  font-family: $bs-btn-font-family;
  font-size: $bs-btn-font-size;
  font-weight: $bs-btn-font-weight;
  line-height: $bs-btn-line-height;
  color: $bs-btn-color;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: $bs-btn-border-width solid $bs-btn-border-color;
  border-radius: $bs-btn-border-radius;
  background-color: $bs-btn-bg;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  :disabled {
    color: $bs-btn-disabled-color;
    pointer-events: none;
    background-color: $bs-btn-disabled-bg;
    border-color: $bs-btn-disabled-border-color;
    opacity: var(--bs-btn-disabled-opacity);
  }
}
</style>
