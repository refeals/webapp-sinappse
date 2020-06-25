const setManifest = (event) => {
  const myDynamicManifest = {
    short_name: event["event-name"],
    name: event["event-name"],
    icons: [
      {
        src: "favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon"
      },
      {
        src: "logo192.png",
        type: "image/png",
        sizes: "192x192"
      },
      {
        src: "logo512.png",
        type: "image/png",
        sizes: "512x512"
      }
    ],
    start_url: `/${event.id}`,
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
