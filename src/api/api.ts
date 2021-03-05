import http from "./http";

const PASS_CASE = (params: object, config: object) => {
  http.post("pm/test/plan/detail", params, config);
};

export default {
  PASS_CASE,
};
