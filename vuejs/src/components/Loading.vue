<template>
  <div class="lds-ellipsis"><div :style="'background-color: ' + color"></div><div :style="'background-color: ' + color"></div><div :style="'background-color: ' + color"></div><div :style="'background-color: ' + color"></div></div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    color: String
  }
}
</script>

<style scoped>
@import '../../public/css/Loading.css';
</style>