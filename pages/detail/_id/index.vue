<template>
  <section class="section" style="padding-top: 50px">
    <div class="columns">
      <div class="column is-three-fifths">
        <h2 class="title is-3 has-text-grey">
          {{ entityName }}
        </h2>
      </div>
      <div class="column is-two-fifth">
        <b-select v-model="year" rounded placeholder="Pilih Tahun" icon="calendar" style="float:right">
          <option v-for="option in availableYear" :key="option" :value="option">
            {{ option }}
          </option>
        </b-select>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <b-tabs v-model="activeTab" vertical type="is-boxed" size="medium">
          <b-tab-item
            v-for="(tab, index) in tabsItems"
            :key="index"
            :icon="tab.icon"
            :label="tab.title"
          >
            <component :is="tab.component" :ref="tab.component" :doc.sync="xbrlDoc" />
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import xpath from 'xpath'
import Overview from '~/components/detail/overview/index'
import Rasio from '~/components/detail/rasio/index'
import Neraca from '~/components/detail/neraca'
import Anggaran from '~/components/detail/anggaran'
import Operasional from '~/components/detail/operasional'
import Ekuitas from '~/components/detail/ekuitas'
import Silpa from '~/components/detail/silpa'
import xbrl from '~/mixins/xbrl'

export default {
  components: {
    Overview,
    Rasio,
    Neraca,
    Anggaran,
    Operasional,
    Ekuitas,
    Silpa
  },
  mixins: [xbrl],
  data () {
    return {
      xbrlDoc: {},
      activeTab: 0,
      idRegion: '',
      entityName: '',
      year: 2021,
      availableYear: [2014, 2019, 2018],
      tabsItems: [
        { title: 'Overview', component: 'Overview', icon: 'eye' },
        { title: 'Rasio Keuangan', component: 'Rasio', icon: 'chart-line' },
        { title: 'Neraca', component: 'Neraca', icon: 'scale-balance' },
        { title: 'Realisasi Anggaran', component: 'Anggaran', icon: 'beaker-check' },
        { title: 'Operasional', component: 'Operasional', icon: 'account-group' },
        { title: 'Arus Kas', component: 'Operasional', icon: 'cash' },
        { title: 'Ekuitas', component: 'Ekuitas', icon: 'bank' },
        { title: 'SILPA', component: 'Silpa', icon: 'wallet-plus' },
        { title: 'Sumber Data', component: 'source', icon: 'link-box' }
      ]
    }
  },
  watch: {
    $route: 'loadXBRL'
  },
  async mounted () {
    const year = this.$route.query.tahun
    const idRegion = this.$route.params.id
    const url = `/reports/xbrl/${year}/${idRegion}.xbrl`
    this.xbrlDoc = await this.loadXBRL(url)
    this.entityName = xpath.select1('//laporan/umum/namaentitas', this.xbrlDoc).textContent
    this.year = parseInt(xpath.select1('//laporan/umum/tahun', this.xbrlDoc).textContent)
  },
  methods: {}
}
</script>

<style scoped>
.b-tabs.is-vertical {
  flex-wrap: nowrap;
  padding-bottom: 200px;
}

.b-tabs .tabs {
  margin-top: 16px !important;
}

</style>
