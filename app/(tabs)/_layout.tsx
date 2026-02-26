<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
<title>The Boys - Leaderboard</title>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;800;900&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    background: #111827;
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    min-height: 100vh;
    max-width: 390px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px 4px;
    font-size: 15px;
    font-weight: 700;
  }

  .top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px 6px;
  }

  .title-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .profile-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f8ef7, #7c3aed);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    border: 2px solid #4f8ef7;
    cursor: pointer;
    flex-shrink: 0;
  }

  .title-text h1 {
    font-family: 'Nunito', sans-serif;
    font-size: 24px;
    font-weight: 900;
    line-height: 1;
  }

  .season-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #1a3a1a;
    color: #4ade80;
    border: 1.5px solid #4ade80;
    border-radius: 20px;
    padding: 2px 10px;
    font-size: 12px;
    font-weight: 700;
    margin-top: 3px;
  }

  .timer-text {
    color: #9ca3af;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 2px;
  }

  .currency-group {
    display: flex;
    gap: 8px;
  }

  .currency-pill {
    display: flex;
    align-items: center;
    gap: 5px;
    background: #1f2937;
    border-radius: 20px;
    padding: 6px 12px;
    font-weight: 800;
    font-size: 15px;
  }

  .currency-pill.lightning { color: #facc15; }
  .currency-pill.gem { color: #38bdf8; }

  .meta-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 2px 20px 10px;
  }

  /* Stats Card */
  .stats-card {
    margin: 0 16px 14px;
    background: #1f2937;
    border-radius: 16px;
    padding: 16px;
  }

  .rank-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .rank-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .rank-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #374151;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .rank-label {
    color: #4ade80;
    font-weight: 700;
    font-size: 14px;
  }

  .silver-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: #374151;
    border-radius: 20px;
    padding: 4px 10px;
    font-size: 13px;
    font-weight: 700;
    color: #d1d5db;
    margin-top: 2px;
  }

  .pts-today {
    text-align: right;
  }

  .pts-today .pts-num {
    font-family: 'Nunito', sans-serif;
    font-size: 40px;
    font-weight: 900;
    line-height: 1;
  }

  .pts-today .pts-label {
    color: #9ca3af;
    font-size: 12px;
    font-weight: 600;
  }

  .stats-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    background: #374151;
    border-radius: 10px;
    overflow: hidden;
  }

  .stat-cell {
    background: #1f2937;
    padding: 10px;
    text-align: center;
  }

  .stat-cell .stat-val {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 800;
  }

  .stat-cell .stat-val.green { color: #4ade80; }
  .stat-cell .stat-val.red { color: #f87171; }
  .stat-cell .stat-val.season { color: #4ade80; }

  .stat-cell .stat-lbl {
    color: #9ca3af;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    margin-top: 2px;
  }

  /* Leaderboard Card */
  .leaderboard-card {
    margin: 0 16px 14px;
    background: #1f2937;
    border-radius: 16px;
    padding: 16px;
    flex: 1;
  }

  .lb-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }

  .lb-title {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 900;
  }

  .tab-group {
    display: flex;
    background: #374151;
    border-radius: 20px;
    padding: 3px;
    gap: 2px;
  }

  .tab-btn {
    padding: 5px 14px;
    border-radius: 16px;
    border: none;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab-btn.active {
    background: #4ade80;
    color: #111827;
  }

  .tab-btn:not(.active) {
    background: transparent;
    color: #9ca3af;
  }

  .lb-entries {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .lb-entry {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    transition: background 0.2s;
  }

  .lb-entry.you {
    background: #1a3a1a;
    border: 1.5px solid #4ade80;
  }

  .lb-entry.first {
    background: #292008;
    border: 1.5px solid #facc15;
  }

  .rank-num {
    width: 28px;
    font-weight: 800;
    font-size: 14px;
    color: #9ca3af;
    text-align: center;
  }

  .crown-icon { font-size: 22px; }

  .entry-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #374151;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    border: 2px solid #4b5563;
  }

  .entry-info {
    flex: 1;
    min-width: 0;
  }

  .entry-name {
    font-weight: 700;
    font-size: 15px;
  }

  .entry-name.you-name { color: #4ade80; }

  .progress-bar {
    height: 5px;
    background: #374151;
    border-radius: 3px;
    margin-top: 5px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: #4ade80;
    border-radius: 3px;
    transition: width 0.6s ease;
  }

  .medal-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: #374151;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
  }

  .entry-pts {
    text-align: right;
    min-width: 55px;
  }

  .pts-val {
    font-family: 'Nunito', sans-serif;
    font-size: 20px;
    font-weight: 900;
  }

  .pts-val.gold { color: #facc15; }

  .pts-suffix {
    font-size: 10px;
    font-weight: 700;
    color: #9ca3af;
    letter-spacing: 0.05em;
  }

  /* Bottom Nav */
  .bottom-nav {
    position: sticky;
    bottom: 0;
    background: #1f2937;
    border-top: 1px solid #374151;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 10px 0 20px;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    cursor: pointer;
    padding: 4px 12px;
    border-radius: 12px;
  }

  .nav-item .nav-icon {
    font-size: 22px;
    filter: grayscale(1) opacity(0.5);
  }

  .nav-item .nav-label {
    font-size: 10px;
    font-weight: 700;
    color: #6b7280;
  }

  .nav-item.active .nav-icon {
    filter: none;
  }

  .nav-item.active .nav-label {
    color: #4ade80;
  }

  .activity-section {
    padding: 0 16px 10px;
  }

  .activity-title {
    font-family: 'Nunito', sans-serif;
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 10px;
    color: #e5e7eb;
  }
</style>
</head>
<body>

<!-- Status Bar -->
<div class="status-bar">
  <span>10:55</span>
  <span>🔋</span>
</div>

<!-- Top Header -->
<div class="top-header">
  <div class="title-group">
    <div class="profile-avatar">🧑‍💻</div>
    <div class="title-text">
      <h1>The Boys</h1>
      <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
        <div class="season-badge">Season 7</div>
        <div class="timer-text">⏱ 3d left</div>
      </div>
    </div>
  </div>
  <div class="currency-group">
    <div class="currency-pill lightning">⚡ 340</div>
    <div class="currency-pill gem">💎 12</div>
  </div>
</div>

<!-- Stats Card -->
<div class="stats-card">
  <div class="rank-row">
    <div class="rank-info">
      <div class="rank-icon">⭐</div>
      <div>
        <div class="rank-label">You · #2 in league</div>
        <div class="silver-badge">🥈 Silver</div>
      </div>
    </div>
    <div class="pts-today">
      <div class="pts-num">340</div>
      <div class="pts-label">pts today</div>
    </div>
  </div>
  <div class="stats-row">
    <div class="stat-cell">
      <div class="stat-val green">+90</div>
      <div class="stat-lbl">EARNED</div>
    </div>
    <div class="stat-cell">
      <div class="stat-val red">-40</div>
      <div class="stat-lbl">LOST</div>
    </div>
    <div class="stat-cell">
      <div class="stat-val season">1420</div>
      <div class="stat-lbl">SEASON</div>
    </div>
  </div>
</div>

<!-- Leaderboard Card -->
<div class="leaderboard-card">
  <div class="lb-header">
    <div class="lb-title">Leaderboard</div>
    <div class="tab-group">
      <button class="tab-btn active">Today</button>
      <button class="tab-btn">Season</button>
    </div>
  </div>

  <div class="lb-entries">
    <!-- Alex #1 -->
    <div class="lb-entry first">
      <div class="rank-num"><span class="crown-icon">👑</span></div>
      <div class="entry-avatar">🧢</div>
      <div class="entry-info">
        <div class="entry-name">Alex</div>
        <div class="progress-bar"><div class="progress-fill" style="width:100%"></div></div>
      </div>
      <div class="medal-icon">🥇</div>
      <div class="entry-pts">
        <div class="pts-val gold">520</div>
        <div class="pts-suffix">PTS</div>
      </div>
    </div>

    <!-- Gabe #2 (you) -->
    <div class="lb-entry you">
      <div class="rank-num">#2</div>
      <div class="entry-avatar">⭐</div>
      <div class="entry-info">
        <div class="entry-name you-name">Gabe (you)</div>
        <div class="progress-bar"><div class="progress-fill" style="width:65%"></div></div>
      </div>
      <div class="medal-icon">🥈</div>
      <div class="entry-pts">
        <div class="pts-val">340</div>
        <div class="pts-suffix">PTS</div>
      </div>
    </div>

    <!-- Jordan #3 -->
    <div class="lb-entry">
      <div class="rank-num">#3</div>
      <div class="entry-avatar">🎸</div>
      <div class="entry-info">
        <div class="entry-name">Jordan</div>
        <div class="progress-bar"><div class="progress-fill" style="width:56%"></div></div>
      </div>
      <div class="medal-icon">🥈</div>
      <div class="entry-pts">
        <div class="pts-val">290</div>
        <div class="pts-suffix">PTS</div>
      </div>
    </div>

    <!-- Sam #4 -->
    <div class="lb-entry">
      <div class="rank-num">#4</div>
      <div class="entry-avatar">🎮</div>
      <div class="entry-info">
        <div class="entry-name">Sam</div>
        <div class="progress-bar"><div class="progress-fill" style="width:40%"></div></div>
      </div>
      <div class="medal-icon">🥉</div>
      <div class="entry-pts">
        <div class="pts-val">210</div>
        <div class="pts-suffix">PTS</div>
      </div>
    </div>

    <!-- Tyler #5 -->
    <div class="lb-entry">
      <div class="rank-num">#5</div>
      <div class="entry-avatar">🏀</div>
      <div class="entry-info">
        <div class="entry-name">Tyler</div>
        <div class="progress-bar"><div class="progress-fill" style="width:31%"></div></div>
      </div>
      <div class="medal-icon">🥉</div>
      <div class="entry-pts">
        <div class="pts-val">160</div>
        <div class="pts-suffix">PTS</div>
      </div>
    </div>
  </div>
</div>

<!-- Today's Activity -->
<div class="activity-section">
  <div class="activity-title">Today's Activity</div>
</div>

<!-- Bottom Nav (no Profile) -->
<div class="bottom-nav">
  <div class="nav-item active">
    <div class="nav-icon">🏠</div>
    <div class="nav-label">Home</div>
  </div>
  <div class="nav-item">
    <div class="nav-icon">📊</div>
    <div class="nav-label">Stats</div>
  </div>
  <div class="nav-item">
    <div class="nav-icon">👥</div>
    <div class="nav-label">Friends</div>
  </div>
  <div class="nav-item">
    <div class="nav-icon">🏪</div>
    <div class="nav-label">Shop</div>
  </div>
  <div class="nav-item">
    <div class="nav-icon">▼</div>
    <div class="nav-label">create-l...</div>
  </div>
</div>

</body>
</html>