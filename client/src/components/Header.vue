<template>
  <nav class="header">
    <a href="/">
      <img :src="logo" alt="findit-logo" />
    </a>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      logo: require("@/assets/FinditLogo.png")
    };
  }
};
</script>

<style scoped>
.header {
  background-color: var(--headerBackground);
  width: 95%;
  max-width: 1000px;
  margin: 1rem auto;
  height: 4rem;
  padding: 0 5px;
  border-radius: 7px;
  display: flex;
  align-items: center;
}

img {
  height: 3rem;
}

@media (min-width: 768px) {
  .header {
    justify-content: flex-start;
    padding-left: 3rem;
  }
}
</style>
