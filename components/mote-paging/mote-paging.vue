<template>
  <view>
    <scroll-view :show-scrollbar="false" scroll-y="true" :bindscroll="scrollFn" :bindscrolltolower="loadMore"
                 lower-threshold="100" :enhanced="true" :fast-deceleration="true" :paging-enabled="true" :enable-back-to-top="true" style="height:calc(100vh-100upx)">
      <slot></slot>
      <view style="text-align: center" v-if=" currentPage< allPages" @click="getComments">
        --- 加载更多 ---
      </view>
      <view v-else>
        <view class="withoutThe" v-if="total>0||!emptyShow">
          <template>没有更多了~！</template>
        </view>
        <view v-else style="text-align: center">
          <text>暂无数据</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      allList: undefined,
      allPages: 0,
      currentPage: 0,
      total: 0,
      emptyShow: true
    }
  },
  props: {
    value: {
      type: Array,
      default: []
    },
    uri: {
      type: [String],
      required: true
    },
    params: {
      type: [Object]
    },
    rows: {
      type: [Number, String],
      default: 10
    },
    emptyPrompt: {
      type: [String]
    }
  },
  mounted() {
    this.allList = this.value
    this.getComments()
  },
  watch: {
    value(nv) {
      if (nv && nv.length > 0) {
        this.emptyShow = false
      } else {
        this.emptyShow = true
      }
    }
  },
  methods: {
    scrollFn(pm) {
      // 暂不实现
      console.info(pm)
    },
    loadMore(pm) {
      // 暂不实现
      console.info(pm)
    },
    // 清除数据
    clearPage() {
      this.allList = []
      this.allPages = 0
      this.currentPage = 0
      // 数据总条数
      this.total = 0
    },
    // 上拉加载
    pullUp() {
      this.getComments()
    },
    // 下拉刷新
    pullDown() {
      try {
        this.clearPage()
        this.getComments()
      } catch (e) {
        this.$gp.utils.showToast('网络异常请稍后再试')
      } finally {
        setTimeout(() => {
          uni.stopPullDownRefresh();
        }, 500)
      }
    },
    // 获取数据
    getComments: function() {
      let pageDt = {
        page: this.currentPage + 1,
        rows: this.rows
      };
      if (this.allPages != 0 && this.currentPage == this.allPages) {
        // TODO 当没有更多页时忽略

      } else {
        // 需自定义改造
        // dt
        this.$req.get(this.uri, Object.assign(pageDt, this.params)).then(res => {
          let dt = res.data;
          if (!dt) {
            if (!this.allList) {
              this.$emit('input', [])
            }
            return
          }
          // 总页数
          this.allPages = dt.pages;
          // 当前页
          this.currentPage = dt.pageNum;
          // 数据总条数
          this.total = dt.total
          if (dt.size == 0) {
            return;
          }
          this.dataConcat(this.allList, dt.list)
          this.$emit('input', this.allList)
        })
      }
    },
    dataConcat: function(source, dtList) {
      if (source) {
        for (let i = 0; i < dtList.length; i++) {
          source.push(dtList[i])
        }
      } else {
        source = dtList;
      }
    }
  }
}
</script>

<style scoped>
.withoutThe {
  color: #828282;
  text-align: center;
}
</style>
