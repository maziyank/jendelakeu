<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <radar />
        </article>
      </div>
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="content">
                <rasiocard title="Tes Rasion" :value="90" description="Tes Deskripsi" />
              </div>
            </article>
          </div>
        </div>
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="content">
                <rasiocard title="Tes Rasion" :value="90" description="Tes Deskripsi" />
              </div>
            </article>
          </div>
        </div>
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="content">
                <rasiocard title="Tes Rasion" :value="90" description="Tes Deskripsi" />
              </div>
            </article>
          </div>
        </div>
        <div class="tile">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="content">
                <rasiocard title="Tes Rasion" :value="90" description="Tes Deskripsi" />
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
import radar from './radar'

export default {
  components: { rasiocard, radar }
}
</script>
