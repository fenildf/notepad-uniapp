<template>
  <view :class="['s-popup',positionClass,visibleClass,effectClass,customClass]" :style="styleZindex+styleDuration">
    <template v-if="mask">
      <view
        class="s-popup-mask"
        @touchmove.stop.prevent="e=>e.preventDefault()"
        @click="maskClose && hide()"
        :style="'background-color: rgba(0, 0, 0, '+maskOpacity+');'"
      ></view>
    </template>
    <view class="s-popup-wrap" @touchmove.stop.prevent="e=>e.preventDefault()">
      <slot></slot>
    </view>
  </view>
</template>

<script>

// 记录弹框的zIndex
const ZindexMap = new Map();
const getMaxZindex = () => {
  return Math.max(200, ...ZindexMap.values()) + 1;
};

export default {
  name: 's-popup',
  props: {
    // class
    customClass: {
      type: String,
      default: ''
    },
    // v-model双向绑定
    value: Boolean,
    // 弹框显示位置 center | left | right | top | bottom
    position: {
      type: String,
      default: 'center'
    },
    // 是否使用过渡效果
    effect: {
      type: Boolean,
      default: true
    },
    // 过渡时间
    effectDuration: {
      type: Number,
      default: 300
    },
    // 是否显示遮罩
    mask: {
      type: Boolean,
      default: true
    },
    // 遮罩透明度
    maskOpacity: {
      type: Number,
      default: 0.7
    },
    // 点击遮罩是否关闭弹框
    maskClose: {
      type: Boolean,
      default: true
    },
    // 自动关闭时间
    duration: {
      type: Number,
      default: 0
    },
    // 显示时拦截钩子返回promise拦截
    beforeShow: Function,
    // 隐藏时拦截钩子返回promise拦截
    beforeHide: Function
  },
  data () {
    Object.assign(this, {
      popupId: 's-popup-id-' + Math.random().toString(36).substr(2),
      visibleId: 0,
      visibleStatus: false,
      effectTimeoutId: 0,
      autoCloseTimeoutId: 0
    });
    return {
      styleZindex: '',
      visibleClass: '',
      styleDuration: '',
      effectClass: ''
    };
  },
  computed: {
    positionClass () {
      return this.position ? 's-popup-position-' + this.position : '';
    }
  },
  watch: {
    value () {
      this.updateVisible();
    }
  },
  methods: {
    async show () {
      if (!this.visibleStatus) {
        this.visibleId++;
        let status = true;
        const nowId = this.visibleId;
        if (this.beforeShow) {
          try {
            await this.beforeShow.call(this.$parent);
          } catch (error) {
            status = false;
          }
        }
        if (nowId === this.visibleId) {
          if (status) {
            const effectDuration = this.effect ? this.effectDuration : 0;
            this.visibleStatus = true;
            this.$emit('input', true);
            ZindexMap.set(this.popupId, getMaxZindex());
            this.styleZindex = `z-index:${ZindexMap.get(this.popupId)};`;
            this.styleDuration = `animation-duration:${effectDuration}ms;`;
            this.visibleClass = 's-popup-visible';
            this.effectClass = 's-popup-effect-enter';
            clearTimeout(this.effectTimeoutId);
            this.effectTimeoutId = setTimeout(() => {
              this.styleDuration = '';
              this.effectClass = '';
              if (this.visibleStatus) {
                this.$emit('show');
                // 自动关闭
                const duration = parseInt(this.duration);
                if (duration > 0) {
                  clearTimeout(this.autoCloseTimeoutId);
                  this.autoCloseTimeoutId = setTimeout(() => {
                    this.visibleStatus && this.hide();
                  }, duration);
                }
              }
            }, effectDuration);
          } else {
            this.$emit('input', false);
          }
        }
      }
    },
    async hide () {
      if (this.visibleStatus) {
        this.visibleId++;
        let status = true;
        const nowId = this.visibleId;
        if (this.beforeHide) {
          try {
            await this.beforeHide.call(this.$parent);
          } catch (error) {
            status = false;
          }
        }
        if (nowId === this.visibleId) {
          if (status) {
            const effectDuration = this.effect ? this.effectDuration : 0;
            this.visibleStatus = false;
            this.$emit('input', false);
            this.styleDuration = 'animation-duration:' + effectDuration + 'ms;';
            this.effectClass = 's-popup-effect-leave';
            clearTimeout(this.autoCloseTimeoutId);
            clearTimeout(this.effectTimeoutId);
            this.effectTimeoutId = setTimeout(() => {
              this.visibleClass = '';
              this.effectClass = '';
              this.styleZindex = '';
              this.styleDuration = '';
              ZindexMap.delete(this.popupId);
              if (!this.visibleStatus) {
                this.$emit('hide');
              }
            }, effectDuration);
          } else {
            this.$emit('input', true);
          }
        }
      }
    },
    updateVisible () {
      this.$nextTick(() => {
        if (this.visibleStatus !== this.value) {
          this[this.value ? 'show' : 'hide']();
        }
      });
    }
  },
  mounted () {
    this.updateVisible();
  },
  beforeDestroy () {
    ZindexMap.delete(this.popupId);
    clearTimeout(this.effectTimeoutId);
    clearTimeout(this.autoCloseTimeoutId);
  }
};
</script>

