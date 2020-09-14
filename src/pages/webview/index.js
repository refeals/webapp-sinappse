import React from "react"
import { useHistory } from "react-router-dom"

const WebView = ({ type, value }) => {
  const history = useHistory()

  const renderWebview = () => {
    switch (type) {
      case "news":
        return renderNews()
      case "link":
        return renderLink()
      case "video":
        return renderVideo()
      case "video-api":
        return renderVideoApi()
      case "url":
        return renderUrl(value)
      default:
        return <></>
    }
  }

  const renderNews = () => {
    return (
      <iframe
        width="100%"
        height="100%"
        scrolling="no"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        title={value}
        src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${value}&tabs=timeline&width=${document.body.clientWidth}&height=${document.body.clientHeight}&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId=177642365767530`}
      ></iframe>
    )
  }

  const renderLink = () => {
    return (
      <iframe
        width="100%"
        height="100%"
        scrolling="no"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
        title={value}
        src={value}
      ></iframe>
    )
  }

  const renderVideo = () => {
    return (
      <iframe
        width="100%"
        height="100%"
        scrolling="no"
        frameBorder="0"
        allowtransparency="true"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen="1"
        title={value}
        src={`https://www.youtube.com/embed/?listType=user_uploads&list=${value}`}
      />
    )
  }

  const renderVideoApi = () => {
    return <></>
  }

  const renderUrl = (value) => {
    window.open(value, "_blank")
    history.goBack()
    return <></>
  }

  return <div id="viewer-webview">{renderWebview()}</div>
}

export default WebView
