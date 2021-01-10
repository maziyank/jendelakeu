<template>
  <div class="box">
    <p class="subtitle">
      Profil Daerah
    </p>
    <div class="b-table">
      <div class="table-wrapper">
        <table class="table">
          <tbody>
            <tr v-for="(item, key) in items" :key="key">
              <td>
                <b-icon :icon="item.icon" />
                {{ item.meta }}
              </td><td>
                {{ item.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      items: [{
        meta: 'Nama',
        value: 'Banyumas',
        icon: 'home-city'
      },
      {
        meta: 'Pimpinan',
        value: 'Abdul',
        icon: 'account-supervisor-circle'
      },
      {
        meta: 'Opini LK',
        value: 'WTP',
        icon: 'help-circle'
      },
      {
        meta: 'Luas Wilayah',
        value: 'Banyumas',
        icon: 'map'
      },
      {
        meta: 'Penduduk',
        value: 'Banyumas',
        icon: 'account-group'
      },
      {
        meta: 'PDRB',
        value: 'Banyumas',
        icon: 'finance'
      },
      {
        meta: 'Inflasi',
        value: 'Banyumas',
        icon: 'cart-arrow-down'
      },
      {
        meta: 'Kap.Fiskal',
        value: 'Banyumas',
        icon: 'flash'
      },
      {
        meta: 'Website',
        value: 'Banyumas',
        icon: 'web'
      }]
    }
  }
}
</script>
