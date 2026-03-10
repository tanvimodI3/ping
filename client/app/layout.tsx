import "./globals.css"
import StartBar from "./components/startbar"
import DesktopIcons from "./components/icons"

export default function RootLayout({children,}:{children:React.ReactNode})
{

  return(

    <html lang="en">
      <body>
        <DesktopIcons/>
        {children}
        <StartBar/>
      </body>
    </html>
  )

}