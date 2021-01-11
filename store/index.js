export const state = () => ({
  entities: null
})

export const mutations = {
  setEntities (state, data) {
    state.entities = data
  }
}

export const getters = {
  getEntities: (state) => {
    return state.entities
  }
}
