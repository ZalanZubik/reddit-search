<template>
  <nav class="header">
    <a href="/">
      <img :src="logo" alt="findit-logo" />
    </a>
    <a
      class="visit-reddit"
      href="https://reddit.com/"
      target="_blank"
      rel="noopener noreferrer"
    >Visit reddit</a>
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
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
}

img {
  height: 3rem;
}

.visit-reddit {
  text-decoration: none;
  font-size: 1.3rem;
  color: var(--button);
  font-weight: bold;
  transition-duration: 0.3s;
  outline: none;
  padding: 9px 0;
}

.visit-reddit:hover {
  color: var(--button-hover);
}

@media (min-width: 768px) {
  .header {
    justify-content: space-between;
    padding: 0 3rem;
  }
}
</style>
