import { useEffect } from 'react';
import { useState } from 'react';

export default function GetExerciseData(id: number) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const exerciseData = async () => {
        try {
            const response = await fetch(
                'http://localhost:5000/sessions/get_user_sessions', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "session_id": id
                })
            }
            )
            const json = await response.json();
            console.log(json);
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        exerciseData();
    }, []);

    return (
        data.
    );
};