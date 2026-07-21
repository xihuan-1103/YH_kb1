const state = {
  plate: {
    orgName: '缙智畅',
    level: 1,
    orgNo: 'LS001'
  },
  scene: {
    dictLabel: '综合看板',
    dictValue: 0
  },
  plateList: [
    { orgName: '丽水公路', orgNo: 'LS001', level: 1 }
  ]
}

const mutations = {
  UPDATE_SCENE(state, scene) {
    state.scene = scene
  },
  UPDATE_PLATES(state, plateList) {
    state.plateList = plateList
  },
  UPDATE_CURRENT_PLATE(state, plate) {
    state.plate = { ...state.plate, ...plate }
  }
}

const actions = {
  updateScene({ commit }, scene) {
    commit('UPDATE_SCENE', scene)
  },
  updatePlate({ commit }, plate) {
    commit('UPDATE_CURRENT_PLATE', plate)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
