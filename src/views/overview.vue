<template>
  <ion-page>
      <ion-toast
        message="Pull to update device list!"
        position="middle"
        color="light"
        :duration="2000"
        :is-open="true"
      >
    </ion-toast>
    <ion-header>
      <ion-toolbar>
        <ion-title>Device Overview</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="startScan($event)" id="refresher">
        <ion-refresher-content>
        </ion-refresher-content>
      </ion-refresher>
      <ion-list>
        <ion-item v-for="device in deviceList" :key="device.id">
          <ion-label>
            <h2>Name: 
              <a v-if="!device.name & !device.connecting" @click="connect(device.id)">Find out name</a>
              <span v-if="device.connecting">
                  <ion-progress-bar type="indeterminate"></ion-progress-bar>
              </span>
              {{ device.name }}
            </h2>
            <h3>RSSI: {{ device.rssi }}db</h3>
            <h4>UUID: {{ device.id }}</h4>
            <ion-button color="primary" @click="pair(device)">Pair</ion-button>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
  IonButton, IonProgressBar
  , IonRefresher, IonRefresherContent,
  IonToast } from '@ionic/vue';
import { defineComponent } from 'vue';
import { BLE } from '@ionic-native/ble';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

export default defineComponent({
  name: 'overview',
  components: { IonPage, IonHeader, 
         IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel,
         IonButton, IonProgressBar, IonRefresher, IonRefresherContent,
         IonToast },
  data() {
    return {
      myBLE: new BLE,
      //deviceList: []
      deviceList: [ 
        { id: 1234, name: 'Test1', connecting: false },
        { id: 2, name: 'Te', connecting: false }
      ]
    }
  },
  ionViewDidEnter() {
    // 1 scan to initialize BT
    //this.startScan();
    Storage.set('pairedDevice', {});
  },
  methods: {
    pair(device) {
      Storage.set( { key: 'pairedDevice', value: JSON.stringify(device) } ).then( () => {
        this.$router.push('/pairing');
      });
    },
    connect(uuid) {
      this.myBLE.connect(uuid).subscribe(
        obj => this.onDeviceConnected(obj),
        err => this.onDeviceConnectError(err)
      );
      this.deviceList.map( (device) => { if(device.id == uuid) device.connecting = true })
      setTimeout(this.onDeviceConnectTimeout, 5000, uuid);
    },
    onDeviceConnected(connectedDevice) {  
      this.deviceList.map(function(device) {
        if(device.id == connectedDevice.id) {
          device = connectedDevice;
          device.connecting = false;
        }
        return(device)
      })
    },
    onDeviceConnectTimeout(uuid) {
      this.deviceList.map(function(device) {
        if(device.id == uuid & device.connecting == true) {
          device.name = 'Unknown';
          device.connecting = false;
        }
        return(device)
      })
    },
    onDeviceConnectError(err) {
      console.log('Device connection error: ' + err);
    },
    startScan() {
      this.deviceList = [];
      this.myBLE.scan([], 10).subscribe(
          device => { this.onDeviceDiscovered(device) }, 
          error => { this.scanError(error) }
        );
      setTimeout( () => {
        const refresher = document.getElementById('refresher');
        refresher.complete();
      }, 10000);
      console.log('Scanning...')
    },
    onDeviceDiscovered(device) {
      let alreadyPresent = false;
      this.deviceList.map( (deviceInList) => { if(device.id == deviceInList.id) alreadyPresent = true })
      if(alreadyPresent) {
        console.log('Duplicate UUID returned: ' + device.id);
        return;
      }
      device.connecting = false;
      this.deviceList.push(device);
      this.deviceList.sort( (a, b) => b.rssi - a.rssi);
    },
    scanError(error) {
      alert('Scanning error: ' + error);
    }
  }
})
</script>