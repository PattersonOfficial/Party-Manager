import { PartyService } from './../../services/party.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Party } from '../party';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.scss'],
})
export class CreatePartyComponent implements OnInit {
  name: string;
  ticketPrice: number;
  cost: number;
  date: any;

  constructor(
    private readonly router: Router,
    private readonly partyService: PartyService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async createEvent(party: Partial<Party>): Promise<void> {
    const loading = await this.loadingCtrl.create({
      message: 'Loading, please wait...',
      mode: 'ios',
    });
    loading.present();

    party.revenue = 0;
    await this.partyService.createParty(party);
    console.log(party);
    await this.router.navigateByUrl('/party').then(() => loading.dismiss());
  }

  isValidForm(): boolean {
    return this.name && this.ticketPrice && this.cost && this.date;
  }
}
