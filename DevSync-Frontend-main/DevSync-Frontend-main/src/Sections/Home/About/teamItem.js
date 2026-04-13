export default function TeamItem({
    name,
    role
}){

    return(
        <div className="whitespace-nowrap outlin my-6  cursor-pointer">
            <div className="text-6xl font-thin hover:font-normal transition-all ">
                {name}
            </div>
            <div className="text-sm px-1 text-gray-500 font-light">
                {role}
            </div>
        </div>
    )
}