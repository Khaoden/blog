export interface SearchStep {
  left: number
  right: number
  mid: number
  message: string
  found: boolean
  done: boolean
}

// The demonstration uses a sorted array and a closed [left, right] interval.
export function binarySearchSteps(values: readonly number[], target: number): SearchStep[] {
  const steps: SearchStep[] = []
  let left = 0
  let right = values.length - 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    const value = values[mid]
    const found = value === target
    steps.push({
      left,
      right,
      mid,
      found,
      done: found,
      message: found
        ? `找到 ${target}，下标为 ${mid}。共比较 ${steps.length + 1} 次。`
        : value < target
          ? `${value} < ${target}，排除左半边。下一步 left = ${mid + 1}。`
          : `${value} > ${target}，排除右半边。下一步 right = ${mid - 1}。`
    })
    if (found) return steps
    if (value < target) left = mid + 1
    else right = mid - 1
  }
  steps.push({
    left,
    right,
    mid: -1,
    message: `left > right，区间已空。数组里没有 ${target}。`,
    found: false,
    done: true
  })
  return steps
}
