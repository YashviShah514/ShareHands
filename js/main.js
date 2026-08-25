/* ============================================================
   SHARE HANDS — Global JavaScript
   Shared across all dashboard pages
   ============================================================ */

/* ── TOAST NOTIFICATION ── */
let _notifTimer;
function notify(msg) {
  const n = document.getElementById('notif');
  if (!n) return;
  n.innerHTML = '<i class="fas fa-info-circle"></i> ' + msg;
  n.classList.add('show');
  clearTimeout(_notifTimer);
  _notifTimer = setTimeout(() => n.classList.remove('show'), 3000);
}

/* ── FILTER BUTTONS ── */
function setFilter(el) {
  el.closest('.filter-bar').querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

/* ── CATEGORY SELECTOR ── */
function selectCat(el) {
  el.closest('.category-grid').querySelectorAll('.cat-option').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

/* ── SETTINGS TABS ── */
function setSettingsTab(el, tab) {
  el.closest('.settings-nav').querySelectorAll('.settings-nav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  ['profile', 'notifications', 'security', 'platform'].forEach(t => {
    const e = document.getElementById('settings-' + t);
    if (e) e.style.display = t === tab ? 'block' : 'none';
  });
}

/* ── TOGGLE SWITCH FIX ── */
document.addEventListener('click', e => {
  const inp = e.target.closest('.toggle')?.querySelector('input');
  if (inp) {
    const thumb = inp.parentElement.querySelector('.toggle-thumb');
    setTimeout(() => { thumb.style.left = inp.checked ? '20px' : '2px'; }, 10);
  }
});

/* ── PASSWORD TOGGLE ── */
function togglePwd(id, btn) {
  const inp = document.getElementById(id);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.innerHTML = inp.type === 'password'
    ? '<i class="fas fa-eye"></i>'
    : '<i class="fas fa-eye-slash"></i>';
}

/* ── LOGOUT ── */
function doLogout() {
  notify('Logging out…');
  setTimeout(() => { window.location.href = 'login.html'; }, 700);
}

/* ── BUILD BAR CHART ── */
const MONTHS   = ['Oct','Nov','Dec','Jan','Feb','Mar','Apr'];
const DONATIONS = [80, 120, 95, 150, 110, 180, 140];
const REQUESTS  = [60, 90,  75, 120, 85,  140, 110];
const NGO_REQ   = [12, 18,  14, 22,  16,  28,  20];
const NGO_FUL   = [10, 15,  12, 20,  14,  25,  18];

function buildChart(containerId, data1, data2, color1, color2) {
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';
  const maxVal = Math.max(...data1, ...data2);
  MONTHS.forEach((m, i) => {
    const grp = document.createElement('div');
    grp.className = 'chart-bar-group';
    const bars = document.createElement('div');
    bars.className = 'chart-bars';
    const h1 = Math.round((data1[i] / maxVal) * 140);
    const h2 = Math.round((data2[i] / maxVal) * 140);
    bars.innerHTML = `
      <div class="bar ${color1}" style="height:${h1}px" title="${data1[i]}"></div>
      <div class="bar ${color2}" style="height:${h2}px" title="${data2[i]}"></div>`;
    const lbl = document.createElement('div');
    lbl.className = 'chart-label';
    lbl.textContent = m;
    grp.appendChild(bars);
    grp.appendChild(lbl);
    c.appendChild(grp);
  });
}

/* ── DONATIONS TABLE DATA ── */
const DONATIONS_DATA = [
  { emoji:'👕', name:'Winter Jacket',   cat:'Clothing',    donor:'Sara Ahmed',   loc:'Downtown', status:'available', date:'Apr 5' },
  { emoji:'📚', name:'Textbooks',       cat:'Books',       donor:'Rami Haddad',  loc:'Midtown',  status:'pending',   date:'Apr 4' },
  { emoji:'🛏️', name:'Bed Frame',       cat:'Furniture',   donor:'Maya Khalil',  loc:'South',    status:'taken',     date:'Apr 3' },
  { emoji:'💻', name:'Old Laptop',      cat:'Electronics', donor:'Omar Nasser',  loc:'North',    status:'available', date:'Apr 3' },
  { emoji:'🪑', name:'Study Chair',     cat:'Furniture',   donor:'Lina Mansour', loc:'East',     status:'pending',   date:'Apr 2' },
  { emoji:'👗', name:'Summer Dresses',  cat:'Clothing',    donor:'Sara Ahmed',   loc:'Downtown', status:'available', date:'Apr 1' },
  { emoji:'📖', name:'Novel Collection',cat:'Books',       donor:'Rami Haddad',  loc:'Midtown',  status:'available', date:'Mar 30' },
];

function buildDonationsTable(tbodyId) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;
  DONATIONS_DATA.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><div class="item-cell">
        <div class="item-img">${d.emoji}</div>
        <div><div class="item-name">${d.name}</div><div class="item-cat">${d.cat}</div></div>
      </div></td>
      <td>${d.donor}</td>
      <td>${d.cat}</td>
      <td style="color:var(--text-light);font-size:11px">${d.loc}</td>
      <td><span class="badge-status ${d.status}">${d.status.charAt(0).toUpperCase()+d.status.slice(1)}</span></td>
      <td style="color:var(--text-light);font-size:11px">${d.date}</td>
      <td><div class="action-btns">
        <button class="action-btn view"   onclick="notify('Viewing ${d.name}')"><i class="fas fa-eye"></i></button>
        <button class="action-btn edit"   onclick="notify('Editing ${d.name}')"><i class="fas fa-pen"></i></button>
        <button class="action-btn delete" onclick="notify('Deleted')"><i class="fas fa-trash"></i></button>
      </div></td>`;
    tbody.appendChild(tr);
  });
}

/* ── BROWSE ITEMS GRID ── */
const BROWSE_ITEMS = [
  { e:'📚', n:'Science Books',   c:'Books',       l:'Midtown' },
  { e:'🛏️', n:'Bed Frame',       c:'Furniture',   l:'South' },
  { e:'💻', n:'Old Laptop',      c:'Electronics', l:'North' },
  { e:'🪑', n:'Study Chair',     c:'Furniture',   l:'East' },
  { e:'📖', n:'Novels',          c:'Books',       l:'Midtown' },
  { e:'🖥️', n:'Monitor',         c:'Electronics', l:'North' },
];

function buildBrowseGrid(gridId, btnClass) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  BROWSE_ITEMS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'cursor:pointer;transition:transform .2s';
    card.onmouseenter = () => card.style.transform = 'translateY(-2px)';
    card.onmouseleave = () => card.style.transform = 'translateY(0)';
    card.innerHTML = `
      <div style="font-size:38px;text-align:center;background:var(--cream);border-radius:9px;padding:14px;margin-bottom:10px">${item.e}</div>
      <div style="font-size:13px;font-weight:700;margin-bottom:3px">${item.n}</div>
      <div style="font-size:11px;color:var(--text-light);margin-bottom:10px">${item.c} · ${item.l}</div>
      <button class="btn ${btnClass}" style="width:100%;font-size:11.5px;justify-content:center"
        onclick="notify('📬 Request sent for ${item.n}!')">
        Request Item
      </button>`;
    grid.appendChild(card);
  });
}

/* ── ANIMATED COUNTERS ── */
function animateCounter(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count.toLocaleString();
    if (count >= target) clearInterval(timer);
  }, 30);
}
