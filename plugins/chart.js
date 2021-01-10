import Vue from 'vue'
import { Line, Bar, HorizontalBar, Radar } from 'vue-chartjs'

const registerComponent = function (name, originalComponent) {
  Vue.component(
    name,
    {
      extends: originalComponent,
      props: ['data', 'options'],
      mounted () {
        this.renderChart(this.data, this.options)
      }
    }
  )
}

registerComponent('ChartBar', Bar)
registerComponent('ChartLine', Line)
registerComponent('ChartBarH', HorizontalBar)
registerComponent('ChartRadar', Radar)
