<template>
  <section class="section">
    <div class="columns">
      <div class="column is-four-fifths">
        <h2 class="title is-3 has-text-grey">
          Laporan Keuangan
        </h2>
      </div>
      <div class="column is-one-fifth">
        <b-input
          v-model="filter"
          rounded
          type="text"
          placeholder="Cari Entitas"
          icon-right="magnify"
        />
      </div>
    </div>
    <NuxtLink
      v-for="(report, key) of visibleItems"
      :key="key"
      :to="`/detail/${report.id}?tahun=${report.years[0]}`"
    >
      <Card
        :title="report.title"
        :image="report.image"
        :description="report.description"
      />
    </NuxtLink>
    <b-pagination
      v-model="currentPage"
      style="margin-bottom: 80px"
      :total="filteredReports.length"
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
    />
  </section>
</template>

<script>
import Card from './../components/Card'

export default {
  components: { Card },
  data () {
    return {
      filter: 0,
      reports: [],
      filteredReports: [],
      visibleItems: Array(5).fill({ title: null, description: null, years: [] }),
      currentPage: 1,
      perPage: 5,
      isLoading: false
    }
  },
  watch: {
    currentPage (val) {
      this.setPage(val)
    },
    filter (val) {
      const filter = val.toLowerCase().trim()
      this.filteredReports = this.reports
        .filter((item) => {
          return (
            item?.title?.toLowerCase().includes(filter) ||
            item?.description?.toLowerCase().includes(filter) ||
            this.isLoading
          )
        })

      this.setPage(this.currentPage)
    }
  },
  mounted () {
    setTimeout(async () => {
      this.reports = await this.getReports()
      this.filter = ''
      this.currentPage = 1
    }, 500)
  },
  methods: {
    setPage (page) {
      const offset = (page - 1) * this.perPage
      this.visibleItems = this.filteredReports.slice(offset, offset + this.perPage)
    },
    async getReports () {
      this.isLoading = true
      const resp = await fetch('./reports/index.json')
      const reports = await resp.json()
      this.isLoading = false
      return reports.data
    }
  }
}
</script>
