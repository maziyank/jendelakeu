<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <ratioradar :ratios="ratios" />
        </article>
      </div>
      <div class="tile is-vertical is-8">
        <div v-for="(ratio, key) in ratios" :key="key" class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="content">
                <rasiocard :title="ratio.title" :value="ratio.value" :description="ratio.description" />
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rasiocard from './rasiocard'
import ratioradar from './ratioradar'
import xbrl from '~/mixins/xbrl'

export default {
  components: { rasiocard, ratioradar },
  mixins: [xbrl],
  props: ['doc'],
  data () {
    return {
      ratios: []
    }
  },
  watch: {
    doc: 'refreshData'
  },
  methods: {
    refreshData () {
      this.ratios = [
        {
          title: 'Rasio Lancar',
          description: 'Rasio ini menunjukan kemampuan pemerintah untuk memenuhi kewajiban hutang jangka pendek untuk jangka waktu 12 bulan ke depan',
          value: this.quickRatio(this.doc)
        },
        {
          title: 'Rasio Belanja Modal',
          description: 'Rasio ini menunjukan proporsi belanja yang dikeluarkan untuk pembangunan/pembelian aset dibandingkan dengan keseluruhan belanja',
          value: this.RasioBelanjaModal(this.doc)
        },
        {
          title: 'Rasio Kemandirian',
          description: 'Kemandirian keuangan daerah (otonomi fiskal) mengindikasikan kemampuan Pemerintah Daerah dalam membiayai sendiri kegiatan pemerintahan, pembangunan, dan pelayanan masyarakat yang telah membayar pajak dan retribusi sebagai sumber pendapatan daerah ',
          value: this.RasioKemandirian(this.doc)
        },
        {
          title: 'Rasio Efektivitas',
          description: 'Rasio efektivitas menggambarkan kemampuan pemerintah daerah dalam merealisasikan pendapatan asli daerah yang direncanakan dibandingkan dengan target yang ditetapkan berdasarkan potensi riil daerah',
          value: this.RasioEfektivitas(this.doc)
        }
      ]
    }
  }
}
</script>
