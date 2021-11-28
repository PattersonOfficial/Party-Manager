import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PartyService } from 'src/app/services/party.service';
@Component({
  selector: 'app-detail-party',
  templateUrl: './detail-party.component.html',
  styleUrls: ['./detail-party.component.scss'],
})
export class DetailPartyComponent implements OnInit {
  currentParty: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly partyService: PartyService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,
  ) {
    const partyID = this.activatedRoute.snapshot.paramMap.get('partyID');
    this.initializeParty(partyID);
  }

  ngOnInit() {
  }

  initializeParty(partyID: string) {
    this.partyService.getPartyDetails(partyID).subscribe((party) => {
      this.currentParty = party;
      if (this.currentParty) {
        this.currentParty.id = partyID;
      }
    });
  }

  async addTicketOperation(type: string) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      mode: 'ios',
    });
    loading.present();
    try {
      await this.partyService.addTicketOperation(
        this.currentParty.id,
        this.currentParty.ticketPrice,
        type
      );
      loading.dismiss();
    } catch (error) {
      console.log(error);
      loading.dismiss();
    }
  }

  async removeParty() {
     const loading = await this.loadingCtrl.create({
       message: 'Deleting Event',
       mode: 'ios',
     });
     loading.present();
    try {
      await this.partyService.deleteParty(this.currentParty.id);
      loading.dismiss();
      this.router.navigateByUrl('party');
    } catch (error) {
      console.log(error);
      loading.dismiss();
    }
  }

  async removePartyAlert() {
    const alert = await this.alertCtrl.create({
      message: `Are you sure you want to delete ${this.currentParty.name}?`,
      mode: 'ios',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.removeParty();
          }
        }
      ]
    });
    alert.present();
 }

}
