<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      FAQ
    </h2>

    <b-collapse
      v-for="(collapse, index) of collapses"
      :key="index"
      class="card"
      animation="slide"
      :open="isOpen == index"
      @open="isOpen = index"
    >
      <div slot="trigger" slot-scope="props" class="card-header" role="button">
        <p class="card-header-title">
          {{ collapse.question }}
        </p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          {{ collapse.answer }}
        </div>
      </div>
    </b-collapse>
  </section>
</template>

<script>
export default {
  data () {
    return {
      isOpen: 0,
      collapses: [
        {
          question:
            'Laporan Keuangan apa yang disajikan di platform ini?',
          answer:
            'Kmai menggunakan laporan keuangan audited dari BPK di platform ini'
        },
        {
          question:
            'Laporan Keuangan jenis apa saja yang disajikan disini?',
          answer:
            'Untuk sementara ini kami menyediakan seluruh jenis laporan keuangan kecuali arus kas dan CALK'
        },
        {
          question:
            'Mengapa saya tidak menemukan laporan yang saya cari?',
          answer:
            'Kami masih dalam proses collecting data sehingga belum semua laporan kami sediakan.'
        },
        {
          question:
            'Apakah laporan keuangan yang disajikan kembali diperiksa validitas nilianya?',
          answer:
            'Kami berusaha semaksimal mungkin laporan keuangan yang disajikan di platform ini sesuai aslinya. Namun dikarenakan kami masih menggunakan metode konversi manual maka terdapat kemungkinan ada kesalahan sehingga kami masih tetap menyediakan link ke laporan aslinya sebagai pembanding.'
        },
        {
          question:
            'Bagaiamana jendelakeu mengubah laporan keungan dalam bentuk PDF ke dokumen terstruktur?',
          answer:
            'Kami sementara ini melakukan secara manual. Kami berencana untuk membuat sebuah tools untuk mempermudah proses ini di kemudian hari'
        },
        {
          question:
            'Apakah saya bisa berkontribusi di platform ini?',
          answer:
            'Kami membuka kesempatan siapapun untuk berkontribusi baik sebagai developer maupun pengolah data (data collector, data convertor, dan data validator).'
        }
      ]
    }
  }
}
</script>
