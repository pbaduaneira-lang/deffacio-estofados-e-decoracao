import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qtejnzckfxbrcqxmwxim.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Kka2VHfoQeuaIWfTslDX-w_7Ub_A88r';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
