import assert from 'node:assert/strict'
import test from 'node:test'
import { binarySearchSteps } from '../docs/.vitepress/theme/utils/binarySearch.ts'

test('an empty array ends without inspecting an element', () => {
  const steps = binarySearchSteps([], 13)
  assert.equal(steps.length, 1)
  assert.equal(steps[0].done, true)
  assert.equal(steps[0].found, false)
  assert.equal(steps[0].mid, -1)
})

test('searches singleton, endpoint, duplicate, negative, and absent targets', () => {
  for (const values of [[1], [1, 3], [1, 3, 5, 8, 13, 21, 34], [-8, -3, 0, 2], [2, 2, 2]]) {
    for (const target of [...values, -9, -1, 4, 42]) {
      const steps = binarySearchSteps(values, target)
      const result = steps.at(-1)
      assert.equal(result.done, true)
      assert.equal(result.found, values.includes(target))
      if (result.found) assert.equal(values[result.mid], target)
      else assert.ok(result.left > result.right)
    }
  }
})

test('every demonstrated midpoint stays inside a shrinking interval and the search terminates', () => {
  for (let length = 0; length <= 64; length++) {
    const values = Array.from({ length }, (_, index) => index * 2 + 1)
    for (let target = -1; target <= length * 2 + 1; target++) {
      const steps = binarySearchSteps(values, target)
      assert.ok(steps.length <= Math.ceil(Math.log2(length + 1)) + 1)
      let previousWidth = Infinity
      for (const step of steps) {
        const width = step.right - step.left + 1
        assert.ok(width < previousWidth)
        previousWidth = width
        if (step.mid >= 0) {
          assert.ok(step.mid >= step.left && step.mid <= step.right)
          assert.ok(step.mid < values.length)
        }
      }
      assert.equal(steps.at(-1).found, values.includes(target))
    }
  }
})
