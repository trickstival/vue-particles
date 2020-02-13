<template>
  <div
    :class="'shape__' + name"
    :style="{
        backgroundColor: color
    }"
    class="shape"
  >

  </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: '#000'
        },
        name: {
            type: String,
            default: 'square'
        }
    }
}
</script>

<style lang="scss" scoped>
.shape {
    width: 10px;
    height: 10px;
    position: absolute;
}
@import "../assets/scss/shapes.scss";
</style>