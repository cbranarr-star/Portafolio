/* Mini librería de gráficos SVG (sin dependencias) */
const Dash=(()=>{
  const NS='http://www.w3.org/2000/svg';
  const tip=document.createElement('div');tip.className='tip';tip.setAttribute('role','tooltip');document.body.appendChild(tip);
  const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
  function showTip(ev,title,rows){
    tip.innerHTML='<b>'+title+'</b>'+rows.map(r=>'<div><span>'+(r.c?'<i style="background:'+r.c+'"></i>':'')+r.n+'</span><span>'+r.v+'</span></div>').join('');
    tip.style.opacity=1;const w=tip.offsetWidth,h=tip.offsetHeight;
    let x=ev.clientX+14,y=ev.clientY+14;if(x+w>innerWidth-8)x=ev.clientX-w-14;if(y+h>innerHeight-8)y=ev.clientY-h-14;
    tip.style.left=x+'px';tip.style.top=y+'px';
  }
  const hide=()=>tip.style.opacity=0;
  function nice(max){const p=Math.pow(10,Math.floor(Math.log10(max||1)));const f=max/p;const n=f<=1?1:f<=2?2:f<=2.5?2.5:f<=5?5:10;return n*p}
  function legend(host,series){
    const d=document.createElement('div');d.className='legend';
    d.innerHTML=series.map(s=>'<span><i style="background:'+s.color+'"></i>'+s.name+'</span>').join('');host.parentNode.insertBefore(d,host);
  }
  /* barras verticales apiladas o simples. opts:{cats,series:[{name,color,vals}],fmt,axisFmt,stack,h,rot} */
  function vbars(host,o){
    host.innerHTML='';const W=host.clientWidth||600,H=o.h||260,m={t:12,r:8,b:o.rot?44:26,l:46};
    const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':o.title||'gráfico'},host);
    const n=o.cats.length,iw=W-m.l-m.r,ih=H-m.t-m.b;
    const tot=o.cats.map((_,i)=>o.series.reduce((a,s)=>a+s.vals[i],0));
    const maxv=o.stack?Math.max(...tot):Math.max(...o.series.flatMap(s=>s.vals));
    const top=nice(maxv*1.05),y=v=>m.t+ih-v/top*ih;
    for(let k=0;k<=4;k++){const v=top/4*k;el('line',{x1:m.l,x2:W-m.r,y1:y(v),y2:y(v),stroke:css('--grid'),'stroke-width':1},svg);
      const t=el('text',{x:m.l-6,y:y(v)+4,'text-anchor':'end'},svg);t.textContent=(o.axisFmt||o.fmt)(v)}
    const bw=iw/n,gap=Math.min(10,bw*.2),ns=o.stack?1:o.series.length;
    o.cats.forEach((c,i)=>{
      const x0=m.l+i*bw+gap/2,w=bw-gap;
      const g=el('g',{},svg);
      let acc=0;
      o.series.forEach((s,j)=>{
        const v=s.vals[i];if(!v)return;
        let x,bwid,yy,hh;
        if(o.stack){x=x0;bwid=w;yy=y(acc+v);hh=y(acc)-y(acc+v);acc+=v}
        else{bwid=(w-(ns-1)*2)/ns;x=x0+j*(bwid+2);yy=y(v);hh=y(0)-y(v)}
        const r=el('rect',{x,y:yy+(o.stack&&j>0?0:0),width:Math.max(bwid,1),height:Math.max(hh-(o.stack?2:0),0),rx:2,fill:s.color,class:'bar-in',style:`animation-delay:${i*25}ms;transform-box:fill-box`},g);
      });
      const hit=el('rect',{x:m.l+i*bw,y:m.t,width:bw,height:ih,fill:'transparent',class:'hit',tabindex:0},svg);
      const rows=o.series.map(s=>({c:s.color,n:s.name,v:o.fmt(s.vals[i])}));
      if(o.stack&&o.series.length>1)rows.push({n:'Total',v:o.fmt(tot[i])});
      hit.addEventListener('mousemove',e=>showTip(e,c,rows));hit.addEventListener('mouseleave',hide);
      hit.addEventListener('focus',()=>{const b=hit.getBoundingClientRect();showTip({clientX:b.left+b.width/2,clientY:b.top+20},c,rows)});hit.addEventListener('blur',hide);
      if(!o.rot||n<=14){const t=el('text',{x:m.l+i*bw+bw/2,y:H-(o.rot?m.b-14:8),'text-anchor':'middle'},svg);t.textContent=c}
    });
    return svg;
  }
  /* barras horizontales apiladas. opts:{cats,series,fmt,stack,pct,barH,labelW,total} */
  function hbars(host,o){
    host.innerHTML='';const W=host.clientWidth||600,bh=o.barH||20,gp=o.gap||10,lw=Math.min(o.labelW||130,W*.38);
    const m={t:4,r:o.total?70:14,b:20,l:lw};const n=o.cats.length;const H=m.t+m.b+n*(bh+gp);
    const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':o.title||'gráfico'},host);
    const tot=o.cats.map((_,i)=>o.series.reduce((a,s)=>a+s.vals[i],0));
    const maxv=o.pct?1:Math.max(...tot);const iw=W-m.l-m.r;const x=v=>v/maxv*iw;
    const ticks=o.pct?[0,.25,.5,.75,1]:[0,1,2,3,4].map(k=>nice(maxv)/4*k);
    ticks.forEach(v=>{if(x(v)>iw+1)return;el('line',{x1:m.l+x(v),x2:m.l+x(v),y1:m.t,y2:H-m.b,stroke:css('--grid')},svg);
      const t=el('text',{x:m.l+x(v),y:H-5,'text-anchor':'middle'},svg);t.textContent=o.pct?Math.round(v*100)+'%':(o.axisFmt||o.fmt)(v)});
    o.cats.forEach((c,i)=>{
      const yy=m.t+i*(bh+gp);let acc=0;
      const t=el('text',{x:m.l-8,y:yy+bh/2+4,'text-anchor':'end',class:'lbl'},svg);t.textContent=c;
      o.series.forEach(s=>{const v=o.pct?(tot[i]?s.vals[i]/tot[i]:0):s.vals[i];if(!v)return;
        el('rect',{x:m.l+x(acc),y:yy,width:Math.max(x(v)-(acc>0?2:0),1),height:bh,rx:3,fill:s.color,transform:`translate(${acc>0?2:0},0)`},svg);acc+=v});
      if(o.total){const t2=el('text',{x:m.l+x(acc)+6,y:yy+bh/2+4,class:'val'},svg);t2.textContent=o.total(i,tot[i])}
      const hit=el('rect',{x:0,y:yy-gp/2,width:W,height:bh+gp,fill:'transparent',class:'hit',tabindex:0},svg);
      const rows=o.series.map(s=>({c:s.color,n:s.name,v:o.fmt(s.vals[i])+(o.pct&&tot[i]?' · '+(s.vals[i]/tot[i]*100).toFixed(1)+'%':'')}));
      if(o.series.length>1)rows.push({n:'Total',v:o.fmt(tot[i])});
      hit.addEventListener('mousemove',e=>showTip(e,c,rows));hit.addEventListener('mouseleave',hide);
      hit.addEventListener('focus',()=>{const b=hit.getBoundingClientRect();showTip({clientX:b.left+b.width/2,clientY:b.top},c,rows)});hit.addEventListener('blur',hide);
    });
  }
  /* líneas con crosshair. opts:{cats,series,fmt,h,area} */
  function line(host,o){
    host.innerHTML='';const W=host.clientWidth||600,H=o.h||260,m={t:14,r:14,b:26,l:46};
    const svg=el('svg',{viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':o.title||'gráfico'},host);
    const n=o.cats.length,iw=W-m.l-m.r,ih=H-m.t-m.b;
    const top=nice(Math.max(...o.series.flatMap(s=>s.vals))*1.05);const X=i=>m.l+(n>1?i/(n-1)*iw:iw/2),Y=v=>m.t+ih-v/top*ih;
    for(let k=0;k<=4;k++){const v=top/4*k;el('line',{x1:m.l,x2:W-m.r,y1:Y(v),y2:Y(v),stroke:css('--grid')},svg);
      const t=el('text',{x:m.l-6,y:Y(v)+4,'text-anchor':'end'},svg);t.textContent=(o.axisFmt||o.fmt)(v)}
    const step=Math.ceil(n/(W<520?6:12));
    o.cats.forEach((c,i)=>{if(i%step)return;const t=el('text',{x:X(i),y:H-8,'text-anchor':'middle'},svg);t.textContent=c});
    o.series.forEach(s=>{
      const pts=s.vals.map((v,i)=>[X(i),Y(v)]);
      if(o.area){el('path',{d:'M'+pts.map(p=>p.join(',')).join('L')+`L${X(n-1)},${Y(0)}L${X(0)},${Y(0)}Z`,fill:s.color,opacity:.12},svg)}
      el('path',{d:'M'+pts.map(p=>p.join(',')).join('L'),fill:'none',stroke:s.color,'stroke-width':2.5,'stroke-linejoin':'round','stroke-linecap':'round'},svg);
      if(n<=14)pts.forEach(p=>el('circle',{cx:p[0],cy:p[1],r:3.5,fill:s.color,stroke:css('--surface'),'stroke-width':2},svg));
    });
    const cl=el('line',{y1:m.t,y2:m.t+ih,stroke:css('--muted'),'stroke-dasharray':'3 3',opacity:0},svg);
    const hit=el('rect',{x:m.l,y:m.t,width:iw,height:ih,fill:'transparent',class:'hit'},svg);
    hit.addEventListener('mousemove',e=>{const b=svg.getBoundingClientRect();const px=(e.clientX-b.left)*W/b.width;const i=Math.max(0,Math.min(n-1,Math.round((px-m.l)/iw*(n-1))));
      cl.setAttribute('x1',X(i));cl.setAttribute('x2',X(i));cl.setAttribute('opacity',1);
      showTip(e,o.cats[i],o.series.map(s=>({c:s.color,n:s.name,v:o.fmt(s.vals[i])})))});
    hit.addEventListener('mouseleave',()=>{cl.setAttribute('opacity',0);hide()});
  }
  function table(host,cols,rows){
    host.innerHTML='<div class="tablewrap"><table class="dt"><thead><tr>'+cols.map(c=>'<th>'+c+'</th>').join('')+'</tr></thead><tbody>'+
      rows.map(r=>'<tr>'+r.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
  }
  /* registra un gráfico con botón "Ver tabla" y re-render al cambiar tamaño */
  const reg=[];
  function mount(card,draw,tbl){
    const host=card.querySelector('.chart');const tools=document.createElement('div');tools.className='tools';
    const b=document.createElement('button');b.className='tbtn';b.type='button';b.textContent='Ver tabla';b.setAttribute('aria-pressed','false');tools.appendChild(b);host.parentNode.insertBefore(tools,host);
    let tv=false;const render=()=>{tv?tbl(host):draw(host)};
    b.onclick=()=>{tv=!tv;b.textContent=tv?'Ver gráfico':'Ver tabla';b.setAttribute('aria-pressed',tv);render()};
    reg.push(()=>{if(!tv)draw(host)});render();
  }
  let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>reg.forEach(f=>f()),120)});
  /* avisar la altura al portal (iframe) */
  const post=()=>{try{parent.postMessage({dashHeight:Math.ceil(document.querySelector('.wrap').getBoundingClientRect().height)+4},'*')}catch(e){}};
  addEventListener('load',()=>{post();setTimeout(post,600)});addEventListener('resize',()=>setTimeout(post,200));
  return{vbars,hbars,line,table,legend,mount};
})();
