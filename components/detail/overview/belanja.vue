<template>
  <div>
    <client-only>
      <chart-bar :data="lineData" :options="options" />
    </client-only>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lineData: {
        labels: ['Pajak', 'Retribusi', 'Kekayaan Dipisahkan', 'Lain-Lain'],
        datasets: [
          {
            label: 'Actual',
            backgroundColor: 'rgba(0, 0, 255, 0.5)',
            borderWidth: 1,
            data: [40, 150, 50, 60],
            xAxisID: 'bar-x-axis1',
            stack: 'background'
          },
          {
            label: 'Target',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderWidth: 1,
            data: [100, 100, 100, 100],
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
            barThickness: 30
          }, {
            display: false,
            stacked: true,
            id: 'bar-x-axis2',
            barThickness: 70,
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
              beginAtZero: true
            }
          }]

        }
      }
    }
  }
}
</script>
