<template>
  <transition
    :duration="{ enter: 50, leave: 100 }"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
  >
    <div class="modal-wrapper" v-show="show">
      <div
        class="modal fade"
        :class="{ show: enableShowClass }"
        :style="{ display: 'block' }"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div
          class="modal-dialog"
          :class="modalDialogClass"
          :style="{ marginTop: '100px', ...modalDialogStyle }"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title }}</h5>
              <button
                @click="onClickClose"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <slot name="body" />
            </div>
            <div class="modal-footer" :class="modalFooterClass" :style="modalFooterStyle">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal-backdrop fade"
        @click="onClickClose"
        :class="{ show: enableShowClass }"
      ></div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: (): string => 'Modal Title',
    },
    show: {
      type: Boolean,
      default: (): boolean => false,
    },
    modalDialogClass: {
      type: Object,
      default: (): any => ({}),
    },
    modalDialogStyle: {
      type: Object,
      default: (): any => ({}),
    },
    modalFooterClass: {
      type: Object,
      default: (): any => ({}),
    },
    modalFooterStyle: {
      type: Object,
      default: (): any => ({}),
    },
  },
  data(): {
    enableShowClass: boolean;
  } {
    return {
      enableShowClass: false,
    };
  },
  methods: {
    onClickClose(evt: Event) {
      this.$emit('onClickClose', evt);
    },
    onAfterEnter() {
      this.enableShowClass = true;
    },
    onBeforeLeave() {
      this.enableShowClass = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.modal.show {
  z-index: 1080;
  overflow-x: hidden;
  overflow-y: auto;
}
.modal-backdrop.show {
  opacity: 0.5;
  z-index: 1060;
}
</style>
