import { 
    IonBackButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
  
  const Details: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot='start'>
                <IonBackButton defaultHref='/MARBF-Cooperative01/app/home'></IonBackButton>
            </IonButtons>
            <IonTitle>Home Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Details;