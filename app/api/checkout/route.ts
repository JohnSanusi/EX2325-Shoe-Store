import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body)
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { items } = body;
  if (!items || !Array.isArray(items)) {
    return NextResponse.json({ error: "Invalid items" }, { status: 400 });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;
  const senderName = process.env.SENDER_NAME || "EX2325";
  const receiverEmail = process.env.RECEIVER_EMAIL;

  if (!brevoApiKey || !senderEmail || !receiverEmail) {
    console.warn("Checkout email not sent: Brevo not configured");
    return NextResponse.json({
      ok: true,
      warning: "Brevo not configured. Cart not emailed.",
    });
  }

  const subject = `New order from EX2325`;

  // Build HTML email with images
  const itemsHtml = items
    .map((it: any) => {
      const imgUrl = it.image || it.img || "";
      return `
        <tr>
          <td style="padding: 10px;">
            ${
              imgUrl
                ? `<img src="${imgUrl}" alt="${it.id}" style="width: 100px; height: 100px; object-fit: cover; border-radius: 8px;">`
                : ""
            }
          </td>
          <td style="padding: 10px;">
            <strong>${it.id}</strong><br>
            Size: ${it.size ?? "n/a"}<br>
            Quantity: ${it.qty}
          </td>
        </tr>
      `;
    })
    .join("");

  const htmlContent = `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Order Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f5f5f5;">
              <th style="padding: 10px; text-align: left;">Image</th>
              <th style="padding: 10px; text-align: left;">Product Details</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </body>
    </html>
  `;

  // Plain text fallback
  const textLines = items
    .map((it: any) => `- ${it.id} (${it.size ?? "n/a"}) x ${it.qty}`)
    .join("\n");
  const textContent = `New order received:\n\n${textLines}`;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        sender: {
          email: senderEmail,
          name: senderName,
        },
        to: [
          {
            email: receiverEmail,
          },
        ],
        subject: subject,
        htmlContent: htmlContent,
        textContent: textContent,
      }),
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Brevo API error:", {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      });
      return NextResponse.json(
        {
          error: "Failed to send email",
          details: responseData,
        },
        { status: 500 }
      );
    }

    console.log("Order email sent successfully:", responseData);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send order email", err);
    return NextResponse.json(
      { error: "Failed to send email", details: String(err) },
      { status: 500 }
    );
  }
}
