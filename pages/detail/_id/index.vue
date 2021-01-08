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
      <b-tab-item
        v-for="(tab, index) in tabsItems"
        :key="index"
        :label="tab.title"
      >
        <component
          v-bind.sync="xbrlDoc"
          :is="tab.component"
          :ref="tab.component"
        ></component>
      </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import Overview from "./overview";
import Kinerja from "./kinerja";
import Neraca from "./neraca";
import Anggaran from "./anggaran";
import Operasional from "./operasional";
import Ekuitas from "./ekuitas";
import Silpa from "./silpa";

export default {
  components: {
    Overview,
    Kinerja,
    Neraca,
    Anggaran,
    Operasional,
    Ekuitas,
    Silpa,
  },
  data() {
    return {
      xbrlDoc: {},
      tabsItems: [
        { title: "Overview", component: "Overview" },
        { title: "Kinerja Keuangan", component: "Kinerja" },
        { title: "Neraca", component: "Neraca" },
        { title: "Realisasi Anggaran", component: "Anggaran" },
        { title: "Operasional", component: "Operasional" },
        { title: "Ekuitas", component: "Ekuitas" },
        { title: "SILPA", component: "Silpa" },
      ],
    };
  },
  methods: {},
};
</script>