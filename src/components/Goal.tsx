import { useState, useEffect } from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonTextarea } from '@ionic/react';
import { Storage } from '@ionic/storage';

let goalText = '';
function setGoalText(text: string) {
  goalText = text;
}

const store = new Storage();

const Goal: React.FC = () => {
  const [goal, setGoal] = useState(goalText);
  const [showGoalInput, setShowGoalInput] = useState(false);
  
  useEffect(() => {
    (async () => {
      await store.create();
      
      const goalFromStore = await store.get('goal');
      if (goalFromStore) {
        goalText = goalFromStore;
        setGoal(goalFromStore);
      }
    })();
  });

  async function confirmGoal() {
    setGoal(goalText);
    setShowGoalInput(false);
    await store.set('goal', goalText);
  }

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Your Goal:</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>{goal != '' ? goal : 'Not set yet.'}</IonCardContent>
      </IonCard>
      <IonButton color="primary" expand="block" className="ion-margin" onClick={() => setShowGoalInput(!showGoalInput)}>
        Set Goal
      </IonButton>
      {showGoalInput && (
        <>
          <IonTextarea
            className="ion-margin"
            onIonChange={(e) => setGoalText(e.detail.value!)}
            rows={6}
            value={goalText}
            placeholder="Enter your goal."
          ></IonTextarea>
          <IonButton color="success" expand="block" className="ion-margin" onClick={confirmGoal}>
            Confirm
          </IonButton>
        </>
      )}
    </>
  );
};

export default Goal;
