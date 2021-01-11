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
          { title: 'Akun', headerSort: false, width: 400, field: 'account', headerHozAlign: 'left', hozAlign: 'left', headerTooltip: true }, // never hide this column
          { title: 'Anggaran (Rp)', headerSort: false, width: 300, field: 'budget', formatter: 'money', formatterParams: this.RpFormatter, headerHozAlign: 'right', hozAlign: 'right', headerTooltip: true },
          { title: 'Realisasi (Rp)', headerSort: false, width: 300, field: 'value', headerHozAlign: 'right', hozAlign: 'right', formatter: 'money', formatterParams: this.RpFormatter, headerTooltip: true },
          { title: 'Capaian (%)', headerSort: false, width: 200, field: 'percent', headerHozAlign: 'center', hozAlign: 'center', headerTooltip: true },
          { title: 'Tahun Sebelumnya (Rp)', headerSort: false, width: 300, field: 'previous', headerHozAlign: 'right', hozAlign: 'right', formatter: 'money', formatterParams: this.RpFormatter, headerTooltip: true }
        ]
      }
    }
  },
  watch: {
    doc: 'refreshData'
  },
  methods: {
    getHeading (name) {
      const headings = evaluateXPathToNodes(`//lra/heading[@name="${name}"]`, this.doc)
      return headings.map((heading) => {
        const value = evaluateXPathToNumber('sum(subheading/account/number())', heading)
        const previous = evaluateXPathToNumber('sum(subheading/account/@prevValue/number())', heading)
        const budget = evaluateXPathToNumber('sum(subheading/account/@budget/number())', heading)
        const subheadings = evaluateXPathToNodes('subheading', heading)
        return {
          account: evaluateXPathToString('@name', heading),
          value,
          budget,
          previous,
          percent: (value / budget * 100).toFixed(2),
          _children: subheadings.map((subheading) => {
            const value2 = evaluateXPathToNumber('sum(account/number())', subheading)
            const previous2 = evaluateXPathToNumber('sum(account/@prevValue/number())', subheading)
            const budget2 = evaluateXPathToNumber('sum(account/@budget/number())', subheading)
            const accounts = evaluateXPathToNodes('account', subheading)
            return {
              account: evaluateXPathToString('@name', subheading),
              value: value2,
              previous: previous2,
              budget: budget2,
              percent: (value2 / budget2 * 100).toFixed(2),
              _children: accounts.map((account) => {
                const value3 = evaluateXPathToNumber('sum(number())', account)
                const previous3 = evaluateXPathToNumber('sum(@prevValue/number())', account)
                const budget3 = evaluateXPathToNumber('sum(@budget/number())', account)
                return {
                  account: evaluateXPathToString('@name', account),
                  value: value3,
                  previous: previous3,
                  budget: budget3,
                  percent: (value3 / budget3 * 100).toFixed(2)
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
      const belanja = this.getHeading('Belanja')
      const transfer = this.getHeading('Belanja Transfer')
      const blank = [{}]

      const totalSurplus = pendapatan[0].value + belanja[0].value + transfer[0].value
      const totalSurplusBudget = pendapatan[0].budget + belanja[0].budget + transfer[0].budget

      const surplus = [{
        account: 'Surplus/Defisit',
        value: totalSurplus,
        budget: totalSurplusBudget,
        previous: pendapatan[0].previous + belanja[0].previous + transfer[0].previous,
        percent: (totalSurplus / totalSurplusBudget * 100).toFixed(2)
      }]

      const pembiayaan = this.getHeading('Pembiayaan')
      const totalSilpa = surplus[0].value + pembiayaan[0].value
      const totalSilpaBudget = surplus[0].budget + pembiayaan[0].budget
      const silpa = [{
        account: 'Sisa Lebih Pembiayaan Anggaran (SILPA)',
        value: totalSilpa,
        budget: totalSilpaBudget,
        percent: (totalSilpa / totalSilpaBudget * 100).toFixed(2),
        previous: surplus[0].previous + pembiayaan[0].previous
      }]

      this.tableData = [...pendapatan, ...belanja, ...transfer, ...blank, ...surplus, ...blank, ...pembiayaan, ...blank, ...silpa]
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
