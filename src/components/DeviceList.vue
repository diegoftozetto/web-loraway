<template>
  <div class="mt-4">
    <div v-if="!deviceIds">
      <p class="display-1 mt-6" align="center">Carregando...</p>
    </div>
    <div v-else>
      <v-card v-for="item,index in deviceIds" :key="item" class="mx-auto mb-4 ml-4 mr-4">
        <v-card-text>
          <p class="display-1 text--primary">Dispositivo {{ item }}</p>
          <div>
            <v-btn
              color="primary"
              fab
              small
              outlined
              @click="reveal = true;"
              :to="`/device/${item}/readings`">
              <v-icon dark>mdi-eye</v-icon>
            </v-btn>
            <v-btn class="ml-2 btn-delete"
              color="secondary"
              fab
              small
              outlined
              @click="remove(item, index)">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>

          </div>
        </v-card-text>
        <v-card-actions>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="snackbar">
        {{text}}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Fechar</v-btn>
        </template>
      </v-snackbar>
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
    snackbar: false,
    text: undefined,
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
    },
    remove(id, index) {
      axios
        .delete(
          "https://api-loraway.herokuapp.com/devices/"+ id +"/readings"
        )
        .then((response) => {
          if(response.status === 200) {
            this.deviceIds.splice(index, 1);
            this.text = "Dispositivo removido sucesso! :)";
            this.snackbar = true;
          }
        })
        .catch(() => {
          this.text = "Erro ao remover dispositivo :(";
          this.snackbar = true;
        });
    }
  },
};
</script>

<style scoped>
.btn-delete {
  float: right;
}
</style>
