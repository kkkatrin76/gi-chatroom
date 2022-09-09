const version = 1.2;
const defaultTimeoutMs = 1500;
const defaultChoiceTimeoutMs = 2000;

var chats = {};
var chars = [];
var char = null;
var name = "[name]";
var chatHTML = "";
var choiceHTML = "";
var lastChatIndex = -1;
var choicesSelection = [];
var choiceSelected = "";

var playChat = null;
var playTimeout = null;

function appendVersion() {
    document.getElementById('version').innerHTML = "v" + version;
}

function getBg() {
    let main = document.getElementById('main');
    let hours = new Date().getHours();

    if (hours >= 6 && hours <= 12) {
        main.style.backgroundImage = "url('bg/day.jpeg')";
    } else if (hours > 12 && hours <= 19) {
        main.style.backgroundImage = "url('bg/evening.jpg')";
    } else {
        main.style.backgroundImage = "url('bg/night.jpeg')";
    }
}

function getName() {
    name = localStorage.getItem("name");
    if (!name || name == undefined || name === "null") {
        name = prompt("Please enter your name", "[name]");
        if (!name || name == undefined || name === "null") {
            name = "[name]";
        }
        localStorage.setItem("name", name);
    }

    if(window.innerHeight > window.innerWidth) {
        alertOrientation();
    }

    initChats();
    constructChatList();
}

