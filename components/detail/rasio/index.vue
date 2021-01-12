<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <ratioradar :ratios="ratios" />
          <div class="block">
            <b-checkbox v-model="showGauge">
              Tampilkan Gauge Pada Penjelasan
            </b-checkbox>
          </div>
        </article>
      </div>
      <div class="tile is-vertical is-8">
        <div v-for="(ratio, key) in ratios" :key="key" class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="content">
                <rasiocard :gauge="ratio.gauge" :title="ratio.title" :value="ratio.value" :description="ratio.description" :color="ratio.color" />
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
      ratios: [],
      showGauge: true
    }
  },
  watch: {
    doc: 'refreshData',
    showGauge: 'refreshData'
  },
  methods: {
    refreshData () {
      this.ratios = [
        {
          title: 'Rasio Aktifitas',
          description: 'Rasio Aktifitas menggambarkan bagaimana pemerintah daerah menggunakan alokasi dananya untuk kegiatan rutin',
          value: this.RasioAktivitas(this.doc),
          color: '#f2dd6e',
          gauge: this.showGauge
        },
        {
          title: 'Rasio Belanja Modal',
          description: 'Rasio ini menunjukan proporsi belanja yang dikeluarkan untuk pembangunan/pembelian aset dibandingkan dengan keseluruhan belanja',
          value: this.RasioBelanjaModal(this.doc),
          color: '#cff27e',
          gauge: this.showGauge
        },
        {
          title: 'Rasio Kemandirian',
          description: 'Kemandirian keuangan daerah (otonomi fiskal) mengindikasikan kemampuan Pemerintah Daerah dalam membiayai sendiri kegiatan pemerintahan, pembangunan, dan pelayanan masyarakat yang telah membayar pajak dan retribusi sebagai sumber pendapatan daerah ',
          value: this.RasioKemandirian(this.doc),
          color: '#523a34',
          gauge: this.showGauge
        },
        {
          title: 'Rasio Efektivitas',
          description: 'Rasio efektivitas menggambarkan kemampuan pemerintah daerah dalam merealisasikan pendapatan asli daerah yang direncanakan dibandingkan dengan target yang ditetapkan berdasarkan potensi riil daerah',
          value: this.RasioEfektivitas(this.doc),
          color: '#b87d4b',
          gauge: this.showGauge
        },
        {
          title: 'Rasio Pertumbuhan',
          description: 'Rasio pertumbuhan bermanfaat untuk mengatahui apakah pemerintah daerah dalam tahun anggaran bersangkutan atau selama beberapa periode anggaran',
          value: this.RasioEfektivitas(this.doc),
          color: '#cff27e',
          gauge: this.showGauge
        },
        {
          title: 'Rasio Efisiensi',
          description: 'Rasio Efisiensi Keuangan Daerah (REKD) menggambarkan perbandingan antara besarnya biaya yang dikeluarkan untuk memperoleh pendapatan dengan realisasi pendapatan yang diterima. Semakin kecil rasio efisiensi berarti kinerja pemerintahan semakin baik',
          value: this.RasioEfisiensi(this.doc),
          color: '#cff27e',
          gauge: this.showGauge
        }
      ]
    }
  }
}
</script>
