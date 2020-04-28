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
              @emittedDrop="destroySeed(seed.seedId)"
            >
              {{ seed.seedTypeName }}
            </v-chip>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
// import db from "@/firebase/init";
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
      // not doin it
      // TODO: destroy from db.items with mutation.
      this.mySeeds = this.mySeeds.filter(seed => {
        seed.id !== seedId;
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
