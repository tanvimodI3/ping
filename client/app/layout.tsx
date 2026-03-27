import "./globals.css"
import StartBar from "./components/startbar"
import DesktopIcons from "./components/icons"



export default function RootLayout({children}:{children:React.ReactNode})
{

  return(

    <html lang="en">
      <body className="m-0 font-w95 min-h-screen flex justify-center items-center bg-desktop"> 
        <DesktopIcons/>
        {children}
        <StartBar/>
      </body>
    </html>
  )

}