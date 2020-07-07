import React, { useEffect } from "react"

function Lives() {
  useEffect(() => {
    document.getElementById("root").className = "desktop"
  }, [])

  return <div />
}

export default Lives
