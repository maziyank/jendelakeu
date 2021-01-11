// import { evaluateXPathToNodes, evaluateXPathToString, evaluateXPathToNumber } from 'fontoxpath'

export default {
  methods: {
    async getReports () {
      const resp = await fetch(`${window.location.origin}/reports/index.json`)
      const reports = await resp.json()
      return reports.data
    },
    async loadXBRL (url) {
      const xbrl = await fetch(url)
      const respText = await xbrl.text()
      return new window.DOMParser().parseFromString(respText, 'text/xml')
    },
    code2Name (code) {
      const codification = {
        10000: 'Kas',
        11000: 'Kas dan Setara Kas'
      }
      return codification[code]
    }
  }
}
