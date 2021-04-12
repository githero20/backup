const SUB_ROUTE = "sfsbapi/v1";

export const authRequest = {
  LOGIN: "/todos",
  USER: SUB_ROUTE + "/user",
};
export const snapRequest = {
  SNAP: SUB_ROUTE + "/user/snap",
  INIT: SUB_ROUTE + "/user/snap/init",
  VERIFY: SUB_ROUTE + "/user/snap/verify",
  HISTORY: SUB_ROUTE + "/user/snap/history",
  TRANSFER: SUB_ROUTE + "/user/transfer/snapinterest",
  SETTINGS: SUB_ROUTE + "/user/snap/settings",
};
export default {
  auth: authRequest,
  snap: snapRequest,
};
