import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  runTransaction,
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

  async addTicketOperation(partyID: string, ticketCost: number, type: string) {
    try {
      const userID = this.auth.getUser().uid;
      const partyDocRef = doc(
        this.firestore,
        `users/${userID}/party/${partyID}`
      );
      await runTransaction(this.firestore, async (transaction) => {
        const partyDoc = await transaction.get(partyDocRef);
        const newRevenue =
          type === 'add'
            ? partyDoc.data().revenue + ticketCost
            : partyDoc.data().revenue - ticketCost;
        transaction.update(partyDocRef, { revenue: newRevenue });
      });
    } catch (error) {
      console.log('Transaction failed: ', error);
      throw error;
    }
  }

  deleteParty(partyID: string) {
    const userID = this.auth.getUser().uid;
    const partyDocRef = doc(this.firestore, `users/${userID}/party/${partyID}`);
    return deleteDoc(partyDocRef);
  }
}
