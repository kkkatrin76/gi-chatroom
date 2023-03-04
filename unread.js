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
                content: "1 year ago",
                timeout: 0
            }, {
                type: "notif",
                content: "Call started 08:56",
                timeout: 0
            }, {
                type: "notif",
                content: "Call ended 10:20",
                timeout: 5000
            }, {
                type: "ts",
                content: "11:07",
                timeout: 500
            }, {
                type: "notif",
                content: "Call started 11:07",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"...."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"........."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `".... My dear ${name}."`,
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"It has been.... a while."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"......"`,
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"............"`,
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"Wherever you are, I hope..."`
            }, {
                type: "call",
                dir: "in",
                content: `"I hope you found peace. I hope you are well. And if you're watching me, well..."`,
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"I... miss you a lot, darling."`,
                timeout: 3500
            }, {
                type: "call",
                dir: "in",
                content: `"Not a single day has passed without me thinking of you."`
            }, {
                type: "call",
                dir: "in",
                content: `"Of our time together."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"... Of what could have been."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"..."`,
                timeout: 6000
            }, {
                type: "call",
                dir: "in",
                content: `"It's supposed to be your... birthday, today."`
            }, {
                type: "call",
                dir: "in",
                content: `"To tell the truth, I... Ah..."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"I bought you your favorite flowers on my way back home."`
            }, {
                type: "call",
                dir: "in",
                content: `" <i>*chuckle*</i> "`
            }, {
                type: "call",
                dir: "in",
                content: `"Yes, again."`
            }, {
                type: "call",
                dir: "in",
                content: `"Just like the previous years..."`,
                timeout: 10000
            }, {
                type: "call",
                dir: "in",
                content: `"I..."`
            }, {
                type: "call",
                dir: "in",
                content: `"I wonder if I would ever be able to truly erase this habit."`
            }, {
                type: "call",
                dir: "in",
                content: `"Perhaps I would never be able to."`
            }, {
                type: "call",
                dir: "in",
                content: `"Because I do not think... I do not think I could ever stop loving you."`,
                timeout: 6000
            }, , {
                type: "call",
                dir: "in",
                content: `"I should not dwell in the past. I know this well."`
            }, {
                type: "call",
                dir: "in",
                content: `"You would have scolded me for my actions. And I know I deserve it."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"..."`,
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"But... just for today."`
            }, {
                type: "call",
                dir: "in",
                content: `"Just for today, please, allow me to brood, even for just a little."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Just for today, allow me to... dream upon a future that escaped us."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"I'm trying. I really am."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"...."`,
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"......... <span style="font-size:0.4em"><i>*sob*</i></span> "`,
                timeout: 6000
            }, {
                type: "call",
                dir: "in",
                content: `"...................."`,
                timeout: 10000
            }, {
                type: "call",
                dir: "in",
                content: `"... Happy birthday, my love."`,
                timeout: 5000
            }, {
                type: "call-end"
            }, {
                type: "pause",
                timeout: 5000
            }
        ],
        "childe": [
            {
                type: "ts",
                content: "03:01",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `i miss you`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `i miss you`
            }, {
                type: "text",
                dir: "in",
                content: `so much`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `every day i wake up`
            }, {
                type: "text",
                dir: "in",
                content: `and i don't see you beside me`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `i can feel myself`,
                timeout: 6000
            }, {
                type: "text",
                dir: "in",
                content: `losing it`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `sometimes i just want to`,
                timeout: 7000
            }, {
                type: "text",
                dir: "in",
                content: `go`
            }, {
                type: "text",
                dir: "in",
                content: `to you`,
                timeout: 9000
            }, {
                type: "text",
                dir: "in",
                content: `but i know you would be very sad and angry`
            }, {
                type: "text",
                dir: "in",
                content: `so i refrain myself`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `but ${name}`
            }, {
                type: "text",
                dir: "in",
                content: `it's so hard`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `please`
            }, {
                type: "text",
                dir: "in",
                content: `i can't do this alone`,
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `i miss you`
            }, {
                type: "text",
                dir: "in",
                content: `i need you`
            }, {
                type: "text",
                dir: "in",
                content: `please come home to me`
            }, {
                type: "text",
                dir: "in",
                content: `come home`
            }, {
                type: "text",
                dir: "in",
                content: `im begging you`
            }, {
                type: "pause",
                timeout: 5000
            }
        ],
        "kaveh": [
            {
                type: "ts",
                content: "23:02",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `baaaAbbbbeeeee`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `baaaabyyyyyyy`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `myyyy bebee`
            }, {
                type: "text",
                dir: "in",
                content: `my beautiful gorgeous museee`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Immat the taver n wheer u aatttt`,
                timeout: 5000
            }, {
                type: "ts",
                content: "23:16",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Ur alwasyy pcka ng m e up whnn imm' drunk`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `n i Am v`
            }, {
                type: "text",
                dir: "in",
                content: `ver`,
                timeout: 1500
            }, {
                type: "text",
                dir: "in",
                content: `vey`
            }, {
                type: "text",
                dir: "in",
                content: `verry drnukk`,
                timeout: 5000
            }, {
                type: "ts",
                content: "23:31",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `i mwisss youuouuu`,
                timeout: 5000
            }, {
                type: "ts",
                content: "23:45",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `mso wassted`
            }, {
                type: "text",
                dir: "in",
                content: `comm pic m e p`,
                timeout: 1500
            }, {
                type: "text",
                dir: "in",
                content: `up`,
                timeout: 5000
            }, {
                type: "ts",
                content: "23:57",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `arerr you here yettt`,
                timeout: 5000
            }, {
                type: "ts",
                content: "00:14",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `i wanna see`
            }, {
                type: "text",
                dir: "in",
                content: `my baby`
            }, {
                type: "text",
                dir: "in",
                content: `wann a se e yhu`,
                timeout: 5000
            }, {
                type: "ts",
                content: "00:35",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `just`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `let me see you one more time`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `just once`
            }, {
                type: "text",
                dir: "in",
                content: `one last time`,
                timeout: 8000
            }, {
                type: "text",
                dir: "in",
                content: `please`
            }, {
                type: "pause",
                timeout: 5000
            }
        ],
        "alhaitham": [
            {
                type: "ts",
                content: "3 days ago, 09:00",
                timeout: 0
            }, {
                type: "text",
                dir: "in",
                content: `Good morning.`,
                timeout: 0
            }, {
                type: "ts",
                content: "3 days ago, 22:00",
                timeout: 0
            }, {
                type: "text",
                dir: "in",
                content: `Good night.`,
                timeout: 0
            }, {
                type: "ts",
                content: "2 days ago, 09:00",
                timeout: 0
            }, {
                type: "text",
                dir: "in",
                content: `Good morning.`,
                timeout: 0
            }, {
                type: "ts",
                content: "2 days ago, 22:00",
                timeout: 0
            }, {
                type: "text",
                dir: "in",
                content: `Good night.`,
                timeout: 0
            }, {
                type: "ts",
                content: "Yesterday, 09:00",
                timeout: 0
            }, {
                type: "text",
                dir: "in",
                content: `Good morning.`,
                timeout: 0
            }, {
                type: "ts",
                content: "Yesterday, 22:00",
                timeout: 0
            }, {
                type: "text",
                dir: "in",
                content: `Good night.`,
                timeout: 10000
            }, {
                type: "ts",
                content: "09:00",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Good morning.`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Your adored padisarah flowers are in full bloom today.`
            }, {
                type: "text",
                dir: "in",
                content: `It's a beautiful sight.`,
                timeout: 7000
            }, {
                type: "text",
                dir: "in",
                content: `I wish you were here to see it.`,
                timeout: 5000
            }, {
                type: "ts",
                content: "22:00",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Good night.`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `I love you.`
            }, {
                type: "text",
                dir: "in",
                content: `I still am.`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `And I'll always be.`
            }, {
                type: "pause",
                timeout: 5000
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
            key: "childe",
            name: "💙💙💙 Love of my life 💙💙💙",
            pfp: "pfp/childe3.gif",
            chatpfp: "pfp/childe3.jpg",
            chats: JSON.parse(JSON.stringify(chats.childe))
        },
        {
            key: "alhaitham",
            name: "🌱📚🪶💚",
            pfp: "pfp/alhaitham3.gif",
            chatpfp: "pfp/alhaitham3.jpg",
            chats: JSON.parse(JSON.stringify(chats.alhaitham))
        },
        {
            key: "kaveh",
            name: "architect of my heart 🏠",
            pfp: "pfp/kaveh.gif",
            chatpfp: "pfp/kaveh.png",
            chats: JSON.parse(JSON.stringify(chats.kaveh))
        },
        {
            key: "zhongli",
            name: "My Beloved 🧡",
            pfp: "pfp/zhongli3.gif",
            chatpfp: "pfp/zhongli3.jpg",
            chats: JSON.parse(JSON.stringify(chats.zhongli))
        },

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
