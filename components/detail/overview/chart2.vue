
<script>
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  props: ['items'],
  data () {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Komposisi Aset',
            data: [],
            backgroundColor: [
              '#62929E',
              '#f2dd6e',
              '#E5B25D',
              '#B87D4B',
              '#523A34',
              '#f2dd6e',
              '#e5b25d',
              '#ffa600'
            ]
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          callbacks: {
            label (tooltipItem, data) {
              const dataset = data.datasets[tooltipItem.datasetIndex]
              const total = dataset.data.reduce(function (previousValue, currentValue) {
                return parseFloat(previousValue) + parseFloat(currentValue)
              })
              const currentValue = dataset.data[tooltipItem.index]
              const percentage = Math.floor(((currentValue / total) * 100) + 0.5)
              return percentage + '%'
            }
          }
        }
      }
    }
  },
  watch: {
    items: 'refreshData'
  },
  methods: {
    refreshData () {
      this.chartData.labels = this.items.map(x => x.name)
      this.chartData.datasets[0].data = this.items.map(x => x.value.toFixed(2))
      this.renderChart(this.chartData, this.options)
    }
  }
}
</script>
