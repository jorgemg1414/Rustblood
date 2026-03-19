import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '../supabase'
import type { Session, User } from '@supabase/supabase-js'

const session = ref<Session | null>(null)
const user = ref<User | null>(null)
const isAuthenticated = ref(false)
const loading = ref(true)

let unsubscribe: (() => void) | null = null

export function useAuth() {
  onMounted(() => {
    if (unsubscribe) return

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, _session) => {
        session.value = _session
        user.value = _session?.user ?? null
        isAuthenticated.value = !!_session
        loading.value = false
      }
    )

    unsubscribe = () => subscription.unsubscribe()

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      session.value = currentSession
      user.value = currentSession?.user ?? null
      isAuthenticated.value = !!currentSession
      loading.value = false
    })
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  })

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    session.value = null
    user.value = null
    isAuthenticated.value = false
  }

  const getToken = async (): Promise<string | null> => {
    const { data: { session: currentSession } } = await supabase.auth.getSession()
    return currentSession?.access_token ?? null
  }

  return {
    session,
    user,
    isAuthenticated,
    loading,
    signIn,
    signOut,
    getToken
  }
}
