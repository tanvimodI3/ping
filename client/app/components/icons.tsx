export default function DesktopIcons(){

  return(

    <div className="absolute top-[20px] left-[20px] flex flex-col gap-[16px]">

      <div className="w-[70px] text-center text-[12px] hover:outline-[1px_dotted_white] hover:bg-[#ffffff25]">
        <img className="w-[40px]" src="/icons/other.png"/>
        <span>updates</span>
      </div>

      <div className="w-[70px] text-center text-[12px] img:w-[40px] hover:outline-[1px_dotted_white] hover:bg-[#ffffff25]">
        <img className="w-[40px]" src="/icons/rooms.png"/>
        <span>random</span>
      </div>

      <div className="w-[70px] text-center text-[12px] img:w-[40px] hover:outline-[1px_dotted_white] hover:bg-[#ffffff25]">
        <img className="w-[40px]" src="/icons/icon5.png"/>
        <span>bin</span>
      </div>

    </div>

  )

}