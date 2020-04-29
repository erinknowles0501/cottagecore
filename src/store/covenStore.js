import db from "@/firebase/init";
import firebase from "firebase";

export const store = {
	myCoven: [],
	members: []
};

export async function getData() {
	await db
		.collection("covens")
		.where("membersUids", "array-contains", firebase.auth().currentUser.uid)
		.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				store.myCoven = doc.data();
			});
		});

	store.myCoven.membersUids.forEach(memberUid => {
		db.collection("users")
			.doc(memberUid)
			.get()
			.then(doc => {
				console.log("this member data: ", doc.data());
				// push no good. get too many
				//	store.members.push(doc.data());

				// if not exist, push. otherwise, replace.
				if (
					!store.members.find(
						member => member.userUid === doc.data().userUid
					)
				) {
					store.members.push(doc.data());
				} else {
					let storeVersionIndex = store.members.findIndex(
						member => member.userUid === doc.data().userUid
					);
					store.members.splice(storeVersionIndex, 1, doc.data());
				}
			});
	});
}
