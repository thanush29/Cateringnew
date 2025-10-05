import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EventSubmission {
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date?: string;
  guest_count?: number;
  venue_location?: string;
  message?: string;
  budget_range?: string;
}

const WHATSAPP_PHONE = "919840650939";
const WHATSAPP_API_URL = "https://api.whatsapp.com/send";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const submission: EventSubmission = await req.json();

    const message = `
🎉 *New Event Planning Inquiry*

*Client Details:*
Name: ${submission.name}
Email: ${submission.email}
Phone: ${submission.phone}

*Event Information:*
Type: ${submission.event_type}
${submission.event_date ? `Date: ${submission.event_date}` : ''}
${submission.guest_count ? `Guest Count: ${submission.guest_count}` : ''}
${submission.venue_location ? `Venue: ${submission.venue_location}` : ''}
${submission.budget_range ? `Budget Range: ${submission.budget_range}` : ''}

*Message:*
${submission.message || 'No additional message'}

---
Submitted via Shanvik Catering Website
    `.trim();

    const whatsappUrl = `${WHATSAPP_API_URL}?phone=${WHATSAPP_PHONE}&text=${encodeURIComponent(message)}`;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook processed successfully",
        whatsappUrl,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("WhatsApp webhook error:", error);

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
