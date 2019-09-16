export function timeAgo(time) {
  const now = getTimestamp()
  // get timestamp millisecond
  const between = (now - Number(time)) / 1000 // second
  if (between < 60) {
    return pluralize(0, 'just now')
  } else if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else if (between < 2592000) {
    return pluralize(~~(between / 86400), ' day')
  } else if (between < 31104000) {
    return pluralize(~~(between / 2592000), ' month')
  } else {
    return pluralize(~~(between / 31104000), ' year')
  }
}

export function getTimestamp(time) {
  const date = time ? new Date(time) : new Date()
  return date.getTime()
}

function pluralize(time, label) {
  if (time === 0) {
    return label
  }
  if (time === 1) {
    return time + label + ' ago'
  }
  return time + label + 's ago'
}

export function getRandomArrayElement(arr, n) {
  const shuffled = arr.sort(() => 0.5 - Math.random())

  // Get sub-array of first n elements after shuffled
  return shuffled.slice(0, n)
}
