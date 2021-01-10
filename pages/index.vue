<template>
  <section class="hero is-medium is-primary is-bold">
    <div class="hero-body">
      <div class="columns">
        <div class="column is-half" style="padding: 2.5rem">
          <h1 class="title">
            Selamat Datang
          </h1>
          <h2 class="subtitle">
            Informasi Laporan Keuangan Pemerintah melalui Satu Jendela
          </h2>
          <b-field>
            <b-input
              v-model="keyword"
              placeholder="Cari Entitas Pelaaporan Keuangan di sini"
              icon-clickable
              size="is-large"
              icon-right="magnify"
              @icon-click="search"
              @keyup.native.enter="search"
            />
          </b-field>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    search () {
      console.log(this.keyword)
      this.$router.push({ path: 'data', query: { search: this.keyword } })
    }
  }
}
</script>

<style scoped>
.hero {
  height: 100vh;
}
</style>
