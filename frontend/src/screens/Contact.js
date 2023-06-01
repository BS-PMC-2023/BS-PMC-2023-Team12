import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/httpHook';

const Contact = () => {
    const { isLoading, sendRequest } = useHttpClient();
    const auth = useContext(AuthContext);
    const [text, setText] = useState('');
    const [capturedText, setCapturedText] = useState('');
    let Text;

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setText(text + '\n');
        }
    };

    // const handleButtonClick = () => {
    //     setCapturedText(text);
    //     setText('');
    //     Text = text;
    //     console.log(text);
    // };

    const sendComment = async () => {
        setCapturedText(text);
        setText('');
        
        try {
            await sendRequest(
                'http://localhost:5000/api/users/sendComment',
                'POST',
                JSON.stringify({
                    text: text,
                    name: auth.userName,
                    email: auth.email
                }),
                {
                    'Content-Type': 'application/json',
                }
            );
        } catch (err) {
            throw err;
        }
        alert('ההודעה הועברה למנהל המחסן');
    };

    return (
        <div>
            <>
                <hr className="hr-line-right"></hr>
                <h1>צרו קשר</h1>
                <hr className="hr-line-left"></hr>
            </>
            <div>
                <p>
                    For any inquiries or support, please reach out to us via email:
                </p>
                <ul>
                    <li>
                        Email:
                        <a> warehousesuppo@gmail.com</a>
                    </li>
                </ul>
            </div>
            <div
                className="text-box-container"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <textarea
                    className="text-box"
                    style={{
                        width: '400px',
                        height: '100px',
                        fontSize: '24px',
                        padding: '10px',
                        border: '2px solid #ccc',
                        borderRadius: '4px',
                    }}
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button
                    className="submit-button"
                    style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        fontSize: '18px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                    onClick={() => sendComment()}
                >
                    שלח פניה
                </button>
            </div>
        </div>
    );
};



export default Contact;
