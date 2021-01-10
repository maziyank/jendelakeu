<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child">
          <ratioradar />
        </article>
      </div>
      <div class="tile is-vertical is-8">
        <div v-for="(ratio, key) in ratios" :key="key" class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="content">
                <rasiocard :title="ratio.title" :value="ratio.value" :description="ratio.description" />
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rasiocard from './rasiocard'
import ratioradar from './ratioradar'

export default {
  components: { rasiocard, ratioradar },
  data () {
    return {
      ratios: [
        {
          title: 'Rasio Lancar',
          description: 'Lorem Upsom',
          value: 90
        },
        {
          title: 'Rasio Lancar',
          description: 'Lorem Upsom',
          value: 90
        },
        {
          title: 'Rasio Lancar',
          description: 'Lorem Upsom',
          value: 90
        },
        {
          title: 'Rasio Lancar',
          description: 'Lorem Upsom',
          value: 90
        },
        {
          title: 'Rasio Lancar',
          description: 'Lorem Upsom',
          value: 90
        },
        {
          title: 'Rasio Lancar',
          description: 'Lorem Upsom',
          value: 90
        },
        {
          title: 'Rasio Lancar',
          description: 'Lorem Upsom',
          value: 90
        }
      ]
    }
  }
}
</script>
