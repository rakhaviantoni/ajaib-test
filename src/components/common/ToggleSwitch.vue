<template>
  <label :class="{ active: isActive }" class="toggle__button" @click.prevent="onClick">
    <input type="checkbox" :disabled="disabled" :checked="currentState" />
    <span
      class="toggle__switch"
      :style="toggleSwitchStyle"
      :class="{
        disabled: disabled,
      }"
    >
      <div class="circle" :style="circleStyle"></div>
      <div class="label-container" :style="labelContainerStyle">
        <span v-if="isActive" class="toggle__label active">{{ enableText }}</span>
        <span v-if="!isActive" class="toggle__label inactive">{{ disabledText }}</span>
      </div>
    </span>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    width: {
      type: Number,
      default: () => 90,
    },
    height: {
      type: Number,
      default: () => 30,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelEnableText: {
      type: String,
      default: 'On',
    },

    labelDisableText: {
      type: String,
      default: 'Off',
    },
    id: {
      type: String,
      default: 'primary',
    },
    currentState: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    toggleSwitchStyle() {
      const self = this as any;
      return {
        width: `${self.width}px`,
        height: `${self.height}px`,
        borderRadius: `${self.height}px`,
      };
    },
    circleStyle() {
      const self = this as any;
      const style: any = {
        width: `${self.height * 0.75}px`,
        height: `${self.height * 0.75}px`,
        left: `${self.height * 0.125}px`,
      };

      if (self.currentState) {
        style.transform = `translateX(${self.width - self.height}px)`;
      } else {
        style.transform = `translateX(${0}px)`;
      }

      return style;
    },
    labelContainerStyle() {
      const self = this as any;
      const style: any = {
        width: `${self.width - self.height}px`,
      };

      if (self.currentState) {
        style.transform = `translateX(-${self.height / 2.25}px)`;
      } else {
        style.transform = `translateX(${self.height / 2.25}px)`;
      }

      return style;
    },
    isActive() {
      const self = this as any;
      return self.currentState;
    },
    enableText() {
      const self = this as any;
      return self.labelEnableText;
    },
    disabledText() {
      const self = this as any;
      return self.labelDisableText;
    },
  },
  methods: {
    onClick() {
      const self = this as any;
      if (!self.disabled) {
        self.$emit('click', self.currentState);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.toggle__label {
  font-size: 0.85rem;
  color: #fff;
  font-weight: bold;
  transition: all 0.25s cubic-bezier(0.5, -0.6, 0.5, 1.6);
}
.toggle__button {
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
  margin: 0;

  input[type='checkbox'] {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
  }

  .toggle__switch {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #dd3444;
    // box-shadow: inset 0 0 1px #dd3444;
    transition: all 0.25s;
    position: relative;

    &.disabled {
      background: #ddd;
      cursor: not-allowed;
    }

    .label-container {
      transition: all 0.2s ease;
      text-align: center;
    }

    .circle {
      background: #fff;
      position: absolute;
      display: block;
      border-radius: 100%;
      transform-origin: center;
      transition: all 0.25s cubic-bezier(0.5, -0.6, 0.5, 1.6);
    }
  }
}
.active {
  .toggle__switch {
    background: #53b652;
    // box-shadow: inset 0 0 1px #53b652;
  }
}
</style>
