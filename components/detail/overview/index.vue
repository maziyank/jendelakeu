<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <cardstat icon="city" description="Total Aset" value="122.232.123.231" />
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child">
          <cardstat icon="offer" description="Total Pendapatan" value="122.232.123.231" />
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child">
          <cardstat icon="cart" description="Total Belanja" value="122.232.123.231" />
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child">
          <cardstat icon="cash-multiple" description="Total Pembiayaan" value="122.232.123.231" />
        </article>
      </div>
    </div>

    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <profil :items="profilData" />
        </article>
      </div>
      <div class="tile is-vertical is-9">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="subtitle">
                Pendapatan
              </p>
              <div class="content">
                <pendapatan />
              </div>
            </article>
          </div>
          <div class="tile is-6 is-parent">
            <article class="tile is-child box">
              <p class="subtitle">
                Belanja
              </p>
              <div class="content">
                <belanja />
              </div>
            </article>
          </div>
        </div>
        <div class="tile ">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title is-6">
                  Rasio Lancar
                </p>
                <gauge title="Rasio Lancar" :value="90" inner-text="90 %" />
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title is-6">
                  Rasio Lancar
                </p>
                <gauge title="Solvabilitas" :value="54" inner-text="90 %" />
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title is-6">
                  Rasio Lancar
                </p>
                <gauge title="Keseimbangan Fiscal" :value="76" inner-text="90 %" />
              </article>
            </div>
            <div class="tile is-parent">
              <article class="tile is-child box">
                <p class="title is-6">
                  Rasio Lancar
                </p>
                <gauge title="Debt to Equity" :value="65" inner-text="90 %" />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { evaluateXPathToString } from 'fontoxpath'
import cardstat from './cardstat'
import profil from './profil'
import pendapatan from './pendapatan'
import belanja from './belanja'
import gauge from './gauge'

export default {
  components: { cardstat, profil, pendapatan, belanja, gauge },
  props: ['doc'],
  data () {
    return {
      profilData: []
    }
  },
  watch: {
    doc: 'refreshData'
  },
  methods: {
    refreshData () {
      this.profilData = [
        { meta: 'Nama Entitas', icon: 'home-city' },
        { meta: 'Nama Kepala Daerah', icon: 'account-supervisor-circle' },
        { meta: 'Opini', icon: 'help-circle' },
        { meta: 'Luas Wilayah', icon: 'map' },
        { meta: 'Jumlah Penduduk', icon: 'account-group' },
        { meta: 'PDRB (Harga Berlaku)', icon: 'finance' },
        { meta: 'PDRB/Kapita', icon: 'finance' },
        { meta: 'Inflasi', icon: 'cart-arrow-down' }
      ].map((x) => {
        return {
          meta: x.meta,
          icon: x.icon,
          value: evaluateXPathToString(`//general/info[@name='${x.meta}']`, this.doc)
        }
      })
    }
  }
}
</script>
