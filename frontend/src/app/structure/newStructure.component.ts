import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'newStucture',
  templateUrl: 'newStructure.component.html',
  styleUrls: ['newStructure.component.scss']
})
export class NewStructureComponent {
  name: string;
  city: string;
  region: string;
  phone_number: string;
  advertiser: boolean;

  constructor(private modalCtrl: ModalController) {

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    console.log(this);
    return this.modalCtrl.dismiss({name: this.name, city: this.city, region: this.region, phone_number: this.phone_number, advertiser: this.advertiser}, 'confirm');
  }

  chooseAdvertising(event:any) {
    if (event.target.value === 'advertised') this.advertiser = true;
    else this.advertiser = false;
    console.log(this.advertiser);
  }

}