<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" id="logo">
    <HelloWorld msg="query location information about ip" :ip=ip />

  </div>
</template>

<script>
import {getBackend} from "~/utils/getBackend.js";
/**
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-2XW32RHSFT');
 */
import "./assets/tailwind.css"
import HelloWorld from './components/HelloWorld.vue'
//import {definePageMeta} from "nuxt/dist/pages/runtime/index";

const prefix=getBackend()
export default {
  name: 'App',
  setup(){

  },
  components: {
    HelloWorld
  },data: () => {
    return {
      myip:"8.8.8.8",
      ip:"8.8.8.8"
    }
  },mounted() {
    this.getMyIp()
  },methods: {
    async getMyIp() {

      let my_ip = await fetch(prefix+"/myip").then(res => res.text());
      let path = this.$route.path;
      let containsIp = path.includes("/ip/")
      let containsApi = path.includes("/api/")
      if(!containsApi && !containsIp) {
        console.log("to.path ;:",path)
        location.href = "/ip/"+my_ip;
        return;
      }


      let sections = this.$route.path.split("/ip/")

      console.log(sections);

      this.myip = my_ip;
      if(sections.length > 1) {
        this.ip = sections[1];



      }else{


      }
    }
  }
}
</script>

<style>
body {
  background-color: #000000;
}
@media only screen and (min-width: 1200px){
  #logo {
    width:33%;
    margin:0 auto;
  }
}
@media only screen and (min-width: 800px){
  #logo {
    width:50%;
    margin:0 auto;
  }
}
@media only screen and (max-width: 600px) {
  pre {
    overflow-y: hidden;
    text-overflow: ellipsis;
  }
}
@media only screen and (max-width: 800px){
  #logo {
    width:80%;
    margin:0 auto;
  }
  #app {
    margin:0 1rem;
  }
  pre {
    scroll-behavior: auto;
    overflow-x: scroll;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
