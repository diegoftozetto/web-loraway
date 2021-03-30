<template>
  <div class="mt-4">
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
            @click="reveal = true;"
            :to="`/device/${item}/readings`"
          >Visualizar Leituras</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "DeviceList",

  created() {
    this.request();
  },

  mounted() {
  },

  data: () => ({
    deviceIds: undefined,
    interval: undefined,
  }),

  methods: {
    async request() {
      axios
      .get("https://api-loraway.herokuapp.com/devices")
      .then((response) => {
        this.deviceIds = response.data.deviceIds;
        //console.log(this.deviceIds)
      })
      .catch(() => {
        //console.log(e);
      });
    }
  },
};
</script>

<style scoped>
</style>
