<template>
  <div class="container">
    <section class="section">
      <h2 class="title is-3 has-text-grey">FAQ</h2>

      <b-collapse
        class="card"
        animation="slide"
        v-for="(collapse, index) of collapses"
        :key="index"
        :open="isOpen == index"
        @open="isOpen = index"
      >
        <div
          slot="trigger"
          slot-scope="props"
          class="card-header"
          role="button"
        >
          <p class="card-header-title">
            {{ collapse.question }}
          </p>
          <a class="card-header-icon">
            <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
          </a>
        </div>
        <div class="card-content">
          <div class="content">
            {{ collapse.answer }}
          </div>
        </div>
      </b-collapse>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: 0,
      collapses: [
        {
          question: "Apakah Laporan Keuangan yang ada disini telah di audit oleh BPK?",
          answer: "Ya, Seluruh Laporan Keuangan yang ada disini telah divalidasi dan sesuai dengan hasil audit BP",
        },
        {
          question: "Apakah Laporan Keuangan yang ada disini telah di audit oleh BPK?",
          answer: "Ya, Seluruh Laporan Keuangan yang ada disini telah divalidasi dan sesuai dengan hasil audit BP",
        },
        {
          question: "Apakah Laporan Keuangan yang ada disini telah di audit oleh BPK?",
          answer: "Ya, Seluruh Laporan Keuangan yang ada disini telah divalidasi dan sesuai dengan hasil audit BP",
        },
        {
          question: "Apakah Laporan Keuangan yang ada disini telah di audit oleh BPK?",
          answer: "Ya, Seluruh Laporan Keuangan yang ada disini telah divalidasi dan sesuai dengan hasil audit BP",
        },
        {
          question: "Apakah Laporan Keuangan yang ada disini telah di audit oleh BPK?",
          answer: "Ya, Seluruh Laporan Keuangan yang ada disini telah divalidasi dan sesuai dengan hasil audit BP",
        },
        {
          question: "Apakah Laporan Keuangan yang ada disini telah di audit oleh BPK?",
          answer: "Ya, Seluruh Laporan Keuangan yang ada disini telah divalidasi dan sesuai dengan hasil audit BP",
        },
        {
          question: "Apakah Laporan Keuangan yang ada disini telah di audit oleh BPK?",
          answer: "Ya, Seluruh Laporan Keuangan yang ada disini telah divalidasi dan sesuai dengan hasil audit BP",
        },
        {
          question: "Apakah Laporan Keuangan yang ada disini telah di audit oleh BPK?",
          answer: "Ya, Seluruh Laporan Keuangan yang ada disini telah divalidasi dan sesuai dengan hasil audit BP",
        },
        {
          question: "Apakah Laporan Keuangan yang ada disini telah di audit oleh BPK?",
          answer: "Ya, Seluruh Laporan Keuangan yang ada disini telah divalidasi dan sesuai dengan hasil audit BP",
        },
        {
          question: "Apakah Laporan Keuangan yang ada disini telah di audit oleh BPK?",
          answer: "Ya, Seluruh Laporan Keuangan yang ada disini telah divalidasi dan sesuai dengan hasil audit BP",
        },
      ],
    };
  },
};
</script>