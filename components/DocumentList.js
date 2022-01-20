import Image from 'next/image'
import Header from '../components/Header'
import Button from "@material-tailwind/react/Button"
import Icon from "@material-tailwind/react/Icon"
import firebase from "firebase";
import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import { useSession } from "next-auth/client";
import { db } from "../firebase";
import DocumentsRow from './DocumentsRow';
import { useEffect, useState } from 'react';


function DocumentList() {

    const [session] = useSession();

    const [orderState, setOrderState] = useState("desc");
    const [showModal, setShowModal] = useState(false);


    // console.log("session", session);

    const [snapshot] = useCollectionOnce(
        db
            .collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .orderBy("time", orderState)
    );

    const sortList = () => {
        if (orderState == "desc") {
            setOrderState("asc")
        }
        else {
            setOrderState("desc")
        }
    }


    return (
        <section className='px-10 md:px-0 '>
            <div className='max-w-3xl mx-auto py-8'>
                <div className='flex items-center justify-between pb-5'>
                    <h2 className='font-medium flex-grow'>My Documents</h2>
                    <p className='mr-12'>Date Created</p>
                    <Button
                        color="gray"
                        buttonType="link"
                        size="regular"
                        rounded={true}
                        iconOnly={true}
                        ripple="dark"
                        className="border-0 "
                        onClick={sortList}
                    >
                        <Icon name="folder" size="3xl" />
                    </Button>
                </div>

                {
                    snapshot?.docs.map((doc) => (
                        <DocumentsRow
                            key={doc.id}
                            id={doc.id}
                            fileName={doc.data().fileName}
                            date={doc.data().time}
                        />
                    ))
                }
            </div>

        </section>
    )
}

export default DocumentList
