/*
    ooffer.js
        If you set this js at your website, you can show ads to your post reader when they 
        scroll on your post or stay at your post.
*/

/* =================== START @Mustchange ===================== */

// ads list img : image location / link : link to move
const __oofferAdsList = [
    {img: '/test1.gif', link: 'https://github.com/kokomai', contents: "coding-orca want you!"},
    {img: '/test2.gif', link: 'https://github.com/kokomai?tab=repositories', contents: "hello! I'm coding-orca"},
    {img: '/test3.jpg', link: 'https://github.com/kokomai/ooffer', contents: "hello! this is ooffer !"},
]
/**
 * options
 *  {
 *      type : s(small size), m(medium size), l(large size) / default : medium
 *      maxScore : max of user's action score.. if user read your post(by scrolling, or spend their time)
 *              the sore is improve, when score is filled as this option then show this ooffer popup
 *              / default : 100
 *      scrollScore : when user scroll on your post, score beeing increased as this value
 *                    / default : 3
 *      stayScore : when user stay on your post, score beeing increased as this value
 *                  / default : 5
 *  }
 */
let __oofferOptions = {
    title: "AD",
    type: "l",
    maxScore : 100,
    scrollScore : 3,
    stayScore : 5,
    overlayCss : ` 
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.7);
        transition: opacity 500ms;
        visibility: visible;
        opacity: 999;
    `,
    popupDivCss : `
        margin: 70px auto;
        padding: 20px;
        background: #fff;
        border-radius: 5px;
        width: 50%;
        height: 70%;
        position: relative;
        transition: all 5s ease-in-out;
    `,
    titleCss : `
        margin-top: 0;
        color: #333;
        font-family: Tahoma, Arial, sans-serif;
    `,
    closeCss : `
        position: absolute;
        top: 20px;
        right: 30px;
        transition: all 200ms;
        font-size: 30px;
        font-weight: bold;
        text-decoration: none;
        color: #333;
    `,
    contentsCss : `
        display:inline-block;
        width:100%;
        height:100%;
    `,
    imgCss : `
        width:100%;
        height:90%
    `
}
/* =================== END @Mustchange ===================== */

const __oofferDiv = document.createElement('div');
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
    show : function() {
        document.getElementById("_ooffer").hidden = false;
    },
    close : function() {
        document.getElementById("_ooffer").hidden = true;
    },
    random : function() {
        let min = Math.ceil(0);
        let max = Math.floor(__oofferAdsList.length -1);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    checkScore : function() {
        if(OOFFER.maxScore <= OOFFER.score) {
            window.clearInterval(OOFFER.ticking);
            window.removeEventListener("scroll", OOFFER.scrolling);
            OOFFER.show();
        }
    },
    scrolling : function() {
        OOFFER.score = OOFFER.score + OOFFER.scrollScore;
        console.log(OOFFER.score);
        OOFFER.checkScore();
    },
    set : function() {
        let div = document.getElementById('_ooffer');
        div.setAttribute("hidden", true);
        
        let overlay = document.createElement('div');
        overlay.style.cssText = __oofferOptions.overlayCss

        overlay.addEventListener("click", function(event) {
            if(overlay !== event.target) return;
            OOFFER.close();
        });
        div.append(overlay);

        let popupDiv = document.createElement('div');
        popupDiv.style.cssText = __oofferOptions.popupDivCss

        if(__oofferOptions.type === "l") {
            popupDiv.style.width = "60%";
            popupDiv.style.height = "80%";
        } else if(__oofferOptions.type === "s") {
            popupDiv.style.width = "30%";
            popupDiv.style.height = "50%";
        }

        let nans = OOFFER.random();
        let innerHtml = "<h2 style='"
                    + __oofferOptions.titleCss
                    + "'>"
                    + __oofferOptions.title
                    + "</h2>"
                    + "<a class='close' href='javascript:void(0);' onclick='OOFFER.close();' style='"
                    + __oofferOptions.closeCss
                    +"'>&times;</a>"
                    + "<div class='content' style='"
                    + __oofferOptions.contentsCss
                    + "'>"
                    + __oofferAdsList[nans].contents
                    + "<img src='"
                    + __oofferAdsList[nans].img
                    + "' onclick='location.href=\""
                    + __oofferAdsList[nans].link
                    + "\"' style='"
                    + __oofferOptions.imgCss
                    + "'>"
                    + "</div>"
        popupDiv.innerHTML = innerHtml;
        overlay.append(popupDiv);
        OOFFER['maxScore'] = __oofferOptions.maxScore;
        OOFFER['score'] = 0;
        OOFFER['stayScore'] = __oofferOptions.stayScore;
        OOFFER['scrollScore'] = __oofferOptions.scrollScore;
        OOFFER['ticking'] = setInterval(function() {
            OOFFER.score = OOFFER.score + OOFFER.stayScore;
            console.log(OOFFER.score);
            OOFFER.checkScore();
        }, 1000);
        window.addEventListener("scroll", OOFFER.scrolling);
        
        // https://codepen.io/imprakash/pen/GgNMXO
    }
}


OOFFER.set();