function initChats() {
    chats = {
        "albedo": [
            {
                type: "ts",
                content: "19:11",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "a1-1",
                    emote: "emote/albedo1.png"
                }],
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/albedo2.png`
            }, {
                type: "text",
                dir: "in",
                content: `What's wrong, ${name}?`
            }, {
                type: "choice",
                content: [{
                    key: "a2-1",
                    text: "I need cuddles..."
                }, {
                    key: "a2-2",
                    text: "Nothing...."
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                showif: "a2-1",
                content: `Oh, my apologies, it seems like I have been too focused on my experiments again.`,
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                showif: "a2-1",
                content: `I'll come over the soonest I can.`
            }, {
                type: "text",
                dir: "in",
                showif: "a2-2",
                content: `Are you sure?`,
                timeout: 3500
            }, {
                type: "text",
                dir: "in",
                showif: "a2-2",
                content: `Hmmm.`
            }, {
                type: "text",
                dir: "in",
                showif: "a2-2",
                content: `I think I know what you're thinking.`
            }, {
                type: "text",
                dir: "in",
                content: `Will you wait for me?`
            }, {
                type: "text",
                dir: "in",
                showif: "a2-2",
                content: `I'll be there soon.`
            }, {
                type: "choice",
                content: [{
                    key: "a3-1",
                    text: "❤️"
                }]
            }, {
                type: "emote",
                dir: "in",
                content: `emote/albedo3.png`
            }
        ],
        "alhaitham": [
            {
                type: "ts",
                content: "10:47",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Where is my coat?`
            }, {
                type: "choice",
                content: [{
                    key: "a1-1",
                    text: "ummmmmm"
                }, {
                    key: "a1-2",
                    text: "why are you asking me?"
                }],
                timeout: 1500
            }, {
                type: "text",
                dir: "in",
                content: `${name}.`,
                showif: "a1-1"
            }, {
                type: "text",
                dir: "in",
                content: `Why do you keep doing this?`,
                showif: "a1-1",
                timeout: 2000,
            }, {
                type: "text",
                dir: "in",
                content: `I don't believe this kleptomaniac trait of yours applies to anyone else.`,
                showif: "a1-1",
                timeout: 2000,
            }, {
                type: "text",
                dir: "in",
                content: `I don't know, because you are currently wearing it?`,
                showif: "a1-2"
            }, {
                type: "choice",
                content: [{
                    key: "a2-1",
                    text: "you don't know that"
                }, {
                    key: "a2-2",
                    text: "........ 😬"
                }],
                timeout: 2500,
                showif: "a1-2"
            }, {
                type: "text",
                dir: "in",
                content: `I do, actually.`,
                showif: "a2-1"
            }, {
                type: "text",
                dir: "in",
                content: `Tighnari sent a photo to the group chat.`,
                showif: "a2-1"
            }, {
                type: "text",
                dir: "in",
                content: `Why can't you just buy your own jacket?`,
                timeout: 2000,
            }, {
                type: "text",
                dir: "in",
                content: `I can accompany you shopping if you want to.`
            }, {
                type: "choice",
                content: [{
                    key: "a3-1",
                    text: "really?"
                }, {
                    key: "a3-2",
                    text: "but your coat is nicer <3"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `If it means you will stop stealing my coat, then yes, really.`,
                showif: "a3-1",
                timeout: 2500,
            }, {
                type: "text",
                dir: "in",
                content: `Will you be free this evening?`,
                showif: "a3-1"
            }, {
                type: "choice",
                content: [{
                    key: "a4-1",
                    text: "i can free it up!!"
                }, {
                    key: "a4-2",
                    text: "mhm!"
                }],
                timeout: 2500,
                showif: "a3-1"
            }, {
                type: "text",
                dir: "in",
                content: `Meet me at the library then.`,
                showif: ["a4-1","a4-2"]
            }, {
                type: "text",
                dir: "in",
                content: `And bring my damn coat.`,
                showif: ["a4-1","a4-2"]
            }, {
                type: "choice",
                content: [{
                    key: "a4-1",
                    text: "yes sir~"
                }],
                timeout: 2500,
                showif: ["a4-1","a4-2"]
            }, {
                type: "text",
                dir: "in",
                content: `Careful, sweetheart. You're on thin ice.`,
                showif: "a4-1"
            }, {
                type: "text",
                dir: "in",
                content: `You also steal my shirts.`,
                showif: "a3-2"
            }, {
                type: "choice",
                content: [{
                    key: "a5-1",
                    text: "cause!!! they smell like you <3"
                }, {
                    key: "a5-2",
                    text: "they're comfy!!!"
                }],
                timeout: 2500,
                showif: "a3-2"
            }, {
                type: "text",
                dir: "in",
                content: `.....`,
                showif: "a5-1"
            }, {
                type: "text",
                dir: "in",
                content: `Sometimes, you worry me, ${name}.`,
                showif: "a5-1"
            }, {
                type: "choice",
                content: [{
                    key: "a5-1",
                    text: "it's in your job description to worry and pamper me though, right :D"
                }],
                showif: "a5-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `A fair point.`,
                showif: "a5-1",
                timeout: 2000,
            }, {
                type: "text",
                dir: "in",
                content: `I did this to myself the moment we became a couple.`,
                showif: "a5-1",
                timeout: 2000,
            }, {
                type: "text",
                dir: "in",
                content: `Lucky for you, I find this as endearing as it is annoying.`,
                showif: "a5-1"
            }, {
                type: "text",
                dir: "in",
                content: `They're made of the same material as most of your shirts.`,
                showif: "a5-2"
            }, {
                type: "text",
                dir: "in",
                content: `Your argument is invalid.`,
                showif: "a5-2"
            }, {
                type: "choice",
                content: [{
                    key: "a5-2",
                    text: "yOuR aRgUmEnT iS iNvAlId"
                }],
                timeout: 2500,
                showif: "a5-2"
            }, {
                type: "pause",
                timeout: 3000,
                showif: "a5-2"
            }, {
                type: "text",
                dir: "in",
                content: `Are you testing me right now?`,
                showif: "a5-2",
                timeout: 3000,
            }, {
                type: "text",
                dir: "in",
                content: `Do I need to subdue that bratty attitude of yours or are you going to behave?`,
                showif: "a5-2"
            }, {
                type: "choice",
                content: [{
                    key: "a6-1",
                    text: "...... sorry....."
                }, {
                    key: "a6-2",
                    text: "try me :p"
                }, {
                    key: "a6-3",
                    text: "oh? is this a challenge :D"
                }],
                timeout: 2500,
                showif: "a5-2"
            }, {
                type: "text",
                dir: "in",
                content: `So, when will I get my coat back?`,
                showif: "a6-1"
            }, {
                type: "choice",
                content: [{
                    key: "a6-1",
                    text: "soon!"
                }],
                timeout: 2500,
                showif: "a6-1"
            }, {
                type: "text",
                dir: "in",
                content: `Define 'soon'.`,
                showif: "a6-1"
            }, {
                type: "choice",
                content: [{
                    key: "a6-1",
                    text: "lunch?"
                }],
                timeout: 2500,
                showif: "a6-1"
            }, {
                type: "text",
                dir: "in",
                content: `I'll pick you up.`,
                showif: "a6-1",
                timeout: 5000
            }, {
                type: "ts",
                content: "12:37",
                showif: "a6-1",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `I'm here.`,
                showif: "a6-1"
            }, {
                type: "pause",
                timeout: 3000,
                showif: "a6-2"
            }, {
                type: "notif",
                content: "Call started 10:54",
                showif: "a6-2",
                timeout: 5000
            }, {
                type: "notif",
                content: "Call ended 14m",
                showif: "a6-2",
                timeout: 3000
            }, {
                type: "choice",
                content: [{
                    key: "a6-2",
                    text: "i'll return your coat asap <3 <3 <3"
                }],
                timeout: 2500,
                showif: "a6-2"
            }, {
                type: "text",
                dir: "in",
                content: `Good.`,
                showif: "a6-2"
            }, {
                type: "notif",
                content: "Call started 10:54",
                showif: "a6-3",
                timeout: 2000
            }, {
                type: "notif",
                content: "Call ended 0m",
                showif: "a6-3",
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `Wht`,
                showif: "a6-3",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `You`,
                showif: "a6-3",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `That was dangerous ${name} what the hell were you thinking I am in public`,
                showif: "a6-3",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `No`,
                showif: "a6-3"
            }, {
                type: "text",
                dir: "in",
                content: `WHat the hell are you wearing`,
                showif: "a6-3",
                timeout: 1500
            }, {
                type: "choice",
                content: [{
                    key: "a6-3",
                    text: "your coat? :)"
                }],
                timeout: 2500,
                showif: "a6-3"
            }, {
                type: "text",
                dir: "in",
                content: `You`,
                showif: "a6-3",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `I am not playing this game of yours.`,
                showif: "a6-3"
            }, {
                type: "choice",
                content: [{
                    key: "a6-3",
                    text: "awww 😈"
                }],
                timeout: 2500,
                showif: "a6-3"
            }
        ],
        "ayato": [
            {
                type: "ts",
                content: "12:46",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `${name}, dear, where are you?`
            }, {
                type: "choice",
                content: [{
                    key: "a1-1",
                    text: "Lunch!"
                }, {
                    key: "a1-2",
                    text: "Outside!"
                }],
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/ayato3.png`,
                showif: "a1-1"
            }, {
                type: "text",
                dir: "in",
                content: `But you're not in the dining room?`,
                showif: "a1-1"
            }, {
                type: "choice",
                content: [{
                    key: "a1-1",
                    text: "I'm at Kiminami Restaurant!"
                }],
                showif: "a1-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `As in the garden?`,
                showif: "a1-2"
            }, {
                type: "choice",
                content: [{
                    key: "a1-2",
                    text: "As in the city. Kiminami Restaurant!"
                }],
                showif: "a1-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Ah...`,
                showif: "a1-2"
            }, {
                type: "text",
                dir: "in",
                content: `You went out and never asked me to come along?`
            }, {
                type: "text",
                dir: "in",
                content: `I must admit, I'm a little hurt.`
            }, {
                type: "text",
                dir: "in",
                content: `Let me rephrase that. I am very hurt....`
            }, {
                type: "choice",
                content: [{
                    key: "a2-1",
                    text: "Oh, I'm so sorry darling ;(( I thought you were busy!!"
                }, {
                    key: "a2-2",
                    text: "Mhm... And when was the last time you willingly asked me out for lunch together, again?"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I was, but I'm free now.`,
                showif: "a2-1"
            }, {
                type: "text",
                dir: "in",
                content: `And I wanted to spend some time with you...`,
                showif: "a2-1"
            }, {
                type: "choice",
                content: [{
                    key: "a3-1",
                    text: "Do you want to join us?"
                }, {
                    key: "a3-2",
                    text: "We can have dinner together later!"
                }],
                showif: "a2-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Hm?`,
                showif: "a3-1"
            }, {
                type: "text",
                dir: "in",
                content: `'Us'?`,
                showif: "a3-1"
            }, {
                type: "text",
                dir: "in",
                content: `Dear... Who are you gracing with your presence right now? :)`,
                showif: "a3-1"
            }, {
                type: "choice",
                content: [{
                    key: "a4-1",
                    text: "I'll talk to you later darling the food is here!!!"
                }, {
                    key: "a4-2",
                    text: "Oh, Aether stopped by so I figured I'd take him out for lunch!"
                }],
                showif: "a3-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `${name}...`,
                showif: "a4-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Would you be a darling and order my usual menu, please? I'll be there in ten ^^`,
                showif: "a4-1"
            }, {
                type: "text",
                dir: "in",
                content: `See you soon, darling 💙`,
                showif: "a4-1"
            }, {
                type: "text",
                dir: "in",
                content: `I see.`,
                showif: "a4-2"
            }, {
                type: "text",
                dir: "in",
                content: `Kiminami Restaurant, yes?`,
                showif: "a4-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Could you order my usual menu, I'll be there in ten ^^`,
                showif: "a4-2"
            }, {
                type: "text",
                dir: "in",
                content: `I'll see you soon, darling 💙`,
                showif: "a4-2"
            }, {
                type: "text",
                dir: "in",
                content: `Hmm.`,
                showif: "a3-2"
            }, {
                type: "text",
                dir: "in",
                content: `I suppose that works.`,
                showif: "a3-2"
            }, {
                type: "text",
                dir: "in",
                content: `Then, please block your schedule. Meet me at six in my office? Let me take you out on a dinner date.`,
                showif: "a3-2"
            }, {
                type: "choice",
                content: [{
                    key: "a3-2",
                    text: "Okay! See you later ♥️"
                }],
                showif: "a3-2",
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/ayato1.png`,
                showif: "a3-2"
            }, {
                type: "text",
                dir: "in",
                content: `....`,
                showif: "a2-2"
            }, {
                type: "text",
                dir: "in",
                content: `I'm sorry, darling.`,
                showif: "a2-2"
            }, {
                type: "text",
                dir: "in",
                content: `I have been neglecting you, haven't I?`,
                showif: "a2-2"
            }, {
                type: "text",
                dir: "in",
                content: `Please let me make it up to you. Dinner date tonight? Just us two?`,
                showif: "a2-2"
            }, {
                type: "text",
                dir: "in",
                content: `I'll get someone to buy your your favorite dessert.`,
                showif: "a2-2"
            }, {
                type: "choice",
                content: [{
                    key: "a5-1",
                    text: "Fine."
                }, {
                    key: "a5-2",
                    text: "Dessert? :|"
                }],
                showif: "a2-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Thank you, love.`,
                showif: "a5-1"
            }, {
                type: "text",
                dir: "in",
                content: `I'll see you tonight 💙 Have a lovely lunch.`,
                showif: "a5-1"
            }, {
                type: "text",
                dir: "in",
                content: `Apologies.`,
                showif: "a5-2"
            }, {
                type: "text",
                dir: "in",
                content: `DessertS.`,
                showif: "a5-2"
            }, {
                type: "choice",
                content: [{
                    key: "a5-2",
                    emote: "emote/ayato4.png"
                }],
                showif: "a5-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `You have me wrapped within your beautiful fingers, love.`,
                showif: "a5-2"
            }, {
                type: "text",
                dir: "in",
                content: `Then, I'll return back to work for now and await for our date.`,
                showif: "a5-2"
            }, {
                type: "emote",
                dir: "in",
                content: `emote/ayato2.png`,
                showif: "a5-2"
            }
        ],
        "childe": [
            {
                type: "ts",
                content: "08:01",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "c1-1",
                    text: "Ajax?? Did you change your contact name on my phone???"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `YES`
            }, {
                type: "text",
                dir: "in",
                content: `it was lacking the hearts!!!!!`,
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `:(`,
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `I`,
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `WAS`,
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `SO`,
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `MADGE`,
                timeout: 1000
            }, {
                type: "emote",
                dir: "in",
                content: `emote/childe1.png`
            }, {
                type: "choice",
                content: [{
                    key: "c2-1",
                    text: "Okay... I'm sorry..."
                }, {
                    key: "c2-2",
                    text: "It's just a contact name, hon...."
                }, {
                    key: "c2-3",
                    text: ".... lol you're so cute 💙"
                }],
                timeout: 1000
            }, {
                type: "emote",
                dir: "in",
                content: `emote/childe2.png`,
                showif: "c2-1"
            }, {
                type: "text",
                dir: "in",
                content: `.....`,
                showif: "c2-1"
            }, {
                type: "choice",
                content: [{
                    key: "c2-1",
                    text: "Please don't be mad..."
                }],
                showif: "c2-1",
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `...........`,
                showif: "c2-1"
            }, {
                type: "text",
                dir: "in",
                content: `awh you're so cute 💙💙💙`,
                showif: "c2-1"
            }, {
                type: "text",
                dir: "in",
                content: `i wasn't mad babe don't worry 💙`,
                showif: "c2-1"
            }, {
                type: "text",
                dir: "in",
                content: `well maybe`,
                showif: "c2-1"
            }, {
                type: "text",
                dir: "in",
                content: `just a little bit`,
                showif: "c2-1"
            }, {
                type: "text",
                dir: "in",
                content: `a teeny tiny bit`,
                showif: "c2-1"
            }, {
                type: "text",
                dir: "in",
                content: `BUT`,
                showif: "c2-1"
            }, {
                type: "text",
                dir: "in",
                content: `actually, i was about to get your favorite snack....`,
                showif: "c2-1"
            }, {
                type: "text",
                dir: "in",
                content: `can we meet up for lunch? you can make it up to me then 💙`,
                showif: "c2-1"
            }, {
                type: "text",
                dir: "in",
                content: `JUST A CONTACT NAME???`,
                showif: "c2-2"
            }, {
                type: "text",
                dir: "in",
                content: `BABE`,
                showif: "c2-2"
            }, {
                type: "text",
                dir: "in",
                content: `IT'S THE NAME THAT SHOWS ON UR SCREEN WHENEVER I CALL OR MESSAGE YOU`,
                showif: "c2-2"
            }, {
                type: "text",
                dir: "in",
                content: `OK THAT'S IT`,
                showif: "c2-2"
            }, {
                type: "text",
                dir: "in",
                content: `im cming over ASAP to teach you hte importance about contact names`,
                showif: "c2-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `how else can i assert dominance when you're hanging out with ur friends :((((`,
                showif: "c2-2",
                timeout: 3000
            }, {
                type: "choice",
                content: [{
                    key: "c2-2",
                    text: "you??? don't need to????"
                }],
                showif: "c2-2",
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `I HAVE TO`,
                showif: "c2-2"
            }, {
                type: "text",
                dir: "in",
                content: `wanna make you proud`,
                showif: "c2-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `do you know how happy it makes me whenever i hang out with the boys and '❤️💙♥️💗mine❤️💙♥️💗' comes up on my screen and taylor swift starts singing the song from my phone speaker?????`,
                showif: "c2-2",
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `the ENVIOUS looks on their faces are hilarious`,
                showif: "c2-2"
            }, {
                type: "choice",
                content: [{
                    key: "c3-1",
                    text: "i'm.... pretty sure they're not 'envious'..."
                }, {
                    key: "c3-2",
                    text: "yeah uh i think that's called secondhand embarrassment, which i am going through right now..."
                }],
                showif: "c2-2",
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `nah i'm pretty sure they are`,
                showif: "c3-1"
            }, {
                type: "text",
                dir: "in",
                content: `try calling my phone the next time when we're all hanging out together`,
                showif: "c3-1"
            }, {
                type: "choice",
                content: [{
                    key: "c3-1",
                    text: "why would I call YOU if WE were hanging out???"
                }],
                showif: "c3-1",
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `NO TRUST ME`,
                showif: "c3-1"
            }, {
                type: "text",
                dir: "in",
                content: `look at 'mouchie's face`,
                showif: "c3-1"
            }, {
                type: "text",
                dir: "in",
                content: `you'll thank me later`,
                showif: "c3-1",
                timeout: 5000
            }, {
                type: "ts",
                content: "20:48",
                showif: "c3-1",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `DID YOU SEE HOW HE LOOKS LIKE A CONSTIPATED FROG HAHAHAHAHHAHH IM DYING`,
                showif: "c3-1"
            }, {
                type: "choice",
                content: [{
                    key: "c3-1",
                    text: "you know what for this once, you are right"
                }],
                showif: "c3-1",
                timeout: 1000
            }, {
                type: "emote",
                dir: "in",
                content: `emote/childe4.png`,
                showif: "c3-1"
            }, {
                type: "text",
                dir: "in",
                content: `pfffff whattttt`,
                showif: "c3-2"
            }, {
                type: "text",
                dir: "in",
                content: `they're just ✨jealous✨ they don't get to be as lovey-dovey as we are!!`,
                showif: "c3-2"
            }, {
                type: "emote",
                dir: "in",
                content: `emote/childe5.png`,
                showif: "c3-2"
            }, {
                type: "text",
                dir: "in",
                content: `NO YOU`,
                showif: "c2-3"
            }, {
                type: "choice",
                content: [{
                    key: "c2-3",
                    text: "NO YOU"
                }],
                showif: "c2-3",
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `NO NO NO YOU`,
                showif: "c2-3"
            }, {
                type: "text",
                dir: "in",
                content: `don't make me send you your selfies✨`,
                showif: "c2-3"
            }, {
                type: "choice",
                content: [{
                    key: "c2-3",
                    text: "you save my selfies????"
                }],
                showif: "c2-3",
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `UMM YES???`,
                showif: "c2-3"
            }, {
                type: "text",
                dir: "in",
                content: `WAIT`,
                showif: "c2-3"
            }, {
                type: "text",
                dir: "in",
                content: `no... don't tell me...`,
                showif: "c2-3"
            }, {
                type: "text",
                dir: "in",
                content: `do you not save my selfies?`,
                showif: "c2-3"
            }, {
                type: "text",
                dir: "in",
                content: `you don't have special album for my selfies??`,
                showif: "c2-3",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `what next babe are you gonna tell me you don't make song playlists about me????`,
                showif: "c2-3",
                timeout: 3000
            }, {
                type: "choice",
                content: [{
                    key: "c4-1",
                    text: "............ no?"
                }, {
                    key: "c4-2",
                    text: "wait no i do i was just shocked"
                }],
                showif: "c2-3",
                timeout: 1000
            }, {
                type: "text",
                dir: "in",
                content: `i-`,
                showif: "c4-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `did you hear that? that's the sound of my heart breaking`,
                showif: "c4-1"
            }, {
                type: "text",
                dir: "in",
                content: `;(`,
                showif: "c4-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `i'm gonna need like a thousand kisses for this ;((((`,
                showif: "c4-1"
            }, {
                type: "text",
                dir: "in",
                content: `!!!`,
                showif: "c4-2"
            }, {
                type: "text",
                dir: "in",
                content: `wait this is the first time i've heard of this`,
                showif: "c4-2"
            }, {
                type: "text",
                dir: "in",
                content: `I WANNA SEE THEM ALL`,
                showif: "c4-2"
            }, {
                type: "text",
                dir: "in",
                content: `ZOOMING TO YOUR SIDE`,
                showif: "c4-2"
            }
        ],
        "diluc": [
            {
                type: "ts",
                content: "12:51",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `What's this I heard about you skipping your meals?`
            }, {
                type: "text",
                dir: "in",
                content: `${name}, what's wrong?`
            }, {
                type: "text",
                dir: "in",
                content: `Are you feeling unwell?`
            }, {
                type: "text",
                dir: "in",
                content: `Shall we go to the hospital?`
            }, {
                type: "choice",
                content: [{
                    key: "d1-1",
                    text: "Luc, I'm fine."
                }, {
                    key: "d1-2",
                    text: "I was just busy, no worries!"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `No.`,
                showif: "d1-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `Take today off, we're going to the hospital.`,
                showif: "d1-1"
            }, {
                type: "choice",
                content: [{
                    key: "d2-1",
                    text: "Sweetheart, you're overreacting."
                }, {
                    key: "d2-2",
                    text: "Says the one who skips his meals regularly :/"
                }],
                showif: "d1-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `When you've been skipping lunch for a whole week?`,
                showif: "d2-1"
            }, {
                type: "text",
                dir: "in",
                content: `I'm not overreacting, I'm worried.`,
                showif: "d2-1"
            }, {
                type: "text",
                dir: "in",
                content: `Not for a whole week.`,
                showif: "d2-2"
            }, {
                type: "text",
                dir: "in",
                content: `For a whole week?`,
                showif: "d1-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `Are we lacking staff? Should I hire more people?`,
                showif: "d1-2"
            }, {
                type: "text",
                dir: "in",
                content: `${name}, I am worried about you.`
            }, {
                type: "text",
                dir: "in",
                content: `Please talk to me honestly.`,
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `As your boyfriend, it's my duty and wish to make sure you're well-cared for.`,
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `We promised to be completely open to each other and to rely on each other, didn't we?`
            }, {
                type: "text",
                dir: "in",
                content: `So, rely on me.`,
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I'm just outside your office. May I come in?`
            }
        ],
        "heizou": [
            {
                type: "ts",
                content: "07:35",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `--. --- --- -.. / -- --- .-. -. .. -. --. / -- .-- .- ....`
            }, {
                type: "choice",
                content: [{
                    key: "h1-1",
                    text: "-- --- .-. -. .. -. --. / -... .. - -.-. ...."
                }, {
                    key: "h1-2",
                    text: "morning, sherlock"
                }, {
                    key: "h1-3",
                    text: "my brain isn't awake enough for this...."
                }],
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/heizou4.png`,
                showif: "h1-1"
            }, {
                type: "text",
                dir: "in",
                content: `this amount of ✨sass✨ right in the morning?`,
                showif: "h1-1"
            }, {
                type: "text",
                dir: "in",
                content: `you spoil me darling ❤️`,
                showif: "h1-1"
            }, {
                type: "choice",
                content: [{
                    key: "h1-1",
                    text: "wow masochist much"
                }],
                showif: "h1-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `only when it comes to you~`,
                showif: "h1-1"
            }, {
                type: "text",
                dir: "in",
                content: `hello my dear watson ❤️`,
                showif: "h1-2"
            }, {
                type: "text",
                dir: "in",
                content: `how are you this fine morning?`,
                showif: "h1-2"
            }, {
                type: "choice",
                content: [{
                    key: "h1-2",
                    text: "i'm fine thank you, and you?"
                }],
                showif: "h1-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `lovely`,
                showif: "h1-2"
            }, {
                type: "emote",
                dir: "in",
                content: `emote/heizou2.png`,
                showif: "h1-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `to my utmost regret i am in fact not fine this morning`,
                showif: "h1-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `seeing as i have yet to receive my morning kisses from my beloved assistant`,
                showif: "h1-2"
            }, {
                type: "choice",
                content: [{
                    key: "h2-1",
                    text: "how unfortunate, guess your whole day's gonna suck today."
                }, {
                    key: "h2-2",
                    text: "how are you so cute shhdhshshs"
                }],
                showif: "h1-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `meanie ;((`,
                showif: "h2-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `may i bribe you with your favorite snack and beverage at least?`,
                showif: "h2-1"
            }, {
                type: "choice",
                content: [{
                    key: "h3-1",
                    text: "hmmm.... perhaps..."
                }, {
                    key: "h3-2",
                    text: "i'm not falling for that trap again..."
                }],
                showif: "h2-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `oh? you little criminal~`,
                showif: "h3-1"
            }, {
                type: "text",
                dir: "in",
                content: `i'm coming over to arrest you <3`,
                showif: "h3-1"
            }, {
                type: "text",
                dir: "in",
                content: `aweeeee`,
                showif: "h3-2"
            }, {
                type: "text",
                dir: "in",
                content: `what a shame`,
                showif: "h3-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `but if i just so happen to turn up by your doorstep with said items on hand, you wouldn't turn me away, right?`,
                showif: "h3-2"
            }, {
                type: "text",
                dir: "in",
                content: `cute? mmhm go on~`,
                showif: "h2-2"
            }, {
                type: "choice",
                content: [{
                    key: "h2-2",
                    text: "handsome witty annoying gremlin"
                }],
                showif: "h2-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `gasp! annoying??? how could you hurt me like this...`,
                showif: "h2-2"
            }, {
                type: "text",
                dir: "in",
                content: `i demand kisses for apology!`,
                showif: "h2-2"
            }, {
                type: "choice",
                content: [{
                    key: "h2-2",
                    text: "okay, okay, cutie"
                }],
                showif: "h2-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `❤️`,
                showif: "h2-2"
            }, {
                type: "text",
                dir: "in",
                content: `oh come on now, entertain me~`,
                showif: "h1-3"
            }, {
                type: "choice",
                content: [{
                    key: "h2-3",
                    text: "n o"
                }],
                showif: "h2-3",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `;((`,
                showif: "h1-3",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `alright alright, i'll get you your favorite breakfast, how about that?`,
                showif: "h1-3"
            }, {
                type: "choice",
                content: [{
                    key: "h1-3",
                    text: "good morning to the handsomest detective in inazuma ❤️"
                }],
                showif: "h1-3",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `there's my lovely assistant 😘`,
                showif: "h1-3"
            }, {
                type: "text",
                dir: "in",
                content: `i'll see you soon, okay?`,
                showif: "h1-3"
            }, {
                type: "text",
                dir: "in",
                content: `also`,
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `69 20 6c 6f 76 65 20 79 6f 75 20 3c 33`
            }, {
                type: "choice",
                content: [{
                    key: "h3-1",
                    text: "💗😘"
                }, {
                    key: "h3-2",
                    text: "yeah i'm definitely not awake enough for this"
                }, {
                    key: "h3-3",
                    text: "69 20 6b 6e 6f 77 2c 20 69 20 6c 6f 76 65 20 6d 65 20 74 6f 6f 20 3c 33"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `lol`,
                showif: "h3-2"
            }, {
                type: "text",
                dir: "in",
                content: `lmao`,
                showif: "h3-3"
            }, {
                type: "text",
                dir: "in",
                content: `this is why i can never get enough of you ❤️`,
                showif: "h3-3"
            }
        ],
        "itto": [
            {
                type: "ts",
                content: "15:22",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `BABE`,
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `BABE`,
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `BABB`,
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `BBBE`,
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `HEL`,
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `HELP`
            }, {
                type: "choice",
                content: [{
                    key: "i1-1",
                    text: "WHAT NOW"
                }, {
                    key: "i1-2",
                    text: "itto calm down are you okay????"
                }, {
                    key: "i1-3",
                    emote: "emote/itto1.png"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `DONT HATE ME PLEAS`,
                showif: "i1-1"
            }, {
                type: "text",
                dir: "in",
                content: `I UH`,
                showif: "i1-2"
            }, {
                type: "text",
                dir: "in",
                content: `IM OOK`,
                showif: "i1-2"
            }, {
                type: "text",
                dir: "in",
                content: `I THINK`,
                showif: "i1-2"
            }, {
                type: "text",
                dir: "in",
                content: `UHHH`,
                showif: "i1-3"
            }, {
                type: "text",
                dir: "in",
                content: `I THINKN THE POLICE ALRRE AFTERL ME`,
                showif: ""
            }, {
                type: "choice",
                content: [{
                    key: "i2-1",
                    text: "FOR FUCKS SAKE"
                }, {
                    key: "i2-2",
                    text: "I LEAVE YOU FOR FIVE MINUTES"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `BUTBABW`,
                showif: "i2-1"
            }, {
                type: "text",
                dir: "in",
                content: `SNOT MY FAULT`,
                showif: "i2-1"
            }, {
                type: "text",
                dir: "in",
                content: `NO LISTEN`,
                showif: "i2-2"
            }, {
                type: "text",
                dir: "in",
                content: `GENUINIELY I WASJSUT TRYINA HELP THE GUY`
            }, {
                type: "choice",
                content: [{
                    key: "i3-1",
                    text: "where are you i'll come get you"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `PLEASE D O`
            }, {
                type: "text",
                dir: "in",
                content: `THANKS BABE ILY`
            }
        ],
        "kaeya": [
            {
                type: "ts",
                content: "23:49",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Snowflek`
            }, {
                type: "text",
                dir: "in",
                content: `Wyd`
            }, {
                type: "text",
                dir: "in",
                content: `Wanna`
            }, {
                type: "text",
                dir: "in",
                content: `xomm over?`
            }, {
                type: "text",
                dir: "in",
                content: `;))_)`
            }, {
                type: "choice",
                content: [{
                    key: "k1-1",
                    text: "..... Kaeya, we live under the same roof???"
                }, {
                    key: "k1-2",
                    text: "Baby, are you drunk?"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `We r ?`,
                showif: "k1-1"
            }, {
                type: "text",
                dir: "in",
                content: `O`,
                showif: "k1-1"
            }, {
                type: "text",
                dir: "in",
                content: `Wow`,
                showif: "k1-1"
            }, {
                type: "text",
                dir: "in",
                content: `Meat`,
                showif: "k1-1"
            }, {
                type: "text",
                dir: "in",
                content: `Neet`,
                showif: "k1-1"
            }, {
                type: "text",
                dir: "in",
                content: `Ne ta`,
                showif: "k1-1"
            }, {
                type: "choice",
                content: [{
                    key: "k1-1",
                    text: "..."
                }],
                showif: "k1-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I thgik Im`,
                showif: "k1-1"
            }, {
                type: "text",
                dir: "in",
                content: `Drrnk`,
                showif: "k1-1"
            }, {
                type: "text",
                dir: "in",
                content: `Ye`,
                showif: "k1-2"
            }, {
                type: "text",
                dir: "in",
                content: `No`,
                showif: "k1-2"
            }, {
                type: "text",
                dir: "in",
                content: `Non`,
                showif: "k1-2"
            }, {
                type: "text",
                dir: "in",
                content: `Maybb`,
                showif: "k1-2"
            }, {
                type: "text",
                dir: "in",
                content: `Dill made mee a`
            }, {
                type: "text",
                dir: "in",
                content: `Dwirk`
            }, {
                type: "text",
                dir: "in",
                content: `Drirnk`
            }, {
                type: "text",
                dir: "in",
                content: `Tast e gud`
            }, {
                type: "choice",
                content: [{
                    key: "k1-1",
                    text: "Stay where you are. Is Diluc with you?"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Iono`
            }, {
                type: "text",
                dir: "in",
                content: `Ther s a gorl who`
            }, {
                type: "text",
                dir: "in",
                content: `Looks liek hi m`
            }, {
                type: "text",
                dir: "in",
                content: `Dilljux`
            }, {
                type: "choice",
                content: [{
                    key: "k1-1",
                    text: "There's a girl who looks like Diluc??? Holy shit what??"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Uhhhu h`
            }, {
                type: "text",
                dir: "in",
                content: `Samme reedh air`
            }, {
                type: "text",
                dir: "in",
                content: `Bwut long`
            }, {
                type: "choice",
                content: [{
                    key: "k1-1",
                    text: "Love... Your brother has long red hair. You sure that 'girl' isn't him?"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Whio dilook?`
            }, {
                type: "text",
                dir: "in",
                content: `Lol`
            }, {
                type: "text",
                dir: "in",
                content: `No beb my big bbrotherds haor is sh orgt`
            }, {
                type: "text",
                dir: "in",
                content: `N hes nott this grummy`
            }, {
                type: "text",
                dir: "in",
                content: `Frunp Y`
            }, {
                type: "text",
                dir: "in",
                content: `Grumpjy`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `This is Diluc.`
            }, {
                type: "text",
                dir: "in",
                content: `Could you please pick him up.`
            }, {
                type: "choice",
                content: [{
                    key: "k1-1",
                    text: "I'm on it. Sorry, Diluc. Uh, just one question."
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `We're at my pub. The one downtown, near your place.`
            }, {
                type: "choice",
                content: [{
                    key: "k1-1",
                    text: "Not that. Did you use to have short hair when you were young?"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Yes?`,
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `Oh.`
            }, {
                type: "choice",
                content: [{
                    key: "k1-1",
                    text: "Yeah... I'll be there soon. Just... keep him safe for us, okay?"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I will.`
            }
        ],
        "kazuha": [
            {
                type: "ts",
                content: "14:55",
                timeout: 500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/kazuha4.png`
            }, {
                type: "text",
                dir: "in",
                content: `Dove, are you in the library?`
            }, {
                type: "choice",
                content: [{
                    key: "k1-1",
                    text: "Yes!"
                }, {
                    key: "k1-2",
                    text: "No, but I could stop by. Why?"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Perfect.`,
                showif: "k1-1"
            }, {
                type: "text",
                dir: "in",
                content: `I'm sorry to trouble you...`,
                showif: "k1-2"
            }, {
                type: "text",
                dir: "in",
                content: `Could you help me borrow a few books? I need a few references.`
            }, {
                type: "text",
                dir: "in",
                content: `I'll send you the complete list in ten minutes.`
            }, {
                type: "choice",
                content: [{
                    key: "k2-1",
                    text: "What's in it for me?"
                }, {
                    key: "k2-2",
                    text: "Hmmm... No."
                }, {
                    key: "k2-3",
                    text: "Okay!!"
                }],
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/kazuha1.png`,
                showif: "k2-1",
                timeout: 1500
            }, {
                type: "text",
                dir: "in",
                content: `Of course, I had a few suitable rewards in mind.`,
                showif: "k2-1"
            }, {
                type: "text",
                dir: "in",
                content: `Does one kiss per book sound fair to you?`,
                showif: "k2-1"
            }, {
                type: "choice",
                content: [{
                    key: "k3-1",
                    text: "Make it five per book!"
                }, {
                    key: "k3-2",
                    text: "Just a kiss?"
                }],
                showif: "k2-1",
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/kazuha2.png`,
                showif: "k3-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `This is what Venti would call “blatant daylight robbery”, I see...`,
                showif: "k3-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `Alas, for the sake of literature, I must persevere. You have a deal ^^`,
                showif: "k3-1"
            }, {
                type: "text",
                dir: "in",
                content: `I can throw in a massage too, if you'd like.`,
                showif: "k3-2"
            }, {
                type: "choice",
                content: [{
                    key: "k3-2",
                    text: "❤️"
                }],
                showif: "k3-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `❤️`,
                showif: "k3-2"
            }, {
                type: "emote",
                dir: "in",
                content: `emote/kazuha3.png`,
                showif: "k2-2"
            }, {
                type: "text",
                dir: "in",
                content: `Please, love?`,
                showif: "k2-2"
            }, {
                type: "text",
                dir: "in",
                content: `For me?`,
                showif: "k2-2"
            }, {
                type: "text",
                dir: "in",
                content: `I've been a good boy, haven't I? :(`,
                showif: "k2-2"
            }, {
                type: "choice",
                content: [{
                    key: "k4-1",
                    text: "lol okay okay"
                }, {
                    key: "k4-2",
                    text: "Everything comes with a price, pretty boy ^^"
                }],
                showif: "k2-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `☺️`,
                showif: "k4-1"
            }, {
                type: "text",
                dir: "in",
                content: `Alright, alright...`,
                showif: "k4-2"
            }, {
                type: "text",
                dir: "in",
                content: `I'll be the little spoon tonight...`,
                showif: "k4-2"
            }, {
                type: "choice",
                content: [{
                    key: "k4-2",
                    text: "😘  ok, consider it done!"
                }],
                showif: "k4-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Thank you, love...`,
                showif: "k4-2"
            }, {
                type: "text",
                dir: "in",
                content: `I can't wait to be in your arms 😌`,
                showif: "k4-2"
            }, {
                type: "text",
                dir: "in",
                content: `Thank you, maple 🍁`,
                showif: "k2-3"
            }, {
                type: "text",
                dir: "in",
                content: `You're so good to me...`,
                showif: "k2-3",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I must have helped save a nation on my past life, to be able to have such a wonderful and loving partner ^^`,
                showif: "k2-3"
            }, {
                type: "text",
                dir: "in",
                content: `I'll send you the list soon.`
            }, {
                type: "text",
                dir: "in",
                content: `Have a good rest of the day, okay?`
            }, {
                type: "text",
                dir: "in",
                content: `I love you ❤️`
            }
        ],
        "thoma": [
            {
                type: "ts",
                content: "16:28",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `What do you want for dinner?`,
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I'm grocery shopping for the Kamisato siblings right now, thought I'd buy a few things for us too.`
            }, {
                type: "text",
                dir: "in",
                content: `Do you want your usual snacks? :)`
            }, {
                type: "choice",
                content: [{
                    key: "t1-1",
                    text: "oh i'm good"
                }, {
                    key: "t1-2",
                    text: "yes!!!!"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `You sure? Okay!`,
                showif: "t1-1"
            }, {
                type: "choice",
                content: [{
                    key: "t1-2",
                    text: "ice cream..."
                }, {
                    key: "t1-2",
                    text: "chips..."
                }, {
                    key: "t1-2",
                    text: "chocolates..."
                }],
                showif: "t1-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I gotchu baby <3`,
                showif: "t1-2"
            }, {
                type: "emote",
                dir: "in",
                content: `emote/thoma2.png`,
                showif: "t1-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `Oh, can you check the pantry if you're home? Are we out of soy sauce?`
            }, {
                type: "emote",
                dir: "in",
                content: `emote/thoma5.png`
            }, {
                type: "choice",
                content: [{
                    key: "t2-1",
                    text: "light soy sauce's out"
                }, {
                    key: "t2-2",
                    text: "which one is the soy sauce again...."
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Ah, as I expected. Thanks for checking!`,
                showif: "t2-1"
            }, {
                type: "text",
                dir: "in",
                content: `The one with red label, darling!`,
                showif: "t2-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `We have three types, but I'm pretty sure the other two are still half full.`,
                showif: "t2-2"
            }, {
                type: "choice",
                content: [{
                    key: "t2-2",
                    text: "i saw it. it looks almost done"
                }],
                showif: "t2-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Got it!`,
                showif: "t2-2"
            }, {
                type: "text",
                dir: "in",
                content: `How about the toilet papers?`
            }, {
                type: "choice",
                content: [{
                    key: "t3-1",
                    text: "you bought like. half a dozen last time, remember? 🙄"
                }, {
                    key: "t3-2",
                    text: "we still have lots of those!"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Oh! Right!!`,
                showif: "t3-1"
            }, {
                type: "text",
                dir: "in",
                content: `Also, hush, it was on discount, so it was a very good deal!!`,
                showif: "t3-1"
            }, {
                type: "text",
                dir: "in",
                content: `Alright!`,
                showif: "t3-2"
            }, {
                type: "text",
                dir: "in",
                content: `I think that's all...`
            }, {
                type: "text",
                dir: "in",
                content: `Oh wait, you haven't answered what you wanted for dinner!!`
            }, {
                type: "choice",
                content: [{
                    key: "t4-1",
                    text: "anything's fine as long as you're the one who's cooking it <3"
                }, {
                    key: "t4-2",
                    text: "i've been craving this one specific spice..."
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `////////`,
                showif: "t4-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Stoppp you're making me blush like a fool in the middle of a supermarket`,
                showif: "t4-1"
            }, {
                type: "choice",
                content: [{
                    key: "t4-1",
                    emote: "emote/thoma1.png"
                }],
                showif: "t4-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Hmmmph`,
                showif: "t4-1"
            }, {
                type: "text",
                dir: "in",
                content: `Wait until I get back home <3`,
                showif: "t4-1"
            }, {
                type: "text",
                dir: "in",
                content: `Spice??`,
                showif: "t4-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Ummm okay, what is it? I can always try and make something that will highlight the taste of this spice!!`,
                showif: "t4-2"
            }, {
                type: "choice",
                content: [{
                    key: "t4-2",
                    text: "you know what they say"
                }],
                showif: "t4-2",
                timeout: 2500
            }, {
                type: "choice",
                content: [{
                    key: "t4-2",
                    text: "the best ingredients of all food"
                }],
                showif: "t4-2",
                timeout: 2500
            }, {
                type: "choice",
                content: [{
                    key: "t4-2",
                    text: "L-O-V-E ❤️"
                }],
                showif: "t4-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `..........`,
                showif: "t4-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `${name}....`,
                showif: "t4-2"
            }, {
                type: "text",
                dir: "in",
                content: `Love....`,
                showif: "t4-2"
            }, {
                type: "text",
                dir: "in",
                content: `Baby........`,
                showif: "t4-2"
            }, {
                type: "text",
                dir: "in",
                content: `Why are you so cute //////`,
                showif: "t4-2"
            }, {
                type: "choice",
                content: [{
                    key: "t4-2",
                    text: "gotta keep my future husband on the hook so i won't lose him~"
                }],
                showif: "t4-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `${name}`,
                showif: "t4-2",
                timeout: 2500
            }, , {
                type: "text",
                dir: "in",
                content: `You already have me hooked since the start of our relationship <3`,
                showif: "t4-2"
            }, , {
                type: "emote",
                dir: "in",
                content: `emote/thoma1.png`,
                showif: "t4-2"
            },
        ],
        "venti": [
            {
                type: "ts",
                content: "15:14",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Did you know`
            }, {
                type: "text",
                dir: "in",
                content: `That a popular coffee chain in our city`
            }, {
                type: "text",
                dir: "in",
                content: `Is apparently doing human cloning and human trafficking`
            }, {
                type: "choice",
                content: [{
                    key: "v1-1",
                    text: "What kind of dark web did you accidentally stumble in now"
                }, {
                    key: "v1-2",
                    text: "EXCUSE ME WHAT"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `No no n o`,
                showif: "v1-1"
            }, {
                type: "text",
                dir: "in",
                content: `I saw the signs with my own eyes!!!!`,
                showif: "v1-1"
            }, {
                type: "text",
                dir: "in",
                content: `Yeah!!!! Crazy right`,
                showif: "v1-2"
            }, {
                type: "text",
                dir: "in",
                content: `You know what's crazier`,
                showif: "v1-2"
            }, {
                type: "text",
                dir: "in",
                content: `They're`
            }, {
                type: "text",
                dir: "in",
                content: `Cloning`
            }, {
                type: "text",
                dir: "in",
                content: `And trafficking`
            }, {
                type: "text",
                dir: "in",
                content: `ME`
            }, {
                type: "emote",
                dir: "in",
                content: `emote/venti9.png`
            }, {
                type: "choice",
                content: [{
                    key: "v2-1",
                    text: "...... Why do I even bother entertaining you....."
                }, {
                    key: "v2-2",
                    text: "I'm marching to the nearest ⭐️bucks to get a new Venti hopefully this one behaves"
                }],
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/venti3.png`,
                showif: "v2-1"
            }, {
                type: "text",
                dir: "in",
                content: `Ehe`,
                showif: "v2-1"
            }, {
                type: "text",
                dir: "in",
                content: `Because obviously you loooooove me!`,
                showif: "v2-1"
            }, {
                type: "choice",
                content: [{
                    key: "v3-1",
                    text: "Keep this up and I won't be"
                }],
                showif: "v2-1",
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/venti4.png`,
                showif: "v3-1"
            }, {
                type: "text",
                dir: "in",
                content: `You say that~`,
                showif: "v3-1"
            }, {
                type: "text",
                dir: "in",
                content: `But with every kiss I give you, you fall in love with me even more~`,
                showif: "v3-1"
            }, {
                type: "text",
                dir: "in",
                content: `Oh. That kinda sounds nice-`,
                showif: "v3-1"
            }, {
                type: "text",
                dir: "in",
                content: `WRITE THAT DOWN WRITE THAT DOWN`,
                showif: "v3-1"
            }, {
                type: "emote",
                dir: "in",
                content: `emote/venti9.png`,
                showif: "v2-2",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `WH`,
                showif: "v2-2",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `NOOO`,
                showif: "v2-2"
            }, {
                type: "text",
                dir: "in",
                content: `THERE CAN BE ONLY ONE VENTI IN YOUR LIFE AND THAT'S ME ;(((`,
                showif: "v2-2"
            }, {
                type: "text",
                dir: "in",
                content: `I'LL BUY YOU AS MANY COFFEE AS YOU WANT <3 <3`,
                showif: "v2-2"
            }, {
                type: "choice",
                content: [{
                    key: "v4-1",
                    text: "I sure can go for a cup right now..."
                }, {
                    key: "v4-2",
                    text: "lol ok ok, you're the only Venti in my life. Happy?"
                }],
                showif: "v2-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I'M RUNNING`,
                showif: "v4-1"
            }, {
                type: "text",
                dir: "in",
                content: `DO YOU WANT SOME MUFFINS WITH THAT`,
                showif: "v4-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `Sorry stupid question, of course you want muffins <3`,
                showif: "v4-1"
            }, {
                type: "text",
                dir: "in",
                content: `I'll be there in fifteen minutes tops!!! 😘😘😘😘`,
                showif: "v4-1"
            }, {
                type: "emote",
                dir: "in",
                content: `emote/venti3.png`,
                showif: "v4-2"
            }, {
                type: "text",
                dir: "in",
                content: `I love love love looooove you`,
                showif: "v4-2"
            }
        ],
        "xiao": [
            {
                type: "ts",
                content: "20:41",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `${name}`
            }, {
                type: "choice",
                content: [{
                    key: "x1-1",
                    text: "Yes, love? Are you okay? Do you need me to pick you up?"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I love you.`
            }, , {
                type: "choice",
                content: [{
                    key: "x1-1",
                    text: "Venti, please return my boyfriend's phone."
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `It's not Venti, it's me.`
            }, {
                type: "choice",
                content: [{
                    key: "x1-1",
                    text: "Yeah and I'm the devil Barbatos 🙄"
                }],
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/venti4.png`,
                timeout: 5000
            }, {
                type: "ts",
                content: "21:10",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Sorry.`
            }, {
                type: "choice",
                content: [{
                    key: "x2-1",
                    text: "Xiao?"
                }, {
                    key: "x2-2",
                    text: "Xiao!!! Are you ok?"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Yes, it's me.`,
                showif: "x2-1"
            }, {
                type: "text",
                dir: "in",
                content: `Aside from developing a migraine from all this loud music, I am fine.`,
                showif: "x2-2"
            }, {
                type: "emote",
                dir: "in",
                content: `emote/xiao10.png`
            }, {
                type: "text",
                dir: "in",
                content: `I shouldn't have came to this stupid thing.`
            }, {
                type: "choice",
                content: [{
                    key: "x3-1",
                    text: "Should I pick you up?"
                }, {
                    key: "x3-2",
                    text: "Should I call you and pretend there's an emergency so you can go?"
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I wish I could say yes...`,
                showif: "x3-1"
            }, {
                type: "text",
                dir: "in",
                content: `But it's fine. I'll stay a little longer.`,
                showif: "x3-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `A very tempting offer.`,
                showif: "x3-2"
            }, {
                type: "text",
                dir: "in",
                content: `But no. At least not now.`,
                showif: "x3-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `The idiot's vlogging while drunk again and someone's got to make sure he doesn't choke on his own spit and die.`
            }, {
                type: "choice",
                content: [{
                    key: "x4-1",
                    text: "... I have a feeling you're not being completely honest..."
                }, {
                    key: "x4-2",
                    text: "Uh oh..."
                }],
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/xiao3.png`,
                showif: "x4-1"
            }, {
                type: "text",
                dir: "in",
                content: `I don't know what you're talking about.`,
                showif: "x4-1"
            }, {
                type: "choice",
                content: [{
                    key: "x5-1",
                    text: "Let me guess... Wangshu Hotel's Almond Tofu delivery just arrived?"
                }, {
                    key: "x5-2",
                    text: "You're hiding something... From me??? ;(("
                }],
                showif: "x4-1",
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/xiao3.png`,
                showif: "x5-1"
            }, {
                type: "choice",
                content: [{
                    key: "x6-1",
                    text: "You're an addict, hun."
                }, {
                    key: "x6-2",
                    text: "If you have to choose between me and almond tofu which one would you choose???"
                }],
                showif: "x5-1",
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/xiao5.png`,
                showif: "x6-1"
            }, {
                type: "text",
                dir: "in",
                content: `They taste food`,
                showif: "x6-1"
            }, {
                type: "text",
                dir: "in",
                content: `Good`,
                showif: "x6-1"
            }, {
                type: "text",
                dir: "in",
                content: `Brb eating`,
                showif: "x6-1"
            }, {
                type: "choice",
                content: [{
                    key: "x6-1",
                    text: "I lost to almond tofu again 🙄"
                }],
                showif: "x6-1",
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/xiao6.png`,
                showif: "x6-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `What kind of illogical situation are you creating in your head?`,
                showif: "x6-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `You are not food and almond tofus are not even living beings.`,
                showif: "x6-2"
            }, {
                type: "text",
                dir: "in",
                content: `There can be no comparison.`,
                showif: "x6-2"
            }, {
                type: "choice",
                content: [{
                    key: "x7-1",
                    text: "SO DO YOU LOVE ME MORE OR???"
                }, {
                    key: "x7-2",
                    text: "Just choose!! >:("
                }],
                showif: "x6-2",
                timeout: 2500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/xiao8.png`,
                showif: "x7-1"
            }, {
                type: "text",
                dir: "in",
                content: `Whatever, idiot.`,
                showif: "x7-1"
            }, {
                type: "text",
                dir: "in",
                content: `I'm gonna go eat. Bye`,
                showif: "x7-1",
                timeout: 6000
            }, {
                type: "ts",
                content: "21:32",
                showif: "x7-1",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Of course I love you more, dumbass.`,
                showif: "x7-1"
            }, {
                type: "text",
                dir: "in",
                content: `No.`,
                showif: "x7-2"
            }, {
                type: "text",
                dir: "in",
                content: `I'm gonna go eat. Bye`,
                showif: "x7-2"
            }, {
                type: "text",
                dir: "in",
                content: `Like I said. No idea what you're on about.`,
                showif: "x5-2"
            }, {
                type: "text",
                dir: "in",
                content: `It's hard to type while eating.`,
                showif: "x5-2"
            }, {
                type: "text",
                dir: "in",
                content: `I'll talk to yo u again latr`,
                showif: "x5-2"
            }, {
                type: "text",
                dir: "in",
                content: `He just tripped down the stairs.`,
                showif: "x4-2"
            }, {
                type: "emote",
                dir: "in",
                content: `emote/xiao10.png`,
                showif: "x4-2"
            }, {
                type: "text",
                dir: "in",
                content: `I'll text you again later.`,
                showif: "x4-2"
            }
        ],
        "zhongli": [
            {
                type: "ts",
                content: "01:42"
            }, {
                type: "choice",
                content: [{
                    key: "z1-1",
                    text: "i miss your voice 💔"
                }, {
                    key: "z1-2",
                    text: "pssst 'li.... i miss you ;("
                }]
            }, {
                type: "text",
                dir: "in",
                content: "Dear? You're still awake?",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: "You will see me again tomorrow morning.",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: "The sooner you sleep, the sooner we will see each other, no?"
            }, {
                type: "choice",
                content: [{
                    key: "z1-1",
                    text: "i guess..."
                }, {
                    key: "z1-2",
                    text: "but what if i toss and turn on the bed again..."
                }],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: "It has gotten quite late. I think you should put down your phone and try to rest your weary body, darling.",
                showif: "z1-1"
            }, {
                type: "text",
                dir: "in",
                content: "I do not want you to get sick, afterall.",
                showif: "z1-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: "Will you try to sleep once more for me?",
                showif: "z1-1"
            }, {
                type: "choice",
                content: [{
                    key: "z2-1",
                    text: "okay..."
                }, {
                    key: "z2-2",
                    text: "i don't think it'll work..."
                }],
                showif: "z1-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: "Thank you.",
                showif: "z2-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: "Good night, my love. I hope rest will find you this time.",
                showif: "z2-1"
            }, {
                type: "text",
                dir: "in",
                content: "Then, may I propose a call?",
                showif: "z2-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: "You've always said that my voice calms you down, so perhaps I could help?",
                showif: "z2-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: "Hmmm.",
                showif: "z1-2"
            }, {
                type: "text",
                dir: "in",
                content: "Do you really not feel sleepy?",
                showif: "z1-2"
            }, {
                type: "choice",
                content: [{
                    key: "z3-1",
                    text: "i'm tired but my brain just isn't turning off..."
                }, {
                    key: "z3-2",
                    text: "yeah... can we call?"
                }],
                showif: "z1-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: "Would it be rude for me to ask for a call this late at night?",
                showif: "z3-1",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: "Maybe one of the subjects I am currently studying will bore you enough to make you fall asleep?",
                showif: "z3-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: "Anything for you, darling.",
                showif: "z3-2",
                timeout: 2000
            }, {
                type: "notif",
                content: "Call started 01:47",
                showif: ["z2-2", "z3-1", "z3-2"],
                timeout: 5000
            }, {
                type: "notif",
                content: "Call ended 2h 10m",
                showif: ["z2-2", "z3-1", "z3-2"],
                timeout: 3000
            }, {
                type: "ts",
                content: "03:57",
                showif: ["z2-2", "z3-1", "z3-2"],
                timeout: 0
            }, {
                type: "text",
                dir: "in",
                content: "Dearest, you fell asleep so I took the liberty to end the call.",
                showif: ["z2-2", "z3-1", "z3-2"],
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: "I will be joining you in the lands of dreams soon. Perhaps we can continue our talk there :)",
                showif: ["z2-2", "z3-1", "z3-2"],
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: "I hope you will see this in the morning, in which case, good morning.",
                showif: ["z2-2", "z3-1", "z3-2"],
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: "I am confident that my morning self will love you even more than my current self, but allow me to say it nonetheless - I love you. I hope you're resting peacefully now.",
                showif: ["z2-2", "z3-1", "z3-2"],
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `I'll see you soon, ${name}.`,
                showif: ["z2-2", "z3-1", "z3-2"]
            }
        ],
    }

    initChars();
    getChar();
}

function initChars() {
    // deep clone here so original chats stays intact
    chars = [
        {
            key: "albedo",
            name: "💛 Bedo 💛",
            pfp: "pfp/albedo.png",
            chats: JSON.parse(JSON.stringify(chats.albedo))
        }, {
            key: "alhaitham",
            name: "plant dad(dy) 🌱",
            pfp: "pfp/alhaitham.png",
            chats: JSON.parse(JSON.stringify(chats.alhaitham))
        }, {
            key: "ayato",
            name: "my love 💙",
            pfp: "pfp/ayato.png",
            chats: JSON.parse(JSON.stringify(chats.ayato))
        }, {
            key: "kazuha",
            name: "baby <3",
            pfp: "pfp/kazuha.png",
            chats: JSON.parse(JSON.stringify(chats.kazuha))
        }, {
            key: "heizou",
            name: "sherlock reincarnate",
            pfp: "pfp/heizou.png",
            chats: JSON.parse(JSON.stringify(chats.heizou))
        }, {
            key: "thoma",
            name: "(future) hubby!",
            pfp: "pfp/thoma.png",
            chats: JSON.parse(JSON.stringify(chats.thoma))
        }, {
            key: "xiao",
            name: "precious bby",
            pfp: "pfp/xiao.png",
            chats: JSON.parse(JSON.stringify(chats.xiao))
        }, {
            key: "childe",
            name: "❤️❤️❤️love of my life❤️❤️❤️",
            pfp: "pfp/childe.png",
            chats: JSON.parse(JSON.stringify(chats.childe))
        }, {
            key: "diluc",
            name: "firelight🔥",
            pfp: "pfp/diluc.png",
            chats: JSON.parse(JSON.stringify(chats.diluc))
        }, {
            key: "kaeya",
            name: "ice ice baby",
            pfp: "pfp/kaeya.png",
            chats: JSON.parse(JSON.stringify(chats.kaeya))
        }, {
            key: "venti",
            name: "grande upsized",
            pfp: "pfp/venti.png",
            chats: JSON.parse(JSON.stringify(chats.venti))
        }, {
            key: "itto",
            name: "here comes trouble",
            pfp: "pfp/itto.png",
            chats: JSON.parse(JSON.stringify(chats.itto))
        }, {
            key: "zhongli",
            name: "My Beloved 🧡",
            pfp: "pfp/zhongli.png",
            chats: JSON.parse(JSON.stringify(chats.zhongli))
        }
    ];

    chars.sort((a, b) => {
        if(a.key < b.key) { return -1; }
        if(a.key > b.key) { return 1; }
        return 0;
    });
}

function getChar() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let charKey = urlParams.get('char');
    charKey = charKey ? charKey : ""

    if (!charKey) {
        return;
    }

    chars.forEach((c) => {
        if (charKey === c.key) {
            char = c;
        }
    });

    onSelectCharacter();
}

function selectCharacter(charKey) {
    chars.forEach((c) => {
        if (charKey === c.key) {
            char = c;
        }
    });

    onSelectCharacter();
}

function onSelectCharacter() {
    initChars();

    clearInterval(playChat);
    clearTimeout(playTimeout);
    // console.log({char})

    document.getElementById('chat-name').innerHTML = char.name;

    chatHTML = "";
    choiceHTML = "";
    lastChatIndex = -1;
    choiceSelected = "";
    choicesSelection = [];

    let chatListDiv = document.getElementById('chat-list');
    let choiceListDiv = document.getElementById('choice-list');
    chatListDiv.innerHTML = chatHTML;
    choiceListDiv.innerHTML = choiceHTML;

    playChatHistory();
}

function constructChatList() {
    let innerHTML = "";

    chars.forEach((c) => {
        innerHTML += `
            <div class="char-item">
                <button onclick="selectCharacter('${c.key}')">
                    <img class="char-pic" src="${c.pfp}"></img>
                    <div class="char-name">${c.name}</div>
                </button>
            </div>
        `;
    });

    document.getElementById('char-list').innerHTML = innerHTML;
}

function playChatHistory(intervalMs) {
    let i = 0, action = {};
    if (lastChatIndex > -1) {
        i = lastChatIndex;
        lastChatIndex = -1;
    }
    if (intervalMs === undefined) {
        intervalMs = defaultTimeoutMs;
    }
    playChat = setInterval(() => {
        if (i < char.chats.length) {
            action = appendChatHistory(i);
            i++;
            // console.log({lastChatIndex, i, action});
            if (action.command === "stop") {
                lastChatIndex = i;
                clearInterval(playChat);
            } else {
                lastChatIndex = i;
                clearInterval(playChat);
                playChatHistory(action.timeoutMs);
            }
        } else {
            clearInterval(playChat);
        }
    }, intervalMs);

    if (i >= char.chats.length) {
        appendEnding();
    }
}

function appendChatHistory(index) {
    let chat = char.chats[index];
    let command = "next";
    let timeoutMs = 0;

    if (!chat) {
        return { command, timeoutMs };
    }

    if (choiceSelected) {
        if (chat.showif) {
            if (Array.isArray(chat.showif)) {
                let stop = true;
                chat.showif.forEach((si) => {
                    if (si === choiceSelected) {
                        stop = false;
                    }
                });
                if (stop) {
                    return { command, timeoutMs };
                }
            } else {
                if (chat.showif !== choiceSelected) {
                    return { command, timeoutMs };
                }
            }
        }
    }

    switch (chat.type) {
        case "ts":
            chatHTML += `
                <div class="chat-ts">- <span id="chat-ts">${chat.content}</span> -</div>
            `;
            timeoutMs = chat.timeout !== undefined ? chat.timeout : defaultTimeoutMs;
            break;

        case "notif":
            chatHTML += `
                <div class="chat-notif">${chat.content}</div>
            `;
            timeoutMs = chat.timeout !== undefined ? chat.timeout : defaultTimeoutMs;
            break;

        case "text":
        case "emote":
            if (chat.dir === "in") {
                chatHTML += `
                    <div class="chat-bubble in">
                        <div class="left">
                            <img class="char-pic" src="${char.pfp}"></img>
                        </div>
                        <div class="right">
                            <div class="char-name">${char.name}</div>
                `;

                if (chat.type === "text") {
                    chatHTML += `<div class="message">${chat.content}</div>`;
                } else if (chat.type === "emote") {
                    chatHTML += `<img class="emote" src="${chat.content}"></img>`;
                } else if (chat.type === "pic") {
                    chatHTML += `<img class="pic" src="${chat.content}"></img>`;
                }

                chatHTML += `
                        </div>
                    </div>
                `;
            } else {
                chatHTML += `
                    <div class="chat-bubble out">
                        <div class="left">
                            <div class="char-name">${name}</div>
                `;

                if (chat.type === "text") {
                    chatHTML += `<div class="message">${chat.content}</div>`;
                } else if (chat.type === "emote") {
                    chatHTML += `<img class="emote" src="${chat.content}"></img>`;
                } else if (chat.type === "pic") {
                    chatHTML += `<img class="pic" src="${chat.content}"></img>`;
                }

                chatHTML += `
                        </div>
                        <div class="right">
                            <img class="char-pic" src="pfp/you.png"></img>
                        </div>
                    </div>
                `;
            }
            timeoutMs = chat.timeout !== undefined ? chat.timeout : defaultTimeoutMs;
            break;

        case "choice":
            command = "stop";
            timeoutMs = chat.timeout !== undefined ? chat.timeout : defaultChoiceTimeoutMs;

            choicesSelection = chat.content;
            // console.log({choicesSelection});

            chat.content.forEach((c) => {
                if (c.text) {
                    choiceHTML += `<button class="choice-btn" onclick="selectChoice('${c.key}')">${c.text}</button>`;
                } else if (c.emote) {
                    choiceHTML += `<button class="choice-btn emote" onclick="selectChoice('${c.key}')"><img src="${c.emote}"></img></button>`;
                }
            });
            // console.log(choiceHTML);
            break;

        case "pause":
            chatHTML += ``;
            timeoutMs = chat.timeout !== undefined ? chat.timeout : defaultTimeoutMs;
            break;
    }

    let chatListDiv = document.getElementById('chat-list');
    let choiceListDiv = document.getElementById('choice-list');

    // append html elements
    chatListDiv.innerHTML = chatHTML;
    choiceListDiv.innerHTML = choiceHTML;

    // hide or show chat list or choice list accordingly
    if (choiceHTML) {
        playTimeout = setTimeout(() => {
            chatListDiv.classList.add("hidden");
            choiceListDiv.classList.remove("hidden");
            clearTimeout(playTimeout);
        }, timeoutMs);
    } else {
        chatListDiv.classList.remove("hidden");
        choiceListDiv.classList.add("hidden");
    }

    // scroll chat list to the bottom and choice list to the top
    chatListDiv.scrollTop = chatListDiv.scrollHeight;
    choiceListDiv.scrollTop = 0;

    return { command, timeoutMs };
}

function appendEnding() {
    chatHTML += `<div class="chat-notif">- This chat has ended -</div>`;

    playTimeout = setTimeout(() => {
        let chatListDiv = document.getElementById('chat-list');
        chatListDiv.innerHTML = chatHTML;
        chatListDiv.scrollTop = chatListDiv.scrollHeight;
        clearTimeout(playTimeout);
    }, 1000);
}

function selectChoice(key) {
    let newItem = null;
    choicesSelection.forEach((item, i) => {
        if (item.key === key) {
            newItem = {
                type: item.text ? "text" : "emote",
                dir: "out",
                content: item.text ? item.text : item.emote,
                showif: key,
                timeout: item.timeout === undefined ? defaultTimeoutMs : item.timeout
            };
        }
    });

    // console.log({newItem});

    choiceSelected = key;
    choiceHTML = "";

    document.getElementById('chat-list').classList.remove("hidden");
    document.getElementById('choice-list').classList.add("hidden");
    document.getElementById('choice-list').innerHTML = choiceHTML;

    char.chats.splice(lastChatIndex, 0, newItem);

    playChatHistory();
}

// Mobile device alert
var warned = false;
var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

window.addEventListener(orientationEvent, function() {
    // alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width);
    if (window.orientation === 0 || window.orientation === 180) {
        if (!warned) {
            alertOrientation();
        }
    }
}, false);

function alertOrientation() {
    alert("Attention! Page best viewed in landscape orientation and optimized for PC 2560 × 1600 and iPhone 13 Pro screens.")
    warned = true;
}
