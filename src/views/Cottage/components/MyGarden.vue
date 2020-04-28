<template>
  <v-container class="garden-grid">
    <v-card
      v-for="plot in plots"
      :key="plot.number"
      @dragover.prevent
      @drop.prevent="dropSeed($event, plot)"
    >
      <!-- v-if this plot has data, display that seed -->
      <!-- <p v-if="isLoaded && plots.find(plot => plot.number === index)"> -->
      <!-- this didn't work because 'plot' in this case doesn't refer to (plot in this.plots),
		  it refers to (n in 25) and doesn't have any of that data! Omg what a pain it was 
		  to not remember that. -->
      <!-- TODO TODO TODO: have this be (plot in this.plots). After promises resolve and you have the data, 
		  create local this.plots with the rest of the numbers. -->
      <p v-if="isLoaded && plot.growing">
        {{ plot.growing.name }}
      </p>
      <p v-else>plot {{ plot.number }}</p>
    </v-card>
  </v-container>
</template>

<script>
// what if instead of [0,1,2,3.....25] we had...
/* [
 * [0,1,2,3,4],
 * [5,6,7,8,9],
 * [10,11,12,13,14]
 * etc etc. So an array with five arrays with five plots each. THEN....might make it easier to navigate with arrow keys...
 * ...or like whatever. If you're on [16] and you press up, you're on [16-5]. If you press down, [16+5].
 * */
import db from "@/firebase/init";
import {
  gardenStore as store,
  getGardenData as getData,
  gardenMutations as mutations,
  gardenActions as actions
} from "@/store/gardenStore";

export default {
  name: "my-garden",
  data() {
    return {
      plots: [],
      mySeeds: [],
      isLoaded: false
    };
  },
  async created() {
    await getData();
    // TODO: need to watch store to update local copies.
    this.mySeeds = store.mySeeds;
    this.plots = store.plots;

    this.isLoaded = true;
  },
  methods: {
    dropSeed(e, plot) {
      const seedData = JSON.parse(e.dataTransfer.getData("seedData"));

      // only plant seed in empty plot
      if (!plot.contains) {
        // update db
        mutations.mutatePlots("create", plot.number, seedData.typeCuid);

        // update store with plot.contains
        store.plots = store.plots.map(mapPlot => {
          if (mapPlot.number === plot.number) {
            plot.contains = seedData.typeCuid;
          }
          return mapPlot;
        });

        // update store with growing info
        actions.getGrowingData(plot);

        // update local with data from store
        // (must splice and replace because of specific array updating thing with v-for)
        // this.plots[plot.number] = store.plots[plot.number];
        this.plots.splice(plot.number, 1, store.plots[plot.number]);
      }

      // db.collection("gardens")
      //   .doc("u2fAtwrhZnGGHp8GYkLT")
      //   .collection("plots")
      //   .doc(plotNumber + "")
      //   .set({
      //     number: plotNumber,
      //     contains: seedData.typeCuid
      //   })
      //   .then(function() {
      //     console.log("Document successfully written!");
      //   })
      //   .catch(function(error) {
      //     console.error("Error writing document: ", error);
      //   });

      // if a plot (defined in the db or not) is overwritten (ie if something is dragged onto it), update the object instead of creating a new one...?
      // or just destroy the original since we're pulling this.plots

      //  mutations.updatePlots();
    }
  }
};
</script>

<style scoped>
.garden-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  width: 50vw;
  height: 50vw;
}

.garden-grid .v-card {
  display: block;
  padding: 1em;
  margin: 2px;
  font-size: 0.8em;
}

.garden-grid .v-card:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
