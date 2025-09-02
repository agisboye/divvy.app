export async function onRequest(context) {
  const { code } = context.params

  const staticUrl = new URL(context.request.url)
  staticUrl.pathname = "/invite.html"
  const staticResponse = await context.env.ASSETS.fetch(new Request(staticUrl.toString()))

  try {
    // Determine API base URL based on environment
    const isLocalDev = staticUrl.hostname === "localhost" || staticUrl.hostname === "127.0.0.1"
    const apiBaseUrl = isLocalDev ? "http://localhost:3000" : "https://api.divvy.app"

    // Fetch group information from API
    const apiResponse = await fetch(`${apiBaseUrl}/v1/invites/${code}`)

    let groupName = "a group"
    let inviterName = "a friend"
    let inviterProfilePicture = undefined
    let isValidInvite = false

    if (apiResponse.ok) {
      const inviteData = await apiResponse.json()
      groupName = inviteData.group_name
      inviterName = inviteData.inviter.name
      inviterProfilePicture = inviteData.inviter.image_url
      isValidInvite = true
    }

    // Use HTMLRewriter to inject dynamic content
    return new HTMLRewriter()
      .on("h1", {
        element(element) {
          if (isValidInvite) {
            element.setInnerContent(`Join "${groupName}"!`)
          } else {
            element.remove()
          }
        }
      })
      .on(".invite-message", {
        element(element) {
          if (isValidInvite) {
            element.setInnerContent(`${inviterName} invited you to join "${groupName}" on Divvy to split expenses.`)
          } else {
            element.remove()
          }
        }
      })
      .on(".group-status", {
        element(element) {
          if (!isValidInvite) {
            element.setInnerContent(
              "This invite may have expired, but you can still download Divvy and create or join groups with your friends."
            )
            element.setAttribute(
              "class",
              "bg-yellow-50/80 backdrop-blur-sm rounded-lg p-4 border border-yellow-200/50 text-yellow-800 text-sm"
            )
          } else {
            element.remove()
          }
        }
      })
      .on("title", {
        element(element) {
          if (isValidInvite) {
            element.setInnerContent(`Join "${groupName}" | Divvy`)
          }
        }
      })
      .on('meta[name="description"]', {
        element(element) {
          if (isValidInvite) {
            element.setAttribute(
              "content",
              `You've been invited to join "${groupName}" on Divvy - the easiest way to share expenses with friends. Download the app to get started.`
            )
          }
        }
      })
      .transform(staticResponse)
  } catch (error) {
    return staticResponse
  }
}
