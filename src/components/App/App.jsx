import { useState } from 'react';
import FeedbackOptions from '../FeedbackOptions/FeedbackOptions';
import Statistics from '../Statistics/Statistics';
import Section from '../Section/Section';
import Notification from '../Notification/Notification';

function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const leaveFeedback = option => {
        const name = option.target.name;

        switch (name) {
            case 'good':
                setGood(prev => prev + 1);
                break;
            case 'neutral':
                setNeutral(prev => prev + 1);
                break;
            case 'bad':
                setBad(prev => prev + 1);
                break;
            default:
                throw new Error('error: bad type');
        }
    };

    const countTotalFeedback = () => {
        return good + neutral + bad;
    };

    const countPositiveFeedbackPercentage = () => {
        return Math.trunc((good / countTotalFeedback()) * 100);
    };

    const totalFeedback = countTotalFeedback();
    const percentage = countPositiveFeedbackPercentage();
    const options = Object.keys({ good, neutral, bad });

    return (
        <div className="">
            <Section title="Please leave feedback">
                <FeedbackOptions
                    options={options}
                    onLeaveFeedback={leaveFeedback}
                />
            </Section>
            <Section title="Statistics">
                {totalFeedback > 0 && (
                    <Statistics
                        good={good}
                        neutral={neutral}
                        bad={bad}
                        total={totalFeedback}
                        positivePercentage={percentage}
                    />
                )}

                {totalFeedback < 1 && (
                    <Notification message="There is no feedback" />
                )}
            </Section>
        </div>
    );
}

export default App;
