import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

const Info: React.FC = () => {
    return (
        <>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>How to use this app:</IonCardTitle>
                    <IonCardContent>
                        <p>It's very simple:</p>
                        <ol>
                            <li>You set your goal.</li>
                            <li>
                                When you don't manage to keep up with your habit, you tap the
                                "Oopsie" button.
                            </li>
                        </ol>
                        <p>
                            The app counts your habbit succes rate in percents. If you manage to
                            keep up with your habit for 9 days, and you don't manage it on day
                            10, you get 90 % success percentage.
                        </p>
                    </IonCardContent>
                </IonCardHeader>
            </IonCard>
        </>
    );
};

export default Info;
