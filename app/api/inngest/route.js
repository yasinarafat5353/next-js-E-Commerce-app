import { serve } from "inngest/next";
import { inngest } from "@/lib/inngest";
import { syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";

// This route handles Inngest events
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
  ], 
  
  
});
