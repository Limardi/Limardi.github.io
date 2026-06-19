import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Anonymous, read-only client. All content tables have public-read RLS, so this
// is safe to use from server components (where we now do all fetching) as well
// as the browser. No service-role key ever ships to the client.
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
