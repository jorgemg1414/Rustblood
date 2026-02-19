import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://euqdhvxymafoylzckhgj.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'sb_publishable_jDX3NN8X4HAgih6vPjje0w_Y-CqT2Rm'

export const supabase = createClient(supabaseUrl, supabaseKey)
