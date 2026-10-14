# Publicar el sitio en Conexcol

1. `npm run build` genera `out/`.
2. `FTP_PWD='<clave de cPanel>' python scripts/desplegar.py` sube `out/` a `public_html` por FTPS (servidor `cpanel5-co.conexcol.net`, usuario `fuardico`). Omite lo que ya está igual y reintenta si el servidor corta la conexión.
3. Revisa https://www.fuardi.com/.

El `.htaccess` del servidor lo administra cPanel (trae las directivas de PHP). La primera vez se fusionó con `public/.htaccess`. Para volver a subirlo usa `--htaccess`, pero antes agrega al final del archivo el bloque que cPanel tenga en ese momento.
