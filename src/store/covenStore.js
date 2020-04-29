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
}
