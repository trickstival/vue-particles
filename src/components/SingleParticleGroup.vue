<template>
  <div class="single-particle-group">
      <div
        v-for="num in count"
        :key="num"
        class="particle-wrapper">
          <slot />
      </div>
  </div>
</template>

<script>
export default {
    props: {
        count: {
            type: Number,
            default: 10
        },
    },
    mounted () {
        for (const child of this.$children) {
            child.delay = Math.random() * 3
        }
    }
}
</script>

<style>

</style>