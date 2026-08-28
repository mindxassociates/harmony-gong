(()=>{
  const q=(s,c=document)=>c.querySelector(s), qa=(s,c=document)=>[...c.querySelectorAll(s)];
  const progress=q('.progress'), nav=q('.nav');
  const updateScroll=()=>{const d=document.documentElement;const denom=d.scrollHeight-d.clientHeight; if(progress) progress.style.width=((denom>0?d.scrollTop/denom:0)*100)+'%'; if(nav) nav.classList.toggle('scrolled',scrollY>30)};
  addEventListener('scroll',updateScroll,{passive:true}); updateScroll();

  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1});
    qa('.reveal').forEach(el=>io.observe(el));
  } else qa('.reveal').forEach(el=>el.classList.add('visible'));

  const menu=q('.menu'),drawer=q('.drawer'),mainNav=q('.nav nav');
  if(menu&&drawer&&mainNav){
    drawer.innerHTML=mainNav.innerHTML;
    const close=()=>{drawer.classList.remove('open');document.body.classList.remove('menu-open');menu.textContent='☰';menu.setAttribute('aria-expanded','false');drawer.setAttribute('aria-hidden','true')};
    menu.addEventListener('click',()=>{const open=!drawer.classList.contains('open');drawer.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);menu.textContent=open?'×':'☰';menu.setAttribute('aria-expanded',String(open));drawer.setAttribute('aria-hidden',String(!open))});
    qa('a',drawer).forEach(a=>a.addEventListener('click',close)); addEventListener('keydown',e=>{if(e.key==='Escape') close()});
  }

  const links=qa('.nav nav a[href^="#"]'), sections=qa('main section[id]');
  if('IntersectionObserver' in window&&links.length){
    const spy=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-35% 0px -55% 0px'});
    sections.forEach(s=>spy.observe(s));
  }
})();
