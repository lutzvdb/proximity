<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Pairing</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <a @click="test()">Paired device</a>
          </ion-card-title>
        </ion-card-header>
        <ion-card-content v-if="!isPaired">
          No device has been paired yet. Go to "Device Overview" tab to pair.
        </ion-card-content>
        <ion-card-content v-if="isPaired">
          <h2>Name: {{ pairedDevice.name }}</h2>
          <h3>UUID: {{ pairedDevice.id }}</h3>
          <h3>RSSI: {{ pairedDevice.rssi }}</h3>
          <h4>Next refresh in: {{ timeLeft }}</h4>
          <ion-button color="secondary" @click="showInfo()">Show full device info</ion-button> 
          <ion-button color="danger" @click="unpair()">Unpair</ion-button> 
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
        IonCard, IonCardContent, IonCardTitle, IonCardHeader,
        IonButton } from '@ionic/vue';
import { Plugins } from '@capacitor/core';
import { BLE } from '@ionic-native/ble';
import { NativeAudio } from '@ionic-native/native-audio';

const { Storage } = Plugins;

export default  {
  name: 'Pairing', 
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
          IonCard, IonCardContent, IonCardTitle, IonCardHeader, 
          IonButton },
  data() {
      return {
          myBLE: new BLE,
          nativeAudio: new NativeAudio,
          thresh: 50,
          previousRSSI: 999,
          pairedDevice: {},
          refreshTimer: null,
          refreshPeriod: 1,
          refreshPeriodConsumed: 0
      }
  },
  mounted() {
    nativeAudio.preloadSimple('ping', '/ping.mp3');
  },
  computed: {
    timeLeft() {
      return this.refreshPeriod - this.refreshPeriodConsumed
    },
    isPaired() {
      if(this.pairedDevice.id) {
        return(true) 
       } else { 
        return(false) 
      }
    }
  },
  ionViewDidEnter() {
    Storage.get( { key: 'pairedDevice' } ).then(device => {
      device = JSON.parse(device.value);
      if(!device || device.length == 0) {
          this.pairedDevice = {};
          return;
      }
      
      if(!this.refreshTimer) this.startTimer();
      this.pairedDevice = device;
    });
  },
    methods: {
        showInfo() {
          alert(JSON.stringify(this.pairedDevice));
        },
        unpair() {
          clearInterval(this.refreshTimer);
          this.refreshTimer = null;
          this.pairedDevice = {};
          Storage.set( { key: 'pairedDevice', value: '' } );
        },
        refreshRSSI() {
            console.log('Refreshing RSSI...');
            
            this.myBLE.scan([], 10).subscribe(
              device => { this.onRSSIread(device) }, 
              error => { this.onRSSIreadError(error) }
            );
        },
        onRSSIread(device) {  
          if(!(device.id == this.pairedDevice.id)) return;
          this.pairedDevice = device;
          if(device.rssi <= this.thresh & this.previousRSSI > this.thresh) {
            // just got lower than thresh this scan
            this.nativeAudio.play('ping');
          }
          this.previousRSSI = device.rssi;
        },
        test() {
          this.nativeAudio.play('ping');
        },
        onRSSIreadError(err) {
          alert(err);
          console.log('Device RSSI scan error: ' + err);
        },
        startTimer() {            
            this.refreshTimer = setInterval( () => {
                this.refreshPeriodConsumed += 1;
                if(this.timeLeft == -1) {
                    this.refreshPeriodConsumed = 0;
                    this.refreshRSSI()
                }
            }, 1000);
        }
    }
}
</script>