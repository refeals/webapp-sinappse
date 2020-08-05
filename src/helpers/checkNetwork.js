const checkNetwork = () => {
  const condition = navigator.onLine ? "online" : "offline"
  let value
  if (condition === "online") {
    console.log("ONLINE")
    fetch("https://www.google.com/", {
      mode: "no-cors"
    })
      .then(() => {
        console.log("CONNECTED TO INTERNET")
        value = true
      })
      .catch(() => {
        console.log("INTERNET CONNECTIVITY ISSUE")
        value = true
      })
  } else {
    console.log("OFFLINE")
    value = false
  }

  console.log(value)

  return value
}

export default checkNetwork

/*
navigator.onLine will return the status whether it is online or offline but it wont check internet connectivity is there or not. Adding bit more to @StackOverMySoul. To get rid of this can refer below example.

Why choose google.com?
The reason behind sending the get request to google.com instead of any random platform is because it has great uptime. The idea here is to always send the request to a service that is always online. If you have a server, you could create a dedicated route that can replace the google.com domain but you have to be sure that it has an amazing uptime.
*/
