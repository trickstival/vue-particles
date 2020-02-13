<template>
  <div id="app">
      <drawing-frame></drawing-frame>
  </div>
</template>

<script>
import DrawingFrame from './components/DrawingFrame'

export default {
    name: 'App',
    components: {
        DrawingFrame
    }
}
</script>

<style lang="scss">
@import "./assets/scss/_global.scss";
</style>