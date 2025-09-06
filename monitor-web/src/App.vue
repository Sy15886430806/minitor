<script setup>

import {useDark, useToggle} from "@vueuse/core";

useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light'
})

useDark({
  onChanged(dark) {
    useToggle(dark)
  }
})

</script>

<template>
  <div>
    <router-view/>
  </div>
</template>

<style scoped>
* {
  font-family: 'Noto Serif SC', serif;
}

header {
  line-height: 1.5;
}
</style>
