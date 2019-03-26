const _baseModel = ({ service, namespace }) => {
  return {
    namespace,
    state: {
      items: [],
      current: {},
    },
    effects: {
      *list(action, { call, put }) {
        const response = yield call(service.list, action.payload);
        yield put({ type: "save", payload: { items: response } });
        return response;
      },
      *one(action, { call, put }) {
        const response = yield call(service.one, action.payload);
        // if (response && response.success) {
        yield put({ type: "save", payload: { current: response } });
        // }
        return response;
      },
      *create(action, { call, put }) {
        const response = yield call(service.create, action.payload);
        // if (response && response.success) {
        yield put({ type: "save", payload: { current: response.data } });
        // if (action.payload.query) {
        yield put({ type: "list", payload: action.query || {} });
        // }
        // }
        return response;
      },
      *update(action, { call, put }) {
        const response = yield call(service.update, action.payload);
        // if (response && response.success) {
        yield put({ type: "save", payload: { current: response } });
        // if (action.payload.query) {
        yield put({ type: "list", payload: action.query || {} });
        // }
        // }
        return response;
      },
      *delete(action, { call, put }) {
        const response = yield call(service.remove, action.payload);
        // if (response && response.success) {
        // if (action.payload.query) {
        yield put({ type: "list", payload: action.query || {} });
        // }
        // }
        return response;
      },
    },
    reducers: {
      save(state, { payload }) {
        return { ...state, ...payload };
      },
    },
  };
};
export default _baseModel;
