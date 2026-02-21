import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  const elements = ref<HTMLElement[]>([])
  const observer = ref<IntersectionObserver | null>(null)

  const observe = (el: HTMLElement) => {
    if (observer.value) {
      observer.value.observe(el)
      elements.value.push(el)
    }
  }

  onMounted(() => {
    observer.value = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.value?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    elements.value.forEach((el) => observer.value?.observe(el))
  })

  onUnmounted(() => {
    observer.value?.disconnect()
  })

  return { observe }
}
