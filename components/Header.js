import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import { signOut, useSession } from "next-auth/client"

function Header() {

    const [session] = useSession();

    return (
        <div className="flex items-center sticky top-0 z-50 px-4 py-2 shadow-md bg-white">

            {/* <left side buttons */}
            <Button
                color="gray"
                buttonType="link"
                size="regular"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="h-12 w-12 md:h-20 md:w-20 border-0 "
            >
                <Icon name="menu" size="3xl" />
            </Button>

            <Icon name="description" color="blue" size="5xl" />
            <h1 className="ml-2 text-2xl text-gray-700">Docs</h1>


            {/* search */}
            <div className="flex flex-inline mx-5 sm:mx-12 md:mx-20 items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:shadow-md focus-within:text-gray-600 w-[45%] md:w-[60%] transition-shadow ease-in focus-within:ease-out">
                <Icon name="search" color="gray" size="3xl" />
                <input type="text" placeholder="Search" className="bg-transparent w-full outline-none flex-grow text-base px-2 md:px-5" />
            </div>

            {/* apps button */}
            <Button
                color="gray"
                buttonType="link"
                size="regular"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className="hidden md:inline-flex h-16 w-16 ml-5 md:ml-20 border-0 "
            >
                <Icon name="apps" size="3xl" />
            </Button>

            {/* profile image  */}
            <img
                loading="lazy"
                className="cursor-pointer h-10 w-10 rounded-full ml-1 hover:shadow-md hover:opacity-80 hover:ease-in ease-out transition-opacity "
                src={session?.user?.image}
                alt=""
                onClick={signOut}
            />
        </div>
    )
}

export default Header
