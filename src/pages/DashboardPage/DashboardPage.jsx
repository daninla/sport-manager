import s from './DashboardPage.module.css';

function DashboardPage() {
  return (
    <div className={s['app-layout']}>
      <main className={s['app-main']}>
        <section className={s['app-content']}>
          <h1>Dashboard</h1>
          <p>Welcome to the Dashboard!</p>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;
