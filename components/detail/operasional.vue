<template>
  <div>
    <client-only>
      <Vue-Tabulator v-model="tableData" :options="options" />
    </client-only>
  </div>
</template>

<script>
import { evaluateXPathToNodes, evaluateXPathToString, evaluateXPathToNumber } from 'fontoxpath'

export default {
  props: ['doc'],
  data () {
    return {
      RpFormatter: {
        decimal: '.',
        thousand: ',',
        symbol: '',
        symbolAfter: '',
        precision: false
      },
      tableData: [],
      options: {
        dataTree: true,
        dataTreeStartExpanded: [true, false, false],
        columns: [
          { title: 'Akun', headerSort: false, width: 400, field: 'account', headerHozAlign: 'left', hozAlign: 'left', headerTooltip: true },
          { title: 'Tahun Ini (Rp)', headerSort: false, width: 300, field: 'value', headerHozAlign: 'right', hozAlign: 'right', formatter: 'money', formatterParams: this.RpFormatter, headerTooltip: true },
          { title: 'Tahun Sebelumnya (Rp)', headerSort: false, width: 300, field: 'previous', headerHozAlign: 'right', hozAlign: 'right', formatter: 'money', formatterParams: this.RpFormatter, headerTooltip: true },
          { title: 'Perubahan (Rp)', headerSort: false, width: 300, field: 'change', headerHozAlign: 'right', hozAlign: 'right', formatter: 'money', formatterParams: this.RpFormatter, headerTooltip: true },
          { title: 'Perubahan (%)', headerSort: false, width: 150, field: 'percent', headerHozAlign: 'right', hozAlign: 'right', formatter: 'money', formatterParams: this.RpFormatter, headerTooltip: true }
        ]
      }
    }
  },
  watch: {
    doc: 'refreshData'
  },
  methods: {
    getHeading (name) {
      const headings = evaluateXPathToNodes(`//lo/heading[@name="${name}"]`, this.doc)
      return headings.map((heading) => {
        const value = evaluateXPathToNumber('sum(subheading/account/number())', heading)
        const previous = evaluateXPathToNumber('sum(subheading/account/@prevValue/number())', heading)
        const change = value - previous
        const subheadings = evaluateXPathToNodes('subheading', heading)
        const percent = (change / previous * 100).toFixed(2)
        return {
          account: evaluateXPathToString('@name', heading),
          value,
          previous,
          change,
          percent,
          _children: subheadings.map((subheading) => {
            const value2 = evaluateXPathToNumber('sum(account/number())', subheading)
            const previous2 = evaluateXPathToNumber('sum(account/@prevValue/number())', subheading)
            const change2 = value2 - previous2
            const percent2 = (change2 / previous2 * 100).toFixed(2)
            const accounts = evaluateXPathToNodes('account', subheading)
            return {
              account: evaluateXPathToString('@name', subheading),
              value: value2,
              previous: previous2,
              change: change2,
              percent: percent2,
              _children: accounts.map((account) => {
                const value3 = evaluateXPathToNumber('sum(number())', account)
                const previous3 = evaluateXPathToNumber('sum(@prevValue/number())', account)
                const change3 = value3 - previous3
                const percent3 = (change3 / previous3 * 100).toFixed(2)
                return {
                  account: evaluateXPathToString('@name', account),
                  value: value3,
                  previous: previous3,
                  change: change3,
                  percent: percent3
                }
              })
            }
          })
        }
      })
    },
    refreshData () {
      if (!this.doc) {
        return
      }

      const pendapatan = this.getHeading('Pendapatan')
      const beban = this.getHeading('Beban')
      const blank = [{}]

      const totalSurplus = pendapatan[0].value + beban[0].value
      const totalSurplusPrev = pendapatan[0].previous + beban[0].previous

      const surplusOperasional = [{
        account: 'Surplus/Defisit Operasional',
        value: totalSurplus,
        previous: totalSurplusPrev
      }]

      const nonOp = this.getHeading('Surplus/Defisit dari Kegiatan Non Operasional')
      const totalSurplus2 = totalSurplus + nonOp[0].value
      const totalSurplusPrev2 = totalSurplusPrev + nonOp[0].previous

      const surplusBeforePos = [{
        account: 'Surplus/Defisit Sebelum Pos Luar Biasa',
        value: totalSurplus2,
        previous: totalSurplusPrev2
      }]

      const posLB = this.getHeading('Pos Luar Biasa')
      const totalSurplus3 = totalSurplus2 + posLB[0].value
      const totalSurplusPrev3 = totalSurplusPrev2 + posLB[0].previous
      const surplusLO = [{
        account: 'Surplus/Defisit Operasional',
        value: totalSurplus3,
        previous: totalSurplusPrev3
      }]

      this.tableData = [...pendapatan, ...beban, ...surplusOperasional, ...blank, ...nonOp, ...surplusBeforePos, ...blank, ...posLB, ...blank, ...surplusLO]
    }

  }
}
</script>

<style>
.tabulator-tree-level-0{
  font-weight: 600;
}
.tabulator-tree-level-1{
  font-weight: 500;
}
.tabulator-tree-level-2{
  font-weight: 400;
}
</style>
