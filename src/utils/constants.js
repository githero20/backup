const commonState = {
  processing: false,
  processed: false,
  success: false,
  errors: {},
  message: "",
}
export const defaultSingleObjectState = {
  ...commonState,
  data: {},
}

export const defaultManyObjectState = {
  ...commonState,
  data: [],
  pagination: {
    currentPage: "",
    nextPage: "",
    totalEntries: 0
  }
}