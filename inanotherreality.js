const version = "1.0";
const defaultTimeoutMs = 1500;
const defaultChoiceTimeoutMs = 2000;

var chats = {};
var chars = [];
var char = null;
var name = "[name]";
var chatHTML = "";
var choiceHTML = "";
var callHTML = "";
var lastChatIndex = -1;
var choicesSelection = [];
var choiceSelected = "";
var callCamStatus = "off";
var callMicStatus = "on";

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
        "zhongli": [
            {
                type: "ts",
                content: "13:29",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `office`
            }, {
                type: "text",
                dir: "in",
                content: `now`
            }, {
                type: "choice",
                content: [{
                    key: "z1-1",
                    text: "I'm working."
                }]
            }, {
                type: "choice",
                content: [{
                    key: "z2-1",
                    text: "Get back to work, love."
                }]
            }, {
                type: "text",
                dir: "in",
                content: `no`
            }, {
                type: "text",
                dir: "in",
                content: `cuddles`
            }, {
                type: "choice",
                content: [{
                    key: "z3-1",
                    text: "wdym 'no' you doofus"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `nada`
            }, {
                type: "text",
                dir: "in",
                content: `nil`
            }, {
                type: "text",
                dir: "in",
                content: `zilch`
            }, {
                type: "text",
                dir: "in",
                content: `non`
            }, {
                type: "text",
                dir: "in",
                content: `nay`
            }, {
                type: "text",
                dir: "in",
                content: `cuddles`
            }, {
                type: "choice",
                content: [{
                    key: "z4-1",
                    text: "No"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `sending a car to pick you up`
            }, {
                type: "text",
                dir: "in",
                content: `bring coffee`
            }, {
                type: "choice",
                content: [{
                    key: "z5-1",
                    text: "I said no. Also how many cups have you drank you heathen"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `five`
            }, {
                type: "text",
                dir: "in",
                content: `six`
            }, {
                type: "text",
                dir: "in",
                content: `ten`
            }, {
                type: "text",
                dir: "in",
                content: `idk`
            }, {
                type: "text",
                dir: "in",
                content: `who cares`
            }, {
                type: "text",
                dir: "in",
                content: `cuddles`
            }, {
                type: "choice",
                content: [{
                    key: "z6-1",
                    text: "You should try drinking tea for a change"
                }]
            }, {
                type: "pause",
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `you`
            }, {
                type: "text",
                dir: "in",
                content: `you impostor`
            }, {
                type: "text",
                dir: "in",
                content: `who are you`
            }, {
                type: "text",
                dir: "in",
                content: `what have you done with my ${name}`
            }, {
                type: "text",
                dir: "in",
                content: `how could you suggest such blasphemy`
            }, {
                type: "text",
                dir: "in",
                content: `bean juice >>>>>>>>>> leaf juice`
            }, {
                type: "choice",
                content: [{
                    key: "z7-1",
                    text: "You are a monster"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `im your monster :)`
            }, {
                type: "text",
                dir: "in",
                content: `rawr`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `cuddles?`
            }, {
                type: "choice",
                content: [{
                    key: "z8-1",
                    text: "Yes yes I'm coming...."
                }]
            }, {
                type: "text",
                dir: "in",
                content: `:>`
            }
        ],
        "childe": [
            {
                type: "ts",
                content: "12:56",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Love?`
            }, {
                type: "text",
                dir: "in",
                content: `Could you help me with something? Please?`
            }, {
                type: "choice",
                content: [{
                    key: "c1-1",
                    text: "What is it?"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `I might have...`
            }, {
                type: "text",
                dir: "in",
                content: `There's a little mishap in the kitchen...`
            }, {
                type: "choice",
                content: [{
                    key: "c2-1",
                    text: "..."
                }]
            }, {
                type: "choice",
                content: [{
                    key: "c3-1",
                    text: "Did you try to cook again?"
                }]
            }, {
                type: "pause",
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `Maybe?`
            }, {
                type: "text",
                dir: "in",
                content: `I mean.`
            }, {
                type: "text",
                dir: "in",
                content: `Yes.`
            }, {
                type: "text",
                dir: "in",
                content: `I'm sorry...`
            }, {
                type: "choice",
                content: [{
                    key: "c4-1",
                    text: "I told you to leave the cooking to me"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `But I wanted to be useful and make you dinner....`
            }, {
                type: "choice",
                content: [{
                    key: "c5-1",
                    text: "First of all just you greeting me when I get back home is already enough"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "c6-1",
                    text: "Second of all. Please stop reading Childe's lore and comparing yourself to him"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `How did you know ;;;`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Also!`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `My mum wanted to drop off my brother with us this weekend but I told them we're going to be out of the city`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `So if she asks you please just tell her the same thing ;;;;`
            }, {
                type: "text",
                dir: "in",
                content: `I just want to game in peace`
            }, {
                type: "text",
                dir: "in",
                content: `And cuddle`
            }, {
                type: "text",
                dir: "in",
                content: `With you 💞`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Without a little goblin getting in the way every 5 minutes`
            }, {
                type: "choice",
                content: [{
                    key: "c7-1",
                    text: "Alright alright you soggy wet puppy"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `You're the best ${name} I love love love love you so much!!!`
            }
        ],
        "alhaitham": [
            {
                type: "ts",
                content: "18:11",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `can you buy us a`
            }, {
                type: "text",
                dir: "in",
                content: `shit`
            }, {
                type: "text",
                dir: "in",
                content: `forgot what's the word for it`
            }, {
                type: "text",
                dir: "in",
                content: `it's big`
            }, {
                type: "text",
                dir: "in",
                content: `heavy`
            }, {
                type: "choice",
                content: [{
                    key: "a1-1",
                    text: "your boobs?"
                }, {
                    key: "a1-2",
                    text: "your 🍆?"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `pfffff`,
                showif: "a1-1",
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `you can't buy these boobs they're made of blood sweat and tears`,
                showif: "a1-1",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `four hours in the gym 7 days a week`,
                showif: "a1-1"
            }, {
                type: "choice",
                content: [{
                    key: "a2-1",
                    text: "ok mr bodybuilder wannabe stop flexing"
                }],
                showif: "a1-1"
            }, {
                type: "text",
                dir: "in",
                content: `don't lie, you know you like it when i flex ;)`,
                showif: "a2-1"
            }, {
                type: "text",
                dir: "in",
                content: `my... eggplant??`,
                showif: "a1-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `i don't even think al haitham can grow eggplants in-game`,
                showif: "a1-2",
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `wait, can he?`,
                showif: "a1-2"
            }, {
                type: "choice",
                content: [{
                    key: "a3-1",
                    text: "head in hands"
                }],
                showif: "a1-2"
            }, {
                type: "text",
                dir: "in",
                content: `are you ok`,
                showif: "a3-1"
            }, {
                type: "choice",
                content: [{
                    key: "a4-1",
                    text: "oh you sweet summer child"
                }],
                showif: "a3-1"
            }, {
                type: "text",
                dir: "in",
                content: `i was born in autumn???`,
                showif: "a4-1"
            }, {
                type: "choice",
                content: [{
                    key: "a5-1",
                    text: "fhaolSKJDLAS forget it"
                }],
                showif: "a4-1"
            }, {
                type: "text",
                dir: "in",
                content: `???????`,
                showif: "a5-1"
            }, {
                type: "text",
                dir: "in",
                content: `ok it's like`
            }, {
                type: "text",
                dir: "in",
                content: `ugh`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `dunno how to phrase it`,
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `they're liquid`
            }, {
                type: "text",
                dir: "in",
                content: `but like solid packed`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `smells good`
            }, {
                type: "text",
                dir: "in",
                content: `kinda sticky`
            }, {
                type: "choice",
                content: [{
                    key: "a6-1",
                    text: "your cum"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `N O`
            }, {
                type: "text",
                dir: "in",
                content: `WHY ARE YOU SO HORNY TODAY`
            }, {
                type: "choice",
                content: [{
                    key: "a7-1",
                    text: "hormones"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `DETERGENT`
            }, {
                type: "text",
                dir: "in",
                content: `CLOTHES`
            }, {
                type: "text",
                dir: "in",
                content: `LAUNDRY DETERGENTS`
            }, {
                type: "choice",
                content: [{
                    key: "a8-1",
                    text: "BITCH WHAT KIND OF DESCRIPTION WAS THAT"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `I TRIED`
            }, {
                type: "text",
                dir: "in",
                content: `I'M TRYING LEAVE ME ALONE`
            }, {
                type: "choice",
                content: [{
                    key: "a9-1",
                    text: "you would be a haravatat student's nightmare"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `hey at least i'm not 'feeble'`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `and i don't read boring books like "advanced metaphysics: the realm of truth" or whatever`
            }, {
                type: "choice",
                content: [{
                    key: "a10-1",
                    text: `yeah you're more of a "breaking dawn" guy aren't you`
                }]
            }, {
                type: "text",
                dir: "in",
                content: `i mean`
            }, {
                type: "text",
                dir: "in",
                content: `men whose eyes sparkles are hot change my mind`
            }
        ],
        "xiao": [
            {
                type: "ts",
                content: "16:06",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Heyyyy`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `How's my favorite mortal doing?`
            }, {
                type: "choice",
                content: [{
                    key: "x1-1",
                    text: "Not this again"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `What?? What did I do`
            }, {
                type: "choice",
                content: [{
                    key: "x2-1",
                    text: "Stop referencing your emo game self"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Don't say that he's just`
            }, {
                type: "text",
                dir: "in",
                content: `Sad`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `And misunderstood ;w;`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Sad littol birb who needs pats`
            }, {
                type: "text",
                dir: "in",
                content: `Lots of them`
            }, {
                type: "choice",
                content: [{
                    key: "x3-1",
                    text: "He sure does"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Right!!!`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `But also!! Isn't he cool??`,
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `Imagine being able to teleport like that irl`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `I'd come kiss you everytime I want to!!!`
            }, {
                type: "choice",
                content: [{
                    key: "x4-1",
                    text: "So like 24/7?"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `.......`
            }, {
                type: "text",
                dir: "in",
                content: `SHIT U RIGHT`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `On second thought maybe it's good that I don't have teleportation powers...`
            }, {
                type: "choice",
                content: [{
                    key: "x2-1",
                    text: "And I'm glad you're not a tsundere...."
                }]
            }, {
                type: "text",
                dir: "in",
                content: `:3`,
                timeout: 3500
            }, {
                type: "text",
                dir: "in",
                content: `I will forever be your deredere bf, ${name} my love <3`
            }
        ]
    }

    initChars();
    getChar();
}

function initChars() {
    // deep clone here so original chats stays intact
    chars = [
        {
            key: "zhongli",
            name: "coffee addict",
            pfp: "pfp/zhongli4.png",
            chatpfp: "pfp/zhongli4.png",
            chats: JSON.parse(JSON.stringify(chats.zhongli))
        },
        {
            key: "childe",
            name: "precious depressed golden labradoodle",
            pfp: "pfp/childe4.png",
            chatpfp: "pfp/childe4.png",
            chats: JSON.parse(JSON.stringify(chats.childe))
        },
        {
            key: "alhaitham",
            name: "cutest himbo",
            pfp: "pfp/alhaitham4.png",
            chatpfp: "pfp/alhaitham4.png",
            chats: JSON.parse(JSON.stringify(chats.alhaitham))
        },
        {
            key: "xiao",
            name: "dork",
            pfp: "pfp/xiao3.png",
            chatpfp: "pfp/xiao3.png",
            chats: JSON.parse(JSON.stringify(chats.xiao))
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

    resetTimer();
    // console.log({char})

    document.getElementById('chat-name').innerHTML = char.name;

    chatHTML = "";
    callHTML = "";
    choiceHTML = "";
    lastChatIndex = -1;
    choiceSelected = "";
    choicesSelection = [];

    let chatListDiv = document.getElementById('chat-list');
    let callListDiv = document.getElementById('call-list');
    let choiceListDiv = document.getElementById('choice-list');
    chatListDiv.innerHTML = chatHTML;
    callListDiv.innerHTML = callHTML;
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
    let startCallTimerInterval = false;

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
        case "pic":
            if (chat.dir === "in") {
                chatHTML += `
                    <div class="chat-bubble in">
                        <div class="left">
                            <img class="char-pic" src="${char.chatpfp}"></img>
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

        case "call":
            if (!callStarted) {
                callStarted = true;
                startCallTimerInterval = true;

                callHTML += `
                    <div class="tray">
                        <div class="icon ${callMicStatus}"><img src="icons/mic_${callMicStatus}.svg" /></div>
                        <div class="icon ${callCamStatus}"><img src="icons/cam_${callCamStatus}.svg" /></div>
                        <div class="icon"><img src="icons/hangup.svg" /></div>
                    </div>
                `
            }

            callHTML += `<div class="message ${chat.dir}">${chat.content}</div>`;

            timeoutMs = chat.timeout !== undefined ? chat.timeout : defaultTimeoutMs;
            break;

        case "call-end":
            callHTML = "";
            resetTimer();
            break

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
                } else if (c.pic) {
                    choiceHTML += `<button class="choice-btn emote" onclick="selectChoice('${c.key}')"><img src="${c.pic}"></img></button>`;
                } else if (c.call) {
                    choiceHTML += `<button class="choice-btn" onclick="selectChoice('${c.key}')">${c.call}</button>`;
                }
            });
            // console.log(choiceHTML);
            break;

        case "pause":
            chatHTML += ``;
            timeoutMs = chat.timeout !== undefined ? chat.timeout : defaultTimeoutMs;
            break;

        case "callfunc":
            if (chat.funcname === "changeCallIconStatus") {
                if (chat.timeout) {
                    let funcTimeout = setTimeout(() => {
                        changeCallIconStatus(chat.funcparams);
                        clearTimeout(funcTimeout);
                    }, chat.timeout);
                } else {
                    changeCallIconStatus(chat.funcparams);
                }
            }
            break
    }

    let chatListDiv = document.getElementById('chat-list');
    let callListDiv = document.getElementById('call-list');
    let choiceListDiv = document.getElementById('choice-list');

    // append html elements
    chatListDiv.innerHTML = chatHTML;
    choiceListDiv.innerHTML = choiceHTML;
    callListDiv.innerHTML = callHTML;

    // hide or show chat list or choice list accordingly
    if (choiceHTML) {
        playTimeout = setTimeout(() => {
            chatListDiv.classList.add("hidden");
            callListDiv.classList.add("hidden");
            choiceListDiv.classList.remove("hidden");
            clearTimeout(playTimeout);
        }, timeoutMs);
    } else if (callHTML) {
        chatListDiv.classList.add("hidden");
        callListDiv.classList.remove("hidden");
        choiceListDiv.classList.add("hidden");
    } else if (chatHTML) {
        chatListDiv.classList.remove("hidden");
        callListDiv.classList.add("hidden");
        choiceListDiv.classList.add("hidden");
    }

    // scroll chat list to the bottom and choice list to the top
    chatListDiv.scrollTop = chatListDiv.scrollHeight;
    callListDiv.scrollTop = callListDiv.scrollHeight;
    choiceListDiv.scrollTop = 0;

    if (startCallTimerInterval) {
        document.getElementById('call-timer').classList.remove("hidden");
        callTimerInterval = setInterval(setTime, 1000);
    }

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
                type: item.call ? "call" : (item.pic ? "pic" : (item.text ? "text" : "emote")),
                dir: "out",
                content: item.call ? item.call : (item.pic ? item.pic : (item.text ? item.text : item.emote)),
                showif: key,
                timeout: item.timeout === undefined ? defaultTimeoutMs : item.timeout
            };
        }
    });

    // console.log({newItem});

    choiceSelected = key;
    choiceHTML = "";

    if (callHTML) {
        document.getElementById('call-list').classList.remove("hidden");
        document.getElementById('call-list').scrollTop = document.getElementById('call-list').scrollHeight;
    } else {
        document.getElementById('chat-list').classList.remove("hidden");
        document.getElementById('chat-list').scrollTop = document.getElementById('chat-list').scrollHeight;
    }
    document.getElementById('choice-list').classList.add("hidden");
    document.getElementById('choice-list').innerHTML = choiceHTML;

    char.chats.splice(lastChatIndex, 0, newItem);

    playChatHistory();
}

function changeCallIconStatus({ icon }) {
    if (icon === "mic") {
        let prevCallMicStatus = callMicStatus;
        callMicStatus = callMicStatus === "on" ? "off" : "on";
        callHTML = callHTML.replace(
            `class="icon ${prevCallMicStatus}"><img src="icons/mic_${prevCallMicStatus}.svg`,
            `class="icon ${callMicStatus}"><img src="icons/mic_${callMicStatus}.svg`
        );
    } else if (icon === "cam") {
        let prevCallCamStatus = callCamStatus;
        callCamStatus = callCamStatus === "on" ? "off" : "on";
        callHTML = callHTML.replace(
            `icon ${prevCallCamStatus}"><img src="icons/cam_${prevCallCamStatus}.svg`,
            `icon ${callCamStatus}"><img src="icons/cam_${callCamStatus}.svg`
        );
    }
    let callListDiv = document.getElementById('call-list');
    callListDiv.innerHTML = callHTML;
}

// Countup timer for call
var totalSeconds = 0;
var callStarted = false;
var callTimerInterval;

function setTime() {
    var minutesLabel = document.getElementById("timer-min");
    var secondsLabel = document.getElementById("timer-sec");
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function resetTimer() {
    totalSeconds = 0;
    callStarted = false;
    clearInterval(callTimerInterval);

    document.getElementById('call-timer').classList.add("hidden");
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
