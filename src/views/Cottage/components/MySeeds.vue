<template>
  <v-container>
    <v-card>
      <v-card-text>
        <h3>My seeds {{ oop }}</h3>

        <ul v-if="finishedLoading">
          <li v-for="(seed, index) in mySeeds" :key="index">
            <v-chip
              large
              draggable
              @dragstart="pickupSeed($event, seed)"
              @emittedDrop="destroySeed(seedId)"
            >
              {{ seed.seedTypeName }}
            </v-chip>
          </li>
        </ul>

        <v-btn small @click="getSeed">Get some kinda seed</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "my-seeds",
  data() {
    return {
      mySeeds: [],
      herbTypes: [],
      oop: null,
      finishedLoading: false
    };
  },
  async created() {
    await db
      .collection("items")
      .where("itemType", "==", "seed")
      .where("userCuid", "==", "abcde")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let seed = doc.data();
          seed.id = doc.id;
          this.mySeeds.push(seed);
        });

        // db.collection("herbTypes")
        //   .get()
        //   .then(snapshot => {
        //     snapshot.forEach(doc => {
        //       let herbType = doc.data();
        //       herbType.id = doc.id;
        //       this.herbTypes.push(herbType);
        //       console.log(herbType);
        //     });

        //     this.mySeeds.forEach(seed => {
        //       const seedTypeName = this.herbTypes.find(herb => {
        //         return herb.id === seed.typeCuid;
        //       }).name;
        //       seed.seedTypeName = seedTypeName;
        //     });
        //   });
      });

    await db
      .collection("herbTypes")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let herbType = doc.data();
          herbType.id = doc.id;
          this.herbTypes.push(herbType);
        });
      });

    this.mySeeds.forEach(seed => {
      const seedTypeName = this.herbTypes.find(herb => {
        return herb.id === seed.typeCuid;
      }).name;
      seed.seedTypeName = seedTypeName;
    });

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
    },
    destroySeed(seedId) {
      // not doin it
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
