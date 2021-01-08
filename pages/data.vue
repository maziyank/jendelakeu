<template>
  <section class="section">
    <div class="columns">
      <div class="column is-four-fifths">
        <h2 class="title is-3 has-text-grey">Laporan Keuangan</h2>
      </div>
      <div class="column is-one-fifth">
        <b-input
          rounded
          v-model="filter"
          type="text"
          placeholder="Cari Entitas"
          icon-right="magnify"
        >
        </b-input>
      </div>
    </div>
    <NuxtLink
      :to="`/detail/${report.id}`"
      :key="key"
      v-for="(report, key) of filteredReports"
    >
      <Card
        :title="report.title"
        :image="report.image"
        :description="report.description"
      />
    </NuxtLink>
    <b-pagination
      style="margin-bottom: 80px"
      :total="reports.length"
      v-model="currentPage"
      :range-before="3"
      :range-after="3"
      :simple="false"
      :rounded="false"
      :per-page="perPage"
      icon-prev="chevron-left"
      icon-next="chevron-right"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    >
    </b-pagination>
  </section>
</template>

<script>
import Card from "./../components/Card";

export default {
  components: { Card },
  data() {
    return {
      filter: "",
      reports: [],
      filteredReports: [],
      currentPage: 1,
      perPage: 5,
    };
  },
  watch: {
    currentPage: function (val) {
      this.setPage(val, this.filter);
    },
    filter: function (val) {
      this.setPage(this.currentPage, val);
    },
  },
  async mounted() {
    this.reports = await this.getReports();
    this.setPage(this.currentPage, this.filter);
  },
  methods: {
    setPage(page, filter) {
      filter = filter.toLowerCase().trim();
      const offset = (page - 1) * this.perPage;

      this.filteredReports = this.reports
        .filter((item) => {
          return (
            item.title.toLowerCase().includes(filter) ||
            item.description.toLowerCase().includes(filter)
          );
        })
        .slice(offset, offset + this.perPage);
    },
    async getReports() {
      const resp = await fetch("./reports/index.json");
      const reports = await resp.json();
      return reports.data;
    },
  },
};
</script>