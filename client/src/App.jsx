// import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import ProjectDisplay from './pages/ProjectDisplay';
import Accounts from './pages/Accounts';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Testing Purposes to comment components; will use react routers */}
      {/* <ProjectDisplay /> */}
      <Accounts />
    </div>

  );
}

export default App;
