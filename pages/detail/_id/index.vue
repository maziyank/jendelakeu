<template>
  <section class="section" style="padding-top: 50px">
    <div class="columns">
      <div class="column is-four-fifths">
        <h2 class="title is-3 has-text-grey">
          Kabupaten Something
        </h2>
      </div>
      <div class="column is-one-fifth">
        <b-select v-model="year" placeholder="Pilih Tahun" icon="calendar" rounded style="float: right;">
          <option v-for="option in availableYear" :key="option" :value="option">
            {{ option }}
          </option>
        </b-select>
      </div>
    </div>

    <b-tabs v-model="activeTab" type="is-boxed" expanded>
      <b-tab-item
        v-for="(tab, index) in tabsItems"
        :key="index"
        :label="tab.title"
      >
        <component :is="tab.component" :ref="tab.component" :doc="xbrlDoc" />
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import Overview from './overview'
import Kinerja from './kinerja'
import Neraca from './neraca'
import Anggaran from './anggaran'
import Operasional from './operasional'
import Ekuitas from './ekuitas'
import Silpa from './silpa'

import xbrl from '~/mixins/xbrl'

export default {
  components: {
    Overview,
    Kinerja,
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
      year: '',
      availableYear: [2019, 2018],
      tabsItems: [
        { title: 'Overview', component: 'Overview' },
        { title: 'Kinerja Keuangan', component: 'Kinerja' },
        { title: 'Neraca', component: 'Neraca' },
        { title: 'Realisasi Anggaran', component: 'Anggaran' },
        { title: 'Operasional', component: 'Operasional' },
        { title: 'Ekuitas', component: 'Ekuitas' },
        { title: 'SILPA', component: 'Silpa' },
        { title: 'Sumber Data', component: 'source' }
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
  },
  methods: {}
}
</script>
