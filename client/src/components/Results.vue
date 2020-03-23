<template>
  <section class="results">
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div v-if="error">
      <h3>An error occurred. Please try again.</h3>
    </div>
    <div v-if="data">
      data
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Results",
  data() {
    return {
      loading: false,
      error: false,
      data: null
    };
  },
  async created() {
    this.loading = true;
    try {
      const res = await axios.get(
        `/api/search/${this.$route.params.sort}/${this.$route.params.limit}/${this.$route.params.term}`
      );
      this.data = res.data.data.children.map(data => data.data);
      console.log(this.data);
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.error = true;
    }
  }
};
</script>

<style scoped>
.results {
  width: 95%;
  max-width: 1000px;
  margin: auto;
  border: 1px solid black;
  margin-bottom: 7rem;
}
</style>
