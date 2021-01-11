import { evaluateXPathToNumber } from 'fontoxpath'

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
    },

    quickRatio (doc) {
      return evaluateXPathToNumber('sum(//heading[@name="Aset Lancar"]/subheading/account/number())', doc) /
        evaluateXPathToNumber('sum(//heading/subheading[@name="Kewajiban Jangka Pendek"]/account/number())', doc)
    },
    RasioBelanjaModal (doc) {
      return evaluateXPathToNumber('sum(//lra/heading/subheading[@name="Belanja Modal"]/account/number())', doc) /
        evaluateXPathToNumber('sum(//lra/heading[@name="Belanja"]/subheading/account/number())', doc)
    },
    RasioKemandirian (doc) {
      return evaluateXPathToNumber('sum(//lra/heading/subheading[@name="Pendapatan Asli Daerah"]/account/number())', doc) /
        evaluateXPathToNumber('sum(//lra/heading[@name="Pendapatan"]/subheading/account/number())', doc)
    },
    RasioEfektivitas (doc) {
      return evaluateXPathToNumber('sum(//lra/heading/subheading[@name="Pendapatan Asli Daerah"]/account/number())', doc) /
        evaluateXPathToNumber('sum(//lra/heading/subheading[@name="Pendapatan Asli Daerah"]/account/@budget/number())', doc)
    }

  }
}
