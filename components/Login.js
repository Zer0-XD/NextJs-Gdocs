import Button from "@material-tailwind/react/Button"
import { signIn, signOut } from "next-auth/client"
import Image from "next/image"


function Login() {

    return (
        <div className="flex min-h-screen py-2 items-center justify-center flex-col">
            <Image
                objectFit="contain"
                height="300"
                width="300"
                src="/docs.png"
            />

            <Button ripple="light"
                onClick={() => signIn("google")}
                buttonType="filled"
                className="my-5 h-10 w-52 mt-4">
                Login
            </Button>
        </div>
    )
}

export default Login
