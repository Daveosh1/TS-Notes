<template>
  <div class="card p-4 mb-5" :class="`has-background-${bgColor}`">
    <div class="field">
      <label v-if="label" class="label has-text-white">{{ label }}</label>
      <div class="control">
        <textarea
          maxlength="100"
          v-autofocus
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="textarea"
          :placeholder="placeholder"
          ref="textareaRef"
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { vAutofocus } from "@/directives/vAutofocus";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    default: "success",
  },
  placeholder: {
    type: String,
    default: "Type something...",
  },
  label: {
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);

const textareaRef = ref(null);

const focusTextArea = () => {
  textareaRef.value.focus();
};

defineExpose({
  focusTextArea,
});
</script>
