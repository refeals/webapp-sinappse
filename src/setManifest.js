const setManifest = (event) => {
  const myDynamicManifest = {
    short_name: event["event-name"],
    name: event["event-name"],
    icons: [
      {
        src: event.favicon ?? "favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon"
      },
      {
        src: event.logo192 ?? "logo192.png",
        type: "image/png",
        sizes: "192x192"
      },
      {
        src: event.logo512 ?? "logo512.png",
        type: "image/png",
        sizes: "512x512"
      }
    ],
    start_url: `/${event.slug}`,
    display: "standalone",
    theme_color: "#000000",
    background_color: "#ffffff"
  }
  const stringManifest = JSON.stringify(myDynamicManifest)
  const blob = new Blob([stringManifest], { type: "application/json" })
  const manifestURL = URL.createObjectURL(blob)
  document.querySelector("#manifest").setAttribute("href", manifestURL)
}

export default setManifest
