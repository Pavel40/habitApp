import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Goal from '../components/Goal';
import Percentage from '../components/Percentage';
import Info from '../components/Info';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Habit Tracker</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Goal />
        <Percentage />
        <Info />
      </IonContent>
    </IonPage>
  );
};

export default Home;
