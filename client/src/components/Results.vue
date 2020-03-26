<template>
  <section class="results">
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div class="no-results" v-if="error">
      <img :src="noResults" alt="Crying reddit figure" />
      <h3 class="no-results-title">Sorry, an error has occurred. Please try again later.</h3>
    </div>
    <div class="no-results" v-if="data == 0">
      <img :src="noResults" alt="Crying reddit figure" />
      <h3
        class="no-results-title"
      >Sorry, there were no post results for "{{this.$route.params.term}}".</h3>
    </div>
    <div v-if="data != 0">
      <div class="card-container">
        <div class="card" v-for="post in data" v-bind:key="post.id">
          <div class="card-img">
            <img v-if="post.thumbnail.startsWith('http')" :src="post.thumbnail" alt="thumbnail" />
            <img v-if="post.thumbnail == 'self'" :src="selfPost" alt="thumbnail" />
            <img v-if="post.thumbnail == 'spoiler'" :src="selfPost" alt="thumbnail" />
            <img v-if="post.thumbnail == 'image'" :src="imagePost" alt="thumbnail" />
            <img v-if="post.thumbnail == 'default'" :src="defaultPost" alt="thumbnail" />
          </div>
          <div class="card-body">
            <h3>{{post.title}}</h3>
            <p class="card-text" v-if="post.selftext">{{truncateText(post.selftext,200)}}...</p>
            <a
              class="card-btn"
              :href="'https://www.reddit.com' + post.permalink"
              target="_blank"
              rel="noopener noreferrer"
            >read more</a>
            <div class="badges">
              <p class="badge spoiler" v-if="post.spoiler">Spoilers!</p>
              <p class="badge score" v-if="post.score">{{post.score.toLocaleString('hu-HU')}} points</p>
              <p
                class="badge comments"
                v-if="post.num_comments"
              >{{post.num_comments.toLocaleString('hu-HU')}} comments</p>
              <a
                class="badge subreddit"
                v-if="post.subreddit_name_prefixed"
                :href="'https://www.reddit.com/' + post.subreddit_name_prefixed + '/'"
                target="_blank"
                rel="noopener noreferrer"
                title="subreddit"
              >{{post.subreddit_name_prefixed}}</a>
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
      totalHeight: 0,
      selfPost: require("@/assets/SelfPost.png"),
      imagePost: require("@/assets/ImagePost.png"),
      noResults: require("@/assets/NoResults.png"),
      defaultPost: require("@/assets/DefaultPost.png")
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
        `/api/search/${this.$route.params.sort}/${this.$route.params.time}/${this.$route.params.limit}/${this.$route.params.term}`
      );
      this.data = res.data.data.children.map(data => data.data);
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
}

.no-results {
  background-color: var(--background);
  padding: 0 1rem 1.5rem 1rem;
  text-align: center;
  border-radius: 7px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.no-results-title {
  word-wrap: break-word;
}

.card-container {
  margin-bottom: 5rem;
}

.card {
  background-color: var(--background);
  border-radius: 7px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 1rem;
}

.card-img {
  margin: 0.7rem;
}

.card-img img {
  border-radius: 6px;
  width: 100%;
}

.card-body {
  margin: 0.6rem;
  margin-left: 0.2rem;
  overflow: hidden;
}

.card-text {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: 10px;
}

.card-btn {
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

.card-btn:hover {
  background-color: var(--button-hover);
}

.badges {
  margin: 17px 0 10px 0;
  display: flex;
  flex-wrap: wrap;
}

.badge {
  display: inline-block;
  background-color: #6699cc;
  color: #fff;
  padding: 5px 9px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: 9px;
}

.subreddit {
  background-color: #4985c2;
  text-decoration: none;
}

.spoiler {
  background-color: #ff0000;
}

@media (min-width: 768px) {
  .card {
    grid-template-columns: 1fr 3fr;
  }
}

@media (min-width: 1060px) {
  .card {
    grid-template-columns: 1fr 4fr;
  }
}
</style>
