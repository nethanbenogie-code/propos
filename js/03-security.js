/* ============================================================
   MLEA POS v6.0 — 03-security.js
   PIN hashing (SHA-256 + salt), session timer, lockout
   Part of a multi-file build. Load order matters — see index.html.
   Shares global scope with sibling modules (no import/export).
   ============================================================ */

// ════════════════════════════════════════════
// PIN HASHING — Web Crypto API (SHA-256 + salt)
// Replaces plaintext PIN storage.
// Format stored: "salt:hash" where both are hex strings.
// ════════════════════════════════════════════
async function hashPIN(pin, salt) {
  // Generate a random salt if not provided (new PINs)
  if (!salt) {
    const arr = crypto.getRandomValues(new Uint8Array(16));
    salt = Array.from(arr).map(b => b.toString(16).padStart(2,'0')).join('');
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(salt + pin);
  const hashBuf = await crypto.subtle.digest('SHA-256', data);
  const hashHex = Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2,'0')).join('');
  return { hash: hashHex, salt, stored: salt + ':' + hashHex };
}

async function verifyPIN(pin, stored) {
  // Support legacy plaintext PINs (migration path)
  if (!stored || !stored.includes(':')) {
    // Legacy: direct comparison, then auto-upgrade on success
    return stored === pin ? 'legacy' : false;
  }
  const [salt, expectedHash] = stored.split(':');
  const { hash } = await hashPIN(pin, salt);
  return hash === expectedHash ? 'hashed' : false;
}

async function hashAndStorePIN(userId, pin) {
  const { stored } = await hashPIN(pin);
  const u = LocalDB.getById('users', userId);
  if (u) { u.pin = stored; LocalDB.update('users', u); }
  if (storageMode === 'firebase') {
    const fu = FirebaseDB.getById('users', userId);
    if (fu) { fu.pin = stored; FirebaseDB.update('users', fu); }
  }
  return stored;
}

// Migrate all plaintext PINs to hashed on first run
async function migratePlaintextPINs() {
  const users = LocalDB.getAll('users');
  let migrated = 0;
  for (const u of users) {
    if (u.pin && !u.pin.includes(':')) {
      // Plaintext detected — hash it
      const { stored } = await hashPIN(u.pin);
      u.pin = stored;
      LocalDB.update('users', u);
      if (storageMode === 'firebase') {
        const fu = FirebaseDB.getById('users', u.id);
        if (fu) { fu.pin = stored; FirebaseDB.update('users', fu); }
      }
      migrated++;
    }
  }
  if (migrated > 0) {
    console.log(`PIN migration: ${migrated} user(s) upgraded to hashed storage`);
    logAct('Security', `PIN hashing migration: ${migrated} user(s) upgraded`);
  }
  return migrated;
}

function resetSesTimer(){
  clearTimeout(sesTimer);clearTimeout(sesWarnTimer);if(!currentUser)return;
  const mins=parseInt(getSetting('ses_timeout','30'))||30;
  const ms=mins*60*1000;
  // Warn 60 seconds before expiry
  sesWarnTimer=setTimeout(()=>{
    if(currentUser)toast('⏱ Session expiring in 60 seconds. Tap anywhere to stay logged in.','gold',10000);
  },Math.max(0,ms-60000));
  sesTimer=setTimeout(()=>{if(currentUser){toast('Session expired — please sign in again','gold');logout();}},ms);
}
let sesWarnTimer=null;
document.addEventListener('click',resetSesTimer);
document.addEventListener('keydown',resetSesTimer);

function chkLock(){
  if(Date.now()<pinLockUntil){
    const sec=Math.ceil((pinLockUntil-Date.now())/1000);
    const lb=document.getElementById('lockoutBar');
    if(lb){lb.style.display='block';lb.textContent='🔒 Too many failed attempts. Try again in '+sec+'s';}
    document.querySelectorAll('.pbn').forEach(b=>b.disabled=true);
    setTimeout(chkLock,1000);return true;
  }
  const lb=document.getElementById('lockoutBar');if(lb)lb.style.display='none';
  document.querySelectorAll('.pbn').forEach(b=>b.disabled=false);
  pinFails=0;return false;
}

