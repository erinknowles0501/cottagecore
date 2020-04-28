<template>
  <div>
    <pre>{{ plots }}</pre>
  </div>
</template>

<script>
import {
  gardenStore as store,
  getGardenData as getData,
  gardenMutations as mutations
} from "@/store/gardenStore";

export default {
  data() {
    return {
      mySeeds: [],
      plots: []
    };
  },
  async created() {
    await getData();
    this.mySeeds = store.mySeeds;
    this.plots = store.plots;
  }
};
</script>
