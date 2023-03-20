<template>
  <div class="app-input">
    <input
      :type="type"
      :value="modelValue"
      :class="{
        input: true,
        size: true,
        error: error,
      }"
      v-bind="$attrs"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
    />
    <div v-if="error" class="messages">
      <p v-for="(message, index) in errorMessages" :key="index" class="text">
        {{ message }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  modelValue: string
  type?: 'password' | 'text'
  size?: '-small' | '-default' | '-large'
  error?: boolean
  disabled?: boolean
  errorMessages?: string[]
  placeholder: string
}
interface Emit {
  (e: 'update:modelValue', value: string): void
}
withDefaults(defineProps<Props>(), {
  size: '-default',
  errorMessages: undefined,
  disabled: false,
  type: 'text',
})
const emit = defineEmits<Emit>()
function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>
<style lang="scss" scoped>
.app-input {
  > .input {
    width: 100%;
    display: block;
    padding: 0.4375rem 1rem;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.25rem;
    color: $bs-secondary;
    background-color: $bs-white;
    background-clip: padding-box;
    border: 1px solid $bs-gray-300;
    appearance: none;
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    &.-small {
      padding: 0.25rem 1rem;
      font-size: 0.75rem;
      border-radius: 3px;
    }
    &.-large {
      padding: 0.6875rem 1rem;
      font-size: 0.9375rem;
      border-radius: 5px;
    }

    &:focus {
      color: $bs-gray-600;
      background-color: $bs-white;
      border-color: $bs-primary;
      outline: 0;
      box-shadow: 0 0 0 3px rgb(15 172 129 / 10%);
    }
    &:disabled {
      background-color: $bs-lighter;
      opacity: 1;
    }
  }
  > .messages > .text {
    color: $bs-red;
    font-size: 14px;
    font-style: italic;
  }
  > .error {
    border-color: $bs-red;
  }
}
</style>
