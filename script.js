const intention = document.querySelector('#intentionText');
document.querySelector('#editIntention').addEventListener('click', () => {
  const next = prompt('What would you like today to be about?', intention.textContent);
  if (next?.trim()) { intention.textContent = next.trim(); toast('Your intention is set.'); }
});
const taskList = document.querySelector('#taskList');
function updateCount() {
  const rows = [...taskList.querySelectorAll('.task-row')];
  const done = rows.filter(row => row.querySelector('input').checked).length;
  document.querySelector('#taskCount').textContent = `${done} / ${rows.length}`;
}
taskList.addEventListener('change', event => {
  if (event.target.matches('input')) {
    event.target.closest('.task-row').classList.toggle('done', event.target.checked);
    updateCount();
    if (event.target.checked) toast('One small win, nicely done.');
  }
});
document.querySelector('#addTask').addEventListener('click', () => {
  const text = prompt('What would you like to get done?');
  if (!text?.trim()) return;
  const row = document.createElement('label');
  row.className = 'task-row';
  row.innerHTML = '<input type="checkbox"><span class="checkmark"></span><span class="task-text"></span><span class="task-priority low">↘</span>';
  row.querySelector('.task-text').textContent = text.trim();
  taskList.append(row); updateCount(); toast('Task added to your day.');
});
let remaining = 25 * 60;
let interval = null;
const timerValue = document.querySelector('#timerValue');
const timerLabel = document.querySelector('#timerLabel');
const startButton = document.querySelector('#startTimer');
const progress = document.querySelector('#ringProgress');
function renderTimer() {
  timerValue.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
  progress.style.strokeDashoffset = 553 * (1 - remaining / (25 * 60));
}
startButton.addEventListener('click', () => {
  if (interval) {
    clearInterval(interval); interval = null; startButton.innerHTML = '<span>▶</span> Resume focusing'; timerLabel.textContent = 'PAUSED — TAKE YOUR TIME'; return;
  }
  startButton.innerHTML = '<span>Ⅱ</span> Pause session'; timerLabel.textContent = 'YOU’RE IN YOUR FOCUS';
  interval = setInterval(() => {
    remaining--; renderTimer();
    if (remaining <= 0) { clearInterval(interval); interval = null; startButton.innerHTML = '<span>▶</span> Start focusing'; timerLabel.textContent = 'SESSION COMPLETE'; toast('Beautiful work. Take a little break.'); }
  }, 1000);
});
document.querySelector('#resetTimer').addEventListener('click', () => {
  clearInterval(interval); interval = null; remaining = 25 * 60; renderTimer();
  startButton.innerHTML = '<span>▶</span> Start focusing'; timerLabel.textContent = 'READY WHEN YOU ARE';
});
let toastTimeout;
function toast(message) {
  const node = document.querySelector('#toast'); node.textContent = message; node.classList.add('show');
  clearTimeout(toastTimeout); toastTimeout = setTimeout(() => node.classList.remove('show'), 2200);
}
