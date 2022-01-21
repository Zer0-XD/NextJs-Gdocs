import Image from 'next/image'
import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import firebase from "firebase";
import { useCollectionOnce, useDocumentOnce } from 'react-firebase-hooks/firestore'
import { getSession, signOut, useSession } from "next-auth/client";
import { db } from "../../firebase";
// import DocumentsRow from './DocumentsRow';
import { useRouter } from "next/dist/client/router"
import Login from '../../components/Login'
import TextEditor from '../../components/TextEditor';


function Doc() {
    const [session] = useSession();
    const router = useRouter();

    const { id } = router.query;

    const [snapshot, loadingSnapshot] = useDocumentOnce(
        db.collection("userDocs").doc(session.user.email).collection('docs').doc(id)
    )

    if (!session) return <Login />

    if (!loadingSnapshot && !snapshot.data().fileName) {
        router.push('/')
    }


    return (
        <div>
            <header className='flex justify-between items-center p-3 pb-1'>
                <span onClick={() => router.push('/')} className='cursor-pointer'>
                    <Icon name="description" size="5xl" color="blue" />
                </span>

                <div className='flex-grow px-2' >
                    <h2>{snapshot?.data()?.fileName}</h2>
                    <div className='text-gray-600 flex items-center text-sm h-8 space-x-1 hidden md:inline-flex'>
                        <p className='option'>File</p>
                        <p className='option'>View</p>
                        <p className='option'>Edit</p>
                        <p className='option'>Insert</p>
                        <p className='option'>Format</p>
                        <p className='option'>Tools</p>
                    </div>
                </div>
                <Button
                    color="lightBlue"
                    buttonType="regular"
                    size="regular"
                    rounded={false}
                    block={false}
                    iconOnly={true}
                    ripple="dark"
                    className="h-12 !w-[100px] border-0 "
                >
                    <Icon name="people" size="md" /> <span className=' md:inline-flex'>Share</span>
                </Button>

                <img
                    loading="lazy"
                    className="cursor-pointer h-10 w-10 rounded-full ml-1 hover:shadow-md hover:opacity-80 hover:ease-in ease-out transition-opacity "
                    src={session?.user.image}
                    alt=""
                    onClick={signOut}
                />

            </header>

            <TextEditor />
        </div>
    )
}

export default Doc


export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session,
        }, // will be passed to the page component as props
    }
}