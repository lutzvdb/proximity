<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Information</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            About this app
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>
            This app shows a list of all bluetooth devices in proximity. RSSI (signal strength), which can be interpreted as a measure of distance,
            is also reported. You can pair with one device, which will scan for this devices RSSI in particular and refresh it 
            frequently.
          </p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
        IonCard, IonCardContent, IonCardTitle, IonCardHeader } from '@ionic/vue';

export default  {
  name: 'Information', 
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
          IonCard, IonCardContent, IonCardTitle, IonCardHeader },
  setup() {
    return {  }
  }
}
</script>