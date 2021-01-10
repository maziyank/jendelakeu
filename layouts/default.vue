<template>
  <div>
    <b-navbar shadow spaced>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            class="logo"
            src="~/assets/jendelakeu.png"
            alt="Jendela Infomasi Keuangan Pemerintah"
          >
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item
          v-for="(item, key) of items"
          :key="key"
          exact-active-class="is-active"
          :to="item.to"
          tag="router-link"
        >
          {{ item.title.toUpperCase() }}
        </b-navbar-item>
      </template>
    </b-navbar>
    <div>
      <nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from './Footer'

export default {
  components: { Footer },
  data () {
    return {
      items: [
        {
          title: 'Depan',
          to: { name: 'index' }
        },
        {
          title: 'Laporan Keuangan',
          to: { name: 'data' }
        },
        {
          title: 'Berkontribusi',
          to: { name: 'kontribusi' }
        },
        {
          title: 'FAQ',
          to: { name: 'faq' }
        },
        {
          title: 'Perihal',
          to: { name: 'perihal' }
        }
      ]
    }
  }
}
</script>

<style scoped>
.logo {
  max-height: 2.5rem;
}
</style>
