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
                "type": "ts",
                "content": "21:34",
                "timeout": 500
            },
            {
                "type": "text",
                "dir": "in",
                "content": `${name}.`,
                "timeout": 3000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "Please stop crying.",
                "timeout": 1500
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "zh1-1",
                        "text": "IM SO DUMB"
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "You are not.",
                "timeout": 1500
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "zh2-1",
                        "text": "I DROWNED YOU. TWICE. ON THE SAME SPOT"
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "It was an unfortunate accident.",
                "timeout": 1500
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "zh3-1",
                        "text": "NO ITS BC IM BAD AT  VIDEO GAMES I DONT DESERVE YOU WHAT USE IS YOUR 100K METEOR WHEN I CANT EVEN DO THESE SHIT PROPRLY"
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "Deep breaths, dear.",
                "timeout": 6000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "While I cannot judge your skill in 'video games', having no other references to other experiences of such nature, I can assure you I do not mind these kind of accidents.",
                "timeout": 3000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "I implore you to be kinder to yourself.",
                "timeout": 1500
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/zhongli4.png`,
                "timeout": 2000
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "zh4-1",
                        "text": "BUT LI ;;;;;;;"
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "Hush, little one.",
                "timeout": 6000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "I enjoy travelling with you and I do not mind the little inconveniences. This body can take quite a beating, I assure you.",
                "timeout": 4000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "You are talking to one of the strongest gods in the archon war, remember?",
                "timeout": 3000
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "zh5-1",
                        "text": ";(((( okay....."
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "Good.",
                "timeout": 4000
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/zhongli2.png`,
                "timeout": 4000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "Now, I realize it might sound hypocritical for me to lecture you about this topic, however...",
                "timeout": 4000
            },
            {
                "type": "text",
                "dir": "in",
                "content": "Let's talk about your 'gacha' addiction and money spending habits..."
            }
        ],
        "childe": [
            {
                "type": "ts",
                "content": "20:44",
                "timeout": 500
            },
            {
                "type": "text",
                "dir": "in",
                "content": `betrayal`,
                "timeout": 1000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `betrayal`,
                "timeout": 1000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `betrayal`,
                "timeout": 1000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `betrayal`,
                "timeout": 1000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `BETRAYAL`,
                "timeout": 1000
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "ch1-1",
                        "text": "what"
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `YOU SAID I M THE ONLY HYDRO DPS YOU NEED`
            },
            {
                "type": "text",
                "dir": "in",
                "content": `YOU SAID MY PLAYSTYLE IS THE MOST FUN`
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "ch2-1",
                        "text": "what"
                    }
                ],
                "timeout": 2000
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/childe1.png`
            },
            {
                "type": "text",
                "dir": "in",
                "content": `THATS IT IM NOT GONNA CRIT FOR YOU ANYMORE`
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "ch3-1",
                        "text": "childe my babygirl my love my sunshine don't be like this"
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `THEN STOP USING KAY-MISS-A-TOE`
            },
            {
                "type": "text",
                "dir": "in",
                "content": `OR NUKELET`
            },
            {
                "type": "text",
                "dir": "in",
                "content": `OR WHATEVER THEIR NAMES ARE`
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "ch4-1",
                        "text": "look"
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "ch5-1",
                        "text": "my handsome bby my loml"
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `DON'T TRY TO WOO ME IT'S NO USE`
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/childe1.png`
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I'M NOT CRITTING UNTIL YOU BANISH THAT ACCURSED TEAM`
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "ch6-1",
                        "text": "but snookums"
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I AM NOT YOUR SNOOKUMS`
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "ch7-1",
                        "text": "baby boy please"
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `.........`,
                "timeout": 4000
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/childe2.png`,
                timeout: 3000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `i'm your only baby boy, right?`
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "ch8-1",
                        "text": "yes"
                    }, {
                        "key": "ch8-2",
                        "text": "yes baby ofc....... i mean.... ayato and neuvillette are more of a daddy material so <i>technically</i>...."
                    }
                ],
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `hmph`,
                "showif": "ch8-1",
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/childe2.png`,
                "showif": "ch8-1",
            },
            {
                "type": "text",
                "dir": "in",
                "content": `fine`,
                "showif": "ch8-1",
            },
            {
                "type": "text",
                "dir": "in",
                "content": `i guess`,
                "showif": "ch8-1",
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/childe2.png`,
                "showif": "ch8-1",
            },
            {
                "type": "text",
                "dir": "in",
                "content": `BUT YOU BETTER USE ME MORE THAN YOU USE THAT NEW-FILLET`,
                "showif": "ch8-1",
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "ch9-1",
                        "text": "it's 'neuvillette'...."
                    }
                ],
                "showif": "ch8-1",
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `G A S P`,
                "showif": "ch8-2",
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I`,
                "showif": "ch8-2",
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I CAN BE A DADDY TOO!!!!!!`,
                "showif": "ch8-2",
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "ch10-1",
                        "text": "sure you can babe"
                    }
                ],
                "showif": "ch8-2",
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I CAN CRIT BETTER THAN THEM >:(`,
                "showif": "ch10-1",
            },
            {
                "type": "choice",
                "content": [
                    {
                        "key": "ch11-1",
                        "text": "alright, crit well and i'll consider it"
                    }
                ],
                "showif": "ch10-1",
                "timeout": 2000
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/childe2.png`,
                "showif": "ch11-1",
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/childe2.png`,
                "showif": "ch11-1",
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/childe2.png`,
                "showif": "ch11-1",
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I'LL SHOW YOU`,
                "showif": "ch11-1",
            },
            {
                "type": "text",
                "dir": "in",
                "content": `LEMME AT THEM`,
                "showif": "ch11-1",
            }
        ],
        "alhaitham": [
            {
                "type": "ts",
                "content": "12:12",
                "timeout": 500
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Don't let any of it roll away now.`,
                "timeout": 2000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `It's all rolling away.`,
                "timeout": 2500
            },
            {
                "type": "text",
                "dir": "in",
                "content": `${name}.`
            },
            {
                "type": "text",
                "dir": "in",
                "content": `<i>${name}.</i>`
            },
            {
                type: "choice",
                content: [{
                    key: "ah1-1",
                    text: `SHUT YOUR MOUTH I WAS TRYING TO SAVE YOUR FEEBLE ASS FROM THE SUMPTER BEASTS`
                }]
            },
            {
                type: "choice",
                content: [{
                    key: "ah2-1",
                    text: `WHAT ARE YOU MADE OF, PAPER???? WHY ARE YOU FLYING ALL OVER THE PLACE WHENEVER YOU GET HIT`
                }]
            },
            
            {
                "type": "text",
                "dir": "in",
                "content": `I'm just a feeble scholar, what kind of expectations are you putting on me?`
            },
            {
                type: "choice",
                content: [{
                    key: "ah3-1",
                    text: `YOU'RE MY MAIN DPS??!??!??!?!??!?!?!?!?`
                }]
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Lamentably for you, putting me in a pedestal inside your mind will not change my constitution.`
            },
            {
                type: "choice",
                content: [{
                    key: "ah4-1",
                    text: `WHAT ARE THOSE MUSCLES FOR THEN`
                }]
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I was born this way.`,
                "timeout": 4000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I'm kidding.`,
                "timeout": 4000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Please stop talking so loudly, I can't exactly silence your <i>divine</i> voice with my soundproof headphones.`,
                "timeout": 5000
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/alhaitham4.png`
            },
            {
                type: "choice",
                content: [{
                    key: "ah5-1",
                    text: `NO`
                }, {
                    key: "ah5-2",
                    text: `ok so like this`
                }]
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Such an acrid personality you have.`,
                "showif": "ah5-1"
            },
            {
                type: "choice",
                content: [{
                    key: "ah6-1",
                    text: `BASELESS SLANDER`
                }],
                "showif": "ah5-1"
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I don't believe I-`,
                "showif": "ah6-1"
            },
            {
                "type": "callfunc",
                "funcname": "changeBg",
                "funcparams": { "path": "bg/unreadmessages/alhaitham2.jpeg" },
                "showif": "ah6-1",
                "timeout": 1000
            },
            {
                type: "pause",
                timeout: 2500,
                showif: "ah6-1",
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Why are you making me swim after all these sprinting.`,
                "showif": "ah6-1"
            },
            {
                "type": "text",
                "dir": "in",
                "content": `${name}.`,
                "showif": "ah6-1",
                "timeout": 2500
            },
            {
                "type": "text",
                "dir": "in",
                "content": `${name}.`,
                "showif": "ah6-1",
                "timeout": 3500
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I stand by my words, you have an acrid personality.`,
                "showif": "ah6-1",
                "timeout": 3500
            },
            {
                "type": "text",
                "dir": "in",
                "content": `You better <i>not</i> feed me soup after this.`,
                "showif": "ah6-1"
            },
            {
                "type": "text",
                "dir": "in",
                "content": `That's better, thank you.`,
                "showif": "ah5-2"
            },
            {
                type: "choice",
                content: [{
                    key: "ah7-1",
                    text: `you're so lucky you're handsome`
                }],
                "showif": "ah5-2"
            },
            {
                "type": "text",
                "dir": "in",
                "content": `A lot of people have said that.`,
                "showif": "ah7-1"
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I am rather insouciant of other people's opinion but I'm glad you find my facial structure and body composition pleasing to observe.`,
                "showif": "ah7-1",
                "timeout": 4000
            },
            {
                type: "choice",
                content: [{
                    key: "ah8-1",
                    text: `boy shut up`
                }],
                "showif": "ah7-1"
            },
            {
                "type": "text",
                "dir": "in",
                "content": `We both know you will talk to me again within five minutes. I do not see the need to keep my voice suppressed.`,
                "showif": "ah8-1"
            },
            {
                type: "choice",
                content: [{
                    key: "ah9-1",
                    text: `i hate it when you're right`
                }],
                "showif": "ah8-1"
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/alhaitham5.png`,
                showif: "ah9-1"
            },
            {
                type: "choice",
                content: [{
                    key: "ah10-1",
                    text: `STOP SMIRKING`
                }],
                "showif": "ah9-1"
            }
        ],
        "wriothesley": [
            {
                "type": "ts",
                "content": "10:40",
                "timeout": 500
            },
            {
                type: "choice",
                content: [{
                    key: "wr1-1",
                    text: `When Sigewinne's here, I'm going to put her on your team so you can take out your daughter on picnics`
                }]
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Sweetheart.`,
                "timeout": 3000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `The image is endearing and I would be more than happy to do that, but Sigewinne isn't my daughter, you know that, right?`
            },
            {
                type: "choice",
                content: [{
                    key: "wr2-1",
                    text: `*GASP* HOW COULD YOU??????? OMG THANK GOD I COVERED SIGEWINNE'S EARS`
                }, {
                    key: "wr2-2",
                    text: `WHAT.`
                }]
            },
            {
                "type": "text",
                "dir": "in",
                "content": `She's not even here?`,
                "showif": "wr2-1"
            },
            {
                type: "choice",
                content: [{
                    key: "wr3-1",
                    text: `THAT'S NOT AN EXCUSE`
                }],
                "showif": "wr2-1"
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Alright, alright, I'm sorry~`,
                "showif": "wr3-1"
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/wriothesley3.png`,
                "showif": "wr3-1"
            },
            {
                type: "choice",
                content: [{
                    key: "wr3-1",
                    text: `>:T`
                }],
                "showif": "wr3-1"
            },
            {
                type: "choice",
                content: [{
                    key: "wr4-1",
                    text: `I hope she puts so much stickers in your gauntlet it malfunctions.`
                }],
            },
            {
                "type": "text",
                "dir": "in",
                "content": `That would just land you in trouble, no?`,
                "showif": "wr4-1"
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I'm your most invested... uh... what's the term again? Dips?`,
                "showif": "wr4-1",
                timeout: 3000
            },
            {
                type: "choice",
                content: [{
                    key: "wr5-1",
                    text: `DPS`
                }],
                "showif": "wr4-1"
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Right. Close enough, heh.`,
                "showif": "wr5-1"
            },
            {
                type: "choice",
                content: [{
                    key: "wr6-1",
                    text: `look. you're fun to use but when will you do that 170k+ dmg again? i'm waiting (very) (im)patiently.`
                }]
            },
            {
                type: "pause",
                timeout: 3000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Ahem.`,
                timeout: 3000
            },
            {
                type: "emote",
                dir: "in",
                content: `emote/wriothesley1.png`,
                timeout: 3000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Why, look at the time. Looks like it's time for my afternoon tea.`
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Won't you join me, oh beloved, patient creator of mine?`
            },
            {
                type: "choice",
                content: [{
                    key: "wr7-1",
                    text: `you're so lucky you have a whole-ass bakery`
                }]
            },
            {
                type: "pause",
                timeout: 4000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Huh?`
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Since when did I own a bakery.`,
                timeout: 4000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Is that an outlander joke?`
            },
            {
                type: "choice",
                content: [{
                    key: "wr8-1",
                    text: `all you need to know is that ily for your`
                }]
            },
            {
                type: "choice",
                content: [{
                    key: "wr9-1",
                    pic: `pic/wriothesley1.jpeg`
                }]
            },
            {
                "type": "text",
                "dir": "in",
                "content": `${name.toUpperCase()}??????`,
                timeout: 5000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `.... Damn, those squats are certainly worth doing, heh.`
            }
        ],
        "neuvillette": [
            {
                "type": "ts",
                "content": "20:28",
                "timeout": 500
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Great Sovereign, permission to speak?`
            },
            {
                type: "choice",
                content: [{
                    key: "nv1-1",
                    text: `no`
                }, {
                    key: "nv1-2",
                    text: `granted`
                }]
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Oh.`,
                "showif": "nv1-1",
                "timeout": 4000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `My dear ${name}, permission to speak?`,
                "showif": "nv1-1",
                "timeout": 3000
            },
            {
                type: "choice",
                content: [{
                    key: "nv2-1",
                    text: `granted <3`
                }],
                "showif": "nv1-1",
            },
            {
                type: "pause",
                timeout: 4000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `This might be presumptuous for me to say seeing as you are the reason of my existence, however, I must confess that those continuous rapid three-sixties you command me to do lately has affected me in unfortunate ways.`,
                "timeout": 8000
            },
            {
                type: "choice",
                content: [{
                    key: "nv3-1",
                    text: `oh no sweetie i'm sorry 😭`
                }, {
                    key: "nv3-2",
                    text: `but. but kamekameha goes WEEEE`
                }]
            },
            {
                type: "pause",
                timeout: 3000,
                "showif": "nv3-1",
            },
            {
                "type": "text",
                "dir": "in",
                "content": `It is quite alright. I just wished to inform you. But if you deem it necessary, then I shall put up with the nauseating headache for your sake.`,
                "showif": "nv3-1",
                "timeout": 5000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `After all, your wisdom is incomprehensible in our eyes and I dare not think you have malicious intentions to me.`,
                "showif": "nv3-1",
                "timeout": 3000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `I'm ashamed to say I cannot comprehend that sentence's meanings.`,
                "showif": "nv3-2",
                "timeout": 8000
            },
            {
                type: "choice",
                content: [{
                    key: "nv4-1",
                    text: `i'll stop putting my phone on the fidget spinner i'm sorry 😔 `
                }]
            },
            {
                type: "pause",
                timeout: 3000,
                showif: "a5-2"
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Hm.`,
                "timeout": 3000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `What is a 'fidget spinner'?`,
                "timeout": 5000
            },
            {
                type: "choice",
                content: [{
                    key: "nv5-1",
                    text: `it's a little toy you can spin around`
                }]
            },
            {
                "type": "text",
                "dir": "in",
                "content": `How intriguing.`
            },
            {
                type: "choice",
                content: [{
                    key: "nv6-1",
                    text: `you said the same thing when i explained to you what a joystick is`
                }]
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Yes, well, your world has a lot of fascinating contraptions, and I personally find them very amusing.`,
                "timeout": 5000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `For example, those 'stainless steel ice cubes' you described the other day.`,
                "timeout": 5000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `Though I cannot understand why you would not wish to add more water in your drink, it is still quite an ingenious creation.`,
                "timeout": 5000
            },
            {
                type: "choice",
                content: [{
                    key: "nv7-1",
                    text: `you're such a boomer sometimes lol`
                }]
            },
            {
                type: "pause",
                timeout: 5000
            },
            {
                "type": "text",
                "dir": "in",
                "content": `What is a 'boomer'?`
            },
            {
                type: "choice",
                content: [{
                    key: "nv8-1",
                    text: `oh boy we're gonna be here all day aren't we`
                }]
            },
            {
                "type": "text",
                "dir": "in",
                "content": `?`
            },
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
            name: "Zhongli",
            pfp: "pfp/zhongli3.gif",
            chatpfp: "pfp/zhongli3.jpg",
            chats: JSON.parse(JSON.stringify(chats.zhongli))
        },
        {
            key: "childe",
            name: "Tartaglia",
            pfp: "pfp/childe3.gif",
            chatpfp: "pfp/childe3.jpg",
            chats: JSON.parse(JSON.stringify(chats.childe))
        },
        {
            key: "alhaitham",
            name: "Alhaitham",
            pfp: "pfp/alhaitham3.gif",
            chatpfp: "pfp/alhaitham3.jpg",
            chats: JSON.parse(JSON.stringify(chats.alhaitham))
        },
        {
            key: "wriothesley",
            name: "Wriothesley",
            pfp: "pfp/wriothesley.gif",
            chatpfp: "pfp/wriothesley.png",
            chats: JSON.parse(JSON.stringify(chats.wriothesley))
        },
        {
            key: "neuvillette",
            name: "Neuvillette",
            pfp: "pfp/neuvillette.gif",
            chatpfp: "pfp/neuvillette.png",
            chats: JSON.parse(JSON.stringify(chats.neuvillette))
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

function changeBg() {
    let main = document.getElementById('main');

    main.style.backgroundImage = `url('bg/unreadmessages/${char.key}.jpeg')`;
}
function callChangeBg({ path }) {
    let main = document.getElementById('main');

    main.style.backgroundImage = `url(${path})`;
}

function onSelectCharacter() {
    initChars();
    changeBg();

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
            if (chat.funcname === "changeBg") {
                if (chat.timeout) {
                    let funcTimeout = setTimeout(() => {
                        callChangeBg(chat.funcparams);
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
