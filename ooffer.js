/*
    ooffer.js
        If you set this js at your website, you can show ads to your post reader when they 
        scroll on your post or stay at your post.
*/

/**
 * @Mustchange
 *  */ 
// css location
const __oofferCssLocation = '/ooffer.css'
// ads list img : image location / link : link to move
const __oofferAdsList = [
    {img: '/test1.gif', link: 'https://github.com/kokomai', contents: "coding-orca want you!"},
    {img: '/test2.gif', link: 'https://github.com/kokomai?tab=repositories', contents: "hello! I'm coding-orca"},
    {img: '/test3.jpg', link: 'https://github.com/kokomai/ooffer', contents: "hello! this is ooffer !"},
]
/**
 * options
 *  {
 *      type : small(small size), medium(medium size), large(large size) / default : medium
 *      maxScore : max of user's action score.. if user read your post(by scrolling, or spend their time)
 *              the sore is improve, when score is filled as this option then show this ooffer popup
 *              / default : 100
 *      scrollScore : when user scroll on your post, score will increasing as this value
 *                    / default : 3
 *      stayScore : when user stay on your post, score will increasing as this value
 *                  / default : 5
 *  }
 */
let __ooferOptions = {
    title: "AD",
    type: "medium",
    maxScore : 100,
    scrollScore : 3,
    stayScore : 5,
}

const __oofferCss  = document.createElement('link');
__oofferCss.rel  = 'stylesheet';
__oofferCss.type = 'text/css';
__oofferCss.href = __oofferCssLocation;
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
        overlay.className = "overlay";
        overlay.addEventListener("click", function(event) {
            if(overlay !== event.target) return;
            OOFFER.close();
        });
        div.append(overlay);

        let popupDiv = document.createElement('div');
        popupDiv.className = "popup"+ " " + __ooferOptions.type

        let nans = OOFFER.random();
        let innerHtml = "<h2>"
                    + __ooferOptions.title
                    + "</h2>"
                    + "<a class='close' href='#' onclick='OOFFER.close();'>&times;</a>"
                    + "<div class='content'>"
                    + __oofferAdsList[nans].contents
                    + "<img src='"
                    + __oofferAdsList[nans].img
                    + "' onclick='location.href=\""
                    + __oofferAdsList[nans].link
                    + "\"'>"
                    + "</div>"
        popupDiv.innerHTML = innerHtml;
        overlay.append(popupDiv);
        OOFFER['maxScore'] = __ooferOptions.maxScore;
        OOFFER['score'] = 0;
        OOFFER['stayScore'] = __ooferOptions.stayScore;
        OOFFER['scrollScore'] = __ooferOptions.scrollScore;
        OOFFER['ticking'] = setInterval(function() {
            OOFFER.score = OOFFER.score + OOFFER.stayScore;
            console.log(OOFFER.score);
            OOFFER.checkScore();
        }, 1000);
        window.addEventListener("scroll", OOFFER.scrolling);
        
        // https://codepen.io/imprakash/pen/GgNMXO
    }


}

window.addEventListener("load", function() {
    OOFFER.set();
});