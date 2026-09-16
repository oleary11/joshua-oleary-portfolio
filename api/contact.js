const CONTACT_EMAIL = "contact@olearyhouse.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { name, email, message, company } = req.body ?? {};

  // Honeypot: real visitors never see or fill this field. Reply success so
  // bots don't learn to retry, but skip sending entirely.
  if (typeof company === "string" && company.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !EMAIL_RE.test(email.trim()) ||
    typeof message !== "string" || !message.trim()
  ) {
    return res.status(400).json({ ok: false, error: "Please fill out all fields with a valid email." });
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ ok: false, error: "Message is too long." });
  }

  const token = process.env.RESEND_API_KEY;
  if (!token) {
    console.error("api/contact error: RESEND_API_KEY is not configured");
    return res.status(502).json({ ok: false, error: "Message could not be sent right now." });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  try {
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Portfolio Contact <${CONTACT_EMAIL}>`,
        to: [CONTACT_EMAIL],
        reply_to: trimmedEmail,
        subject: `New message from ${trimmedName} — olearyhouse.com`,
        text: `From: ${trimmedName} <${trimmedEmail}>\n\n${trimmedMessage}`,
        html: `<p><strong>From:</strong> ${escapeHtml(trimmedName)} &lt;${escapeHtml(trimmedEmail)}&gt;</p><p>${escapeHtml(trimmedMessage).replace(/\n/g, "<br/>")}</p>`,
      }),
    });

    if (!resendRes.ok) {
      const errBody = await resendRes.text();
      console.error("api/contact error: Resend request failed", resendRes.status, errBody);
      return res.status(502).json({ ok: false, error: "Message could not be sent right now." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("api/contact error:", err.message);
    return res.status(502).json({ ok: false, error: "Message could not be sent right now." });
  }
}
