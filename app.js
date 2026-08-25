/* ════════════════════════════════════════════
   SHARE HANDS — GLOBAL JAVASCRIPT
   app.js  |  Used by all pages
════════════════════════════════════════════ */

/* ────────────────────────────────────────
   TOAST NOTIFICATION
──────────────────────────────────────── */
let _notifTimer;
function notify(msg) {
  const n = document.getElementById('notif');
  if (!n) return;
  n.innerHTML = '<i class="fas fa-info-circle"></i> ' + msg;
  n.classList.add('show');
  clearTimeout(_notifTimer);
  _notifTimer = setTimeout(() => n.classList.remove('show'), 3200);
}

/* ────────────────────────────────────────
   FILTER BUTTONS
──────────────────────────────────────── */
function setFilter(el) {
  el.closest('.filter-bar')
    .querySelectorAll('.filter-btn')
    .forEach(b => b.classList.remove('active'));
  el.classList.add('active');
}

/* ────────────────────────────────────────
   SETTINGS TABS
──────────────────────────────────────── */
function setSettingsTab(el, tab) {
  el.closest('.settings-nav')
    .querySelectorAll('.settings-nav-item')
    .forEach(i => i.classList.remove('active'));
  el.classList.add('active');

  ['profile', 'notifications', 'security', 'platform', 'organization'].forEach(t => {
    const e = document.getElementById('settings-' + t);
    if (e) e.style.display = (t === tab) ? 'block' : 'none';
  });
}

/* ────────────────────────────────────────
   CATEGORY SELECT (Donate forms)
──────────────────────────────────────── */
function selectCat(el) {
  el.closest('.category-grid')
    .querySelectorAll('.cat-option')
    .forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

/* ────────────────────────────────────────
   PASSWORD TOGGLE
──────────────────────────────────────── */
function togglePwd(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  if (inp.type === 'password') {
    inp.type = 'text';
    btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    inp.type = 'password';
    btn.innerHTML = '<i class="fas fa-eye"></i>';
  }
}

/* ────────────────────────────────────────
   TOGGLE SWITCH FIX
──────────────────────────────────────── */
document.addEventListener('click', e => {
  const inp = e.target.closest('.toggle')?.querySelector('input');
  if (inp) {
    const thumb = inp.parentElement.querySelector('.toggle-thumb');
    setTimeout(() => {
      if (thumb) thumb.style.left = inp.checked ? '20px' : '2px';
    }, 10);
  }
});

/* ────────────────────────────────────────
   BAR CHART BUILDER
──────────────────────────────────────── */
const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

function buildBarChart(containerId, data1, data2, color1 = 'green', color2 = 'cream') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const maxVal = Math.max(...data1, ...data2);

  MONTHS.forEach((month, i) => {
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
    lbl.textContent = month;

    grp.appendChild(bars);
    grp.appendChild(lbl);
    container.appendChild(grp);
  });
}

/* ────────────────────────────────────────
   COUNTER ANIMATION (Homepage)
──────────────────────────────────────── */
function animateCounter(id, target, suffix = '') {
  const el = document.getElementById(id);
  if (!el) return;
  let count = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count.toLocaleString() + suffix;
    if (count >= target) clearInterval(timer);
  }, 30);
}

/* ────────────────────────────────────────
   DONATIONS TABLE BUILDER (Admin / Donor)
──────────────────────────────────────── */
const DONATIONS_DATA = [
  { emoji:'👕', name:'Winter Jacket',    cat:'Clothing',    donor:'Sara Ahmed',   loc:'Downtown', status:'available', date:'Apr 5' },
  { emoji:'📚', name:'Textbooks',        cat:'Books',       donor:'Rami Haddad',  loc:'Midtown',  status:'pending',   date:'Apr 4' },
  { emoji:'🛏️', name:'Bed Frame',        cat:'Furniture',   donor:'Maya Khalil',  loc:'South',    status:'taken',     date:'Apr 3' },
  { emoji:'💻', name:'Old Laptop',       cat:'Electronics', donor:'Omar Nasser',  loc:'North',    status:'available', date:'Apr 3' },
  { emoji:'🪑', name:'Study Chair',      cat:'Furniture',   donor:'Lina Mansour', loc:'East',     status:'pending',   date:'Apr 2' },
  { emoji:'👗', name:'Summer Dresses',   cat:'Clothing',    donor:'Sara Ahmed',   loc:'Downtown', status:'available', date:'Apr 1' },
  { emoji:'📖', name:'Novel Collection', cat:'Books',       donor:'Rami Haddad',  loc:'Midtown',  status:'available', date:'Mar 30' },
];

