import { useState, useEffect } from 'react';
import { IonButton } from '@ionic/react';
import { Storage } from '@ionic/storage';
import './Percentage.css';

const store = new Storage();

const Percentage: React.FC = () => {
  const [percentage, setPercentage] = useState('%');

  async function countPercentage(store: Storage, addToSuccess = 0) {
    const successful = await store.get('success');
    const failed = await store.get('fail');
    console.log(successful, failed);
    if (!successful && !failed) {
      setPercentage('100 %');
      await store.set('success', 1); // I set both to 1, because 0 would lead to zero division error
      await store.set('fail', 0);
    } else {
      let newPercentage = successful / (successful + failed);
      newPercentage = Math.round(newPercentage * 100);
      setPercentage(`${newPercentage} %`);
      console.log(successful);
      console.log(failed);
      if (addToSuccess > 0) {
        await store.set('success', successful + addToSuccess);
      }
    }
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

      let streakFromStore = await store.get('streak');
      if (!streakFromStore) {
        await store.set('streak', streak);
        streakFromStore = streak;
      }

      let addToSuccess = 0;
      if (streak > 1) {
        addToSuccess = Math.round(streak);
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
      <h3>Success percentage:</h3>
      <p className="percentage">{percentage}</p>
      <IonButton color="danger" expand="block" className="ion-margin" onClick={oopsie}>
        Oopsie
      </IonButton>
    </>
  );
};

export default Percentage;
