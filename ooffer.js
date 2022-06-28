/*
    ooffer.js
*/

const __oofferCss  = document.createElement('link');
__oofferCss.rel  = 'stylesheet';
__oofferCss.type = 'text/css';
__oofferCss.href = '/ooffer.css';
document.getElementsByTagName('head')[0].appendChild(__oofferCss);

const __oofferDiv = document.createElement('div');
__oofferDiv.className = ['_ooffer'];
__oofferDiv.id = '_ooffer';
document.getElementsByTagName('body')[0].appendChild(__oofferDiv);

const OOFFER = {
    replaceAll : function(str, org, dest) {
        return str.split(org).join(dest);
    },
    isEmpty : function(obj) {
        if(!obj || obj === undefined || obj === null)  {
            return true;
        }

        if(Array.isArray(obj) && obj.length === 0) {
            return true;
        } else if(typeof obj === 'string' && this.replaceAll(obj, " ", "") === "") {
            return true;
        } else if(typeof obj === 'object' && Object.keys(obj).length === 0) {
            return true;
        }

        return false;
    },
    set : function(options = {}) {
        let div = document.getElementById('_ooffer');
        
        let overlay = document.createElement('div');
        overlay.className = "overlay";
        div.append(overlay);

        let popupDiv = document.createElement('div');
        popupDiv.className = "popup"+ " " + (this.isEmpty(options.type) ? "medium" : options.type);
        
        let innerHtml = "<h2>"
                    + (this.isEmpty(options.title) ? "title" : options.title)
                    + "</h2>"
                    + "<a class='close' href='#'>&times;</a>"
                    + "<div class='content'>"
                    + (this.isEmpty(options.content) ? "for you!" : options.content)
                    + "</div>"
        popupDiv.innerHTML = innerHtml;
        overlay.append(popupDiv);
    }


}

window.addEventListener("load", function() {
    OOFFER.set();
});