// Preferencias de lectura guardadas en localStorage y aplicadas como
// atributos en <html> (ver globals.css).

export const CLAVE_TEXTO = "fuardi:texto";
export const CLAVE_CONTRASTE = "fuardi:contraste";
export const TEXTO_MIN = -1;
export const TEXTO_MAX = 3;

/**
 * Script en línea que corre antes de pintar la página, para que no parpadee
 * el tamaño de texto ni el contraste elegidos.
 */
export const scriptPreferencias = `(function(){try{var d=document.documentElement;var t=localStorage.getItem("${CLAVE_TEXTO}");if(t&&t!=="0")d.setAttribute("data-texto",t);if(localStorage.getItem("${CLAVE_CONTRASTE}")==="alto")d.setAttribute("data-contraste","alto");}catch(e){}})();`;
