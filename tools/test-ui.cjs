 
const {app,BrowserWindow,ipcMain}=require('electron');
const fs=require('node:fs');
const path=require('node:path');
const os=require('node:os');
const assert=require('node:assert/strict');
const root=fs.mkdtempSync(path.join(os.tmpdir(),'daylight-ui-test-'));
app.setPath('userData',root);
const packs=[
  {id:'daylight',name:'Daylight',tags:['Competitive'],builtin:true,selected:true,modCount:12},
  {id:'custom-survival',name:'Amber valley',tags:['Survival','Friends'],selected:false,modCount:36},
  {id:'custom-creative',name:'Creative studio',tags:['Building'],selected:false,modCount:9}
].map(p=>({...p,version:'1.21.11',loader:'fabric',loaderLabel:'Fabric',hasMod:true,daylightMod:true,effectiveMaxRam:4,artwork:'',jvmArgs:'',desc:'Renderer test fixture',minRam:null,maxRam:null}));
const cfg={minRam:2,maxRam:4,javaPath:'',azureClientId:''};
const handlers={
 'get-env':()=>({preview:true}), 'get-config':()=>cfg, 'get-app-version':()=> '2.20.0-preview.1',
 'list-packs':()=>packs,'get-loaders':()=>[{id:'fabric',label:'Fabric'},{id:'forge',label:'Forge'}],
 'get-versions':()=>['26.2','1.21.11','1.20.1','1.19'], 'get-releases':()=>[], 'silent-login':()=>null,'list-accounts':()=>[],
 'local-index':()=>[{title:'sodium.jar',kind:'mods',packId:'daylight',packName:'Daylight',installed:true}],
 'search-catalog':()=>[{id:'sodium',title:'Sodium',description:'Rendering optimization',kind:'mods',packId:'daylight'},
   {id:'amber-textures',title:'Amber textures',description:'Resource pack fixture',kind:'resourcepacks',packId:'daylight'}],
 'select-pack':id=>{packs.forEach(p=>p.selected=p.id===id);},
 'instance-options':opts=>{Object.assign(packs.find(p=>p.id===opts.id),opts,{tags:opts.tags.split(',').map(s=>s.trim())});},
 'search-mods':()=>[{id:'sodium',title:'Sodium',installed:true}], 'list-mods':()=>[],
 'search-resourcepacks':({query,packId})=>[{id:'textures',title:(query||'First resource pack')+' / '+packId}], 'list-resourcepacks':()=>[]
};
for(const [channel,fn] of Object.entries(handlers))ipcMain.handle(channel,(_e,...args)=>({ok:true,data:fn(...args)}));
let w;
const timer=setTimeout(()=>{console.error('UI test timeout');app.exit(1);},20000);
app.whenReady().then(async()=>{
 w=new BrowserWindow({width:1280,height:820,show:false,webPreferences:{preload:path.join(__dirname,'../src/preload.js'),contextIsolation:true,nodeIntegration:false,backgroundThrottling:false,offscreen:true}});
 const errors=[];
 w.webContents.on('console-message',details=>{if(details.level==='error')errors.push(details.message);});
 await w.loadFile(path.join(__dirname,'../src/renderer/index.html'));
 const result=await w.webContents.executeJavaScript(`(async()=>{
   const assert=(v,msg)=>{if(!v)throw Error(msg);};
   for(let i=0;i<50&&!document.querySelector('.instance-card');i++)await new Promise(r=>setTimeout(r,30));
   assert(document.querySelectorAll('#home-instance-grid .instance-card').length===3,'dashboard cards missing');
   assert(getComputedStyle(document.querySelector('#pack-select')).display==='none','old dropdown is visible');
   assert(document.querySelector('#selected-instance-name').textContent==='Daylight','selected instance name');
   assert(document.querySelector('#sandbox-badge').textContent.includes('DAYLIGHT PREVIEW'),'preview isolation label');
   document.querySelectorAll('#home-instance-grid .instance-select')[1].click();
   await new Promise(r=>setTimeout(r,80));
   assert(document.querySelector('#selected-instance-name').textContent==='Amber valley','instance selection');
   document.querySelector('#home-instance-grid .instance-gear').click();
   assert(document.querySelector('#instance-dialog').open,'settings dialog');
   document.querySelector('#instance-tags').value='Test, Fast';
   document.querySelector('#instance-save').click();await new Promise(r=>setTimeout(r,80));
   assert(!document.querySelector('#instance-dialog').open,'save did not close dialog');
   document.querySelector('#global-search-open').click();await new Promise(r=>setTimeout(r,350));
   assert(document.querySelector('#global-results').textContent.includes('sodium.jar'),'local search');
   assert(document.querySelector('#global-results').textContent.includes('Rendering optimization'),'remote search');
   document.querySelector('#global-search-close').click();
   document.querySelector('#new-instance-home').click();assert(document.querySelector('#pack-dialog').open,'new instance');
   assert([...document.querySelector('#new-pack-version').options].every(o=>!o.value.startsWith('1.18')),'legacy versions visible');
   document.querySelector('#pack-create-cancel').click();
   document.querySelector('[data-tab="mods"]').click();await new Promise(r=>setTimeout(r,100));
   assert(document.querySelector('#mod-search').value==='','default mod search is not blank');
   assert(document.querySelector('#mod-results').textContent.includes('Sodium'),'default mod browse page missing');
   assert(document.querySelector('#mod-results button').disabled,'installed mod can be installed twice');
   document.querySelector('[data-tab="resourcepacks"]').click();await new Promise(r=>setTimeout(r,100));
   assert(document.querySelector('#rp-search').value==='','default resource pack search is not blank');
   assert(document.querySelector('#rp-results').textContent.includes('First resource pack'),'default resource pack browse page missing');
   document.querySelector('#global-search-open').click();await new Promise(r=>setTimeout(r,350));
   [...document.querySelectorAll('.search-hit')].find(b=>b.textContent.includes('Amber textures')).click();
   await new Promise(r=>setTimeout(r,100));
   assert(document.querySelector('#rp-results').textContent.includes('Amber textures / custom-survival'),'palette kept stale resource results or wrong target');
   document.querySelector('[data-tab="home"]').click();
   assert(!document.querySelector('dialog[open]'),'dialog left open after search navigation');
   const menu=document.querySelector('#acct-menu');
   menu.classList.remove('hidden');
   const menuRect=menu.getBoundingClientRect();
   assert(menu.contains(document.elementFromPoint(menuRect.left+10,menuRect.top+10)),'account menu is behind page content');
   menu.classList.add('hidden');
   const rail=document.querySelector('.rail');
   const probe=document.createElement('div');
   probe.style.cssText='position:absolute;left:100%;top:200px;width:200px;height:50px;z-index:50;background:red';
   rail.append(probe);
   const probeRect=probe.getBoundingClientRect();
   assert(document.elementFromPoint(probeRect.left+10,probeRect.top+10)===probe,'sidebar overlay is behind page content');
   probe.remove();
   return {cards:document.querySelectorAll('#home-instance-grid .instance-card').length,overflow:document.documentElement.scrollWidth>innerWidth};
 })()`);
 assert.equal(result.overflow,false);
  
 await new Promise(resolve=>setTimeout(resolve,300));
 fs.mkdirSync(path.join(__dirname,'../out'),{recursive:true});
 fs.writeFileSync(path.join(__dirname,'../out/workspace-fixture.png'),(await w.webContents.capturePage()).toPNG());
 await w.setSize(940,620);
 assert.equal(await w.webContents.executeJavaScript('document.documentElement.scrollWidth > innerWidth'),false);
 if(errors.length)throw Error(errors.join('\n'));
 console.log('PASS: dashboard, instance selection/settings, preview isolation label, local + remote search, default mod/resource browse, Installed button, palette target, version floor, minimum window size');
 clearTimeout(timer);app.exit(0);
}).catch(e=>{console.error(e);clearTimeout(timer);app.exit(1);});