function buildDonationsTable(tbodyId, showDonor = true) {
  const tbody = document.getElementById(tbodyId);
  if (!tbody || tbody.children.length > 0) return;

  DONATIONS_DATA.forEach(d => {
    const tr = document.createElement('tr');
    const statusLabel = d.status.charAt(0).toUpperCase() + d.status.slice(1);

    tr.innerHTML = `
      <td>
        <div class="item-cell">
          <div class="item-img">${d.emoji}</div>
          <div>
            <div class="item-name">${d.name}</div>
            <div class="item-cat">${d.cat}</div>
          </div>
        </div>
      </td>
      ${showDonor ? `<td>${d.donor}</td>` : ''}
      <td>${d.cat}</td>
      <td style="color:var(--text-light);font-size:11px">${d.loc}</td>
      <td><span class="badge-status ${d.status}">${statusLabel}</span></td>
      <td style="color:var(--text-light);font-size:11px">${d.date}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn view"   onclick="notify('Viewing ${d.name}')"><i class="fas fa-eye"></i></button>
          <button class="action-btn edit"   onclick="notify('Editing ${d.name}')"><i class="fas fa-pen"></i></button>
          <button class="action-btn delete" onclick="notify('${d.name} removed')"><i class="fas fa-trash"></i></button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

/* ────────────────────────────────────────
   BROWSE GRID BUILDER (Donor / NGO)
──────────────────────────────────────── */
const BROWSE_ITEMS = [
  { e:'📚', n:'Science Books',   c:'Books',       l:'Midtown', cond:'Good' },
  { e:'🛏️', n:'Bed Frame',       c:'Furniture',   l:'South',   cond:'Fair' },
  { e:'💻', n:'Old Laptop',      c:'Electronics', l:'North',   cond:'Good' },
  { e:'🪑', n:'Study Chair',     c:'Furniture',   l:'East',    cond:'Like New' },
  { e:'📖', n:'Novel Collection',c:'Books',       l:'Midtown', cond:'Good' },
  { e:'🖥️', n:'Monitor',         c:'Electronics', l:'North',   cond:'Good' },
];

function buildBrowseGrid(gridId, btnClass = 'btn-primary', btnLabel = 'Request Item') {
  const grid = document.getElementById(gridId);
  if (!grid || grid.children.length > 0) return;

  BROWSE_ITEMS.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'cursor:pointer; transition:transform .2s;';
    card.onmouseenter = () => card.style.transform = 'translateY(-2px)';
    card.onmouseleave = () => card.style.transform = 'translateY(0)';

    card.innerHTML = `
      <div style="font-size:38px;text-align:center;background:var(--cream);border-radius:9px;padding:14px;margin-bottom:10px">${item.e}</div>
      <div style="font-size:13px;font-weight:700;margin-bottom:3px">${item.n}</div>
      <div style="font-size:11px;color:var(--text-light);margin-bottom:10px">${item.c} · ${item.l} · ${item.cond}</div>
      <button class="btn ${btnClass}" style="width:100%;font-size:11.5px"
        onclick="notify('📬 ${btnLabel} sent for ${item.n}!')">${btnLabel}</button>`;

    grid.appendChild(card);
  });
}

/* ────────────────────────────────────────
   PAGE NAVIGATION (within a dashboard)
──────────────────────────────────────── */
function showPage(prefix, pageName, navEl) {
  // Hide all pages with matching prefix
  document.querySelectorAll(`[id^="${prefix}-page-"]`).forEach(p => p.classList.remove('active'));

  // Show target page
  const target = document.getElementById(`${prefix}-page-${pageName}`);
  if (target) target.classList.add('active');

  // Update nav active state
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (navEl) navEl.classList.add('active');
}

/* ────────────────────────────────────────
   LOGOUT — redirect to login
──────────────────────────────────────── */
function doLogout() {
  notify('Logging out…');
  setTimeout(() => { window.location.href = 'login.html'; }, 800);
}

/* ────────────────────────────────────────
   SCROLL TO SECTION (homepage)
──────────────────────────────────────── */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
