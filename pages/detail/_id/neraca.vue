<template>
  <div>
    <client-only>
      <vue-ads-table :columns="columns" :rows="rows" selectable> </vue-ads-table
    ></client-only>
  </div>
</template>

<script>
export default {
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
};
</script>