<template>
<div class="container">
    <div id="mapContainer"></div>
  <div class="marshall--text mt-3">
  </div>

</div>
  
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  name: "LeafletMapp",
  props : ['user'],
  data() {
    return {
      map: null
    };
  },
  computed:{
      lon(){
          return this.user.userId.location.coordinates[0]
      },
      lat(){
          return this.user.userId.location.coordinates[1]
      },
      
  },
  mounted() {
    this.map = L.map("mapContainer").setView([ this.lon, this.lat], 6);
    L.marker([this.lon, this.lat],
//     {
//     icon: new L.DivIcon({
//         className: 'my-div-icon',
//         html:`<span style="color:teal; font-weight:bolder; font-size:2em">${'Me'}</span>`
//     })
// }
).addTo(this.map).bindPopup(this.user.userId.name);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
};
</script>

<style scoped>
#mapContainer {
  /* width: 500; */
  height: 50vh;
}

</style>