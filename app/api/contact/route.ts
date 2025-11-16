import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body)
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL;
  const senderName = process.env.SENDER_NAME || "EX2325";
  const receiverEmail = process.env.RECEIVER_EMAIL;

  if (!brevoApiKey || !senderEmail || !receiverEmail) {
    console.warn("Email not sent: Brevo not configured");
    return NextResponse.json({
      ok: true,
      warning:
        "Brevo not configured. Set BREVO_API_KEY, SENDER_EMAIL and RECEIVER_EMAIL.",
    });
  }

  const subject = `Contact form: ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\n\n${message}`;

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
        textContent: text,
        // Optional: Add replyTo so you can reply directly to the contact
        replyTo: {
          email: email,
          name: name,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Brevo API error:", errorData);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
