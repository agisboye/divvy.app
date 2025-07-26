export async function onRequest(context) {
  const userAgent = context.request.headers.get("User-Agent") || ""

  // Device detection
  const isIOS = /iPad|iPhone|iPod/.test(userAgent)
  const isAndroid = /Android/.test(userAgent)

  // Your app store URLs
  const iosUrl = "https://apps.apple.com/app/divvy/id1662002655"
  const androidUrl = "https://play.google.com/store/apps/details?id=com.totus_labs.divvy"

  if (isIOS) {
    return Response.redirect(iosUrl, 302)
  } else if (isAndroid) {
    return Response.redirect(androidUrl, 302)
  }

  // Desktop fallback - serve the download page
  return context.next()
}
