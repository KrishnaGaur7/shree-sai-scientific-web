import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // 1. Core Field Validations
    if (!payload.email || !payload.clientName) {
      return NextResponse.json(
        { error: 'Missing required contact parameters (clientName, email).' }, 
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      return NextResponse.json(
        { error: 'Invalid client email address formatting.' }, 
        { status: 400 }
      );
    }

    console.log('[RFQ API Log] Received RFQ Submission:', payload);

    // 2. Dispatch to external Sales CRM (HubSpot Endpoint Integration)
    let crmStatus = 'crm_mocked';
    if (process.env.HUBSPOT_ACCESS_TOKEN) {
      try {
        const crmResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
          },
          body: JSON.stringify({
            properties: {
              email: payload.email,
              firstname: payload.clientName.split(' ')[0],
              lastname: payload.clientName.split(' ')[1] || '',
              company: payload.company || 'N/A',
              phone: payload.phone || '',
              message: payload.message || '',
              industry: payload.productCategory || ''
            }
          })
        });
        if (crmResponse.ok) {
          crmStatus = 'crm_success';
        } else {
          crmStatus = 'crm_failed_status_' + crmResponse.status;
        }
      } catch (err) {
        console.error('[RFQ API Log] HubSpot integration call failed:', err);
        crmStatus = 'crm_error';
      }
    }

    // 3. Dispatch webhook notification to WhatsApp service (Aisensy / WhatsApp Webhook)
    let waStatus = 'whatsapp_mocked';
    if (process.env.AISENSY_WEBHOOK_URL) {
      try {
        const waResponse = await fetch(process.env.AISENSY_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: "+919876543210", // Target internal SSS Sales Phone
            templateName: "new_rfq_alert",
            parameters: [
              payload.clientName, 
              payload.company || 'N/A', 
              payload.specifications?.volume || 'N/A'
            ]
          })
        });
        if (waResponse.ok) {
          waStatus = 'whatsapp_success';
        } else {
          waStatus = 'whatsapp_failed_status_' + waResponse.status;
        }
      } catch (err) {
        console.error('[RFQ API Log] WhatsApp alert webhook failed:', err);
        waStatus = 'whatsapp_error';
      }
    }

    // 4. Return unified success dispatch payload
    return NextResponse.json({ 
      success: true, 
      message: 'RFQ processed and dispatched successfully.',
      dispatches: {
        crm: crmStatus,
        whatsapp: waStatus
      }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : '';
    console.error('[RFQ API Log] Submission processing failed:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: errorMessage }, 
      { status: 500 }
    );
  }
}
