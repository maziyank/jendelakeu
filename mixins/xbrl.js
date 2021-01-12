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
    RasioAktivitas (doc) {
      return (
        evaluateXPathToNumber(
          'sum(//lra/heading/subheading[@name="Belanja Operasi"]/account/number())',
          doc
        ) /
        evaluateXPathToNumber(
          'sum(//lra/heading[@name="Belanja"]/subheading/account/number())',
          doc
        )
      )
    },
    RasioBelanjaModal (doc) {
      return (
        evaluateXPathToNumber(
          'sum(//lra/heading/subheading[@name="Belanja Modal"]/account/number())',
          doc
        ) /
        evaluateXPathToNumber(
          'sum(//lra/heading[@name="Belanja"]/subheading/account/number())',
          doc
        )
      )
    },
    RasioKemandirian (doc) {
      return (
        evaluateXPathToNumber(
          'sum(//lra/heading/subheading[@name="Pendapatan Asli Daerah"]/account/number())',
          doc
        ) /
        evaluateXPathToNumber(
          'sum(//lra/heading/subheading[@name="Pendapatan Transfer"]/account/number())',
          doc
        )
      )
    },
    RasioEfektivitas (doc) {
      return (
        evaluateXPathToNumber(
          'sum(//lra/heading/subheading[@name="Pendapatan Asli Daerah"]/account/number())',
          doc
        ) /
        evaluateXPathToNumber(
          'sum(//lra/heading/subheading[@name="Pendapatan Asli Daerah"]/account/@budget/number())',
          doc
        )
      )
    },
    RasioPertumbuhan (doc) {
      return (
        evaluateXPathToNumber(
          'sum(//lra/heading/subheading[@name="Pendapatan Asli Daerah"]/account/number())',
          doc
        ) /
        evaluateXPathToNumber(
          'sum(//lra/heading/subheading[@name="Pendapatan Asli Daerah"]/account/@prevValue/number())',
          doc
        )
      )
    },
    RasioEfisiensi (doc) {
      return (
        evaluateXPathToNumber(
          'sum(//lra/heading[@name="Belanja"]/subheading/account/number())',
          doc
        ) /
        (-1 *
          evaluateXPathToNumber(
            'sum(//lra/heading[@name="Pendapatan"]/subheading/account/number())',
            doc
          ))
      )
    },
    RasioDSCR (doc) {
      // DSCR = (PAD + Dana Bagi Hasil + DAU – Belanja Wajib) div (Angsuran Pokok Pinjaman + Bunga + Biaya Lain)
      return ((
        evaluateXPathToNumber(
          'sum(//lra/heading/subheading[@name="Pendapatan Asli Daerah"]/account/number())',
          doc
        ) +
        evaluateXPathToNumber(
          'sum(//lra/heading/subheading[@name="Pendapatan Transfer"]/account/number())',
          doc
        ) -
        evaluateXPathToNumber(
          'sum(//lra/heading/subheading/account[@name="Belanja Pegawai"]/number())',
          doc
        )) /
          (-1 *
            evaluateXPathToNumber(
              'sum(//lra/heading/subheading/account[@name="Belanja Bunga"]/number())',
              doc
            ))
      )
    }
  }
}
