<template>
  <div>
    <div class="title">Home page</div>
    <div class="btn-box">
      <router-link class="btn" to="/">home</router-link>
      <router-link class="btn" to="/about">about</router-link>
      <router-link class="btn" to="/default">defalut</router-link>
    </div>
    <div>
      <div class="count">store demo: {{count}}</div>
      <span class="btn" @click="add">add count</span>
    </div>
    <div>
      <div class="count">输出值：{{number}}</div>
      <span class="btn" @click="debounce">防抖</span>
      <span class="btn" @click="throttle">节流</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { _debounce, _throttle } from 'utils/public.js'
export default {
  name: 'Home',
  data () {
    return {
      number: 0
    }
  },
  computed: {
    ...mapGetters(
      ['count']
    )
  },
  methods: {
    add () {
      this.$store.dispatch('count/add')
    },
    debounce: _debounce(function () {
      this.number++
    }, 200),
    throttle: _throttle(function () {
      this.number++
    }, 200)
  }
}
</script>

<style lang="scss" scoped>

</style>
