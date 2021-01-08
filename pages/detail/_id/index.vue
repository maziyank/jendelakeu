<template>
  <section class="section" style="padding-top: 50px">
    <div class="columns">
      <div class="column is-two-fifths">
        <h2 class="title is-3 has-text-grey">Kabupaten Something</h2>
      </div>
      <div class="column is-three-fifth">
        <div class="buttons end">
          <b-button type="is-info" icon-left="file-pdf">PDF</b-button>
          <b-button type="is-info" icon-left="xml">XBRL</b-button>
        </div>
      </div>
    </div>

    <b-tabs>
      <b-tab-item label="Overview"></b-tab-item>
      <b-tab-item label="Kinerja Keuangan"></b-tab-item>
      <b-tab-item label="Neraca"></b-tab-item>
      <b-tab-item label="Realisasi Anggaran"></b-tab-item>
      <b-tab-item label="Operasional"></b-tab-item>
      <b-tab-item label="SILPA"></b-tab-item>
      <b-tab-item label="Ekuitas"></b-tab-item>
    </b-tabs>

    <client-only>
      <vue-ads-table :columns="columns" :rows="rows" selectable> </vue-ads-table
    ></client-only>
  </section>
</template>

<script>
export default {
  created() {},
  data() {
    return {
      page: 0,
      columns: [
        {
          property: "Akun",
          title: "Nama Akun",
          direction: null,
          filterable: true,
          collapseIcon: true,
        },
        {
          property: "Jumlah",
          title: "Jumlah",
          direction: null,
          filterable: true,
        },
      ],
      rows: [
        {
          Akun: "Aset",
          Jumlah: "10000000",
          _children: [
            {
              Akun: "Aset Lancar",
              Jumlah: "5000",
            },
          ],
        },
        {
          Akun: "Boudewijn",
          Jumlah: "Van Brabandt",
        },
        {
          Akun: "Alexander",
          Jumlah: "Van Belgie",
        },
        {
          Akun: "Marie-Christine",
          Jumlah: "Leopoldine",
        },
        {
          Akun: "Marie-Esmeralda",
          Jumlah: "Leopoldine",
        },
        {
          Akun: "Alexander",
          Jumlah: "Van Belgie",
        },
        {
          Akun: "Marie-Christine",
          Jumlah: "Leopoldine",
        },
        {
          Akun: "Marie-Esmeralda",
          Jumlah: "Leopoldine",
        },
        {
          Akun: "Alexander",
          Jumlah: "Van Belgie",
        },
        {
          Akun: "Marie-Christine",
          Jumlah: "Leopoldine",
        },
        {
          Akun: "Marie-Esmeralda",
          Jumlah: "Leopoldine",
        },
      ],
    };
  },

  methods: {},
};
</script>