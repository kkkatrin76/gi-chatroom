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
                content: "11:46",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Dearest.`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `If you are still awake and free, would you mind entertaining me for a moment, please?`
            }, {
                type: "choice",
                content: [{
                    key: "z1-1",
                    text: "Sure, I'm having trouble sleeping anyway..."
                }, {
                    key: "z1-2",
                    text: "Is something wrong?"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `And I as well.`,
                showif: "z1-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `I am not sure what your reason for being unable to rest, but...`,
                showif: "z1-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `You could say that.`,
                showif: "z1-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `To put it lightly, I am feeling rather lonesome.`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `The hotel's bed is quite spacious and I find myself wishing that you were next to me.`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Their bathrobes are of excellent quality, and I would have liked to see you in them.`,
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `I think I would take great pleasure in disrobing you from the silky material.`
            }, {
                type: "choice",
                content: [{
                    key: "z2-1",
                    text: "Well, this is new...."
                }, {
                    key: "z2-2",
                    text: "Would you rather have me wear nothing under, or have me wear your favorite set, hmm?"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `If you are uncomfortable with this arrangement, my dear, we can stop.`,
                showif: "z2-1"
            }, {
                type: "choice",
                content: [{
                    key: "z3-1",
                    text: "Dear lord no don't stop"
                }, {
                    key: "z3-2",
                    text: "No no please, continue...."
                }],
                showif: "z2-1"
            }, {
                type: "text",
                dir: "in",
                content: `Lovely.`,
                showif: ["z3-1", "z3-2"]
            }, {
                type: "text",
                dir: "in",
                content: `Darling....`,
                showif: "z2-2"
            }, {
                type: "choice",
                content: [{
                    key: "z2-2",
                    text: "You know, what a coincidence..."
                }]
            }, {
                type: "choice",
                content: [{
                    key: "z4-1",
                    text: "I'm wearing nothing right now <3"
                }, {
                    key: "z4-2",
                    text: "I'm wearing your favorite pair right now <3"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Are you, now?`,
                showif: "z4-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `Were you perhaps secretly hoping for this, hm?`,
                showif: "z4-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Or maybe our hearts are as synchronized as ever.`,
                showif: "z4-1"
            }, {
                type: "text",
                dir: "in",
                content: `Show me.`,
                showif: "z4-1"
            }, {
                type: "text",
                dir: "in",
                content: `It seems like someone's missing me just as much as I miss you.`,
                showif: "z4-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Let me see you, love.`,
                showif: "z4-2"
            }, {
                type: "choice",
                content: [{
                    key: "z5-1",
                    pic: "pic/blank.jpeg"
                }, {
                    key: "z5-2",
                    text: "Will you send me your picture in exchange? <3"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `If you so wish.`,
                showif: "z5-2",
                timeout: 5000
            }, {
                type: "pic",
                dir: "in",
                content: `pic/zhongli1.jpeg`,
                showif: "z5-2"
            }, {
                type: "pause",
                timeout: 4000,
                showif: "z5-2"
            }, {
                type: "choice",
                content: [{
                    key: "z5-2",
                    pic: "pic/blank.jpeg"
                }],
                showif: "z5-2",
            }, {
                type: "text",
                dir: "in",
                content: `My love.`,
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `Beautiful and radiant. As you always are.`,
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `How I long to touch you with these hands.`
            }, {
                type: "text",
                dir: "in",
                content: `You have no idea.`
            }, {
                type: "choice",
                content: [{
                    key: "z6-1",
                    text: "Want to serve you so bad"
                }, {
                    key: "z6-2",
                    text: "I miss your hands...."
                }]
            }, {
                type: "text",
                dir: "in",
                content: `I'm sure you do.`,
                showif: "z6-1",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `You're always more than happy to sink onto your knees for me, aren't you?`,
                showif: "z6-1",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Taking my cock so well every single time between those pretty lips of yours.`,
                showif: "z6-1",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `I've trained you so well this far, haven't I?`,
                showif: "z6-1"
            }, {
                type: "choice",
                content: [{
                    key: "z6-1",
                    text: "Mmm"
                }],
                showif: "z6-1"
            }, {
                type: "text",
                dir: "in",
                content: `I know, darling.`,
                showif: "z6-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Just three more nights. Let us be patient.`,
                showif: "z6-2"
            }, {
                type: "text",
                dir: "in",
                content: `But for the time being...`,
                showif: "z6-2"
            }, {
                type: "choice",
                content: [{
                    key: "z7-1",
                    text: "Can I touch myself?"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `If you ask nicely.`
            }, {
                type: "choice",
                content: [{
                    key: "z7-1",
                    text: "Can I touch myself, *please*?"
                }, {
                    key: "z7-2",
                    pic: "pic/blank.jpeg"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Yes, you may.`,
                showif: "z7-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `Show me.`,
                showif: "z7-1"
            }, {
                type: "choice",
                content: [{
                    key: "z7-1",
                    pic: "pic/blank.jpeg"
                }],
                showif: "z7-1"
            }, {
                type: "text",
                dir: "in",
                content: `Just because I'm not physically around, you're being disobedient?`,
                showif: "z7-2",
                timeout: 3500
            }, {
                type: "text",
                dir: "in",
                content: `Darling, you want me to punish you that badly when I get back home, is that it?`,
                showif: "z7-2"
            }, {
                type: "choice",
                content: [{
                    key: "z8-1",
                    text: ":P"
                }, {
                    key: "z8-2",
                    text: "I couldn't take it anymore ;(("
                }],
                showif: "z7-2"
            }, {
                type: "text",
                dir: "in",
                content: `I will keep this in mind.`,
                showif: "z8-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `My needy slut couldn't wait to play with herself?`,
                showif: "z8-2"
            }, {
                type: "text",
                dir: "in",
                content: `I should have known.`,
                showif: "z8-2"
            }, {
                type: "text",
                dir: "in",
                content: `Well, no matter.`,
                showif: "z8-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `It's a shame I cannot discipline you personally right now.`,
                showif: ["z8-1", "z8-2"],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `But you best prepare yourself for when the time comes.`,
                showif: ["z8-1", "z8-2"],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I have many ways to make you regret being disobedient.`,
                showif: ["z8-1", "z8-2"]
            }, {
                type: "text",
                dir: "in",
                content: `For now....`,
                showif: ["z8-1", "z8-2"],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Stop touching yourself.`,
                showif: ["z8-1", "z8-2"]
            }, {
                type: "choice",
                content: [{
                    key: "z8-1",
                    text: "No no no"
                }, {
                    key: "z8-2",
                    text: "Whyyyy"
                }],
                showif: ["z8-1", "z8-2"]
            }, {
                type: "text",
                dir: "in",
                content: `Only good girls get to cum, ${name}.`,
                showif: ["z8-1", "z8-2"],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Haven't you learned this already from your past misbehaviors?`,
                showif: ["z8-1", "z8-2"],
                timeout: 3500
            }, {
                type: "text",
                dir: "in",
                content: `And do not try to fool me.`,
                showif: ["z8-1", "z8-2"],
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `I assure you, I will eventually find out if you choose to disregard my words.`,
                showif: ["z8-1", "z8-2"]
            }, {
                type: "choice",
                content: [{
                    key: "z8-1",
                    text: "Please"
                }],
                showif: ["z8-1", "z8-2"]
            }, {
                type: "text",
                dir: "in",
                content: `Three nights.`,
                showif: ["z8-1", "z8-2"],
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `No touching yourself, no cumming by anything that isn't my hands, mouth, or cock.`,
                showif: ["z8-1", "z8-2"],
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Promise me.`,
                showif: ["z8-1", "z8-2"]
            }, {
                type: "choice",
                content: [{
                    key: "z8-1",
                    text: "But i wanna come"
                }],
                showif: ["z8-1", "z8-2"]
            }, {
                type: "text",
                dir: "in",
                content: `You brought this upon yourself.`,
                showif: ["z8-1", "z8-2"]
            }, {
                type: "choice",
                content: [{
                    key: "z8-1",
                    text: "Meanie"
                }],
                showif: ["z8-1", "z8-2"]
            }, {
                type: "text",
                dir: "in",
                content: `${name}.`,
                showif: ["z8-1", "z8-2"]
            }, {
                type: "choice",
                content: [{
                    key: "z8-1",
                    text: "I promise"
                }],
                showif: ["z8-1", "z8-2"]
            }, {
                type: "text",
                dir: "in",
                content: `Then, the contract is sealed.`,
                showif: ["z8-1", "z8-2"],
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `Good night, dearest.`,
                showif: ["z8-1", "z8-2"],
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Perhaps if you're lucky you'll dream about us tonight?`,
                showif: ["z8-1", "z8-2"],
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Just remember to abide by the contract, unless you want to prolong your punishment.`,
                showif: ["z8-1", "z8-2"]
            }, {
                type: "text",
                dir: "in",
                content: `Good girl.`,
                showif: "z7-1",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `I can see how wet you are. Is this turning you on more than I thought?`,
                showif: "z7-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `How filthy of you.`,
                showif: "z7-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `Though I cannot say I dislike it.`,
                showif: "z7-1",
                timeout: 3500
            }, {
                type: "text",
                dir: "in",
                content: `How many fingers are you using?`,
                showif: "z7-1"
            }, {
                type: "choice",
                content: [{
                    key: "z9-1",
                    text: "One"
                }, {
                    key: "z9-2",
                    text: "Two"
                }],
                showif: "z7-1"
            }, {
                type: "text",
                dir: "in",
                content: `Savouring the moment?`,
                showif: "z9-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `Add another finger, love. I know you can take it.`,
                showif: "z9-1"
            }, {
                type: "text",
                dir: "in",
                content: `Rushing, are we?`,
                showif: "z9-2"
            }, {
                type: "text",
                dir: "in",
                content: `I can almost hear the sounds in my head.`,
                showif: ["z9-1", "z9-2"],
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Your adorable gasps and moans. And the sound of your slick.... The finest melody to exist.`,
                showif: ["z9-1", "z9-2"],
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `The next time I go on a work trip, perhaps we can record a little something beforehand.`,
                showif: ["z9-1", "z9-2"]
            }, {
                type: "choice",
                content: [{
                    key: "z10-1",
                    text: "god yes"
                }, {
                    key: "z10-2",
                    text: "like a sex tape...?"
                }],
                showif: ["z9-1", "z9-2"]
            }, {
                type: "text",
                dir: "in",
                content: `Do you like that idea?`,
                showif: "z10-1",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `I'm flattered at the complete trust you have in me, darling.`,
                showif: "z10-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `A crude way to describe it, I prefer to think of it as...`,
                showif: "z10-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `A memento to keep us feeling close to each other while we're apart.`,
                showif: "z10-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `We can always discuss more later.`,
                showif: ["z10-1", "z10-2"],
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `Add one more finger for me.`,
                showif: ["z10-1", "z10-2"]
            }, {
                type: "choice",
                content: [{
                    key: "z11-1",
                    text: "My other hand...."
                }, {
                    key: "z11-2",
                    text: "More please"
                }],
                showif: ["z10-1", "z10-2"]
            }, {
                type: "text",
                dir: "in",
                content: `You can play with your breast if you want to.`,
                showif: "z11-1",
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `Greedy.`,
                showif: "z11-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `Very well, why don't you give your breast some attention?`,
                showif: "z11-2",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `Or would you prefer to rub your clit?`,
                showif: ["z11-1", "z11-2"],
                timeout: 3500
            }, {
                type: "text",
                dir: "in",
                content: `I know they must be swollen and throbbing right now, hm?`,
                showif: ["z11-1", "z11-2"],
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `Picture.`,
                showif: ["z11-1", "z11-2"]
            }, {
                type: "choice",
                content: [{
                    key: "z11-1",
                    pic: "pic/blank.jpeg"
                }],
                showif: ["z11-1", "z11-2"]
            }, {
                type: "pause",
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `What I wouldn't give to`,
                showif: "z11-1",
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `taste them right now..`,
                showif: "z11-1",
                timeout: 5500
            }, {
                type: "text",
                dir: "in",
                content: `Apologies, it is getting rather hard to type while having to tend to myself like this.`,
                showif: "z11-1",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `May I call you? I would like to hear your sweet voice moaning my name.`,
                showif: "z11-1",
                timeout: 2000
            }, {
                type: "notif",
                content: "Call started 11:58",
                showif: "z11-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: ``,
                showif: "z11-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"You sound quite breathless there, dearest..."`,
                showif: "z11-1",
                timeout: 2500
            }, {
                type: "call",
                dir: "in",
                content: `"Won't you let me see you? Turn on the video for me."`,
                showif: "z11-1",
                timeout: 2000
            }, {
                type: "callfunc",
                funcname: "changeCallIconStatus",
                funcparams: { icon: "cam" },
                showif: "z11-1",
                timeout: 2500
            }, {
                type: "pause",
                showif: "z11-1",
                timeout: 3500
            }, {
                type: "call",
                dir: "in",
                content: `"There you are, love."`,
                showif: "z11-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"My, you look as adorable as ever with those tearful eyes of yours."`,
                showif: "z11-1"
            }, {
                type: "choice",
                content: [{
                    key: "z12-1",
                    call: `"My fingers aren't enough either..."`
                }, {
                    key: "z12-2",
                    call: `"Wanna feel you inside me too..."`
                }],
                showif: "z11-1"
            }, {
                type: "call",
                dir: "in",
                content: `"Add another, then."`,
                showif: "z12-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"<i>Ngh...</i>"`,
                showif: "z12-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"The things you do to me, ${name}..."`,
                showif: "z12-2",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Stop biting your lips."`,
                showif: ["z12-1", "z12-2"],
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Your moans are adorable, dear. Let it all out."`,
                showif: ["z12-1", "z12-2"],
                timeout: 2000
            }, {
                type: "choice",
                content: [{
                    key: "z13-1",
                    call: `(Obey)`
                }, {
                    key: "z13-2",
                    call: `(Shake your head)`
                }],
                showif: ["z12-1", "z12-2"],
            }, {
                type: "call",
                dir: "in",
                content: `"Are you shy?"`,
                showif: "z13-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"But I've heard more embarrassing things coming out from those lips of yours."`,
                showif: "z13-2",
                timeout: 6000
            }, {
                type: "call",
                dir: "in",
                content: `".... Tsk."`,
                showif: "z13-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"I would have pried your mouth open with my fingers if I was there...."`,
                showif: "z13-2",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Ah, that's it, darling."`,
                showif: ["z13-1", "z13-2"],
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Faster. Buck your hips more. <i>Sing louder for me.</i>"`,
                showif: ["z13-1", "z13-2"],
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Imagine it's my fingers inside you. Bringing you closer and closer to your end, making a mess of your insides."`,
                showif: ["z13-1", "z13-2"],
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"I would- <i>mm</i>- use my mouth on you too. Where would you want me to tend to you?"`,
                showif: ["z13-1", "z13-2"],
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"That swollen nub of yours?"`,
                showif: ["z13-1", "z13-2"],
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Perhaps around your entrance?"`,
                showif: ["z13-1", "z13-2"],
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Or do you prefer them to be buried within your tight walls? Hmm?"`,
                showif: ["z13-1", "z13-2"],
                timeout: 3000
            }, {
                type: "choice",
                content: [{
                    key: "z14-1",
                    call: `"All of them...!"`
                }, {
                    key: "z14-2",
                    call: `"Please...."`
                }],
                showif: ["z13-1", "z13-2"],
            }, {
                type: "call",
                dir: "in",
                content: `"So greedy, as always."`,
                showif: "z14-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"But it's adorable how you can't seem to get enough of me."`,
                showif: "z14-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"I too, am the same, dear."`,
                showif: "z14-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"I'm glad our constant yearning runs both ways for each other...."`,
                showif: "z14-1",
                timeout: 3500
            }, {
                type: "call",
                dir: "in",
                content: `"What are you begging for, hmm?"`,
                showif: "z14-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"I can't exactly give you what you desire most now..."`,
                showif: "z14-2",
                timeout: 2500
            }, {
                type: "call",
                dir: "in",
                content: `"But know that... I will come back home to you."`,
                showif: "z14-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"And <i>then</i>... Yes... I have so many plans for us, dear."`,
                showif: "z14-2",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"... The beautiful sounds you make..."`,
                showif: ["z14-1", "z14-2"],
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Are you close, darling?"`,
                showif: ["z14-1", "z14-2"],
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"I am- ahh- almost... on my limit..."`,
                showif: ["z14-1", "z14-2"],
                timeout: 2000
            }, {
                type: "choice",
                content: [{
                    key: "z15-1",
                    call: `"Already?"`
                }, {
                    key: "z15-2",
                    call: `"Me too...!"`
                }],
                showif: ["z14-1", "z14-2"],
            }, {
                type: "call",
                dir: "in",
                content: `"My apologies... Today has been- hmm- quite stressful..."`,
                showif: "z15-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"But rest assured that... I will be here until you-"`,
                showif: "z15-1",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"-until you're satisfied..."`,
                showif: "z15-1",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Would that be- ah- acceptable, darling?"`,
                showif: "z15-1",
                timeout: 2000
            }, {
                type: "choice",
                content: [{
                    key: "z16-1",
                    call: `(Nod)`
                }, {
                    key: "z16-2",
                    call: `"You promised..."`
                }],
                showif: "z15-1",
            }, {
                type: "call",
                dir: "in",
                content: `"Of course..."`,
                showif: "z16-2",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Thank... you-"`,
                showif: ["z16-1", "z16-2"],
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Tsk- Haah- Ngh-!!"`,
                showif: ["z16-1", "z16-2"],
                timeout: 4500
            }, {
                type: "call",
                dir: "in",
                content: `"......"`,
                showif: ["z16-1", "z16-2"],
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"............"`,
                showif: ["z16-1", "z16-2"],
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"Ahh.... I forgot how... messy, this endeavor could be..."`,
                showif: ["z16-1", "z16-2"],
                timeout: 2500
            }, {
                type: "call",
                dir: "in",
                content: `"Apologies, dear, let me just-"`,
                showif: ["z16-1", "z16-2"],
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"....."`,
                showif: ["z16-1", "z16-2"],
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"There... Now..."`,
                showif: ["z16-1", "z16-2"],
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Your turn, darling. What would you like to have me do, hmm?"`,
                showif: ["z16-1", "z16-2"],
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"I can hear it from your voice.... your breathing..."`,
                showif: "z15-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"I'm glad we're both- e-enjoying this...!"`,
                showif: "z15-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Ngh-"`,
                showif: "z15-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"<i><span style="font-size:0.7em">Fuck-</span></i>""`,
                showif: "z15-2",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Ah- Haa-!"`,
                showif: "z15-2",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"....."`,
                showif: "z15-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"........."`,
                showif: "z15-2",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"............."`,
                showif: "z15-2",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"${name}, darling.... Are you-"`,
                showif: "z15-2",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"....."`,
                showif: "z15-2",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Ah... Haha, it seems like we both made quite a.... mess..."`,
                showif: "z15-2",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"You forgot to lay down a towel and I did not think to get one for myself.... Hmm...."`,
                showif: "z15-2",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"I've never needed one myself since I've always had you... This is why we should never take things for granted, I suppose."`,
                showif: "z15-2",
                timeout: 6000
            }, {
                type: "call",
                dir: "in",
                content: `"You look tired, love. Go drink some water and-"`,
                showif: "z15-2",
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"...... My dear, I know that look."`,
                showif: "z15-2",
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"Are you still unsatisfied, perhaps?"`,
                showif: "z15-2",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"............. Of course you are. Haha..."`,
                showif: "z15-2",
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"Well then, why don't you open our... special.... drawer? I believe we have a few things I have yet to test on you..."`,
                showif: "z15-2",
                timeout: 6000
            }, {
                type: "call",
                dir: "in",
                content: `"Take your pick, I'll be waiting right here..."`,
                showif: "z15-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Ah, remember to bring a towel and a fresh bedsheet."`,
                showif: "z15-2",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"The night is far from over, and besides..."`,
                showif: "z15-2",
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"We don't want to further spoil the mattress now, do we?"`,
                showif: "z15-2",
                timeout: 4000
            }, {
                type: "call-end"
            }, {
                type: "callfunc",
                funcname: "changeCallIconStatus",
                funcparams: { icon: "cam" },
                timeout: 0
            }
        ],
        "childe": [
            {
                type: "ts",
                content: "23:01",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `babyyyyyy`
            }, {
                type: "text",
                dir: "in",
                content: `wyd ;)`
            }, {
                type: "choice",
                content: [{
                    key: "c1-1",
                    text: "not you, unfortunately :(("
                }, {
                    key: "c1-2",
                    text: "trying to sleep like normal human being bby <3"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `most unfortunate indeed ;(((`,
                showif: "c1-1"
            }, {
                type: "text",
                dir: "in",
                content: `boooring`,
                showif: "c1-2"
            }, {
                type: "text",
                dir: "in",
                content: `entertain me?`,
                showif: "c1-2"
            }, {
                type: "text",
                dir: "in",
                content: `pleeeease?`,
                showif: "c1-2"
            }, {
                type: "choice",
                content: [{
                    key: "c2-1",
                    text: "okay, okay, what's wrong now?"
                }],
                showif: "c1-2"
            }, {
                type: "text",
                dir: "in",
                content: `i miss you a lot`
            }, {
                type: "text",
                dir: "in",
                content: `your smile`,
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `your laugh`,
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `your cunt`
            }, {
                type: "choice",
                content: [{
                    key: "c3-1",
                    text: "one of those things doesn't seem like it belongs there....."
                }, {
                    key: "c3-2",
                    text: "that escalated quickly"
                }, {
                    key: "c3-3",
                    text: "i miss your cock too 💔"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `wdym i miss that one thing the mostttt`,
                showif: "c3-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `i crave it every single second i'm away from it`,
                showif: "c3-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `my head is always full of you <3`,
                showif: "c3-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `don't you miss me too?`,
                showif: "c3-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `oh do you now`,
                showif: "c3-3",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `wanna play a game, baby? <3`,
                timeout: 5000
            }, {
                type: "pic",
                dir: "in",
                content: `pic/childe1.png`,
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `s called how many times can you cum in 15 mins <3`
            }, {
                type: "choice",
                content: [{
                    key: "c4-1",
                    text: "is there a prize?"
                }, {
                    key: "c4-2",
                    text: "15? or 10? :)"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `yes ofc`,
                showif: "c4-1"
            }, {
                type: "text",
                dir: "in",
                content: `up for a challenge? :))`,
                showif: "c4-2"
            }, {
                type: "text",
                dir: "in",
                content: `make it 10 then`,
                showif: "c4-2"
            }, {
                type: "text",
                dir: "in",
                content: `why not`,
                showif: "c4-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `whoever cums more gets to do anything to the loser`,
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `sounds like a good enough prize for you?`
            }, {
                type: "choice",
                content: [{
                    key: "c5-1",
                    text: "anything?"
                },]
            }, {
                type: "text",
                dir: "in",
                content: `anything`
            }, {
                type: "choice",
                content: [{
                    key: "c6-1",
                    text: "i have a feeling either way i'll enjoy it"
                }, {
                    key: "c6-2",
                    text: "even if i ask you to completely submit to me?"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "c6-1",
                    text: "but okay"
                }],
                showif: "c6-1"
            }, {
                type: "text",
                dir: "in",
                content: `oh my poor baby`,
                showif: "c6-1",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `you don't know what i have in store for you`,
                showif: "c6-1",
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `did you really think`,
                showif: "c6-1"
            }, {
                type: "text",
                dir: "in",
                content: `i've shown you all my cards?`,
                showif: "c6-1",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `i have so many sick and lewd fantasies`,
                showif: "c6-1"
            }, {
                type: "text",
                dir: "in",
                content: `when it comes to you`,
                showif: "c6-1"
            }, {
                type: "text",
                dir: "in",
                content: `hmmm?`,
                showif: "c6-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `what's this?`,
                showif: "c6-2"
            }, {
                type: "text",
                dir: "in",
                content: `a secret fantasy of yours?`,
                showif: "c6-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `baby`,
                showif: "c6-2"
            }, {
                type: "text",
                dir: "in",
                content: `i would do anything`,
                showif: "c6-2"
            }, {
                type: "text",
                dir: "in",
                content: `you ask for`,
                showif: "c6-2",
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `if you win, that is ;)`,
                showif: "c6-2"
            }, {
                type: "text",
                dir: "in",
                content: `i promise`,
                showif: "c6-2"
            }, {
                type: "choice",
                content: [{
                    key: "c7-1",
                    text: "one"
                }, {
                    key: "c7-2",
                    text: "you're so needy"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `oh`,
                showif: "c7-1",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `wait`,
                showif: "c7-1"
            }, {
                type: "text",
                dir: "in",
                content: `you're cheatingggg`,
                showif: "c7-1"
            }, {
                type: "text",
                dir: "in",
                content: `i haven't even started yet!!!`,
                showif: "c7-1",
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `can't help it can i`,
                showif: "c7-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `i have you as my partner`,
                showif: "c7-2"
            }, {
                type: "text",
                dir: "in",
                content: `ofc i would be`,
                showif: "c7-2"
            }, {
                type: "text",
                dir: "in",
                content: `insatiable`,
                showif: "c7-2",
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `god`
            }, {
                type: "text",
                dir: "in",
                content: `if only its`
            }, {
                type: "text",
                dir: "in",
                content: `your soft hands`,
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `pumping my cock right now`
            }, {
                type: "choice",
                content: [{
                    key: "c8-1",
                    text: "just my hands?"
                }, {
                    key: "c8-2",
                    pic: "pic/blank.jpeg"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `and your lips`,
                showif: "c8-1"
            }, {
                type: "text",
                dir: "in",
                content: `mouth`,
                showif: "c8-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `sucking and licking`,
                showif: "c8-1"
            }, {
                type: "text",
                dir: "in",
                content: `oh`,
                showif: "c8-2"
            }, {
                type: "text",
                dir: "in",
                content: `fuck`,
                showif: "c8-2"
            }, {
                type: "text",
                dir: "in",
                content: `youre so`,
                showif: "c8-2"
            }, {
                type: "text",
                dir: "in",
                content: `dirty`,
                showif: "c8-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `opening your mouth like that`,
                showif: "c8-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `my minds going to all the dirty possibilities`,
                showif: "c8-2"
            }, {
                type: "choice",
                content: [{
                    key: "c9-1",
                    text: "you like seeing my throat bulge from your cock don't you baby"
                }, {
                    key: "c9-2",
                    text: "such as...?"
                }],
                showif: "c8-2"
            }, {
                type: "text",
                dir: "in",
                content: `shit`,
                showif: "c9-1"
            }, {
                type: "text",
                dir: "in",
                content: `yes`,
                showif: "c9-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `dear gods yes`,
                showif: "c9-1",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `and your teary eyes`,
                showif: "c9-1",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `and the gagging noises`,
                showif: "c9-1",
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `cant get enjough ofit`,
                showif: "c9-1"
            }, {
                type: "text",
                dir: "in",
                content: `love love loev it`,
                showif: "c9-1"
            }, {
                type: "text",
                dir: "in",
                content: `you`,
                showif: "c9-2"
            }, {
                type: "text",
                dir: "in",
                content: `taking me in nice n deep`,
                showif: "c9-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `your throat struggling to take me all in`,
                showif: "c9-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `yet you cant get enough of me`,
                showif: "c9-2"
            }, {
                type: "text",
                dir: "in",
                content: `can you baby?`,
                showif: "c9-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `you love deepthroating me`,
                showif: "c9-2"
            }, {
                type: "text",
                dir: "in",
                content: `addicted to the way i`,
                showif: "c9-2"
            }, {
                type: "text",
                dir: "in",
                content: `f`,
                showif: "c9-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `fuck your throat`,
                showif: "c9-2",
                timeout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `always so good to me`,
                showif: "c9-2",
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `wanna cum on your face`
            }, {
                type: "text",
                dir: "in",
                content: `youre always so pretty`
            }, {
                type: "text",
                dir: "in",
                content: `but youre still the prettiest`,
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `when covered with my cum`,
                timeout: 6000
            }, {
                type: "pic",
                dir: "in",
                content: `pic/childe2.png`
            }, {
                type: "text",
                dir: "in",
                content: `1`
            }, {
                type: "text",
                dir: "in",
                content: `what a waste`
            }, {
                type: "text",
                dir: "in",
                content: `;((`
            }, {
                type: "text",
                dir: "in",
                content: `oh well`
            }, {
                type: "text",
                dir: "in",
                content: `youd let me breed you when im home right babe?`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `i wann`
            }, {
                type: "text",
                dir: "in",
                content: `wanna fill you up over and over`,
                timeout: 3000
            }, {
                type: "choice",
                content: [{
                    key: "c10-1",
                    text: "yes please"
                }, {
                    key: "c10-2",
                    text: "you're not winning though"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `gladly`,
                showif: "c10-1"
            }, {
                type: "text",
                dir: "in",
                content: `so nice of you to ask`,
                showif: "c10-1"
            }, {
                type: "text",
                dir: "in",
                content: `always found it hot when you beg`,
                showif: "c10-1"
            }, {
                type: "text",
                dir: "in",
                content: `and whine`,
                showif: "c10-1"
            }, {
                type: "text",
                dir: "in",
                content: `especially when it's my name`,
                showif: "c10-1"
            }, {
                type: "choice",
                content: [{
                    key: "c11-1",
                    pic: "pic/childe3.png"
                }],
                showif: "c10-1",
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `ffucking hell`,
                showif: "c11-1",
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `shit`,
                showif: "c11-1"
            }, {
                type: "text",
                dir: "in",
                content: `god`,
                showif: "c11-1"
            }, {
                type: "text",
                dir: "in",
                content: `you make me feel like a`,
                showif: "c11-1"
            }, {
                type: "text",
                dir: "in",
                content: `hormonal teen boy all over again`,
                showif: "c11-1",
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `my sluttiest`,
                showif: "c11-1"
            }, {
                type: "text",
                dir: "in",
                content: `my prettiest princess`,
                showif: "c11-1"
            }, {
                type: "text",
                dir: "in",
                content: `all mine`,
                showif: "c11-1"
            }, {
                type: "choice",
                content: [{
                    key: "c12-2",
                    pic: "pic/blank.jpeg"
                }],
                showif: "c10-2"
            }, {
                type: "text",
                dir: "in",
                content: `ffuc k`,
                showif: "c12-2"
            }, {
                type: "text",
                dir: "in",
                content: `thats`,
                showif: "c12-2"
            }, {
                type: "text",
                dir: "in",
                content: `reallly hot`,
                showif: "c12-2"
            }, {
                type: "text",
                dir: "in",
                content: `youre drenched baby`,
                showif: "c12-2"
            }, {
                type: "text",
                dir: "in",
                content: `haha`,
                showif: "c12-2"
            }, {
                type: "text",
                dir: "in",
                content: `if you keep sendin g me pics like these`,
                showif: "c12-2"
            }, {
                type: "text",
                dir: "in",
                content: `i can do this the whole night`,
                showif: "c12-2"
            }
        ],
        "alhaitham": [
            {
                type: "ts",
                content: "22:23",
                timeout: 500
            }, , {
                type: "notif",
                content: "Call started 22:23",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"..."`,
                timeout: 2000
            }, {
                type: "callfunc",
                funcname: "changeCallIconStatus",
                funcparams: { icon: "cam" },
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"......"`,
                timeout: 1000
            }, {
                type: "choice",
                content: [{
                    key: "a1-1",
                    call: `"Did something good happen?"`
                }, {
                    key: "a1-2",
                    call: `"Why are you smiling like that?"`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"What?"`,
                showif: "a1-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"No, not really."`,
                showif: "a1-1"
            }, {
                type: "choice",
                content: [{
                    key: "a2-1",
                    call: `"You look happy."`
                }],
                showif: "a1-1"
            }, {
                type: "call",
                dir: "in",
                content: `"..... Hmm."`,
                showif: "a2-1",
                timeout: 3000
            }, , {
                type: "call",
                dir: "in",
                content: `"Hm? Am I?"`,
                showif: "a1-2",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `".... Ah."`,
                showif: "a1-2"
            }, {
                type: "call",
                dir: "in",
                content: `"I guess I'm just happy to see you."`
            }, {
                type: "choice",
                content: [{
                    key: "a3-1",
                    call: `"Long day at the conference?"`
                }, {
                    key: "a3-2",
                    call: `"Did you miss me?"`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"That's certainly one way to put it."`,
                showif: "a3-1",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"How can I not?"`,
                showif: "a3-2"
            }, {
                type: "call",
                dir: "in",
                content: `"I'm used to coming back home to you at this point."`,
                showif: "a3-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"So this was... different. It felt strange."`,
                showif: "a3-2",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"..... Anyway."`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"I wanted to ask about... <i>this</i>."`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Did you put it on my luggage? Because I certainly don't remember packing it in."`,
                timeout: 2500
            }, {
                type: "call",
                dir: "in",
                content: `"Actually, I don't even know what this is. Some kind of a... drink holder?"`
            }, {
                type: "choice",
                content: [{
                    key: "a4-1",
                    call: `"Oh, you found it!"`
                }, {
                    key: "a4-2",
                    call: `"That's a sex toy, sweetie."`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"... Was I not supposed to?"`,
                showif: "a4-1"
            }, {
                type: "choice",
                content: [{
                    key: "a5-1",
                    call: `"It's a sex toy..."`
                }],
                showif: "a4-1"
            }, {
                type: "call",
                dir: "in",
                content: `"Wha-"`
            }, {
                type: "call",
                dir: "in",
                content: `"....."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"<i>Really?</i> You couldn't go without me for just two weeks?"`,
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"... So, what, you want me to put on a show?"`
            }, {
                type: "choice",
                content: [{
                    key: "a6-1",
                    call: `"Will you? For me?"`
                }, {
                    key: "a6-2",
                    call: `"That, and more..."`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"..."`,
                showif: "a6-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"You're such a pervert, you know that?"`,
                showif: "a6-1"
            }, {
                type: "choice",
                content: [{
                    key: "a7-1",
                    call: `"You act as if this isn't turning you on~"`
                }, {
                    key: "a7-2",
                    call: `"I-I'm not.... I just miss you...."`
                }],
                showif: "a6-1"
            }, {
                type: "call",
                dir: "in",
                content: `"I am most definitely not."`,
                showif: "a7-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"...."`,
                showif: "a7-1",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"What? Don't give me that look."`,
                showif: "a7-1"
            }, {
                type: "call",
                dir: "in",
                content: `"..."`,
                showif: "a7-1",
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `".... Fine. Just a little."`,
                showif: "a7-1",
                timeout: 2500
            }, {
                type: "call",
                dir: "in",
                content: `"Ah."`,
                showif: "a7-2",
                timeout: 2500
            }, {
                type: "call",
                dir: "in",
                content: `".... I'm sorry, love, perhaps I was too harsh."`,
                showif: "a7-2"
            }, {
                type: "call",
                dir: "in",
                content: `"I do miss you too."`,
                showif: "a7-2"
            }, {
                type: "call",
                dir: "in",
                content: `"I wish I can touch you and breathe in your scent."`,
                showif: ["a7-1", "a7-2"],
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Feel you against me, within my arms..."`,
                showif: ["a7-1", "a7-2"],
                timeout: 2000
            }, {
                type: "choice",
                content: [{
                    key: "a8-1",
                    call: `"I know of a way how we can still... pleasure each other? If you're up for it?"`
                }],
                showif: ["a7-1", "a7-2"],
            }, {
                type: "choice",
                content: [{
                    key: "a9-1",
                    call: `"What if we can... you know... pleasure each other?"`
                }],
                showif: "a6-2"
            }, {
                type: "call",
                dir: "in",
                content: `"Hm?"`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"I'm not understanding what you meant by that."`
            }, {
                type: "choice",
                content: [{
                    key: "a10-1",
                    call: `"Well, I have <i>this</i> handy little thing... And I might have secretly installed a little app on your phone...."`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"On my phone? Hold on."`,
                timeout: 6000
            }, {
                type: "call",
                dir: "in",
                content: `".... Hm. I see."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"I think I understand. If my hypothesis is correct, you have something installed on yours too."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Something to... control this particular toy on my side, perhaps?"`
            }, {
                type: "choice",
                content: [{
                    key: "a11-1",
                    call: `(Nod shyly)`
                }, {
                    key: "a11-2",
                    call: `"Are you interested?"`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"You're only getting shy now? How adorable."`,
                showif: "a11-1"
            }, {
                type: "call",
                dir: "in",
                content: `"I never thought you would pull something like this. How long have you been planning for it?"`,
                showif: "a11-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"I didn't think you would miss me that badly when it hasn't even been a week."`,
                showif: "a11-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Hah. Is that a trick question?"`,
                showif: "a11-2"
            }, {
                type: "call",
                dir: "in",
                content: `"You know I'm always interested to learn new things, especially when it comes to the subjects that I am passionate in."`,
                showif: "a11-2",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Fortunately for you, two of those subjects happen to be you and our relationship."`,
                showif: "a11-2",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Why don't you start first? I'm intrigued about how this works. Spread your legs open for me."`,
                timeout: 6000
            }, {
                type: "call",
                dir: "in",
                content: `"... Oh? How are you already so wet, hmm?"`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"What, were you touching yourself before I called?"`
            }, {
                type: "choice",
                content: [{
                    key: "a12-1",
                    call: `"Shut up...."`
                }, {
                    key: "a12-2",
                    call: `"Maybe.....?"`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"You were."`,
                showif: "a12-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"My, what an honor. Were you hoping for something like this to happen?"`,
                showif: "a12-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"I should've known you were up to something when you replied so fast despite the time difference..."`,
                showif: "a12-1",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"How adorably needy of you."`,
                showif: "a12-2"
            }, {
                type: "call",
                dir: "in",
                content: `"Well, no matter. Just means that we can jump to the main event right away."`,
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `".... There, that should've turned it on. Is it working?"`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Ha. Judging from that look on your face, it certainly is working, huh."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Stop pouting. I want to test things out first. You'll get the highest setting eventually."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Drag the tip all over your slit, [name]. <i>That's it.</i>"`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"....."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"I know what you're thinking. You want to put it in already, don't you?"`,
                timeout: 2500
            }, {
                type: "call",
                dir: "in",
                content: `"Always so impatient."`
            }, {
                type: "call",
                dir: "in",
                content: `"Be good and rub it against your clit now."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Good girl. Now if I just-"`,
                timeout: 2500
            }, {
                type: "call",
                dir: "in",
                content: `"-Oh? Who said you could stop? Come on now, back at it. It's just one level higher. Surely you're not that sensitive yet."`,
                timeout: 6000
            }, {
                type: "call",
                dir: "in",
                content: `"Or are you just that turned on, hmm? I was only gone for... what, three nights?"`,
                timeout: 3000
            }, {
                type: "choice",
                content: [{
                    key: "a13-1",
                    call: `"W-Where's <i>my</i> show, you jerk..."`
                }, {
                    key: "a13-2",
                    call: `"Can't I miss my boyfriend's cock?"`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"Pft- Are you trying to sound angry?"`,
                showif: "a13-1"
            }, {
                type: "call",
                dir: "in",
                content: `"Darling, all I hear is a whiny little mouse, trying desperately to even the playing field."`,
                showif: "a13-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"You filthy little thing."`,
                showif: "a13-2"
            }, {
                type: "call",
                dir: "in",
                content: `"You're so lucky that I can't shut that dirty mouth of yours in this predicament."`,
                showif: "a13-2",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"<i>*sigh*</i>"`
            }, {
                type: "call",
                dir: "in",
                content: `"Fine. I guess I could help, since you insist."`
            }, {
                type: "choice",
                content: [{
                    key: "a14-1",
                    call: `"Your bulge is obvious even through the video, idiot..."`
                }, {
                    key: "a14-2",
                    call: `"Hurry up, please...."`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"Even the worst of the lunatics would react like so when they see their lewd girlfriend putting on such a salacious show."`,
                showif: "a14-1",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Be patient."`,
                showif: "a14-2"
            }, {
                type: "call",
                dir: "in",
                content: `"Such a greedy little thing. You would be a spoiled brat if I don't hold you back at times like these."`,
                showif: "a14-2",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Ha. Aren't you lucky, to have such a generous boyfriend."`,
                showif: "a14-2"
            }, {
                type: "choice",
                content: [{
                    key: "a15-1",
                    call: `"Haithammmmm...."`
                }],
                showif: "a14-2"
            }, {
                type: "call",
                dir: "in",
                content: `"Okay, okay."`,
                showif: "a15-1"
            }, {
                type: "call",
                dir: "in",
                content: `"...."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Ah, I guess I'll have to angle the camera... And maybe... Like this...?"`,
                timeout: 6000
            }, {
                type: "call",
                dir: "in",
                content: `"... Good enough."`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"..... Hey. I never said you can stop playing with the toy."`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"What, did you get so distracted by my body? I've only just taken off my shirt."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"You're such a pervert. If I force your mouth open right now you would be drooling, wouldn't you?"`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Mm... That's right, continue rubbing against it, just like that..."`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"...."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"There. Pants are off."`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Here's the cock you love so much."`
            }, {
                type: "call",
                dir: "in",
                content: `"It's unfortunate that you can't lick all these mess, but..."`
            }, {
                type: "call",
                dir: "in",
                content: `"Guess the more lube the better for this thing, so-"`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"-Tsk! Fuck that's cold..."`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"What? Don't laugh. I'm used to your spit and slick."`,
                timeout: 3000
            }, {
                type: "choice",
                content: [{
                    key: "a16-1",
                    call: `"Can I put it in now? Please?"`
                }, {
                    key: "a16-2",
                    call: `"Just do it already, you insufferable prick..."`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"Hmm. Well, since you asked so nicely..."`,
                showif: "a16-1"
            }, {
                type: "call",
                dir: "in",
                content: `"Alright, you can. But slowly."`,
                showif: "a16-1"
            }, {
                type: "call",
                dir: "in",
                content: `"And when I tell you to stop, you stop."`,
                showif: "a16-1"
            }, {
                type: "choice",
                content: [{
                    key: "a17-1",
                    call: `"Okay..."`
                }, {
                    key: "a17-2",
                    call: `(Nod)`
                }],
                showif: "a16-1"
            }, {
                type: "call",
                dir: "in",
                content: `"Good girl, ${name}."`,
                showif: "a17-1",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Words, [name]."`,
                showif: "a17-2"
            }, {
                type: "choice",
                content: [{
                    key: "a18-1",
                    call: `"Okay!"`
                }],
                showif: "a17-2"
            }, {
                type: "call",
                dir: "in",
                content: `"You better keep your word, or I won't go easy on you when I get back."`,
                showif: "a18-1",
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `"Me, insufferable?"`,
                showif: "a16-2"
            }, {
                type: "call",
                dir: "in",
                content: `"Please. Don't delude yourself. You can't get enough of me and we both know it."`,
                showif: "a16-2"
            }, {
                type: "choice",
                content: [{
                    key: "a19-1",
                    call: `"Ugh, you're so full of yourself."`
                }, {
                    key: "a19-2",
                    call: `"Delusional insufferable prick."`
                }],
                showif: "a16-2"
            }, {
                type: "call",
                dir: "in",
                content: `"Some humans are born extraordinary, darling. That's just how life is."`,
                showif: "a19-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"I am just speaking the truth."`,
                showif: "a19-1"
            }, {
                type: "call",
                dir: "in",
                content: `"Delusional? Now that's a first."`,
                showif: "a19-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"And what does that make you, my dear girlfriend with an attitude? Need I remind you that you consented into dating me."`,
                showif: "a19-2",
                timeout: 4000
            }, {
                type: "choice",
                content: [{
                    key: "a20-1",
                    call: `"A decision I regret every day."`
                }],
                showif: "a19-2"
            }, {
                type: "call",
                dir: "in",
                content: `"Of course. That's why you packed this little present and asked for a call every single day that I'm gone. How very logical of you. The <i>pinnacle</i> of rationalism. Bravo."`,
                showif: "a20-1",
                timeout: 5000
            }, {
                type: "choice",
                content: [{
                    key: "a21-1",
                    call: `"I'm hanging up!!"`
                }],
                showif: "a20-1"
            }, {
                type: "call",
                dir: "in",
                content: `"We both know you're not going to hang up, ${name}."`,
                showif: "a21-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"<i>*chuckle*</i>"`,
                showif: "a21-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Alright, alright, I'll stop."`,
                showif: "a21-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Now, I normally don't like to reward bad behavior, but I hypothesize that you're being this bratty because you're desperately aroused."`,
                showif: ["a19-1", "a21-1"],
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"So why don't you start using that toy as intended?"`,
                showif: ["a19-1", "a21-1"],
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Oh? That was a loud moan... Does it feel that good, huh?"`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"See, if you're patient, you get rewarded with better things."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Look at you, only halfway in and you're already moaning like a bitch in heat..."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Don't go getting dumb from toys now, sweetheart. You could have been having <i>this</i> instead, you know?"`,
                timeout: 4000
            }, {
                type: "choice",
                content: [{
                    key: "a22-1",
                    call: `"I wanna see you use it too..."`
                }, {
                    key: "a22-2",
                    call: `"Big boy too scared to use your toy?"`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"Do you, now?"`,
                showif: "a22-1"
            }, {
                type: "call",
                dir: "in",
                content: `"Well, that, I can certainly do..."`,
                showif: "a22-1",
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Trying to rile me up won't work well in your favor, you know."`,
                showif: "a22-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Just say that you want to see me use the toy, it's really not that hard, <i>sweetheart</i>."`,
                showif: "a22-2",
                timeout: 4000
            }, {
                type: "choice",
                content: [{
                    key: "a23-1",
                    call: `"Fine! I do want to see, just... hurry..."`
                }],
                showif: "a22-2"
            }, {
                type: "call",
                dir: "in",
                content: `"<i>*chuckle*</i>"`,
                showif: "a23-1"
            }, {
                type: "call",
                dir: "in",
                content: `"You're so desperate, it's adorable..."`,
                showif: "a23-1",
                timeout: 6000
            }, {
                type: "call",
                dir: "in",
                content: `".... Oh... So this is the... sensation, huh...."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Fuck, that's... tight."`
            }, {
                type: "call",
                dir: "in",
                content: `"Tighter that I imagined, actually..."`
            }, {
                type: "call",
                dir: "in",
                content: `"And really wet too, from all the lube... Shit-"`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"-Ah... Still can't win against your cunt, though..."`
            }, {
                type: "choice",
                content: [{
                    key: "a24-1",
                    call: `"P-Pull it down all the way..."`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"This is already all of it, babe."`
            }, {
                type: "call",
                dir: "in",
                content: `"I can't pull it down anymore..."`
            }, {
                type: "choice",
                content: [{
                    key: "a25-1",
                    call: `(Turn on the toy)`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"Fuck-!"`
            }, {
                type: "call",
                dir: "in",
                content: `"Y-You-"`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"<i>Ngh</i>... Give... a warning... first... w-would you..."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Hah- that's- the vibrations..."`
            }, {
                type: "choice",
                content: [{
                    key: "a26-1",
                    call: `"Does it feel good?"`
                }, {
                    key: "a26-2",
                    call: `"I-I'm sorry..."`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"Yes, it-"`,
                showif: "a26-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"Haa-"`,
                showif: "a26-1"
            }, {
                type: "call",
                dir: "in",
                content: `"Hold- s-stop playing with the setting for a minute..."`,
                showif: "a26-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"It's fine... You just... took me by surprise..."`,
                showif: "a26-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"This is bearable... for a start..."`,
                showif: "a26-2",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Try going up a bit?"`,
                showif: "a26-2"
            }, {
                type: "choice",
                content: [{
                    key: "a27-1",
                    call: `"Like... this?"`
                }],
                showif: "a26-2"
            }, {
                type: "call",
                dir: "in",
                content: `"Ahh, fuck-"`,
                showif: "a27-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Yeah, that's- nice... Just nice..."`,
                showif: "a27-1",
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"I can feel it warming up..."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Haa.. What I wouldn't give to be inside of you right now..."`
            }, {
                type: "call",
                dir: "in",
                content: `"Hah... This is so sloppy..."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"You seem to be really... enjoying the 'show', huh... Well-"`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"-there. I set yours higher. How's that?"`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Oh, you like that, don't you?"`
            }, {
                type: "call",
                dir: "in",
                content: `"I can imagine you... squeezing around me..."`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"So cute... Show me more. Go- <i>ahh-</i> f-faster..."`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Yes, just like that, good girl. Good girl..."`
            }, {
                type: "call",
                dir: "in",
                content: `"Taking it so well... You want more? Oh- fuck- you do. Look at you... I can hear how wet you are."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"T-There. That's... almost... the highest setting."`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"You're so wet... A-Ah, fuck, are you crying from how good it feels? You're so pent up, aren't you?"`,
                timeout: 4500
            }, {
                type: "call",
                dir: "in",
                content: `"Can't even talk... Heh...."`
            }, {
                type: "call",
                dir: "in",
                content: `"Sssh, darling, not so loud... Not that you don't sound beautiful, but- rrgh- I'd hate it if our neighbors hear you..."`,
                timeout: 4000
            }, {
                type: "call",
                dir: "in",
                content: `"Ah... Are you-? You're coming? Good... Then, I'll go ahead and-"`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"-max it out. Mm... There's my favorite expression. Now..."`,
                timeout: 3000
            }, {
                type: "call",
                dir: "in",
                content: `"<i>Cum for me.</i>"`,
                timeout: 5000
            }, {
                type: "call",
                dir: "in",
                content: `".... Archons........"`,
                timeout: 8000
            }, {
                type: "call",
                dir: "in",
                content: `"...."`,
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Ssh, it's okay, I've- I've got you. I'm winding it down... see?"`,
                timeout: 6000
            }, {
                type: "call",
                dir: "in",
                content: `"Do you... want it off completely?"`
            }, {
                type: "choice",
                content: [{
                    key: "a28-1",
                    call: `"Yes..."`
                }, {
                    key: "a28-2",
                    call: `"No..."`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"Tired?"`,
                showif: "a28-1"
            }, {
                type: "choice",
                content: [{
                    key: "a29-1",
                    call: `"Just need a little break..."`
                }],
                showif: "a28-1"
            }, {
                type: "call",
                dir: "in",
                content: `"That's fine. I'm turning it off... Could you-"`,
                showif: "a29-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Oh?"`,
                showif: "a28-2"
            }, {
                type: "call",
                dir: "in",
                content: `"In that kind of mood tonight, I see."`,
                showif: "a28-2"
            }, {
                type: "choice",
                content: [{
                    key: "a30-1",
                    call: `"You haven't finished yet, right?"`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"No, I hav-"`,
                showif: "a30-1",
                timeout: 500
            }, {
                type: "call",
                dir: "in",
                content: `"?!!!"`,
                showif: "a30-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"${name}- wait-"`,
                showif: "a30-1"
            }, {
                type: "choice",
                content: [{
                    key: "a31-1",
                    call: `"Sorry! Too high? How's this...?"`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"Ah-"`,
                showif: "a31-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"Y-Yeah... That's... good..."`,
                showif: "a31-1"
            }, {
                type: "choice",
                content: [{
                    key: "a32-1",
                    call: `"You're normally not this sensitive..."`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"Tsk... Whose fault is that I wonder..."`,
                showif: "a32-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"I'm all held back and you... You riled me up with that show of yours-"`,
                showif: "a32-1",
                timeout: 3000
            }, {
                type: "choice",
                content: [{
                    key: "a33-1",
                    call: `"..."`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"- so don't even- <i>archons!</i>"`,
                showif: "a33-1"
            }, {
                type: "call",
                dir: "in",
                content: `"A-Ah, wait- ${name}-"`,
                showif: "a33-1"
            }, {
                type: "choice",
                content: [{
                    key: "a34-1",
                    call: `"I see now... This is kind of fun..."`
                }]
            }, {
                type: "call",
                dir: "in",
                content: `"F-Fuck, baby..."`,
                showif: "a34-1",
                timeout: 2000
            }, {
                type: "call",
                dir: "in",
                content: `"You're gonna be the death of me..."`,
                showif: "a34-1",
                timeout: 5000
            }, {
                type: "call-end"
            }, {
                type: "callfunc",
                funcname: "changeCallIconStatus",
                funcparams: { icon: "cam" },
                timeout: 0
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
            name: "My Beloved 🧡",
            pfp: "pfp/zhongli3.gif",
            chatpfp: "pfp/zhongli3.jpg",
            chats: JSON.parse(JSON.stringify(chats.zhongli))
        },
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
    } else {
        document.getElementById('chat-list').classList.remove("hidden");
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
