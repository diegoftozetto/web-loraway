<template>
  <div>
    <div v-if="!deviceIds">
      <p class="display-1 mt-6" align="center">Carregando...</p>
    </div>
    <div v-else>
      <v-card v-for="item in deviceIds" :key="item" class="mx-auto mb-4 ml-4 mr-4">
        <v-card-text>
          <p class="display-1 text--primary">Dispositivo {{ item }}</p>
          <div>...</div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            text
            color="teal accent-4"
            @click="reveal = true; clearInterval(this.interval)"
            :to="test(item)"
          >Visualizar Leituras</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "DeviceList",

  created() {
    this.request();
  },

  mounted() {
    console.log("HTML à disposição");
    var self = this;
    this.interval = setInterval(function () {
      self.request();
    }, 20000);
  },

  data: () => ({
    deviceIds: undefined,
    interval: undefined,
  }),

  methods: {
    async request() {
      const response = await fetch("http://api-loraway.herokuapp.com/devices");
      const data = await response.json();
      this.deviceIds = data.deviceIds;
      //console.log(this.deviceIds);
    },
    test(item) {
      clearInterval(this.interval);
      return `/device/${item}/readings`;
    },
  },
};
</script>

<style scoped>
</style>
