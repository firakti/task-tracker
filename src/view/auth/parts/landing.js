import React from 'react'

const Landing = () => {
    const landingContent = {
        appName: "task tracker",
        subtitle: "simplify task tracking",
        description: " allows you to keep track of your goals or tasks that are recurring periodically.",
        mail: "",
    }

    return (
        <div className="app-info">
            <h1 className="title">{landingContent.appName}</h1>
            <h2 className="sub-title">{landingContent.subtitle}</h2>
            <span className="description emphasis">{landingContent.appName}</span>
            <span className="description">{landingContent.description}</span>
            <img src="image.png"></img>
        </div>
    )
}

export default Landing;