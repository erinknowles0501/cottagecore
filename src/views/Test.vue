<template>
  <div>
    <pre>{{ helloWorld }}</pre>
    <v-btn @click="updateMsg">Update</v-btn>
  </div>
</template>

<script>
import {
  gardenStore as store,
  getGardenData as getData,
  gardenMutations as mutations,
  gardenActions as actions
} from "@/store/gardenStore";

export default {
  data() {
    return {
      mySeeds: [],
      plots: [],
      helloWorld: ""
    };
  },
  async created() {
    await getData();
    this.mySeeds = store.mySeeds;
    this.plots = store.plots;
    this.helloWorld = store.helloWorld;
  },
  methods: {
    updateMsg() {
      actions.updateMsg();
      this.helloWorld = store.helloWorld;
    }
  }
};
</script>
