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
            default: 1
        },
    }
}
</script>

<style>

</style>