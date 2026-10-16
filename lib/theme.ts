export const THEME_STORAGE_KEY = "crowbar-theme";

/**
 * Runs in <head> before first paint so the stored theme applies without a flash.
 * Dark is the default; only an explicit "light" choice removes it.
 */
export const themeInitScript = `(function(){try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="light"){document.documentElement.classList.remove("dark")}}catch(e){}})();`;
