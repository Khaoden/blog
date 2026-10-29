import { computed, inject, type ComputedRef, type InjectionKey } from 'vue'

export const motionPreference: InjectionKey<ComputedRef<boolean>> = Symbol('motion-preference')

export function useMotionPreference() {
  return inject(
    motionPreference,
    computed(() => false)
  )
}
