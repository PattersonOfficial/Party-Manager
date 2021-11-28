import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
} from '@angular/fire/firestore';
import { Party } from '../party/party';
import { AuthenticationService } from './authentication.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor(
    private readonly auth: AuthenticationService,
    private readonly firestore: Firestore
  ) {}

  createParty(party: Partial<Party>) {
    const userID = this.auth.getUser().uid;
    const partyCollection = collection(this.firestore, `users/${userID}/party`);
    return addDoc(partyCollection, party);
  }

  getPartyList() {
    return this.auth.getUser$().pipe(
      map((user) => collection(this.firestore, `users/${user?.uid}/party`)),
      switchMap((partyCollection) =>
        collectionData(partyCollection, { idField: 'id' })
      )
    );
  }

  getPartyDetails(partyID: string) {
    return this.auth.getUser$().pipe(
      map((user) => doc(this.firestore, `users/${user?.uid}/party/${partyID}`)),
      switchMap((partyDocument) => docData(partyDocument))
    );
  }
}
