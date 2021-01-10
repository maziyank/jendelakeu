export default {
  methods: {
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
