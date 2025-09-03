import React from "react";
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from "@ionic/react";

interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => (
  <IonCard className="shadow-lg rounded-2xl">
    <IonCardHeader>
      <IonCardTitle className={`text-lg font-semibold text-${color || "blue"}-600`}>
        {title}
      </IonCardTitle>
    </IonCardHeader>
    <IonCardContent className="text-2xl font-bold">{value}</IonCardContent>
  </IonCard>
);

export default StatCard;
