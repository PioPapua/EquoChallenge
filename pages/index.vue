<template>
  <v-container fluid>
    <LoadingScreen :is-loading="isLoading" />
    <v-data-iterator
      v-if="!isLoading"
      :items="data"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template #header>
        <v-toolbar dark>
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          />
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer />
            <v-select
              v-model="sortBy"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            />
            <v-spacer />
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template #default="{ items }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.symbol"
            cols="12"
            sm="4"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.symbol }}
                <v-btn v-if="$vuetify.breakpoint.lgAndUp" outlined absolute right @click="navigateTo(item.symbol)">
                  Detailed information
                </v-btn>
                <v-btn
                  v-else
                  outlined
                  absolute
                  right
                  icon
                  @click="navigateTo(item.symbol)"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card-title>

              <v-divider />

              <v-list dense>
                <v-list-item v-for="(key, index) in filteredKeys" :key="index">
                  <v-list-item-content
                    v-show="key.key!=='lastVisited'"
                    :class="{ 'grey--text': sortBy === key }"
                  >
                    {{ key.text }}:
                  </v-list-item-content>
                  <v-list-item-content
                    v-show="key.key!=='lastVisited'"
                    class="align-end"
                    :class="{ 'grey--text': sortBy === key }"
                  >
                    {{ item[key.key] }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
      <template #footer>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="12" md="1" class="d-flex flex-row">
            <v-btn icon large @click="location.reload()">
              <v-icon class="pl-10">
                mdi-refresh
              </v-icon>
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="2" class="d-flex flex-row">
            <span>
              Page {{ page }} of {{ numberOfPages }}
            </span>
            <br>
            <span>
              Last update {{ lastUpdate }}
            </span>
            <v-btn
              fab
              dark
              @click="formerPage"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn
              fab
              dark
              @click="nextPage"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import LoadingScreen from './assets/LoadingScreen.vue'
export default {
  components: { LoadingScreen },
  data () {
    return {
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 6,
      sortBy: 'symbol',
      keys: [
        { key: 'symbol', text: 'Symbol' },
        { key: 'pricechange', text: 'Price Change' },
        { key: 'weightedavgprice', text: 'Weighted Average Price' },
        { key: 'volume', text: 'Volume' },
        { key: 'count', text: 'Count' },
        { key: 'lastVisited', text: 'Last Visited on' }
      ]
    }
  },
  computed: {
    numberOfPages () {
      return Math.ceil(this.data.length / this.itemsPerPage)
    },
    filteredKeys () {
      return this.keys.filter(key => key !== 'Symbol')
    },
    ...mapGetters('general', ['data', 'lastUpdate', 'isLoading'])
  },
  created () {
    const app = this
    this.loadCoins()
    setInterval(function () {
      app.loadCoins()
    }, 10000)
  },
  methods: {
    nextPage () {
      if (this.page + 1 <= this.numberOfPages) { this.page += 1 }
    },
    formerPage () {
      if (this.page - 1 >= 1) { this.page -= 1 }
    },
    updateItemsPerPage (number) {
      this.itemsPerPage = number
    },
    ...mapActions('general', ['loadCoins', 'updateOrderedCoins']),
    reload () {
      location.reload()
    },
    navigateTo (id) {
      this.updateOrderedCoins(id)
      this.$router.push({ path: `/coinDetail/${id}` })
    }
  }
}
</script>
