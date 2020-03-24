<template>
  <section class="search">
    <h2>Search on Reddit</h2>
    <form v-on:submit.prevent="onSubmit">
      <input
        type="text"
        id="search-input"
        placeholder="Search Term..."
        v-model="term"
        maxlength="512"
        required
      />
      <div class="search-options">
        <div class="sort">
          <label for="sort">Sort By</label>
          <select v-model="sort">
            <option value="relevance">Relevance</option>
            <option value="new">Latest</option>
            <option value="top">Top</option>
            <option value="comments">Comments</option>
          </select>
        </div>
        <div class="limit">
          <label for="limit">Limit</label>
          <select v-model="limit">
            <option value="5">5</option>
            <option value="10">10</option>
            <option default value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
      <input type="submit" value="Search" class="submit-btn" />
    </form>
  </section>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      term: "",
      sort: "relevance",
      limit: "25"
    };
  },
  methods: {
    onSubmit() {
      this.$router.push(`/search/${this.sort}/${this.limit}/${this.term}`);
    }
  }
};
</script>

<style scoped>
.search {
  background-color: var(--background);
  width: 95%;
  max-width: 1000px;
  margin: 2rem auto 2rem auto;
  padding: 1.5rem;
  border-radius: 7px;
  text-align: center;
}

h2 {
  margin-bottom: 1rem;
}

#search-input {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 5px;
  width: 95%;
  max-width: 600px;
  height: 37px;
  margin: 0.6rem 0;
  font-size: 15px;
}

.sort,
.limit {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: auto;
  margin-top: 0.6rem;
}

.sort select,
.limit select {
  border: 1px solid gray;
  border-radius: 4px;
  padding: 5px;
  height: 37px;
  margin: 0.6rem 0;
  font-size: 15px;
}

.submit-btn {
  width: 200px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 1rem;
  padding: 10px 0;
  background-color: var(--button);
  color: #fff;
  text-align: center;
  border-radius: 7px;
  transition-duration: 0.3s;
  outline: none;
}

.submit-btn:hover {
  background-color: var(--button-hover);
}

@media (min-width: 768px) {
  .search-options {
    display: flex;
    width: 60%;
    margin: auto;
  }
}
</style>
