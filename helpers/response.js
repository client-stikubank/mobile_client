import { omit, forEach, isArray, isPlainObject, map } from 'lodash'

export const fit = data => {
  return {
    ...omit(data, ['attributes', 'type']),
    ...mergeAttributes(data.attributes)
  }
}

const mergeAttributes = attributes => {
  let result = {}

  forEach(attributes, (value, key) => {
    if (key === 'image') {
      if (value.url) {
        value = value.url.includes('https://')
          ? value.url
          : process.env.BACKEND_API_URL + value.url
      } else {
        value = null
      }
    }

    if (key === 'first_name') {
      result['full_name'] = `${attributes.first_name} ${attributes.last_name}`
    }

    if (!!value?.data && isArray(value?.data)) {
      value = map(value.data, valueData => fit(valueData))
    } else if (!!value?.data && isPlainObject(value?.data)) {
      value = {
        ...omit(value.data, ['attributes', 'type']),
        ...mergeAttributes(value.data.attributes)
      }
    } else if (value?.data === null) {
      value = null
    }

    result[key] = value
  })

  return result
}

export const transpose = (firstArray, secondArray) => {
  let results = []

  forEach(firstArray, (firstArr, index) =>
    results.push(firstArr - secondArray[index])
  )

  return results
}
