export const PageDescriptor = ({ title, desc }: { title: string, desc: string }) => {
    return (
        <div className="header flex items-end justify-between p-4 from-[#C9E5EC]">
            <div className="title">
                <p className=" text-black text-3xl font-bold flex-1 mb-10">
                    {title}
                </p>
                <p className="text-[#383838] text-4xl font-bold font-['Montserrat'] mr-5 ">
                    {desc}
                </p>
            </div>
        </div>
    )
}
