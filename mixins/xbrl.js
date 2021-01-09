export default {
  methods: {
    async loadXBRL (url) {
      const xbrl = await fetch(url)
      const respText = await xbrl.text()
      return new window.DOMParser().parseFromString(respText, 'text/xml')
    }
  }
}
