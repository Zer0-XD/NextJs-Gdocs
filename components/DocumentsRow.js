import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import { useRouter } from "next/dist/client/router"
import { db } from "../firebase";
import Modal from '@material-tailwind/react/Modal';
import ModalFooter from '@material-tailwind/react/ModalBody';
import ModalBody from '@material-tailwind/react/ModalFooter';
import { forwardRef, useEffect, useState } from "react";
import { useSession } from "next-auth/client";

// function DocumentsRow({ id, fileName, date }) {
const DocumentsRow = forwardRef(({ id, fileName, date }, ref) => {

    const [showModal, setShowModal] = useState(false);

    const [session] = useSession();

    const router = useRouter();


    const deleteDoc = () => {
        // e.preventDefault()
        db.collection("userDocs").doc(session.user.email).collection("docs").doc(id).delete().then(() => {
            console.log("item deleted : ", id);
        });
        setShowModal(false)
    }


    const modal = (
        <Modal size="regular" active={showModal} toggler={() => setShowModal(false)} >
            <ModalBody className="flex justify-center items-center m-auto text-center">
                <p className="font-medium text-lg text-left pr-20">Are you sure ?</p>
            </ModalBody>
            <ModalFooter >
                <div className="flex justify-between space-x-5 mt-10 ">

                    <Button
                        color="blue"
                        buttonType="link"
                        className="w-30 h-10"
                        onClick={() => setShowModal(false)}
                        ripple="light"
                    >
                        Close
                    </Button>

                    <Button
                        className="w-30 h-10"
                        color="red"
                        ripple="light"
                        onClick={deleteDoc}
                    >
                        Delete
                    </Button>
                </div>
            </ModalFooter>
        </Modal>
    );

    return (
        <div ref={ref} className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-sm text-gray-700 cursor-pointer ">
            <Icon onClick={() => router.push(`/doc/${id}`)} size="3xl" color="blue" name="article" />
            <p onClick={() => router.push(`/doc/${id}`)} className="truncate pr-10 w-10 flex-grow pl-5">{fileName}</p>
            <p className="text-sm pr-5">{date?.toDate().toLocaleDateString()}</p>

            <Button
                color="gray"
                buttonType="link"
                size="regular"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                onClick={() => setShowModal(true)}
                className="border-0 hover:text-red-500"
            >
                <Icon name="delete" size="3xl" />
            </Button>


            {modal}
        </div >
    )
})

export default DocumentsRow
