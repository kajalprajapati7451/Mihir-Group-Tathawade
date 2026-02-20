document.addEventListener('DOMContentLoaded',()=>{
  // Particles
  const pc=document.getElementById('particles');
  for(let i=0;i<16;i++){const p=document.createElement('div');p.classList.add('particle');const s=Math.random()*50+14;p.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-duration:${Math.random()*7+5}s;animation-delay:-${Math.random()*7}s;opacity:${Math.random()*0.18+0.05};`;pc.appendChild(p);}
  // Navbar shrink
  const nav=document.getElementById('mainNav');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60),{passive:true});
  // Active link
  const secs=document.querySelectorAll('section[id]'),nls=document.querySelectorAll('#mainNav .nav-link');
  window.addEventListener('scroll',()=>{const sy=window.scrollY+90;secs.forEach(s=>{if(sy>=s.offsetTop&&sy<s.offsetTop+s.offsetHeight){nls.forEach(l=>{l.classList.remove('active');if(l.getAttribute('href')==='#'+s.id)l.classList.add('active');});}});},{passive:true});
  // Fade-up
  setTimeout(()=>document.querySelectorAll('.hero-content .fade-up').forEach(e=>e.classList.add('visible')),80);
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),{threshold:.10});
  document.querySelectorAll('section:not(#home) .fade-up').forEach(e=>obs.observe(e));
  // Stagger
  document.querySelectorAll('.row.g-3,.row.g-4').forEach(r=>r.querySelectorAll('.fade-up').forEach((e,i)=>e.style.transitionDelay=`${i*.08}s`));
  // Scroll top
  const stb=document.getElementById('scrollTop');
  window.addEventListener('scroll',()=>stb.classList.toggle('visible',window.scrollY>400),{passive:true});
  stb.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  // Anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=document.querySelector(a.getAttribute('href'));if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.scrollY-nav.offsetHeight,behavior:'smooth'});const c=bootstrap.Collapse.getInstance(document.getElementById('navMenu'));if(c)c.hide();}}));
  // Form validation
  const form=document.getElementById('contactForm'),btnText=document.getElementById('btnText'),success=document.getElementById('formSuccess');
  const fname=document.getElementById('fname'),femail=document.getElementById('femail'),fphone=document.getElementById('fphone');
  const eRx=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,pRx=/^[6-9][0-9]{9}$/;
  const val=(f,c)=>{f.classList.toggle('is-invalid',!c);return c;};
  fname.addEventListener('input',()=>val(fname,fname.value.trim().length>=2));
  femail.addEventListener('input',()=>val(femail,eRx.test(femail.value.trim())));
  fphone.addEventListener('input',()=>val(fphone,pRx.test(fphone.value.trim())));
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const ok=val(fname,fname.value.trim().length>=2)&val(femail,eRx.test(femail.value.trim()))&val(fphone,pRx.test(fphone.value.trim()));
    if(!document.getElementById('captchaCheck').checked){alert('Please confirm you are not a robot.');return;}
    if(ok){const btn=form.querySelector('.btn-submit');btn.disabled=true;btnText.textContent='Submitting…';
      setTimeout(()=>{form.reset();btn.disabled=false;btnText.textContent='Submit Enquiry';success.classList.remove('d-none');setTimeout(()=>success.classList.add('d-none'),5000);},1200);}
  });
});