<template>
  <div class="main-content">
    <slot />
  </div>
</template>

<script></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #025e50;
}

.main-content {
  color: #363642;
  text-align: left;
}
</style>
