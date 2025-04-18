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
import Search from './home-tabs/Search';
import About_me from './home-tabs/About_me';
import SignUp from './SignUp';
  const Home: React.FC = () => {

    const tabs = [
      {name:'Feed', tab:'feed',url: '/ias-midterm/app/home/feed', icon: bookOutline},
      {name:'Search', tab:'search', url: '/ias-midterm/app/home/search', icon: search},
      {name:'Favorites',tab:'favorites', url: '/ias-midterm/app/home/favorites', icon: star},
      {name:'About me',tab:'About Me', url: '/ias-midterm/app/home/about_me', icon: person},
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

          <Route exact path="/ias-midterm/app/home/feed" render={Feed} />
          <Route exact path="/ias-midterm/app/home/SignUp" component={SignUp} />
          <Route exact path="/ias-midterm/app/home/search" render={Search} />
          <Route exact path="/ias-midterm/app/home/favorites" render={Favorites} />
          <Route exact path="/ias-midterm/app/home/About_me" render={About_me} />
          

          <Route exact path="/ias-midterm/app/home">
            <Redirect to="/ias-midterm/app/home/feed" />
          </Route>

        </IonRouterOutlet>
        </IonTabs>
      </IonReactRouter>
    );
  };
  
  export default Home;
