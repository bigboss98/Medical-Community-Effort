import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';


@Component({
  selector: 'newStucture',
  templateUrl: 'newStructure.component.html',
  styleUrls: ['newStructure.component.scss']
})
export class NewStructureComponent {
  name: string = "";
  city: string = "";
  region: string = "";
  phone_number: string = "";
  advertiser: boolean = false;

  constructor(private modalCtrl: ModalController,
              private toastCtrl: ToastController) {

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm():Promise<void | boolean> {
    console.log(this)
    if (this.name === '' && this.city === '' && this.region === '' && this.phone_number === '') {
      const toast = await this.toastCtrl.create({
        message: 'I campi non possono essere vuoti!',
        duration: 1500,
        position: 'bottom',
        color: 'danger'
      });

      await toast.present();
      return ;
    }
    if (isNaN(Number(this.phone_number))) {
      const toast = await this.toastCtrl.create({
        message: 'Il numero di telefono deve contenere soltanto numeri!',
        duration: 1500,
        position: 'bottom',
        color: 'danger'
      });

      await toast.present();
      return ;
    }
    return this.modalCtrl.dismiss({name: this.name, city: this.city, region: this.region, phone_number: this.phone_number, advertiser: this.advertiser}, 'confirm');
  }

  chooseAdvertising(event:any) {
    if (event.target.value === 'advertised') this.advertiser = true;
    else this.advertiser = false;
    console.log(this.advertiser);
  }

}