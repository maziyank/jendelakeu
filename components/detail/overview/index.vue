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
        </article>
      </div>
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="subtitle">
                Pendapatan
              </p>
              <div class="content">
                <pendapatan />
              </div>
            </article>
          </div>
          <div class="tile is-6 is-parent">
            <article class="tile is-child box">
              <p class="subtitle">
                Belanja
              </p>
              <div class="content">
                <belanja />
              </div>
            </article>
          </div>
        </div>
        <div class="tile ">
          <div v-for="(gauge, key) in gauges" :key="key" class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title is-6">
                  {{ gauge.title }}
                </p>
                <gauge :title="gauge.title" :value="gauge.value" />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { evaluateXPathToString, evaluateXPathToNumber } from 'fontoxpath'
import cardstat from './cardstat'
import profil from './profil'
import pendapatan from './pendapatan'
import belanja from './belanja'
import gauge from './gauge'
import xbrl from '~/mixins/xbrl'

export default {
  components: { cardstat, profil, pendapatan, belanja, gauge },
  mixins: [xbrl],
  props: ['doc'],
  data () {
    return {
      profilData: [],
      gauges: [],
      topCards: []
    }
  },
  watch: {
    doc: 'refreshData'
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
        { title: 'Rasio Efektivitas', value: this.RasioEfektivitas(this.doc) },
        { title: 'Rasio Belanja Modal', value: this.RasioBelanjaModal(this.doc) },
        { title: 'Rasio Kemandirian', value: this.RasioKemandirian(this.doc) },
        { title: 'Rasio Lancar', value: this.quickRatio(this.doc) }
      ]

      this.topCards = [
        { title: 'Total Aset', icon: 'city', value: evaluateXPathToNumber('sum(//group[@name="Aset"]/heading/subheading/account/number())', this.doc) },
        { title: 'Total Pendapatan', icon: 'offer', value: evaluateXPathToNumber('sum(//heading[@name="Pendapatan"]/subheading/account/number())', this.doc) },
        { title: 'Total Belanja', icon: 'cart', value: -1 * evaluateXPathToNumber('sum(//heading[@name="Belanja"]/subheading/account/number())', this.doc) },
        { title: 'Total Pembiayaan', icon: 'cash-multiple', value: evaluateXPathToNumber('sum(//heading[@name="Pembiayaan"]/subheading/account/number())', this.doc) }
      ]
    }
  }
}
</script>
