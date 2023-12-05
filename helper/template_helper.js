function ResponseTemplate(data, message, error, status, pagination = null) {
  return {
    data,
    message,
    error,
    status,
    pagination,
  };
}

module.exports = {
  ResponseTemplate,
};
