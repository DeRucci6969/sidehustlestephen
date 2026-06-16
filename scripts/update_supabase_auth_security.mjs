const projectRef = process.env.PROJECT_REF ?? "sobucbzmoqjeiucuysgy";
const accessToken = process.env.SUPABASE_ACCESS_TOKEN;

if (!accessToken) {
  console.error("Missing SUPABASE_ACCESS_TOKEN. Create one at https://supabase.com/dashboard/account/tokens and rerun this script.");
  process.exit(1);
}

const response = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/config/auth`, {
  method: "PATCH",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    password_hibp_enabled: true,
  }),
});

if (!response.ok) {
  const errorText = await response.text();
  console.error(`Supabase auth security update failed (${response.status}): ${errorText}`);
  process.exit(1);
}

console.log(`Enabled Supabase leaked-password protection for ${projectRef}.`);
