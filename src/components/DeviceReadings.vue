<template>
  <div>
    <div v-if="!readings">
      <p class="display-1 mt-6" align="center">Carregando...</p>
    </div>
    <div v-else>
      <p align="center" class="mt-2 mb-4">
        <b>Identificador do Dispositivo: {{$route.params.id}}</b>
      </p>
      <v-card v-for="reading in readings" :key="reading._id" class="mx-auto mb-4 ml-4 mr-4">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-subtitle>
              <v-alert
                dense
                outlined
                type="info"
                class="mb-1"
              >Identificador da Mensagem: {{reading.messageId}}</v-alert>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col cols="6">
              <b class="uppercase">Atributos:</b>
              <div>
                <ul v-for="attribute,index in reading.attributes" :key="index">
                  <li class="uppercase">{{index}}: {{attribute}}</li>
                </ul>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text>{{new Date(reading.timestamp * 1000).toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"})}}</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DeviceReadings",

  created() {
    this.request();
  },

  mounted() {
    var self = this;
    this.interval = setInterval(function () {
      self.request();
    }, 3000);
  },

  data: () => ({
    readings: undefined,
    interval: undefined,
  }),

  methods: {
    async request() {
      if (this.$route.params.id === undefined) clearInterval(this.interval);
      else {
        const response = await fetch(
          "http://api-loraway.herokuapp.com/readings/" + this.$route.params.id
        );
        const data = await response.json();
        this.readings = data;
        //console.log(this.readings);
      }
    },
  }
};
</script>

<style scoped>
.uppercase {
  text-transform: uppercase;
}
</style>
