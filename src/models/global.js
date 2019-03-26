export default {
  namespace: "global",
  state: {
    settings: {
      locale: "zh",
    },
  },
  effects: {
    *change({ payload }, { put }) {
      yield put({
        type: "save",
        payload,
      });
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
