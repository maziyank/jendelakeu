<template>
  <div class="box">
    <p class="subtitle has-text-weight-semibold">
      Profil Daerah
    </p>
    <div class="b-table">
      <div class="table-wrapper">
        <table class="table">
          <tbody>
            <tr v-for="(item, key) in items" :key="key">
              <td>
                <b-icon :icon="item.icon" />
                {{ item.meta }}
              </td>
              <td>
                {{ item.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  }
}
</script>
