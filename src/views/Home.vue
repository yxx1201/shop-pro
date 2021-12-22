<template>
  <div class="home">
    <Header :isT="isT" :Height="Height"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isT: false,
      Height: 160,
    };
  },
  methods: {
    ScrollT() {
      console.log(1);
      let scT = document.documentElement.scrollTop || document.body.scrollTop;
      if (scT > 200) {
        this.isT = true;
        this.Height = 60;
      } else if (scT < 200 && scT < 100) {
        this.isT = false;
        this.Height = 160;
      }
    },
  },
  mounted(){
    window.onscroll=this.ScrollT
  },
  updated(){
     window.onscroll=this.ScrollT
  }
};
</script>
<style lang="scss"></style>
