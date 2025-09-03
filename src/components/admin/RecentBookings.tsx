import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonBadge, IonButton } from "@ionic/react";

interface Booking {
  id: number;
  farmer: string;
  equipment: string;
  date: string;
  status: string;
}

interface RecentBookingsProps {
  bookings: Booking[];
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings }) => (
  <IonCard className="mt-6 shadow-lg rounded-2xl">
    <IonCardHeader>
      <IonCardTitle>Recent Bookings</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <IonList>
        {bookings.map((booking) => (
          <IonItem key={booking.id}>
            <IonLabel>
              <h2 className="font-semibold">{booking.farmer}</h2>
              <p>{booking.equipment} • {booking.date}</p>
            </IonLabel>
            <IonBadge color={booking.status === "Pending" ? "warning" : "success"}>
              {booking.status}
            </IonBadge>
          </IonItem>
        ))}
      </IonList>
      <div className="flex justify-end mt-4">
        <IonButton routerLink="/bookings" color="primary">View All</IonButton>
      </div>
    </IonCardContent>
  </IonCard>
);

export default RecentBookings;
