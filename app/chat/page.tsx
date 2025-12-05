import { createClient } from '@/lib/supabase/server'
import { RealtimeChat } from '@/components/realtime-chat'
export default async function Page() {
  return <RealtimeChat roomName="my-chat-room" username="john_doe" />

}

