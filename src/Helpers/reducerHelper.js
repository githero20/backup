export function handleFetch(state, status, payload, key, many = true) {
  const { errors, data, pagination } = payload;
  let newStatus = {};

  if (status === "REQUEST") {
    newStatus = {
      processing: true,
      processed: false,
      errors: {},
    };
  } else if (status === "SUCCESS") {
    newStatus = {
      processing: false,
      processed: true,
      success: true,
      data: data,
      pagination,
    };
  } else {
    newStatus = {
      processing: false,
      processed: true,
      success: false,
      errors,
    };
  }

  if (key) {
    return {
      ...state,
      [key]: {
        ...state[key],
        ...newStatus,
      },
    };
  }

  return {
    ...state,
    ...newStatus,
  };
}

export function extractStatus(type) {
  let status = type.split("_").pop();
  if (status !== "ERROR" && status !== "SUCCESS") {
    status = "REQUEST";
  }

  return status;
};

export const defaultPayload = {
  data: [],
  errors: [],
};