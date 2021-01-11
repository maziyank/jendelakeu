<template>
  <div>
    <client-only>
      <chart-radar :data="chartData" :options="options" />
    </client-only>
  </div>
</template>

<script>
export default {
  props: ['ratios'],
  data () {
    return {
      chartData: {
        labels: ['Efisiensi', 'Rasio Lancar', 'Kemandirian Daerah', 'Solvabilitas', 'Keseimbangan Primer', 'DBE Ratio'],
        datasets: [
          {
            label: 'Rasio (Skala 0 - 1)',
            fill: true,
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            data: [0.77, 0.61, 0.69, 0.62, 0.82, 0.6]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Rasio Laporan Keuangan'
        }
      }
    }
  },
  watch: {
    ratios: 'refreshData'
  },
  methods: {
    refreshData () {
      this.chartData.labels = this.ratios.map(x => x.title)
      this.chartData.datasets[0].data = this.ratios.map(x => x.value)
    }
  }
}
</script>
