<template>
  <div>
    <div v-if="!readings">
      <p class="display-1 mt-6" align="center">Carregando...</p>
    </div>
    <div v-else>
      <v-alert color="primary" dark>
        <v-sheet v-if="chart" color="rgba(0, 0, 0, .12)" class="mb-4">
          <v-sparkline
            :labels="labels"
            :value="value"
            color="rgba(255, 255, 255, .7)"
            height="100"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item">{{item.value}}</template>
          </v-sparkline>
        </v-sheet>
        Identificador do Dispositivo: {{$route.params.id}}
        <div class="flex-container">
          <v-switch v-if="page==1" v-model="switch1" inset color="yellow" @change="changeState" />
          <v-btn
            v-if="!switch1 || page != 1"
            class="mx-2"
            fab
            dark
            small
            color="secondary"
            @click="request(true)"
          >
            <v-icon dark>mdi-update</v-icon>
          </v-btn>
          <v-btn
            v-if="!switch1 || page != 1"
            class="mx-2"
            fab
            dark
            small
            color="success"
            @click="changeStateChart()"
          >
            <v-icon dark>mdi-chart-bar</v-icon>
          </v-btn>
        </div>
      </v-alert>
      <v-pagination v-model="page" :length="pageCount" class="mb-2" @input="handlePageChange"></v-pagination>
      <v-card v-for="reading,index in readings" :key="reading._id" class="mx-auto mb-4 ml-4 mr-4">
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
              <div v-if="reading.attributes">
                <ul v-for="attribute,index in reading.attributes" :key="index">
                  <li class="uppercase">{{index}}: {{attribute}}</li>
                </ul>
              </div>
              <div class="wattribute" v-else>Nenhum atributo registrado.</div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text>{{convertTimestampToDateAndTime(reading.timestamp)}}</v-btn>
          <v-btn color="secondary" small outlined @click="remove(reading._id, index)">
            <v-icon dark>mdi-delete</v-icon>
          </v-btn>
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
  name: "DeviceReadings",

  created() {
    this.request();
  },

  mounted() {},

  data: () => ({
    interval: undefined,
    readings: undefined,
    snackbar: false,
    text: undefined,
    pageCount: 1,
    page: 1,
    switch1: false,
    chart: false,
    value: [],
    labels: [],
  }),

  methods: {
    async request(isUpdate) {
      if (this.$route.params.id === undefined) {
        clearInterval(this.interval);
      } else {
        axios
          .get(
            "https://api-loraway.herokuapp.com/readings/" +
              this.$route.params.id +
              "?page=" +
              this.page
          )
          .then((response) => {
            this.readings = response.data.readings;
            this.pageCount = response.data.paginator.pageCount;

            if (isUpdate) {
              this.text = "Dados atualizados com sucesso! :)";
              this.snackbar = true;
            }

            try {
              this.value = [];
              this.labels = [];
              this.readings.forEach((element, index) => {
                if(index < 5) {
                  this.value.push(element.attributes.temperatura);
                  this.labels.unshift(
                    element.attributes.temperatura +
                      " (" +
                      this.convertTimestampToTime(element.timestamp) +
                      ")"
                  );
                }
              });
            } catch (e) {
              //console.log(e);
            }
          })
          .catch(() => {
            this.text = "Erro ao carregar dados :(";
            this.snackbar = true;
            //console.log(e);
          });
      }
    },
    handlePageChange(value) {
      this.page = value;
      this.request();
      if (this.page == 1) this.changeInterval(this.switch1);
    },
    changeInterval(flag) {
      if (!flag) {
        clearInterval(this.interval);
      } else {
        var self = this;
        this.interval = setInterval(function () {
          if (self.page != 1) {
            clearInterval(this.interval);
          } else {
            self.request();
          }
        }, 3000);
      }
    },
    changeState(value) {
      this.text =
        "Atualização automática " +
        (value ? "ligada (a cada 3s)." : "desligada.");
      this.changeInterval(value);
      this.snackbar = true;
    },
    remove(id, index) {
      axios
        .delete("https://api-loraway.herokuapp.com/readings/" + id)
        .then((response) => {
          if (response.status === 200) {
            this.readings.splice(index, 1);
            this.text = "Leitura removida sucesso! :)";
            this.snackbar = true;
          }
        })
        .catch(() => {
          this.text = "Erro ao remover leitura :(";
          this.snackbar = true;
        });
    },
    convertTimestampToDateAndTime(timestamp) {
      return new Date(timestamp * 1000).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });
    },
    convertTimestampToTime(timestamp) {
      return new Date(timestamp * 1000).toLocaleTimeString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      });
    },
    changeStateChart() {
      this.chart = !this.chart;
    },
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  float: right;
}

.uppercase {
  text-transform: uppercase;
}

.wattribute {
  white-space: nowrap;
}

.v-alert {
  border-radius: 0 !important;
}
</style>
