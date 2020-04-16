<template>
  <GmapMap
    v-if="profile && profile.geolocation"
    class="map"
    :center="{ lat: profile.geolocation.lat, lng: profile.geolocation.lng }"
    :zoom="12"
    :options="{
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      disableDefaultUi: false,
    }"
    map-type-id="terrain"
  >
    <GmapMarker
      v-for="(userProfile, index) in profiles"
      :key="index"
      :position="userProfile.geolocation"
      :draggable="true"
      @click="toggleInfoWindow(userProfile, index)"
    >
    </GmapMarker>
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowCoordinates"
      :opened="isInfoWindowOpen"
      @closeclick="isInfoWindowOpen = false"
    >
    </gmap-info-window>
  </GmapMap>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'google-map',
  data() {
    return {
      coordinates: {
        lat: 10,
        lng: 10,
      },
      infoWindowCoordinates: null,
      isInfoWindowOpen: false,
      currentMarkerIndexOpen: null,
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  mounted() {
    this.setCoordinates();
    this.setMarkers();
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('profile', ['profiles', 'profile']),
  },
  methods: {
    toggleInfoWindow(profile, index) {
      this.infoWindowCoordinates = profile.geolocation;
      this.infoOptions.content = profile.slug;

      if (this.currentMarkerIndexOpen === index) {
        this.isInfoWindowOpen = !this.isInfoWindowOpen;
        return;
      }

      this.isInfoWindowOpen = true;
      this.currentMarkerIndexOpen = index;
    },
    setMarkers() {
      this.$store.dispatch('profile/getProfiles');
    },
    setCoordinates() {
      if (!navigator.geolocation) {
        return;
      }

      navigator.geolocation.getCurrentPosition(position => {
        const coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.$store.dispatch('profile/updateProfile', {
          uid: this.user.uid,
          profileData: {
            geolocation: coordinates,
          },
        });
      });
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
