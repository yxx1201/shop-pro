<!-- Seach -->
<template>
  <div class="w1200">
    <Wares :lists="typeLists" uptype="0"></Wares>
  </div>
</template>

<script>
import { Search } from "@/api";
export default {
  name: "Search",
  data() {
    return {
      typeLists: [],
      key: "",
    };
  },
  methods: {
    $Search() {
      this.key = this.$route.query.key;
      Search({ word: this.key }).then((res) => {
          this.typeLists = res;
      });
    },
  },
  watch: {
    $route() {
      this.$Search();
    },
  },
  created() {
    this.$Search();
  },
};
</script>

<style lang='scss'>
</style>