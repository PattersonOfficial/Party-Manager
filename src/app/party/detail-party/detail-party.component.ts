import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private readonly partyService: PartyService
  ) {
    const partyID = this.activatedRoute.snapshot.paramMap.get('partyID');

    console.log(`Found ${partyID}`);

    this.initializeParty(partyID);
  }

  ngOnInit() {}

  initializeParty(partyID: string) {
    this.partyService.getPartyDetails(partyID).subscribe((party) => {
      this.currentParty = party;
      if (this.currentParty) {
        this.currentParty.id = partyID;
      }

      console.log({ PartyDetails: this.currentParty });
    });
  }
}
