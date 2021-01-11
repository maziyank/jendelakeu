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
        dataTreeStartExpanded: [true, true, false],
        columns: [
          { title: 'Akun', width: 400, field: 'account', headerHozAlign: 'left', hozAlign: 'left', headerTooltip: true }, // never hide this column
          { title: 'Jumlah Tahun Lalu (Rp)', width: 300, field: 'previous', formatter: 'money', formatterParams: this.RpFormatter, headerHozAlign: 'right', hozAlign: 'right', headerTooltip: true },
          { title: 'Perubahan (%)', width: 200, field: 'change', headerHozAlign: 'center', hozAlign: 'center', headerTooltip: true },
          { title: 'Jumlah Tahun Ini (Rp)', width: 300, field: 'current', headerHozAlign: 'right', hozAlign: 'right', formatter: 'money', formatterParams: this.RpFormatter, headerTooltip: true } // hide this column first
        ]
      }
    }
  },
  watch: {
    doc: 'refreshData'
  },
  methods: {
    refreshData () {
      if (!this.doc) {
        return
      }
      const groups = evaluateXPathToNodes('//neraca/group', this.doc)
      this.tableData = groups.map((group) => {
        const current0 = evaluateXPathToNumber('sum(heading/subheading/account/number())', group)
        const previous0 = evaluateXPathToNumber('sum(heading/subheading/account/@prevValue/number())', group)
        const headings = evaluateXPathToNodes('heading', group)
        return {
          account: evaluateXPathToString('@name', group),
          current: current0,
          previous: previous0,
          change: previous0 !== 0 ? ((current0 - previous0) / previous0 * 100).toFixed(2) : 1,
          _children: headings.map((heading) => {
            const current = evaluateXPathToNumber('sum(subheading/account/number())', heading)
            const previous = evaluateXPathToNumber('sum(subheading/account/@prevValue/number())', heading)
            const subheadings = evaluateXPathToNodes('subheading', heading)
            return {
              account: evaluateXPathToString('@name', heading),
              current,
              previous,
              change: previous !== 0 ? ((current - previous) / previous * 100).toFixed(2) : 1,
              _children: subheadings.map((subheading) => {
                const current2 = evaluateXPathToNumber('sum(account/number())', subheading)
                const previous2 = evaluateXPathToNumber('sum(account/@prevValue/number())', subheading)
                const accounts = evaluateXPathToNodes('account', subheading)
                return {
                  account: evaluateXPathToString('@name', subheading),
                  current: current2,
                  previous: previous2,
                  change: previous2 !== 0 ? ((current2 - previous2) / previous2 * 100).toFixed(2) : 1,
                  _children: accounts.map((account) => {
                    const current3 = evaluateXPathToNumber('sum(number())', account)
                    const previous3 = evaluateXPathToNumber('sum(@prevValue/number())', account)
                    return {
                      account: evaluateXPathToString('@name', account),
                      current: current3,
                      previous: previous3,
                      change: previous3 !== 0 ? ((current3 - previous3) / previous3 * 100).toFixed(2) : 1
                    }
                  })
                }
              })
            }
          })
        }
      })
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
