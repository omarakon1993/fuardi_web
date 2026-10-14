import ftplib, os, ssl, sys, time
# Publica out/ en public_html por FTPS. La clave va en la variable FTP_PWD
# (nunca en el repositorio). Uso: FTP_PWD=... python scripts/desplegar.py
# El .htaccess del servidor lo administra cPanel: solo se sube con --htaccess.
HOST="cpanel5-co.conexcol.net"; USER="fuardico"; PWD=os.environ["FTP_PWD"]
RAIZ="out"; DEST="public_html"
ctx=ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
def conectar():
    f=ftplib.FTP_TLS(context=ctx, timeout=60); f.connect(HOST,21); f.login(USER,PWD); f.prot_p(); f.set_pasv(True); return f
ftp=conectar()
dirs=set()
def asegurar(d):
    partes=d.split("/"); acum=""
    for p in partes:
        acum=f"{acum}/{p}" if acum else p
        if acum in dirs: continue
        try: ftp.mkd(acum)
        except ftplib.error_perm: pass
        dirs.add(acum)
archivos=[]
for r,_,fs in os.walk(RAIZ):
    for n in fs:
        loc=os.path.join(r,n); rel=os.path.relpath(loc,RAIZ).replace("\\","/"); archivos.append((loc,rel))
# primero lo que no es .htaccess; el .htaccess al final
if "--htaccess" not in sys.argv:
    archivos=[a for a in archivos if a[1]!=".htaccess"]
ok=0; mal=[]
for loc,rel in archivos:
    remoto=f"{DEST}/{rel}"; tam=os.path.getsize(loc)
    for intento in range(5):
        try:
            asegurar(os.path.dirname(remoto)) if "/" in remoto else None
            ftp.voidcmd("TYPE I")
            try:
                if ftp.size(remoto)==tam: ok+=1; break
            except Exception: pass
            with open(loc,"rb") as fh: ftp.storbinary(f"STOR {remoto}",fh)
            ok+=1; break
        except Exception as e:
            print("reintento",rel,e,flush=True); time.sleep(2)
            try: ftp.close()
            except Exception: pass
            ftp=conectar(); dirs.clear()
    else: mal.append(rel)
print("subidos",ok,"de",len(archivos),"fallidos",mal)
