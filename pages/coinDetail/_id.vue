<template #default="props">
  <v-row>
    <v-card>
      <v-card-title class="subheading font-weight-bold">
        {{ singleCoin.symbol }}
        <v-btn outlined right>
          Detailed information
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-list dense>
        <v-list-item
          v-for="(id, key) in keys"
          :key="key"
        >
          <v-list-item-content>
            {{ id.text }}:
          </v-list-item-content>
          <v-list-item-content
            class="align-end"
          >
            {{ singleCoin[id.key] }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      keys: [
        { key: 'symbol', text: 'Symbol' },
        { key: 'highPrice', text: 'High Price' },
        { key: 'lowPrice', text: 'Low Price' },
        { key: 'openPrice', text: 'Open Price' },
        { key: 'askPrice', text: 'Ask Price' },
        { key: 'bidPrice', text: 'Bid Price' }
      ]
    }
  },
  computed: {
    ...mapGetters('general', ['isLoading', 'singleCoin'])
  },
  created () {
    this.loadSingleCoin(this.$route.params.id)
  },
  methods: {
    ...mapActions('general', ['loadSingleCoin'])
  }
}
</script>

<style>

</style>
