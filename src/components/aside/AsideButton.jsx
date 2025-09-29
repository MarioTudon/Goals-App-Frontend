import { Link } from "react-router"

function AsideButton({ children, text, sectionID, sendDataToSideMenu, url, onClick, ...props }) {

    return (
        <>
            <Link to={url}>
                <button className='flex flex-nowrap justify-start py-3 items-center group transition duration-medium overflow-hidden lg:hover:bg-gray-300 group lg:selected:bg-gray-300 lg:focus:outline-none w-full'{...props} onClick={onClick}>
                    {children}
                    <span className="align-middle text-gray-700 text-base font-bold text-nowrap lg:group-hover:scale-110 transition duration-medium">{text}</span>
                </button>
            </Link>
        </>
    );
}

export default AsideButton