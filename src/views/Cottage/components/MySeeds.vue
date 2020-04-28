<template>
  <v-container>
    <v-card>
      <v-card-text>
        <h3>My seeds</h3>

        <v-chip
          v-if="finishedLoading"
          large
          draggable
          @dragstart="pickupSeed($event, seed)"
          v-for="(seed, index) in mySeeds"
          :key="index"
        >
          {{ seed.seedTypeName }}
        </v-chip>

        <v-btn small @click="getSeed">Get some kinda seed</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import db from "@/firebase/init";
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
    getSeed() {
      db.collection("items").add({
        itemType: "seed",
        typeCuid: "jJMXMO7oNcwr6QbdXvOy",
        userCuid: "abcde"
      });
    }
  }
};
</script>

<style scoped>
.container {
  width: 30%;
}
</style>
