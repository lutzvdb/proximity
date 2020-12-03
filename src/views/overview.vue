<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Device Overview</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Lutz test</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="takePhoto()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery } from '@/composables/camera';

export default  {
  name: 'overview',
  components: { IonPage, IonHeader, IonFab, IonFabButton, IonIcon, 
         IonToolbar, IonTitle, IonContent },
  setup() {
    const { takePhoto } = usePhotoGallery();

    return {
      takePhoto,
      camera, trash, close
    }
  }
}
</script>