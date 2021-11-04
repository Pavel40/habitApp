import { useState, useEffect } from 'react';
import { IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Storage } from '@ionic/storage';
import './Percentage.css';

const store = new Storage();

const Percentage: React.FC = () => {
  const [percentage, setPercentage] = useState('%');
  const [successful, setSuccessful] = useState('');
  const [failed, setFailed] = useState('');

  async function countPercentage(store: Storage, addToSuccess = 0) {
    let successful = await store.get('success');
    let failed = await store.get('fail');
    if (!successful && !failed) {
      setPercentage('100 %');
      await store.set('success', 1);
      await store.set('fail', 0);
      successful = 1;
      failed = 0;
    } else {
      let newPercentage = successful / (successful + failed);
      newPercentage = Math.round(newPercentage * 100);
      setPercentage(`${newPercentage} %`);
      if (addToSuccess > 0) {
        await store.set('success', successful + addToSuccess);
      }
    }
    setSuccessful(successful);
    setFailed(failed);
  }

  useEffect(() => {
    (async () => {
      await store.create();

      let startTimeFromStore = await store.get('start');
      if (!startTimeFromStore) {
        const start = Date.now();
        await store.set('start', start);
        startTimeFromStore = start;
      }

      let streak = Date.now() - startTimeFromStore; // milliseconds
      streak = streak / 1000; // seconds
      streak = streak / 60; // minutes
      streak = streak / 60; // hours
      streak = streak / 24; // days

      let addToSuccess = 0;
      if (streak > 1) {
        addToSuccess = Math.round(streak);
        const start = Date.now();
        await store.set('start', start);
      }

      await countPercentage(store, addToSuccess);
    })();
  });

  async function oopsie() {
    await store.create();
    const fail = await store.get('fail');
    await store.set('fail', fail + 1);
    await countPercentage(store);
  }

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <h3>Success percentage:</h3>
            <p className="percentage">{percentage}</p>
          </IonCol>
          <IonCol>
            <h3>Stats:</h3>
            <p className="stats">
              Successful: {successful}<br />
              Failed: {failed}
            </p>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonButton color="danger" expand="block" className="ion-margin" onClick={oopsie}>
        Oopsie
      </IonButton>
    </>
  );
};

export default Percentage;
