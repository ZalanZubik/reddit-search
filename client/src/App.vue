<template>
  <div>
    <Header />
    <Search />
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Search from "./components/Search";

export default {
  name: "App",
  components: {
    Header,
    Search
  }
};
</script>

<style>
:root {
  --canvas: #dae0e6;
  --background: #ffffff;
  --headerBackground: #fff;
  --button: rgba(0, 121, 211, 1);
  --button-hover: rgba(0, 121, 211, 0.6);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "IBM Plex Sans", Arial, sans-serif;
  line-height: 1.1;
  background-color: var(--canvas);
  overflow-y: scroll;
}
</style>
