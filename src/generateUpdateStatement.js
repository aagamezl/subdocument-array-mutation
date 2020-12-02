/**
 *
 * @param {object} data
 * @param {object} mutation
 * @returns {object}
 */
const generateUpdateStatement = (data, mutation, parentPath = []) => {
  return Object.entries(mutation).reduce((result, [key, operations]) => {
    return operations.reduce((result, { _id, _delete, ...operation }) => {
      if (!_id) {
        result.$add = { [parentPath.concat(key).join('.')]: [operation] }
      } else {
        const path = parentPath.concat(getIndex(data, key, _id))

        if (_delete) {
          result.$remove = { [path.join('.')]: true }
        } else {
          const pair = getPair(operation)

          if (Array.isArray(pair.value)) {
            result = generateUpdateStatement(data[key][path[path.length - 1]], operation, path)
          } else {
            path.push(pair.key)
            result.$update = { [path.join('.')]: pair.value }
          }
        }
      }

      return result
    }, {})
  }, {})
}

const getIndex = (data, key, id) => {
  return [key, data[key].findIndex(item => item._id === id)]
}

const getPair = item => {
  const entries = Object.entries(item)[0]

  return {
    key: entries[0],
    value: entries[1]
  }
}

module.exports = {
  generateUpdateStatement
}
