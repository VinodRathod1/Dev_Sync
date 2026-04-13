export default function ContactItem({
    field,
    fieldName,
    isURL,
    url
}){
    return(
        <div className="whitespace-nowrap outlin my-6">
            <div className="text-6xl font-thin cursor-default">
                {field}
            </div>
            {isURL?<a href={url} target="_blank" className="px-1 text-gray-500 cursor-pointer font-light hover:font-normal hover:text-black transition-all ">
                            {fieldName}
                    </a> :          
                    <div className="px-1 text-gray-500 cursor-pointer font-light hover:font-normal hover:text-black transition-all ">
                            {fieldName}
                    </div>}
        </div>
    )
}