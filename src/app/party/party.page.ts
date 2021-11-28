import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PartyService } from '../services/party.service';
import { Party } from './party';
@Component({
  selector: 'app-party',
  templateUrl: './party.page.html',
  styleUrls: ['./party.page.scss'],
})
export class PartyPage implements OnInit {
  readonly partyList = this.partyService.getPartyList();

  constructor(
    private partyService: PartyService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}
}
