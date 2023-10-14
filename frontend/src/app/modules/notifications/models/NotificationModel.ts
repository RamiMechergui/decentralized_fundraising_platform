export interface Notification {
  // Define the type of your notification object
  // Example properties:
  
_id: string,
notifId: string,
senderId: string,
receiptId: string,
notifTitle: string,
notifPayload: string,
notifState: number,
notifType: string,
isDeleted:number,
shown:number,
titleAlert:string,
}
  