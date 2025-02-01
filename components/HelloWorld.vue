<template>
  <div class=" dark:bg-gray-800">

    <form method="GET" action="/ip/" @submit.prevent="onSubmit">
      <p class="container mx-auto px-4 py-4 border-4 text-2xl bg-white text-left rounded-t-lg">
        <span class="text-green-800 italic">$</span>&nbsp;
        <span class="text-gray-700 italic">
        <span class="font-bold">curl</span>
          https://ip4.dev/location/<input class="md:focus:text-red-400 min-w-min font-bold underline border-b-2" v-model="new_ip"  @keyup.enter="tosubmit">
        </span>
        <span class="text-gray-500 text-ml notice-type-ip">&nbsp;type IP,then press `Enter`</span>
        </p>
      <pre class="container mx-auto bg-yellow-200 text-left text-xl px-4 py-4">{{ response }}
      </pre>

      <iframe :src="url"  class="container mx-auto  rounded-b-lg"  :height="height"></iframe>

      <br/>
      <p class="container mx-auto px-4 py-4 border-4 text-2xl bg-white text-left rounded-t-lg">curl https://ip4.dev/location?callback={{ rand }}
      </p>
      <pre class="container mx-auto bg-yellow-200 text-left text-xl px-4 py-4"> {{ rand}} ({{ response }})
      </pre>


<br/>
      <p class="container mx-auto px-4 py-4 border-4 text-2xl bg-white text-left rounded-t-lg">curl https://ip4.dev/myip
      </p>
      <pre class="container mx-auto bg-yellow-200 text-left text-xl px-4 py-4">{{ ip }}
      </pre>

      <br/>
      <p class="container mx-auto px-4 py-4 border-4 text-2xl bg-white text-left rounded-t-lg">curl  "https://ip4.dev/myip?format=json"
      </p>
      <pre class="container mx-auto bg-yellow-200 text-left text-xl px-4 py-4">{"code":200,"data":"{{ ip }}" }
      </pre>

<br/>
      <p class="container mx-auto px-4 py-4 border-4 text-2xl bg-white text-left rounded-t-lg">curl https://ip4.dev/myip?callback={{ rand }}
      </p>
      <pre class="container mx-auto bg-yellow-200 text-left text-xl px-4 py-4">{{ rand }}("{{ ip }}");
      </pre>
    </form>

    <ul class="mt-4 mb ">
      <li class="text-gray-600">typescript sdk:<a href="https://www.npmjs.com/package/ip4dev" target="_blank"  class="text-lg ">ip4dev@npmjs</a></li>
      <li class="text-gray-600">php sdk:<a href="https://packagist.org/packages/gotapi/ip4dev" target="_blank" rel="noopener" class="text-lg">ip4dev@packagist.org</a></li>
      <li class="text-gray-600">based on: <a href="https://github.com/gotapi/gmm" target="_blank" rel="noopener" class="text-lg">gmm</a></li>
    </ul>
    <ul class="mb-12 ">
      <li class="text-gray-600">better ip database:<a href="https://www.ipip.net" target="_blank"  class="text-lg ">ipip.net</a></li>

      <li class="text-gray-600">status:<a href="https://stats.uptimerobot.com/RJ6jkfG1oE">status </a>  </li>
      <li class="text-gray-600">author: <a href="https://404.ms/">404.ms</a></li>
      <li class="text-gray-600">sponsor: <a href="https://facev.app/">facev.app</a>&nbsp;
        <a href="https://mp4mate.com/">tiktok video download</a>&nbsp;
        <a href="https://www.cliptxt.com/">fast youtube transcription</a>

      </li>
      <li class="text-gray-600">sponsor: 
        <a href="https://some.im/">some.im</a>

      </li>
    </ul>

  </div>
  <!-- Global site tag (gtag.js) - Google Analytics -->

</template>

<script >
import {getBackend} from "~/utils/getBackend.js";

const randJsonp = "jsonCb" + Math.floor(Math.random(100000)*19999)
const prefix=getBackend();
let rand = randJsonp;
let height = 400;
let url = "";
let response = "{\n" +
    "ip: \"8.8.8.8\",\n" +
    "continent_code: \"NA\"," +
    "country: \"United States\",\n" +
    "country_code: \"US\"," +
    "country_code3: \"USA\",\n" +
    "latitude: 37.751," +
    "longitude: -97.822,\n" +
    "timezone: \"America/Chicago\"," +
    "offset: -21600,\n" +
    "asn: 15169," +
    "organization: \"GOOGLE\"\n" +
    "}";
let position = "";
let msg = "";

export default {
  props:{
    ip: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.getIPInfo()
  },
  methods: {
    showUrl:(ip,position,tag,self)=>{
      try {
        if(document.body.clientWidth>800){
          self.height = 600;
        }else{
          self.height = 400;
        }
      }catch (e){
        console.log("got error");
        console.log(e);
      }
      return "https://apis.map.qq.com/tools/poimarker?type=0&key=RHWBZ-MDC3W-M6ERC-O4NDO-HAUUS-TWF2N&referer=myapp&marker=coord:"+
          position+";title:" + ip + ";addr:" + tag;
    },onSubmit:()=>{
      return false;
    },
    tosubmit(){
      location.href = "/ip/"+this.new_ip;
      return false;
    },
    async getIPInfo() {
      console.log("mounted in helloworld")
      let sections = this.$route.path.split("/ip/")
      console.log("sections",sections);
      let ip = sections[1];
      this.new_ip = ip;
      let url = prefix + "/location/" + ip+"";
      console.log("url:",url)
      let resp = await fetch(url).then((resp) => resp.json());
      console.log("resp:",resp);
      this.response = JSON.stringify(resp, null, 2);
      let position = resp.latitude +","+resp.longitude;
      this.url = this.showUrl(ip,position,ip,this);
    }
    },
  data: () => {
    return {
      myip:"",
      rand: rand,
      new_ip:"",
      height: height,
      url: url,
      response: response,
      position: position,
      msg: msg
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color:brown;
}
@media only screen and (max-width: 1080px){
  .notice-type-ip {
    display: block;
  }
}
</style>
