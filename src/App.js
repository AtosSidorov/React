import AuthForm from './authform'; 
import './authform.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthForm /> {/* Здесь отображается наша форма аутентификации */}
      </header>
    </div>
  );
}

export default App;