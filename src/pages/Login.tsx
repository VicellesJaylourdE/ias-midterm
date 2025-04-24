import {
  IonAlert,
  IonButton,
  IonCard,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonToast,
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => (
  <IonAlert
    isOpen={isOpen}
    onDidDismiss={onClose}
    header="Notification"
    message={message}
    buttons={['OK']}
  />
);

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true);
    setTimeout(() => {
      navigation.push('ias-midterm/app', 'forward', 'replace');
    }, 300);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '10%' }}>
          <IonCard style={{ padding: '24px', borderRadius: '20px' }}>
            <h1 style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '10px' }}>
              Let's<br />Start Learning
            </h1>
            <p style={{ textAlign: 'left', color: '#666', marginBottom: '20px' }}>
              Please login or sign up to continue
            </p>

            <IonInput
              placeholder="Your Email"
              type="email"
              fill="outline"
              style={{
                borderRadius: '12px',
                marginBottom: '15px',
                '--highlight-color-focused': '#007BFF',
                '--border-color': '#007BFF'
              }}
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />

            <IonInput
              placeholder="Your Password"
              type="password"
              fill="outline"
              style={{
                borderRadius: '12px',
                marginBottom: '15px',
                '--highlight-color-focused': '#007BFF',
                '--border-color': '#007BFF'
              }}
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end" />
            </IonInput>

            <IonButton
              onClick={doLogin}
              expand="full"
              shape="round"
              style={{
         
                color: '#fff',
          
              }}
            >
              Login
            </IonButton>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
              Already Have An Account? <a href="/ias-midterm/app/home/signup">SignUp</a>
            </p>
          </IonCard>
        </div>

        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
