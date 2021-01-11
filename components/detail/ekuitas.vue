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
        dataTreeStartExpanded: [false, false, false],
        columns: [
          { title: 'Akun', headerSort: false, width: 400, field: 'account', headerHozAlign: 'left', hozAlign: 'left', headerTooltip: true },
          { title: 'Jumlah (Rp)', headerSort: false, width: 300, field: 'value', headerHozAlign: 'right', hozAlign: 'right', formatter: 'money', formatterParams: this.RpFormatter, headerTooltip: true },
          { title: 'Tahun Sebelumnya (Rp)', headerSort: false, width: 300, field: 'previous', headerHozAlign: 'right', hozAlign: 'right', formatter: 'money', formatterParams: this.RpFormatter, headerTooltip: true }
        ]
      }
    }
  },
  watch: {
    doc: 'refreshData'
  },
  methods: {
    getHeading () {
      const headings = evaluateXPathToNodes('//lpe/heading', this.doc)
      return headings.map((heading) => {
        const value = evaluateXPathToNumber('sum(subheading/account/number())', heading)
        const previous = evaluateXPathToNumber('sum(subheading/account/@prevValue/number())', heading)
        const subheadings = evaluateXPathToNodes('subheading', heading)
        return {
          account: evaluateXPathToString('@name', heading),
          value,
          previous,
          _children: subheadings.map((subheading) => {
            const value2 = evaluateXPathToNumber('sum(account/number())', subheading)
            const previous2 = evaluateXPathToNumber('sum(account/@prevValue/number())', subheading)
            const accounts = evaluateXPathToNodes('account', subheading)
            return {
              account: evaluateXPathToString('@name', subheading),
              value: value2,
              previous: previous2,
              _children: accounts.map((account) => {
                const value3 = evaluateXPathToNumber('sum(number())', account)
                const previous3 = evaluateXPathToNumber('sum(@prevValue/number())', account)
                return {
                  account: evaluateXPathToString('@name', account),
                  value: value3,
                  previous: previous3
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
      const ekuitasAkhir = [{
        account: 'Ekuitas Akhir',
        value: evaluateXPathToNumber('sum(//lpe/heading/subheading/account/number())', this.doc),
        previous: evaluateXPathToNumber('sum(//lpe/heading/subheading/account/number())', this.doc)
      }]
      this.tableData = [...this.getHeading(), ...[{}], ...ekuitasAkhir]
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
