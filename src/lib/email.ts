import { Resend } from "resend";
import { absoluteUrl } from "@/lib/utils";

type MemberWelcomeEmailOptions = {
  to: string;
  firstName?: string | null;
  accessPath?: string | null;
  idempotencyKey: string;
};

let resendClient: Resend | null = null;

function getResend() {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function hasResendConfig() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendMemberWelcomeEmail({ to, firstName, accessPath, idempotencyKey }: MemberWelcomeEmailOptions) {
  if (!hasResendConfig()) {
    console.warn("Skipping member welcome email because RESEND_API_KEY is not configured.");
    return;
  }

  const from = process.env.RESEND_FROM ?? "Side Hustle Stephen <no-reply@sidehustlestephen.com>";
  const accessUrl = absoluteUrl(accessPath && accessPath.startsWith("/") ? accessPath : "/packs");
  const greeting = firstName ? `Hi ${escapeHtml(firstName)},` : "You're in.";

  const html = `
    <div style="margin:0;padding:0;background:#f6f4ee;font-family:Arial,Helvetica,sans-serif;color:#111111;">
      <div style="max-width:620px;margin:0 auto;padding:40px 22px;">
        <p style="margin:0 0 18px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#6f6a5f;">Side Hustle Stephen</p>
        <h1 style="margin:0 0 18px;font-size:36px;line-height:1.08;color:#0b0d10;">Your membership is active.</h1>
        <p style="margin:0 0 18px;font-size:17px;line-height:1.7;color:#444444;">${greeting}</p>
        <p style="margin:0 0 24px;font-size:17px;line-height:1.7;color:#444444;">You now have access to the full launch pack archive, including the playbooks, scripts, workbooks, PDFs, and delivery files.</p>
        <a href="${accessUrl}" style="display:inline-block;background:#0b0d10;color:#ffffff;text-decoration:none;border-radius:999px;padding:15px 22px;font-size:15px;font-weight:700;">Open the archive</a>
        <p style="margin:26px 0 0;font-size:14px;line-height:1.7;color:#6d6d6d;">Pick one pack, download the assets, and start with the smallest sellable version first.</p>
      </div>
    </div>
  `;

  const text = [
    firstName ? `Hi ${firstName},` : "You're in.",
    "",
    "Your Side Hustle Stephen membership is active.",
    "Open the archive to access the playbooks, scripts, workbooks, PDFs, and delivery files:",
    accessUrl,
    "",
    "Pick one pack, download the assets, and start with the smallest sellable version first.",
  ].join("\n");

  const { error } = await getResend().emails.send(
    {
      from,
      to,
      subject: "Your Side Hustle Stephen membership is active",
      html,
      text,
      tags: [
        { name: "type", value: "member_welcome" },
        { name: "source", value: "stripe_webhook" },
      ],
    },
    { idempotencyKey },
  );

  if (error) {
    throw new Error(`Resend member welcome email failed: ${error.message}`);
  }
}
