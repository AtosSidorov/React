import React, { useState } from 'react'; 

function AuthForm() {
  
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    // поля заполнены корректно
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }
    // проверка  email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Неверный формат электронной почты.');
      return;
    }
    
    // сброс состояний
    setError('');
    setSuccessMessage('');

    try {
      // имитация запроса на сервер
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true, // успешный ответ
            json: () => Promise.resolve({ message: 'Авторизация успешна!' }),
          });
        }, 1000); //  задержка 
      });

      if (response.ok) {
        // сообщение об успешной авторизации
        setSuccessMessage('Авторизация прошла успешно!');
        setEmail('');
        setPassword('');
      } else {
        // сообщение об ошибке
        const errorData = await response.json();
        setError(errorData.message || 'Ошибка авторизации');
      }
    } catch (error) {
        setError('Произошла ошибка. Повторите попытку позже.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Авторизация</h2>

      <div>
        <label>
          Почта:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </label>
      </div>

      <div>
        <label>
          Пароль:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </label>
      </div>

      {/* Выводим сообщение об ошибке */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Выводим сообщение об успешной авторизации */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button type="submit">Войти</button>
    </form>
  );
}

export default AuthForm; 
