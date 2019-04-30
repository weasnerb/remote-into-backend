/**
 * This returns a stringified JSON object modeled after the graphql responses
 * 
 * @param {boolean} isSuccess 
 * @param {object} objectToSend 
 */
exports.getReturnObject = (isSuccess, objectToSend) => {
  return {
    success: isSuccess,
    data: objectToSend
  };
};