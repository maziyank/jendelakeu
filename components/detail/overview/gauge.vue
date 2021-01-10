<template>
  <div class="box">
    <p class="subtitle">
      Judul Rasio
    </p>
    <client-only>
      <vue-gauge
        :value="90"
        :separator-step="0"
        :min="0"
        :max="100"
        gauge-color="#8CDFAD"
        :scale-interval="0.1"
      >
        <div class="inner-text">
          90 %
        </div>
      </vue-gauge>
    </client-only>
  </div>
</template>

<style scoped>
.inner-text {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 60px;
    font-size: 22px;
    font-weight: 600;
    color: #de3a21;
}
</style>
