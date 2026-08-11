import Header from '@/widgets/Header/Header';
import Sidebar from '@/widgets/Sidebar/Sidebar';

import s from './DashboardPage.module.css';

function DashboardPage() {
  return (
    <div className={s['app-layout']}>
      <header className={s['app-header']}>
        <Header />
      </header>
      <aside className={s['app-sidebar']}>
        <Sidebar />
      </aside>
    </div>
  );
}

export default DashboardPage;
