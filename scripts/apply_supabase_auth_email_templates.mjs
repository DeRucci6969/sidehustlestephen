import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRef = process.env.PROJECT_REF ?? "sobucbzmoqjeiucuysgy";
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

if (!accessToken) {
  console.error("Missing SUPABASE_ACCESS_TOKEN. Create one at https://supabase.com/dashboard/account/tokens and rerun this script.");
  process.exit(1);
}

const templateDir = resolve("supabase/auth-templates");
const confirmation = await readFile(resolve(templateDir, "confirmation.html"), "utf8");
const magicLink = await readFile(resolve(templateDir, "magic-link.html"), "utf8");

const payload = {
  mailer_subjects_confirmation: "Confirm your Side Hustle Stephen access",
  mailer_templates_confirmation_content: confirmation,
  mailer_subjects_magic_link: "Your Side Hustle Stephen sign-in link",
  mailer_templates_magic_link_content: magicLink,
};

const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/config/auth`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
});

if (!response.ok) {
  const errorText = await response.text();
  console.error(`Supabase template update failed (${response.status}): ${errorText}`);
  process.exit(1);
}

console.log(`Updated Supabase confirmation and magic-link templates for ${projectRef}.`);