<style lang="scss" scoped>
// fade效果
@keyframes s-popup-fade-enter {
  0% {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes s-popup-fade-leave {
  0% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

// 显示和隐藏效果
@keyframes s-popup-center-enter {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }

  to {
    opacity: 1;
  }
}

@keyframes s-popup-center-leave {
  0% {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: scale(0.9);
  }
}

@keyframes s-popup-top-enter {
  0% {
    transform: translate3d(0, -100%, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes s-popup-top-leave {
  to {
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes s-popup-left-enter {
  0% {
    transform: translate3d(-100%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes s-popup-left-leave {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes s-popup-right-enter {
  0% {
    transform: translate3d(100%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes s-popup-right-leave {
  to {
    transform: translate3d(100%, 0, 0);
  }
}

@keyframes s-popup-bottom-enter {
  0% {
    transform: translate3d(0, 100%, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes s-popup-bottom-leave {
  to {
    transform: translate3d(0, 100%, 0);
  }
}
.s-popup {
  display: none;
  position: fixed;
  left: 0;
  right: 0;
  top: var(--window-top);
  bottom: var(--window-bottom);
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  pointer-events: none;
  &-visible {
    display: flex;
  }
  &-mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    pointer-events: auto;
  }

  &-wrap {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    z-index: 2;
    pointer-events: auto;
    background-color: white;
    overflow: auto;
  }
  // 弹框效果
  animation-fill-mode: both;
  &-mask,
  &-wrap {
    animation-fill-mode: both;
    animation-duration: inherit;
  }
  &-effect-enter {
    .s-popup-mask,
    .s-popup-wrap {
      animation-name: s-popup-fade-enter;
    }
  }
  &-effect-leave {
    .s-popup-mask,
    .s-popup-wrap {
      animation-name: s-popup-fade-leave;
    }
  }
}

//center
.s-popup-position-center {
  justify-content: center;
  align-items: center;
  .s-popup-wrap {
    position: relative;
  }

  &.s-popup-effect-enter {
    .s-popup-wrap {
      animation-name: s-popup-center-enter;
    }
  }

  &.s-popup-effect-leave {
    .s-popup-wrap {
      animation-name: s-popup-center-leave;
    }
  }
}
//top
.s-popup-position-top {
  .s-popup-wrap {
    left: 0;
    right: 0;
    top: 0;
  }
  &.s-popup-effect-enter {
    .s-popup-wrap {
      animation-name: s-popup-top-enter;
    }
  }

  &.s-popup-effect-leave {
    .s-popup-wrap {
      animation-name: s-popup-top-leave;
    }
  }
}
//bottom
.s-popup-position-bottom {
  .s-popup-wrap {
    left: 0;
    right: 0;
    bottom: 0;
  }
  &.s-popup-effect-enter {
    .s-popup-wrap {
      animation-name: s-popup-bottom-enter;
    }
  }

  &.s-popup-effect-leave {
    .s-popup-wrap {
      animation-name: s-popup-bottom-leave;
    }
  }
}
//从左侧滑入
.s-popup-position-left {
  .s-popup-wrap {
    left: 0;
    top: 0;
    bottom: 0;
  }
  &.s-popup-effect-enter {
    .s-popup-wrap {
      animation-name: s-popup-left-enter;
    }
  }

  &.s-popup-effect-leave {
    .s-popup-wrap {
      animation-name: s-popup-left-leave;
    }
  }
}
//从右侧滑入
.s-popup-position-right {
  .s-popup-wrap {
    right: 0;
    top: 0;
    bottom: 0;
  }
  &.s-popup-effect-enter {
    .s-popup-wrap {
      animation-name: s-popup-right-enter;
    }
  }

  &.s-popup-effect-leave {
    .s-popup-wrap {
      animation-name: s-popup-right-leave;
    }
  }
}
</style>
