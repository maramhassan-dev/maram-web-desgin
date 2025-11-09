const path = document.getElementById('arrow-path');
const btn = document.getElementById('arrow-btn');

const length = path.getTotalLength();
path.style.strokeDasharray = length;
path.style.strokeDashoffset = length;
path.getBoundingClientRect(); // force reflow

function update(){
  const sc = window.scrollY || window.pageYOffset;
  const doc = document.documentElement.scrollHeight - window.innerHeight;
  const pct = doc > 0 ? sc / doc : 1;
 
  path.style.strokeDashoffset = Math.max(length * (1 - pct), 0);


  let fo = 0;
  if (pct >= 0.6) fo = Math.min(1, (pct - 0.6) / 0.35);
  path.style.fill = getComputedStyle(path).stroke;
  path.style.fillOpacity = fo;
}

update();
window.addEventListener('scroll', update, {passive:true});
window.addEventListener('resize', update);

btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));