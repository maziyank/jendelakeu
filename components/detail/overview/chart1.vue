
<script>
import { Bar } from 'vue-chartjs'

export default {
  props: ['items'],
  extends: Bar,
  data () {
    return {
      lineData: {
        labels: [],
        datasets: [
          {
            label: 'Realisasi',
            backgroundColor: '#2B3A67',
            borderWidth: 1,
            data: [],
            xAxisID: 'bar-x-axis1',
            stack: 'background'
          },
          {
            label: 'Anggaran',
            backgroundColor: '#ffc482',
            borderWidth: 1,
            data: [],
            xAxisID: 'bar-x-axis2'
          }
        ]
      },
      options: {
        legend: { display: true },
        scales: {
          xAxes: [{
            stacked: true,
            id: 'bar-x-axis1',
            barThickness: 50
          }, {
            display: false,
            stacked: true,
            id: 'bar-x-axis2',
            barThickness: 80,
            // these are needed because the bar controller defaults set only the first x axis properties
            type: 'category',
            categoryPercentage: 0.8,
            barPercentage: 0.9,
            gridLines: {
              offsetGridLines: true
            },
            offset: true
          }],
          yAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: false
            }
          }]

        }
      }
    }
  },
  watch: {
    items: 'refreshData'
  },
  methods: {
    refreshData () {
      this.lineData.labels = this.items.map(x => x.name)
      this.lineData.datasets[0].data = this.items.map(x => x.value.toFixed(2))
      this.lineData.datasets[1].data = this.items.map(x => x.budget.toFixed(2))
      this.renderChart(this.lineData, this.options)
    }
  }
}
</script>
