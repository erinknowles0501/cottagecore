/* okay so the flow of data should look like:
 * get data from firebase via action on created() in page so it runs whenever page is reloaded
 * use mutation(?) to set store
 * on page - get data from store
 * // when something is changed, update local data so we can see changes instantly.
 * // Watch local data and perform update in bg when it changes as applicable
 * OR: Directly interface with store, so that if later other areas of the site affect it
 * You'll still have most up-to-date.
 * Have watcher watch store and perform POST when it changes...?
 *
 *
 *
 * TODO: could probably rename all these consts store, mutations, etc, and import
 * them basically as is, UNLESS you need multiple stores on a page,
 * in which case you can rename them on import. Less confusing I thikn
 */

import db from "@/firebase/init";
import { store } from "./index_BAK";
// import { store } from "./index_BAK";
// TODO- create user store, instead of just pulling
// directly wherewhere it's needed
import firebase from "firebase";

export const gardenStore = {
  herbTypes: [],
  plots: [],
  mySeeds: [],
  helloWorld: "Hello World!"
};

// just run this first in created(), populate state.
// computed directly pulls from and manipulates store.
export async function getGardenData() {
  // and update store with that. the page gets and pushes directly to the store.

  // get available herb types info
  await db
    .collection("herbTypes")
    .get()
    .then(snapshot => {
      let tempHerbTypes = [];
      snapshot.forEach(doc => {
        let herbType = doc.data();
        herbType.id = doc.id;
        tempHerbTypes.push(herbType);
      });
      gardenStore.herbTypes = tempHerbTypes;
    });

  // get plots
  const userUid = firebase.auth().currentUser.uid;
  await db
    .collection("plots")
    .where("userCuid", "==", userUid)
    .get()
    .then(snapshot => {
      let tempPlots = [];
      snapshot.forEach(doc => {
        let plot = doc.data();
        plot.id = doc.id;
        tempPlots.push(plot);
      });
      gardenStore.plots = tempPlots;
    });

  // get user's seeds.
  await db
    .collection("items")
    .where("itemType", "==", "seed")
    .where("userCuid", "==", userUid)
    .get()
    .then(snapshot => {
      let tempSeeds = [];
      snapshot.forEach(doc => {
        let seed = doc.data();
        seed.id = doc.id;
        tempSeeds.push(seed);
      });
      gardenStore.mySeeds = tempSeeds;
    });

  // give the plot object data about what herbType is growing in the plot
  // (if there is anything growing in that plot) so it's easily accessible    store.plots.forEach(plot => {
  gardenStore.plots.forEach(plot => {
    if (plot.contains) {
      gardenActions.getGrowingData(plot);
    }
  });

  // populate empty plots and sort them to make data easier to use
  for (let i = 0; i < 25; i++) {
    if (!gardenStore.plots.find(plot => plot.number === i)) {
      gardenStore.plots.push({ number: i, contains: null });
    }
  }
  gardenStore.plots.sort((a, b) => {
    return a.number > b.number;
  });

  // give seed items info about their seed type:
  gardenStore.mySeeds.forEach(seed => {
    const seedTypeName = gardenStore.herbTypes.find(herb => {
      return herb.id === seed.typeCuid;
    }).name;
    seed.seedTypeName = seedTypeName;
  });
}

export const gardenActions = {
  getGrowingData(plot) {
    // give the plot object data about what herbType is growing in the plot so it's easily accessible    store.plots.forEach(plot => {

    let growing = gardenStore.herbTypes.find(herb => {
      return herb.id === plot.contains;
    });
    let gardenStorePlot = gardenStore.plots.find(
      storePlot => storePlot.number === plot.number
    );

    gardenStorePlot.growing = growing;
  },
  updateMsg() {
    gardenStore.helloWorld = "Bananas";
  }
};

export const gardenMutations = {
  // this is where you update the actual database.
  // each mutation function takes an action and some data
  // that might be passed to it.
  // shouldn't need to re-run getGardenInfo after any of these
  // as they should match anyway.

  async mutateSeeds(action, uid, data) {
    // possible actions:
    // create new seed ('create', optional uid, data)
    // update existing seed ('update', uid, new data)
    // delete seed ('delete', uid)
    // data should contain: itemType='seed', typeCuid, userCuid.
  },
  async mutatePlots(action, number, data) {
    // possible actions:
    // create new plot ('create', number, data)
    // update existing plot ('update', number, new data)
    // delete plot ('delete', number)
    // data should contain: number=0-24, contains=herbType uid
    switch (action) {
      case "create":
        db.collection("plots")
          .add({
            userCuid: "IYAruWWxHGSLoA0sTC3WHSUPq5r2",
            number: number,
            contains: data
          })
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
        break;

      case "delete":
        db.collection("plots")
          .doc(data)
          .delete()
          .catch(error => console.log("Error deleting document: ", error));
        break;
    }
  }
};
