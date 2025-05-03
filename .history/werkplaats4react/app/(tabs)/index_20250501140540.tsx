import React, { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Simpele validatie (je kunt dit aanpassen of uitbreiden)
    if (!email || !password) {
      setError('Vul zowel e-mail als wachtwoord in.');
      return;
    }

    // Voorbeeld van een "inlogpoging"
    if (email === 'test@voorbeeld.com' && password === 'wachtwoord123') {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Ongeldige inloggegevens.');
    }
  };

  if (loggedIn) {
    return <h2>Welkom, je bent ingelogd!</h2>;
  }

  return (
    <div className="App">
      <h2>Inloggen</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>E-mail:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Wachtwoord:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default App;