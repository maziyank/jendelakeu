<template>
  <div>
    <div class="tile is-ancestor">
      <div v-for="(card, key) in topCards" :key="key" class="tile is-parent">
        <article class="tile is-child">
          <cardstat :icon="card.icon" :description="card.title" :value="card.value" />
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <profil :items="profilData" />
          <div class="box">
            <p class="subtitle">
              Komposisi Aset
            </p>
            <chart-2 :items="aset" class="box" />
          </div>
        </article>
      </div>
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div v-for="(gauge, key) in gauges" :key="key" class="tile is-parent">
            <article class="tile is-child box" style="margin:10px">
              <p class="title is-child is-6">
                {{ gauge.title }}
              </p>
              <gauge :title="gauge.title" :value="gauge.value" :color="gauge.color" />
            </article>
          </div>
        </div>
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="subtitle">
                Pendapatan
              </p>
              <div class="content">
                <chart-1 :items="pendapatan" />
              </div>
            </article>
          </div>
          <div class="tile is-6 is-parent">
            <article class="tile is-child box">
              <p class="subtitle">
                Belanja
              </p>
              <div class="content">
                <chart-1 :items="belanja" />
              </div>
            </article>
          </div>
        </div>

        <div class="tile" />
      </div>
    </div>
  </div>
</template>

<script>
import { evaluateXPathToString, evaluateXPathToNumber, evaluateXPathToNodes } from 'fontoxpath'
import cardstat from './cardstat'
import profil from './profil'
import gauge from './gauge'
import Chart1 from './chart1.vue'
import Chart2 from './chart2.vue'
import xbrl from '~/mixins/xbrl'

export default {
  components: { cardstat, profil, Chart1, Chart2, gauge },
  mixins: [xbrl],
  props: ['doc'],
  data () {
    return {
      profilData: [],
      gauges: [],
      topCards: [],
      pendapatan: [],
      belanja: [],
      aset: []
    }
  },
  watch: {
    doc: 'refreshData'
  },
  mounted () {
    setTimeout(() => {
      this.refreshData()
    }, 500)
  },
  methods: {
    refreshData () {
      this.profilData = [
        { meta: 'Nama Entitas', icon: 'home-city' },
        { meta: 'Nama Kepala Daerah', icon: 'account-supervisor-circle' },
        { meta: 'Opini', icon: 'help-circle' },
        { meta: 'Luas Wilayah', icon: 'map' },
        { meta: 'Jumlah Penduduk', icon: 'account-group' },
        { meta: 'PDRB (Harga Berlaku)', icon: 'finance' },
        { meta: 'Pendapatan/Kapita', icon: 'finance' },
        { meta: 'Inflasi', icon: 'cart-arrow-down' }
      ].map((x) => {
        return {
          meta: x.meta,
          icon: x.icon,
          value: evaluateXPathToString(`//general/info[@name='${x.meta}']`, this.doc)
        }
      })

      this.gauges = [
        { title: 'Rasio Efektivitas', value: this.RasioEfektivitas(this.doc), color: '#f95d6a' },
        { title: 'Rasio Belanja Modal', value: this.RasioBelanjaModal(this.doc), color: '#2f4b7c' },
        { title: 'Rasio Kemandirian', value: this.RasioKemandirian(this.doc), color: '#665191' },
        { title: 'Rasio Lancar', value: this.quickRatio(this.doc), color: '#003f5c' }
      ]

      this.topCards = [
        { title: 'Total Aset', icon: 'city', value: evaluateXPathToNumber('sum(//group[@name="Aset"]/heading/subheading/account/number())', this.doc) },
        { title: 'Total Pendapatan', icon: 'offer', value: evaluateXPathToNumber('sum(//heading[@name="Pendapatan"]/subheading/account/number())', this.doc) },
        { title: 'Total Belanja', icon: 'cart', value: -1 * evaluateXPathToNumber('sum(//heading[@name="Belanja"]/subheading/account/number())', this.doc) },
        { title: 'Total Pembiayaan', icon: 'cash-multiple', value: evaluateXPathToNumber('sum(//heading[@name="Pembiayaan"]/subheading/account/number())', this.doc) }
      ]

      this.pendapatan = evaluateXPathToNodes('//lra/heading[@name="Pendapatan"]/subheading', this.doc).map(
        (item) => {
          return {
            name: evaluateXPathToString('@name', item),
            value: evaluateXPathToNumber('sum(account/number())', item) / 1000000000,
            budget: evaluateXPathToNumber('sum(account/@budget/number())', item) / 1000000000
          }
        }
      )

      this.belanja = evaluateXPathToNodes('//lra/heading[@name="Belanja"]/subheading', this.doc).map(
        (item) => {
          return {
            name: evaluateXPathToString('@name', item),
            value: -1 * evaluateXPathToNumber('sum(account/number())', item) / 1000000000,
            budget: -1 * evaluateXPathToNumber('sum(account/@budget/number())', item) / 1000000000
          }
        }
      )

      this.aset = evaluateXPathToNodes('//neraca/group[@name="Aset"]/heading', this.doc).map(
        (item) => {
          return {
            name: evaluateXPathToString('@name', item),
            value: evaluateXPathToNumber('sum(subheading/account/number())', item) / 1000000000
          }
        }
      )
    }
  }
}
</script>
