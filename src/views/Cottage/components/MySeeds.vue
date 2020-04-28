<template>
  <v-container>
    <v-card>
      <v-card-text>
        <h3>My seeds</h3>

        <ul v-if="finishedLoading">
          <li v-for="(seed, index) in mySeeds" :key="index">
            <v-chip
              large
              draggable
              @dragstart="pickupSeed($event, seed)"
              @dragend="destroySeed(seed.id)"
            >
              {{ seed.seedTypeName }}
            </v-chip>
          </li>
        </ul>
        <v-btn @click="getSeed">Get a seed</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

import {
  gardenStore as store,
  getGardenData as getData,
  gardenMutations as mutations
} from "@/store/gardenStore";

export default {
  name: "my-seeds",
  data() {
    return {
      mySeeds: [],
      finishedLoading: false
    };
  },
  async created() {
    await getData();
    this.mySeeds = store.mySeeds;
    console.log("local myseeds: ", this.mySeeds);
    this.finishedLoading = true;
  },
  methods: {
    pickupSeed(e, seedData) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("seedData", JSON.stringify(seedData));
    },
    destroySeed(seedId) {
      console.log(seedId);
      // not doin it
      // TODO: destroy from db.items with mutation.
      // this.mySeeds = this.mySeeds.filter(seed => {
      //   seed.id !== seedId;
      // });
      // TODO: write this mutation.
      mutations.mutateSeeds("delete", seedId);
      const thisSeedIndex = this.mySeeds.findIndex(seed => seed.id === seedId);
      console.log("thisSeedIndex", thisSeedIndex);
      this.mySeeds.splice(thisSeedIndex, 1);
    },
    getSeed() {
      // TODO: remove
      // temporary so new users have seeds to play with and see how it works.
      // Not how it'll work in the final.
      const userUid = firebase.auth().currentUser.uid;
      const newSeed = {
        itemType: "seed",
        userCuid: userUid,
        typeCuid: "jJMXMO7oNcwr6QbdXvOy"
      };
      db.collection("items").add(newSeed);
      newSeed.seedTypeName = "mint";
      this.mySeeds.push(newSeed);
    }
  }
};
</script>

<style scoped>
.container {
  width: 30%;
}
</style>
