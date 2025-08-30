import { 
  IonButton,
    IonButtons,
      IonContent, 
      IonHeader, 
      IonIcon, 
      IonLabel, 
      IonMenuButton, 
      IonPage, 
      IonRouterOutlet, 
      IonTabBar, 
      IonTabButton, 
      IonTabs, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { bookOutline, person, search, star } from 'ionicons/icons';
import { Route, Redirect } from 'react-router';
import Favorites from './home-tabs/Favorites';
import Feed from './home-tabs/Feed';
import About_me from './home-tabs/About_me';
import SignUp from './Register';
  const Home: React.FC = () => {

    const tabs = [
      {name:'Feed', tab:'feed',url: '/MARBF-Cooperative01/app/home/feed', icon: bookOutline},
      {name:'Favorites',tab:'favorites', url: '/MARBF-Cooperative01/app/home/favorites', icon: star},
      {name:'About me',tab:'About Me', url: '/MARBF-Cooperative01/app/home/about_me', icon: person},
    ]
    
    return (
      <IonReactRouter>
        <IonTabs>
          <IonTabBar slot="bottom">

            {tabs.map((item, index) => (
              <IonTabButton key={index} tab={item.tab} href={item.url}>
                <IonIcon icon={item.icon} />
                <IonLabel>{item.name}</IonLabel>
              </IonTabButton>
            ))}
            
          </IonTabBar>
        <IonRouterOutlet>

          <Route exact path="/MARBF-Cooperative01/app/home/feed" render={Feed} />
          <Route exact path="/MARBF-Cooperative01/app/home/SignUp" component={SignUp} />
          <Route exact path="/MARBF-Cooperative01/app/home/favorites" render={Favorites} />
          <Route exact path="/MARBF-Cooperative01/app/home/About_me" render={About_me} />
          

          <Route exact path="/MARBF-Cooperative01/app/home">
            <Redirect to="/MARBF-Cooperative01/app/home/feed" />
          </Route>

        </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
    );
  };
  
  export default Home;
