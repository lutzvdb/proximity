<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/overview">
          <ion-icon :icon="listOutline" />
          <ion-label>Device Overview</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab2" href="/pairing">
          <ion-icon :icon="unlinkOutline" />
          <ion-label>Pairing</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="tab3" href="/info">
          <ion-icon :icon="informationCircleOutline" />
          <ion-label>Info</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { listOutline, informationCircleOutline, unlinkOutline } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      listOutline,
      unlinkOutline,
      informationCircleOutline
    }
  }
}
</script>