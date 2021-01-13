<template>
  <section class="section" style="padding-top: 50px">
    <div class="columns">
      <div class="column is-three-fifths">
        <h2 class="title is-3 has-text-grey">
          {{ entityName }}
        </h2>
      </div>
      <div class="column is-two-fifth">
        <div class="buttons" style="float:right">
          <b-button
            type="is-normal"
            rounded
            style="margin-bottom:0"
            icon-left="download"
            @click="downloadUrl(url)"
          >
            Download Data
          </b-button>
          <b-button
            type="is-normal"
            rounded
            style="margin-bottom:0"
            icon-left="file-pdf"
            @click="downloadUrl(sourcefile)"
          >
            Data Asli (PDF)
          </b-button>
          <b-select
            v-model="year"
            rounded
            placeholder="Pilih Tahun"
            icon="calendar"
          >
            <option
              v-for="option in availableYear"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </b-select>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <b-tabs v-model="activeTab" vertical type="is-boxed" size="medium">
          <b-tab-item
            v-for="(tab, index) in tabsItems"
            :key="index"
            :icon="tab.icon"
            :label="tab.title"
          >
            <component
              :is="tab.component"
              :ref="tab.component"
              :doc.sync="xbrlDoc"
            />
          </b-tab-item>
        </b-tabs>
      </div>
    </div>
  </section>
</template>

<script>
import { evaluateXPathToString } from "fontoxpath";
import Overview from "~/components/detail/overview/index";
import Rasio from "~/components/detail/rasio/index";
import Neraca from "~/components/detail/neraca";
import Anggaran from "~/components/detail/anggaran";
import Operasional from "~/components/detail/operasional";
import Ekuitas from "~/components/detail/ekuitas";
import Sal from "~/components/detail/sal";
import xbrl from "~/mixins/xbrl";

export default {
  components: {
    Overview,
    Rasio,
    Neraca,
    Anggaran,
    Operasional,
    Ekuitas,
    Sal
  },
  mixins: [xbrl],
  data() {
    return {
      xbrlDoc: {},
      url: "",
      sourcefile: "",
      activeTab: 0,
      idRegion: "",
      entityName: "",
      year: 2021,
      availableYear: [],
      tabsItems: [
        { title: "Overview", component: "Overview", icon: "eye" },
        { title: "Analisis Rasio", component: "Rasio", icon: "chart-line" },
        { title: "Neraca", component: "Neraca", icon: "scale-balance" },
        {
          title: "Realisasi Anggaran",
          component: "Anggaran",
          icon: "beaker-check"
        },
        {
          title: "Operasional",
          component: "Operasional",
          icon: "account-group"
        },
        // { title: 'Arus Kas', component: 'Operasional', icon: 'cash' },
        { title: "Ekuitas", component: "Ekuitas", icon: "bank" },
        { title: "S A L", component: "Sal", icon: "wallet-plus" }
      ]
    };
  },
  watch: {
    $route: "loadData"
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const year = this.$route.query.tahun;
      const idRegion = this.$route.params.id;
      this.url = `/reports/xbrl/${year}/${idRegion}.xbrl`;
      this.xbrlDoc = await this.loadXBRL(this.url);
      this.entityName = evaluateXPathToString(
        "//general/info[@name='Nama Entitas']",
        this.xbrlDoc
      );
      this.sourcefile = evaluateXPathToString(
        "//general/info[@name='Sumber Data']",
        this.xbrlDoc
      );

      setTimeout(() => {
        const entities = this.$store.getters.getEntities;
        this.availableYear = entities.find(
          item => item.id === parseInt(idRegion)
        ).years;
        this.year = evaluateXPathToString(
          "//general/info[@name='Tahun Anggaran']/text()",
          this.xbrlDoc
        ).trim();
        console.log(this.year);
      }, 1000);
    },
    downloadUrl(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style scoped>
.b-tabs.is-vertical {
  flex-wrap: nowrap;
  padding-bottom: 200px;
}

.b-tabs .tabs {
  margin-top: 16px !important;
}
</style>
