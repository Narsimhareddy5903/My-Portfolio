// Basic interactions for the portfolio

// year
document.getElementById('year').textContent = new Date().getFullYear();

// menu toggle for mobile (simple)
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
menuToggle && menuToggle.addEventListener('click', ()=>{
  if(sidebar.style.display === 'block'){ sidebar.style.display = ''; }
  else { sidebar.style.display = 'block'; sidebar.style.position='absolute'; sidebar.style.zIndex=9999; sidebar.style.left=0; sidebar.style.top='64px'; }
});

// theme toggle - basic localStorage persistence
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
function applyTheme(mode){
  if(mode === 'light'){
    root.style.setProperty('--bg','#f7fafc');
    root.style.setProperty('--text','#0b1220');
    root.style.setProperty('--panel','rgba(2,6,23,0.03)');
    root.style.setProperty('--muted','#475569');
  } else {
    root.style.removeProperty('--bg');
    root.style.removeProperty('--text');
    root.style.removeProperty('--panel');
    root.style.removeProperty('--muted');
  }
}
const saved = localStorage.getItem('theme') || 'dark';
applyTheme(saved);
themeToggle && themeToggle.addEventListener('click', ()=>{
  const cur = localStorage.getItem('theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem('theme', cur);
  applyTheme(cur);
});

// smooth scrolling & active nav highlighting
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if(!href || href === '#') return;
    if(href.startsWith('#')){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  })
});

// reveal animations using IntersectionObserver
const reveals = document.querySelectorAll('.section, .card, .project-card, .profile-card');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('visible');
  })
},{threshold:0.12});
reveals.forEach(r=>io.observe(r));

// contact form simulation
const contactForm = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
const formMsg = document.getElementById('formMsg');
sendBtn && sendBtn.addEventListener('click', ()=>{
  const name = document.getElementById('cname').value.trim();
  const email = document.getElementById('cemail').value.trim();
  const msg = document.getElementById('cmessage').value.trim();
  if(!name || !email || !msg){ formMsg.textContent = 'Please fill all fields.'; return; }
  const re = /\S+@\S+\.\S+/;
  if(!re.test(email)){ formMsg.textContent = 'Please enter a valid email.'; return; }
  formMsg.textContent = 'Sending...';
  setTimeout(()=>{ formMsg.textContent = 'Message sent! I will get back to you soon.'; contactForm.reset(); }, 900);
});

// copy code sample to clipboard
document.querySelectorAll('button[data-copy]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const sel = document.querySelector(btn.getAttribute('data-copy'));
    if(!sel) return;
    const text = sel.innerText;
    navigator.clipboard.writeText(text).then(()=>{
      btn.textContent = 'Copied ✅';
      setTimeout(()=> btn.textContent = 'Copy', 1200);
    });
  })
});