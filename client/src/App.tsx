import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import NotesPage from './pages/NotesPage';
import {Card} from 'react-bootstrap';



function App() {
   const token = localStorage.getItem('token');

  const isValidToken = token && token !== 'undefined' && token !== 'null';
  const isLoggedIn = Boolean(isValidToken);

  return (
    <>
      {!isLoggedIn ? (
        <>
          <div className="container">
            <div className="row g-3">
              <div className="col-md-6">
                <Card>
                  <Card.Body>
                    <SignupForm />
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-6">
                <Card>
                  <Card.Body>
                    <LoginForm />
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container">
          <div className="row g-3">
            <div className="col-md-6">
              <NotesPage />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App
