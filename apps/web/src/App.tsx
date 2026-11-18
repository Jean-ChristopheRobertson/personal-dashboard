const focusItems = [
  { title: 'Build the dashboard', category: 'PROJECT', time: '45 min', done: false },
  { title: 'Read 20 pages', category: 'LEARNING', time: '20 min', done: false },
  { title: 'Morning walk', category: 'HEALTH', time: '30 min', done: true },
]

function App() {
  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())

  return (
    <main className="shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="Dashboard home">
          <span className="brand-mark">D</span>
          <span>JC dashboard<span className="brand-dot">.</span></span>
        </a>
        <div className="side-label">WORKSPACE</div>
        <nav aria-label="Main navigation">
          <a className="nav-item active" href="#overview"><span>◫</span> Overview</a>
          <a className="nav-item" href="#tasks"><span>☷</span> Tasks & habits</a>
          <a className="nav-item" href="#learning"><span>⌘</span> Learning</a>
          <a className="nav-item" href="#finance"><span>↗</span> Finance</a>
        </nav>
        <div className="sidebar-bottom">
          <div className="avatar">JC</div>
          <div><strong>Jean</strong><small>Personal space</small></div>
          <span className="more">···</span>
        </div>
      </aside>

      <section className="content" id="overview">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> Overview</div>
          <div className="top-actions"><span className="sync"><i /> All systems operational</span><button className="icon-button" aria-label="Notifications">♧</button></div>
        </header>

        <div className="page">
          <div className="welcome-row">
            <div>
              <div className="eyebrow">{today.toUpperCase()}</div>
              <h1>Good morning, Jean <span>✳</span></h1>
              <p className="subtitle">A little progress, consistently, adds up to a lot.</p>
            </div>
            <button className="primary-button">＋ <span>Quick capture</span></button>
          </div>

          <section className="stats-grid" aria-label="Daily summary">
            <article className="stat-card"><div className="stat-heading">TASKS COMPLETED <span className="stat-icon lavender">✓</span></div><div className="stat-value">4<span className="stat-total"> / 6</span></div><div className="progress"><span style={{ width: '66%' }} /></div><div className="stat-foot">Two more to reach your daily goal</div></article>
            <article className="stat-card"><div className="stat-heading">HABIT STREAK <span className="stat-icon peach">✳</span></div><div className="stat-value">12 <span className="stat-unit">days</span></div><div className="stat-foot"><span className="positive">↑ 3 days</span> from last month</div></article>
            <article className="stat-card"><div className="stat-heading">LEARNING TIME <span className="stat-icon blue">◷</span></div><div className="stat-value">3.5 <span className="stat-unit">hrs</span></div><div className="stat-foot">This week <span className="muted">·</span> <span className="positive">On track</span></div></article>
          </section>

          <section className="lower-grid">
            <article className="panel focus-panel" id="tasks">
              <div className="panel-header"><div><div className="eyebrow">YOUR DAY</div><h2>Today's focus</h2></div><button className="text-button">View all <span>→</span></button></div>
              <div className="focus-list">{focusItems.map((item) => <label className={`focus-item ${item.done ? 'is-done' : ''}`} key={item.title}><input type="checkbox" defaultChecked={item.done} /><span className="task-copy"><strong>{item.title}</strong><small>{item.category}</small></span><span className="task-time">{item.time}</span></label>)}</div>
              <button className="add-task">＋ Add a task</button>
            </article>

            <article className="panel activity-panel" id="learning">
              <div className="panel-header"><div><div className="eyebrow">YOUR MOMENTUM</div><h2>Weekly activity</h2></div><button className="select-button">This week⌄</button></div>
              <div className="chart" role="img" aria-label="Weekly activity chart showing steady progress through the week"><div className="chart-y"><span>8h</span><span>6h</span><span>4h</span><span>2h</span><span>0h</span></div><div className="chart-area"><div className="chart-lines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 500 145" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#8b7cf6" stopOpacity=".22"/><stop offset="100%" stopColor="#8b7cf6" stopOpacity="0"/></linearGradient></defs><path d="M0 112 C35 98 48 109 83 86 S140 97 166 75 S217 88 250 62 S300 76 333 53 S389 72 415 38 S467 53 500 21 L500 145 L0 145Z" fill="url(#fill)"/><path d="M0 112 C35 98 48 109 83 86 S140 97 166 75 S217 88 250 62 S300 76 333 53 S389 72 415 38 S467 53 500 21" fill="none" stroke="#8273ed" strokeWidth="3" strokeLinecap="round"/></svg><div className="chart-x"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div></div>
              <div className="chart-legend"><span><i /> Focus time</span><strong>3h 25m <small>this week</small></strong></div>
            </article>
          </section>

          <footer className="page-footer"><span>PERSONAL DASHBOARD <b>·</b> DEVELOPMENT PREVIEW</span><span>Last updated just now</span></footer>
        </div>
      </section>
    </main>
  )
}

export default App
