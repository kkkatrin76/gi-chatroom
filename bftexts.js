const version = 1.1;
const defaultTimeoutMs = 1500;
const defaultChoiceTimeoutMs = 2000;

var chats = {};
var chars = [];
var char = null;
var name = "[name]";
var chatHTML = "";
var choiceHTML = "";
var lastChatIndex = -1;
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
        "ayato": [],
        "childe": [],
        "diluc": [],
        "gorou": [],
        "heizou": [],
        "itto": [],
        "kaeya": [],
        "kazuha": [],
        "thoma": [],
        "venti": [],
        "xiao": [],
        "zhongli": [
            {
                type: "notif",
                content: "Call lasted 2h:43m",
                timeout: 0
            }, {
                type: "ts",
                content: "01:32"
            }, {
                type: "text",
                dir: "in",
                content: "I hope you're feeling sleepy now, dear."
            }, {
                type: "emote",
                dir: "in",
                content: "emote/zhongli1.png"
            }, {
                type: "choice",
                content: [{
                    key: "z1-1",
                    text: "I miss your voice already 💔"
                }, {
                    key: "z1-2",
                    text: "Mhm, thank you ❤️"
                }]
            }, {
                type: "text",
                dir: "in",
                showif: "z1-1",
                content: "Dearest, you will see me again tomorrow."
            }, {
                type: "text",
                dir: "in",
                showif: "z1-1",
                content: "But sleep is essential for one's body to function well."
            }, {
                type: "text",
                dir: "in",
                showif: "z1-1",
                content: "The sooner you sleep, the sooner we will reunite."
            }, {
                type: "choice",
                showif: "z1-1",
                content: [{
                    key: "z2-1",
                    text: "Okay..."
                }]
            }, {
                type: "text",
                dir: "in",
                showif: "z2-1",
                content: "Wonderful. Now then."
            }, {
                type: "text",
                dir: "in",
                showif: "z1-2",
                content: "You are most welcome."
            }, {
                type: "text",
                dir: "in",
                content: "Rest well, my love."
            }
        ],
    }

    initChars();
    getChar();
}

function initChars() {
    // deep clone here so original chats stays intact
    chars = [{
        key: "albedo",
        name: "💛 Bedo 💛",
        pfp: "pfp/albedo.png",
        chats: JSON.parse(JSON.stringify(chats.albedo))
    }, {
        key: "ayato",
        name: "💙",
        pfp: "pfp/ayato.png",
        chats: JSON.parse(JSON.stringify(chats.ayato))
    }, {
        key: "kazuha",
        name: "baby <3",
        pfp: "pfp/kazuha.png",
        chats: JSON.parse(JSON.stringify(chats.kazuha))
    }, {
        key: "heizou",
        name: "menace 😈",
        pfp: "pfp/heizou.png",
        chats: JSON.parse(JSON.stringify(chats.heizou))
    }, {
        key: "thoma",
        name: "future husband",
        pfp: "pfp/thoma.png",
        chats: JSON.parse(JSON.stringify(chats.thoma))
    }, {
        key: "xiao",
        name: "precious bby",
        pfp: "pfp/xiao.png",
        chats: JSON.parse(JSON.stringify(chats.xiao))
    }, {
        key: "childe",
        name: "❤️❤️❤️ajax❤️❤️❤️",
        pfp: "pfp/childe.png",
        chats: JSON.parse(JSON.stringify(chats.childe))
    }, {
        key: "diluc",
        name: "firelight🔥",
        pfp: "pfp/diluc.png",
        chats: JSON.parse(JSON.stringify(chats.diluc))
    }, {
        key: "kaeya",
        name: "kaekae",
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
        key: "gorou",
        name: "puppy",
        pfp: "pfp/gorou.png",
        chats: JSON.parse(JSON.stringify(chats.gorou))
    }, {
        key: "zhongli",
        name: "Archon of my 🧡",
        pfp: "pfp/zhongli.png",
        chats: JSON.parse(JSON.stringify(chats.zhongli))
    }, ];

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

    if (i === char.chats.length) {
        appendEnding();
    }
}

function appendChatHistory(index) {
    let chat = char.chats[index];
    let command = "next";
    let timeoutMs = 0;

    if (choiceSelected) {
        if (chat.showif) {
            if (chat.showif !== choiceSelected) {
                return { command, timeoutMs };
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
                } else {
                    chatHTML += `<img class="emote" src="${chat.content}"></img>`;
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
                } else {
                    chatHTML += `<img class="emote" src="${chat.content}"></img>`;
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

            chat.content.forEach((c) => {
                if (c.text) {
                    choiceHTML += `<button class="choice-btn" onclick="selectChoice('${c.key}|text:${c.text}|timeout:${timeoutMs}')">${c.text}</button>`;
                } else if (c.emote) {
                    choiceHTML += `<button class="choice-btn emote" onclick="selectChoice('${c.key}|emote:${c.emote}|timeout:${timeoutMs}')"><img src="${c.emote}"></img></button>`;
                }
            });
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

    let chatListDiv = document.getElementById('chat-list');
    chatListDiv.innerHTML = chatHTML;
    playTimeout = setTimeout(() => {
        chatListDiv.scrollTop = chatListDiv.scrollHeight;
        clearTimeout(playTimeout);
    }, 50);
}

function selectChoice(string) {
    let key = string.split("|")[0];
    let type = string.replace(`${key}|`, "").split(":")[0];
    let content = string.replace(`${key}|${type}:`, "").split("|")[0];
    let timeout = parseInt(string.replace(`${key}|${type}:${content}|timeout:`, ""));
    let newItem = {
        type,
        dir: "out",
        content,
        showif: key,
        timeout
    };

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
