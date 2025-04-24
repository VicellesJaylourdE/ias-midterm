import React, { useState } from 'react';
import {
    IonButton,
    IonContent,
    IonInput,
    IonInputPasswordToggle,
    IonPage,
    IonTitle,
    IonModal,
    IonText,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonAlert,
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => (
    <IonAlert
        isOpen={isOpen}
        onDidDismiss={onClose}
        header="Notification"
        message={message}
        buttons={['OK']}
    />
);

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleOpenVerificationModal = () => {
        if (!email.endsWith("@nbsc.edu.ph")) {
            setAlertMessage("Only @nbsc.edu.ph emails are allowed to register.");
            setShowAlert(true);
            return;
        }

        if (password !== confirmPassword) {
            setAlertMessage("Passwords do not match.");
            setShowAlert(true);
            return;
        }

        setShowVerificationModal(true);
    };

    const doRegister = async () => {
        setShowVerificationModal(false);
        try {
            const { data, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                throw new Error("Account creation failed: " + error.message);
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const { error: insertError } = await supabase.from("users").insert([{
                username,
                user_email: email,
                user_firstname: firstName,
                user_lastname: lastName,
                user_password: hashedPassword,
            }]);

            if (insertError) {
                throw new Error("Failed to save user data: " + insertError.message);
            }

            setShowSuccessModal(true);
        } catch (err) {
            if (err instanceof Error) {
                setAlertMessage(err.message);
            } else {
                setAlertMessage("An unknown error occurred.");
            }
            setShowAlert(true);
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding" fullscreen>
                <div style={{ maxWidth: '400px', margin: 'auto', marginTop: '5%' }}>
                    <IonCard style={{ padding: '24px', borderRadius: '20px' }}>
                        <h1 style={{ fontWeight: 'bold', textAlign: 'left', marginBottom: '10px' }}>
                            Let's<br />Create Your Account
                        </h1>
                        <p style={{ textAlign: 'left', color: '#666', marginBottom: '20px' }}>
                            Fill in the details below to register
                        </p>

                        <IonInput
                            label="Username"
                            labelPlacement="stacked"
                            fill="outline"
                            type="text"
                            placeholder="Enter a unique username"
                            value={username}
                            onIonChange={e => setUsername(e.detail.value!)}
                            style={{
                                marginTop: '15px',
                                '--highlight-color-focused': '#007BFF',
                                '--border-color': '#007BFF'
                            }}
                        />
                        <IonInput
                            label="First Name"
                            labelPlacement="stacked"
                            fill="outline"
                            type="text"
                            placeholder="Enter your first name"
                            value={firstName}
                            onIonChange={e => setFirstName(e.detail.value!)}
                            style={{
                                marginTop: '15px',
                                '--highlight-color-focused': '#007BFF',
                                '--border-color': '#007BFF'
                            }}
                        />
                        <IonInput
                            label="Last Name"
                            labelPlacement="stacked"
                            fill="outline"
                            type="text"
                            placeholder="Enter your last name"
                            value={lastName}
                            onIonChange={e => setLastName(e.detail.value!)}
                            style={{
                                marginTop: '15px',
                                '--highlight-color-focused': '#007BFF',
                                '--border-color': '#007BFF'
                            }}
                        />
                        <IonInput
                            label="Email"
                            labelPlacement="stacked"
                            fill="outline"
                            type="email"
                            placeholder="youremail@nbsc.edu.ph"
                            value={email}
                            onIonChange={e => setEmail(e.detail.value!)}
                            style={{
                                marginTop: '15px',
                                '--highlight-color-focused': '#007BFF',
                                '--border-color': '#007BFF'
                            }}
                        />
                        <IonInput
                            label="Password"
                            labelPlacement="stacked"
                            fill="outline"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onIonChange={e => setPassword(e.detail.value!)}
                            style={{
                                marginTop: '15px',
                                '--highlight-color-focused': '#007BFF',
                                '--border-color': '#007BFF'
                            }}
                        >
                            <IonInputPasswordToggle slot="end" />
                        </IonInput>
                        <IonInput
                            label="Confirm Password"
                            labelPlacement="stacked"
                            fill="outline"
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onIonChange={e => setConfirmPassword(e.detail.value!)}
                            style={{
                                marginTop: '15px',
                                '--highlight-color-focused': '#007BFF',
                                '--border-color': '#007BFF'
                            }}
                        >
                            <IonInputPasswordToggle slot="end" />
                        </IonInput>

                        <IonButton
                            onClick={handleOpenVerificationModal}
                            expand="full"
                            shape="round"
                            style={{
                                marginTop: '15px',
                                
                                color: '#fff',
                        
                            }}
                        >
                            Register
                        </IonButton>
                        <IonButton
                            routerLink="/ias-midterm"
                            expand="full"
                            fill="clear"
                            shape="round"
                            style={{
                                marginTop: '15px',
                                color: '#007BFF',
                            
                            }}
                        >
                            Already have an account?
                        </IonButton>
                    </IonCard>
                </div>

                {/* Verification Modal */}
                <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
                    <IonContent className="ion-padding">
                        <IonCard className="ion-padding" style={{ marginTop: '25%' }}>
                            <IonCardHeader>
                                <IonCardTitle>User Registration Details</IonCardTitle>
                                <hr />
                                <IonCardSubtitle>Username</IonCardSubtitle>
                                <IonCardTitle>{username}</IonCardTitle>

                                <IonCardSubtitle>Email</IonCardSubtitle>
                                <IonCardTitle>{email}</IonCardTitle>

                                <IonCardSubtitle>Name</IonCardSubtitle>
                                <IonCardTitle>{firstName} {lastName}</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent></IonCardContent>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5px' }}>
                                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                                <IonButton color="primary" onClick={doRegister}>Confirm</IonButton>
                            </div>
                        </IonCard>
                    </IonContent>
                </IonModal>

                {/* Success Modal */}
                <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
                    <IonContent className="ion-padding" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center', marginTop: '35%' }}>
                        <IonTitle style={{ marginTop: '35%' }}>Registration Successful 🎉</IonTitle>
                        <IonText>
                            <p>Your account has been created successfully.</p>
                            <p>Please check your email address.</p>
                        </IonText>
                        <IonButton routerLink="/ias-midterm" routerDirection="back" color="primary">
                            Go to Login
                        </IonButton>
                    </IonContent>
                </IonModal>

                <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
            </IonContent>
        </IonPage>
    );
};

export default SignUp;
