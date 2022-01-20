import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import { useRouter } from "next/dist/client/router"
import { db } from "../firebase";
import Modal from '@material-tailwind/react/Modal';
import ModalFooter from '@material-tailwind/react/ModalBody';
import ModalBody from '@material-tailwind/react/ModalFooter';
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";

function DocumentsRow({ id, fileName, date }) {

    const [showModal, setShowModal] = useState(false);

    const [session] = useSession();

    const router = useRouter();

    const [deleted, setDeleted] = useState(false);

    const deleteDoc = () => {
        db.collection("userDocs").doc(session.user.email).collection("docs").doc(id).delete();
        setShowModal(false);
        setDeleted(true);
    }

    const modal = (
        <Modal size="sm" active={showModal} toggler={() => setShowModal(false)} >
            <ModalBody>
                <p>Are you sure ? </p>
            </ModalBody>
            <ModalFooter >
                <div className="flex justify-evenly mt-10 ">

                    <Button
                        color="blue"
                        buttonType="link"
                        className="w-20 h-10"
                        onClick={(e) => setShowModal(false)}
                        ripple="light"
                    >
                        Close
                    </Button>

                    <Button
                        className="w-30 h-10"
                        color="red"
                        onClick={deleteDoc}
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
        <div className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-sm text-gray-700 cursor-pointer">
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
        </div>
    )
}

export default DocumentsRow
