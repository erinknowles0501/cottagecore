<template>
  <v-container>
    <v-card>
      <v-card-text>
        <h3>My seeds</h3>

        <v-chip large draggable v-for="(seed, index) in mySeeds" :key="index">
          {{ seed.seedTypeName }}
        </v-chip>
        <v-chip disabled v-for="herbType in herbTypes">{{
          herbType.name
        }}</v-chip>
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
      herbTypes: []
    };
  },
  created() {
    db.collection("items")
      .where("itemType", "==", "seed")
      .where("userCuid", "==", "abcde")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let seed = doc.data();
          seed.id = doc.id;
          this.mySeeds.push(seed);
        });
      });

    db.collection("herbTypes")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let herbType = doc.data();
          herbType.id = doc.id;
          this.herbTypes.push(herbType);
        });
      });
  },
  updated() {
    if (this.mySeeds.length > 0 && this.herbTypes.length > 0) {
      this.mySeeds.forEach(seed => {
        const seedTypeName = this.herbTypes.find(herb => {
          return herb.id === seed.typeCuid;
        }).name;
        seed.seedTypeName = seedTypeName;
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
