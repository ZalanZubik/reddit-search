<template>
  <section class="results">
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div v-if="error">
      <h3>An error occurred. Please try again.</h3>
    </div>
    <div v-if="data">
      <div class="card-container">
        <div class="card" v-for="post in data" v-bind:key="post.id">
          <div class="card-img">
            <img :src="post.thumbnail" />
          </div>
          <div class="card-body">
            <h3>{{post.title}}</h3>
            <p class="card-text" v-if="post.selftext">{{truncateText(post.selftext,120)}}...</p>
            <a
              :href="'http://reddit.com' + post.permalink"
              target="_blank"
              rel="noopener noreferrer"
            >read more</a>
            <div class="badges">
              <p class="spoiler" v-if="post.spoiler">Spoilers!</p>
              <p class="score" v-if="post.score">Score: {{post.score}}</p>
              <p class="comments" v-if="post.num_comments">{{post.num_comments}} Comments</p>
              <p
                class="subreddit"
                v-if="post.subreddit_name_prefixed"
              >{{post.subreddit_name_prefixed}}</p>
            </div>
            <p>Posted on {{formatDate(post.created_utc)}}.</p>
          </div>
        </div>
      </div>
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
      data: null,
      totalHeight: 0
    };
  },
  methods: {
    truncateText(text, limit) {
      const shortened = text.indexOf(" ", limit);
      if (shortened == -1) return text;
      return text.substring(0, shortened);
    },
    formatDate(number) {
      const date = new Date(number * 1000);
      return date.toString().slice(4, 15);
    }
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
  margin-bottom: 7rem;
}

.card-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}

.card {
  background-color: var(--background);
  border-radius: 7px;
  display: grid;
  grid-template-columns: 1fr 5fr;
}

.card-img {
  margin-top: 0.8rem;
  margin-left: 0.8rem;
}

.card-img img {
  border-radius: 7px;
}

.card-body {
  margin: 0.8rem;
  margin-left: 0;
}

.card-text {
  word-wrap: break-word;
  margin-top: 10px;
}

.card a {
  display: inline-block;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 13px;
  font-weight: bold;
  margin-top: 1rem;
  background-color: var(--button);
  color: #fff;
  border-radius: 4px;
  transition-duration: 0.3s;
  outline: none;
  padding: 10px 20px;
}

.card a:hover {
  background-color: var(--button-hover);
}

.badges {
  margin: 17px 0 10px 0;
  display: flex;
  flex-wrap: wrap;
}

.badges p {
  display: inline-block;
  background-color: #6699cc;
  color: #fff;
  padding: 5px 8px;
  margin-right: 7px;
  margin-bottom: 7px;
  border-radius: 8px;
}

.badges .spoiler {
  background-color: #ff0000;
}

@media (min-width: 768px) {
}
</style>
