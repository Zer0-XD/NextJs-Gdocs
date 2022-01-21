import Image from 'next/image'
import Header from '../components/Header'
import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import Modal from '@material-tailwind/react/Modal';
import ModalFooter from '@material-tailwind/react/ModalBody';
import ModalBody from '@material-tailwind/react/ModalFooter';
import { useState } from 'react';
import Input from '@material-tailwind/react/Input';
import { db } from "../firebase";
import { useSession } from "next-auth/client";
import firebase from "firebase";
// import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';


function CreateDocumentSection() {

    const [session] = useSession();

    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState("");

    const router = useRouter();

    const createDocument = (e) => {
        if (!input) return;

        e.preventDefault();
        db.collection("userDocs").doc(session.user.email).collection("docs").add({
            fileName: input,
            time: firebase.firestore.FieldValue.serverTimestamp()
        });

        const ref = db.collection('userDocs').doc();

        // console.log(ref.id);

        const id = ref.id;

        setInput("");
        setShowModal(false);

        // sleep(1000);
        // router.push(`/doc/${id}`);
    }

    const modal = (
        <Modal size="sm" active={showModal} toggler={() => setShowModal(false)} >
            <ModalBody>
                <Input
                    value={input}
                    type="text"
                    outline={true}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter document name"
                    className="w-full"
                    onKeyDown={(e) => e.key === "Enter" && createDocument(e)}
                />
            </ModalBody>
            <ModalFooter >
                <div className="flex justify-evenly mt-10 z-30">

                    <Button
                        color="red"
                        buttonType="link"
                        className="w-20 h-10"
                        onClick={(e) => setShowModal(false)}
                        ripple="light"
                    >
                        Close
                    </Button>

                    <Button
                        className="w-30 h-10"
                        color="blue"
                        onClick={createDocument}
                        ripple="light"
                    >
                        Create
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );

    return (

        < section className='bg-[#F8F9FA] pb-5 px-10 sticky top-10 shadow-md' >
            <div className='max-w-3xl mx-auto'>

                <div className='py-3 flex items-center justify-between'>
                    <h2 className='text-gray-600 text-lg'>Start new document</h2>
                    <Button
                        color="gray"
                        buttonType="link"
                        size="regular"
                        rounded={true}
                        iconOnly={true}
                        ripple="dark"
                        className="border-0 "
                    >
                        <Icon name="more_vert" size="3xl" />
                    </Button>
                </div>

                <div className='h-40 w-32 relative border-2 border-opacity-20 cursor-pointer hover:border-blue-500 hover:shadow-lg rounded-md hover:border-opacity-20 transition-all ease-out hover:ease-in'>
                    <Image
                        onClick={() => setShowModal(true)}
                        loading="lazy"
                        src="/docs-blank-googlecolors.png"
                        layout='fill'
                        ripple="dark"
                    />
                </div>

                <p className='ml-2 mt-2 font-semibold text-sm text-gray-600'>Blank</p>

            </div>

            {modal}
        </section >
    )
}

export default CreateDocumentSection
