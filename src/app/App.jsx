import Header from '@/widgets/Header/Header';
import Sidebar from '@/widgets/Sidebar/Sidebar';

import './App.css';

function App() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <Header />
      </header>
      <aside className="app-sidebar">
        <Sidebar />
      </aside>
    </div>
  );
}

export default App;
