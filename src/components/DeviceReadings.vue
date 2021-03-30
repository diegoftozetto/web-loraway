<template>
  <div>
    <div v-if="!readings">
      <p class="display-1 mt-6" align="center">Carregando...</p>
    </div>
    <div v-else>
      <v-alert
        color="primary"
        dark
      >
        Identificador do Dispositivo: {{$route.params.id}}
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="secondary"
          @click="request"
          id="btn-update"
        >
          <v-icon dark>
            mdi-update
          </v-icon>
        </v-btn>
      </v-alert>
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
              <div v-if="reading.attributes">
                <ul v-for="attribute,index in reading.attributes" :key="index">
                  <li class="uppercase">{{index}}: {{attribute}}</li>
                </ul>
              </div>
              <div v-else>
                Nenhum atributo registrado.
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            text
          >{{new Date(reading.timestamp * 1000).toLocaleString("pt-BR", {timeZone: "America/Sao_Paulo"})}}</v-btn>
        </v-card-actions>
      </v-card>
      <v-pagination
        v-model="page"
        :length="pageCount"
        class="mb-2"
        @input="handlePageChange"
      ></v-pagination>
      <v-snackbar
        v-model="snackbar"
      >
        {{text}}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Fechar
          </v-btn>
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

  mounted() {
  },

  data: () => ({
    readings: undefined,
    snackbar: false,
    text: undefined,
    pageCount: 1,
    page: 1,
  }),

  methods: {
    async request(isUpdate) {

      axios
        .get("https://api-loraway.herokuapp.com/readings/" + this.$route.params.id + "?page=" + this.page)
        .then((response) => {
          this.readings = response.data.readings;
          this.pageCount = response.data.paginator.pageCount;

          if(isUpdate) {
            this.text = "Dados atualizados com sucesso! :)"
            this.snackbar = true;
          }
        })
        .catch(() => {
          this.text = "Erro ao carregar dados :("
          this.snackbar = true;
          //console.log(e);
        });
    },
    handlePageChange(value) {
      this.page = value;
      this.request(true);
    }
  },
};
</script>

<style scoped>
.uppercase {
  text-transform: uppercase;
}

#btn-update {
  float: right;
}

.v-alert {
  border-radius: 0 !important;
}
</style>
