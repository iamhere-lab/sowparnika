/*
 * Roots for Tomorrow (Sowparnika The Native) landing page: deployment configuration.
 * Everything that differs between preview and production lives here.
 * Nothing secret belongs in this file: it is shipped to the browser.
 */
window.SS_CONFIG = {
  /* Lead delivery. POST target that returns 2xx on success (Pabbly webhook, Vercel function, Apps Script, Leadrat proxy).
   * Leave empty until a real endpoint exists: the form then refuses to submit
   * and points to the phone number instead of showing a fake success message. */
  leadEndpoint: "https://connect.pabbly.com/webhook-listener/webhook/IjU3NjUwNTY1MDYzNTA0MzY1MjZjNTUzNyI_3D_pc/IjU3NjcwNTZiMDYzNDA0MzQ1MjZhNTUzNDUxM2Ii_pc",

  /* "form" = URL-encoded POST without a CORS preflight (Pabbly / Zapier / Make webhooks).
   * "json" = JSON POST (your own endpoint that answers CORS). */
  leadEndpointMode: "form",
  leadEndpointSimpleRequest: false,

  /* Redirect here after a confirmed submission. Empty = inline success message. */
  thankYouUrl: "thank-you.html",

  /* Google Tag Manager container, e.g. "GTM-XXXXXXX". Loaded only when set. */
  gtmId: "",

  /* Sales number. While empty, every Call button and the header phone pill stay hidden. */
  phoneDisplay: "",
  phoneE164: "",

  /* WhatsApp number, digits only with country code, e.g. "919876543210". Buttons stay hidden until set. */
  whatsappNumber: "",
  whatsappMessage: "Hi, I'm interested in Sowparnika Codename Roots for Tomorrow (The Native), Whitefield–Hoskote. Please share the pre-launch price and floor plans.",

  /* Auto-open the enquiry popup after this many seconds (once per session). 0 disables. */
  popupDelaySeconds: 25,

  /* Optional public brochure URL, shown after a successful "Download Brochure" enquiry. */
  brochureUrl: "",

  /* Channel partner running this site. Shown in the top strip, About Us, footer and consent line.
   * Google Ads requires the advertiser to be clearly identified: fill these before re-running ads. */
  partnerName: "",
  partnerAddress: "",
  partnerEmail: "",

  /* Channel-partner / agent RERA number, shown in the footer when set. */
  agentRera: "PRM/KA/RERA/1251/310/AG/230119/003356",

  /* Named in the consent line: who will contact the enquirer. Confirm before launch. */
  consentEntity: "",

  siteUrl: "",
  privacyUrl: ""
};
