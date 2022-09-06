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
        "ayaka": [
            {
                type: "ts",
                content: "10:29",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Help"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `What is it, ${name}?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "It's your brother"
                }]
            }, {
                type: "text",
                dir: "in",
                content: "My... brother?"
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Yes"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Who the fuck decided it was a good idea to put him in that stylized kimono for the upcoming campus open house"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "I need to kiss them on the mouth"
                }]
            }, {
                type: "text",
                dir: "in",
                content: "Are you referring to the one for the promotional brochure?"
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "YES AYAYA THE ACCURSED PROMOTIONAL BROCHURE THAT I WILL CUT AND KEEP IN A PHOTO FRAME BC HE LOOKS FINE AS FUCK HOLY SHIT"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "I really feel like you were both some kind of nobles in another life"
                }]
            }, {
                type: "text",
                dir: "in",
                content: "Why thank you, dear. I'm glad to hear that you find it pleasing to the eye."
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "'Dear'????? omg is this it is this the phase of our friendship where you finally start calling me with a nickname ❤️❤️❤️"
                }],
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: "I would say this is the part you realize that you're texting the wrong person.",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: "○□○△△△□○○□"
            }, {
                type: "text",
                dir: "in",
                content: "Here is Ayaka's number for reference.",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: "○○△□△○○□△□"
            }, {
                type: "text",
                dir: "in",
                content: "And this is my number, Ayato :)"
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Oh"
                }]
            }, {
                type: "text",
                dir: "in",
                content: ":)",
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: "And I should say this is the part where I think you should come to visit our estate, because I still do have the kimono on me and I wouldn't mind a private photoshoot with you as the photographer."
            }, {
                type: "text",
                dir: "in",
                content: "But only with one condition."
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "May I ask what is the condition....?"
                }]
            }, {
                type: "text",
                dir: "in",
                content: "I only allow my family or my significant other into my room.",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: "So to be permitted in, would you consider to become mine? I promise it comes with a lot of perks.",
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: "I have other kimono."
            }, {
                type: "text",
                dir: "in",
                content: "And suits."
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Deal"
                }]
            }, {
                type: "text",
                dir: "in",
                content: "How wonderful :)"
            }, {
                type: "text",
                dir: "in",
                content: "I'll send a car to pick you up, darling."
            }, {
                type: "text",
                dir: "in",
                content: "See you soon 💙"
            }
        ],
        "ayato": [
            {
                type: "ts",
                content: "14:33",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Hello best brother in the whole inazuma"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `But... I'm an only child?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "OMG how dare you??? I'm telling Ayaka >:("
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "LOOK please switch your mean switch off, I have a request and I really really really need your help.... Can you stop hogging Thoma to yourself?? I want to hang out with him too :(("
                }]
            }, {
                type: "text",
                dir: "in",
                content: `You want to hang out more with me?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "NOT U DUMBASS I'M SICK OF YOUR PRETTY FACE I WANT THOMA'S HANDSOME FACE >:("
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Oh`,
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `${name}`,
                timeout: 1500
            }, {
                type: "text",
                dir: "in",
                content: `This is my number`,
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `I mea n`,
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Thoma`,
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Ummm`,
                timeout: 1500
            }, {
                type: "text",
                dir: "in",
                content: `I htin k you sent this to th ewrong contact? That happens sometimes ahaha`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Ayato this isn't funny"
                }]
            }, {
                type: "notif",
                content: "Call started 14:38",
                timeout: 5000
            }, {
                type: "notif",
                content: "Call ended 0h 11m",
                timeout: 2000
            }, {
                type: "emote",
                dir: "in",
                content: `emote/thoma1.png`
            }, {
                type: "text",
                dir: "in",
                content: `So um`
            }, {
                type: "text",
                dir: "in",
                content: `Date this Saturday? :3`
            }
        ],
        "childe": [
            {
                type: "ts",
                content: "18:10",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "LSKDMSLJDSLDJJD I SAW ZHONGLI TODAY"
                }],
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "HE'S SO GORGEOUS LIKE ALWAYS"
                }],
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "THE ✨ELEGANCE✨ IN HIS STEPS AND THAT VELVETY BARITONE VOICE HHHH SIR PLS STEP ON ME"
                }],
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "JAX HOW DO YOU STAY CALM AND ACT NORMAL AROUND THAT FFS TEACH ME PLEASE"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `○△□○△□○△□○△□`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `I believe that should be Ajax/Childe/Tartaglia's actual phone number, ${name}.`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `And you could have joined me on my stroll when you saw me, I wouldn't have minded at all :)`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "what's happening rn"
                }],
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `If I might make an assumption based on what I witnessed today in the canteen: Childe seems to have pulled a prank on you.`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "mother"
                }],
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "fucker"
                }],
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Language, dear.`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "sorry"
                }],
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Oh, and if it's alright, I'd like us to get closer first, before getting into any sort of 'stepping' on each other.`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "LFJSLJDLSJFLDNCNSLFJD"
                }],
                timeout: 500
            }, {
                type: "emote",
                dir: "in",
                content: `emote/zhongli7.png`
            }
        ],
        "heizou": [
            {
                type: "ts",
                content: "17:01",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "He's so dreamy"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `May I ask who is this referring to?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Your best friend, who else ;("
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Oh.`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Yeah... He's just so. Idk. Pretty?"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `I suppose.`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Poetic. Attentive. Soft. I wanna run my fingers through those soft looking silver hair!!!!"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "I mean seriously who wouldn't find him attractive when he's dressed so nicely sitting under that sakura tree reading a book about poetry with a cat curled up on his side?????????"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `${name}, you might want to look at the contact name?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Huh??? Tf are you talking about 'zou, you're being weird today"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Normally you would've yelled for me to CONFESS YO SINS or whatever lol"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Ah.`,
                timeoout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `I believe Heizou has done something to your contacts.`
            }, {
                type: "text",
                dir: "in",
                content: `This is Kazuha.`
            }, {
                type: "emote",
                dir: "in",
                content: `emote/kazuha4.png`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "No. You're pulling my leg, you little devil gremlin goblin"
                }]
            }, {
                type: "pic",
                dir: "in",
                content: `pic/kazuha1.jpeg`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Do you think the forensics guild will miss their favorite star student? Because I'm about to hunt your best friend"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `${name}, I need to tell you something.`,
                timeoout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `But such important matter are best not be talked over text. Will you meet me at the sakura tree in downtown Inazuma?`,
                timeoout: 2000
            }, {
                type: "text",
                dir: "in",
                content: `Rest assured, I will have your favorite flowers ready. You only need to bring yourself :)`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "10 minutes is all I need :))"
                }]
            }, {
                type: "emote",
                dir: "in",
                content: `emote/kazuha1.png`
            }, {
                type: "text",
                dir: "in",
                content: `Alright, I'll be waiting.`
            }
        ],
        "kaeya": [
            {
                type: "ts",
                content: "09:09",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "KAEKAEKAEKAKEAE"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Could you please ask Diluc to come along to the beach outing? Please please please please??"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Why?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Because!!! I wanna spend time with him.... Maybe take a walk while everyone's busy, you know?"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Why?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "What are you, a one-eyed pirate parrot now??"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Look, I get it, you're a little overprotective because he's your older brother. But I promise you my feelings are genuine and I would never try to force him to do something he doesn't want to do."
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "I swear on my life. I just want to see him happy as much as you do..."
                }]
            }, {
                type: "text",
                dir: "in",
                content: `${name}`
            }, {
                type: "text",
                dir: "in",
                content: `I don't know how to say this...`
            }, {
                type: "text",
                dir: "in",
                content: `But this is my number you're currently texting - Diluc ○○△△□□△△△□□`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Hi Diluc. I apologize for the miscommunication. I hope you don't mind being an only child in your life."
                }]
            }, {
                type: "text",
                dir: "in",
                content: `As much as he gets on my nerves, I'd rather have him annoyingly alive.`,
                timeout: 2500
            }, {
                type: "text",
                dir: "in",
                content: `And I'll go to the beach outing.`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Oh"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Really???"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Yes.`,
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `I think a stroll along the beachside with you would be rather nice.`,
                timeout: 4500
            }, {
                type: "text",
                dir: "in",
                content: `And I'd like to hold you hand too while we're at it. Only if you're okay with it, of course.`
            }
        ],
        "lisa": [
            {
                type: "ts",
                content: "11:03",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "MOMMY"
                }],
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Did you see his expression??? Did he seem happy??? Please I'm dying to know if my hypothesis is correct!!!!"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `My apologies, but what is this about?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Really Lisa, playing dumb???"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "You act as if I hadn't mulled and stressed over about sending Albedo this flower bouquet for the past two straight weeks 🙃"
                }],
                timeout: 5000
            }, {
                type: "ts",
                content: "11:13",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Hello???? Lisa??????"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `I'm sorry, I don't know what to say.`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Just tell me what he looked like when he got the flowers!! I just wanna know if he favors cecilias more than roses!! Cause I think he does!!"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `I do favor cecilias more than roses, yes.`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Sis, what, you adore roses???"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Lisa does. Meanwhile, I - Albedo - prefers cecilias. Your hypothesis has proven to be correct.`,
                timeout: 5000
            }, {
                type: "ts",
                content: "11:19",
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `${name}?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "good afternoon albedo hope you had a good day so far i am just going into hiding at the moment"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `I understand that you must be feeling rather embarrassed and would rather not interact with me right now....`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `However, I still want to thank you for the lovely flowers. You did such a good job covering your tracks. I had no idea that they came from you.`,
                timeout: 4000
            }, {
                type: "text",
                dir: "in",
                content: `Please, allow me to take you out on a date. Because if would be a blatant lie for me to say that I am not at all interested in pursuing further relationship with you.`
            }
        ],
        "venti": [
            {
                type: "ts",
                content: "20:13",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Bitch"
                }],
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Excuse me?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Don't play dumb I swear to Celestia"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Where's my precious Xiao polaroid"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `What?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "SONOVA-"
                }],
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "You know that's my most prized treasure I literally had to swallow my pride and embarrassment when I asked the student council for a copy"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "DO NOT play dumb with me"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Um.`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `I think you got the wrong person.`,
                timeout: 4500
            }, {
                type: "text",
                dir: "in",
                content: `And why Xiao?`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "YOU ALREADY DID THIS ONCE YOU CAN'T FOOL ME"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "ALSO??????!?? NOT THIS AGAIN I TOLD YOU"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "He's just so sweet and attentive once you get to know him????? Also do you not see how handsome he is??? And his voice!!! Also he lent me his textbooks and helps me understand stuff I don't get!!! He feeds the cats behind the arts & lit building!!!"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `How did you know about the cats`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "I know what you're thinking. I'm not a stalker, Ven 🙄 I was waiting for your lazy ass and coincidentally saw it through the window remember"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `${name}`
            }, {
                type: "text",
                dir: "in",
                content: `Uh`
            }, {
                type: "text",
                dir: "in",
                content: `I'm not Venti.`,
                timeout: 3000
            }, {
                type: "text",
                dir: "in",
                content: `○□△□○○△□○△△ That's Venti's number. You can call him if you want to check.`
            }, {
                type: "text",
                dir: "in",
                content: `This is Xiao.`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Please pretend this never happened"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Fair enough.`,
                timeout: 5000
            }, {
                type: "text",
                dir: "in",
                content: `But also if you want to help feed the cats tomorrow I wouldn't mind.`
            }, {
                type: "text",
                dir: "in",
                content: `Only if you want to.`
            }
        ],
        "xinyan": [
            {
                type: "ts",
                content: "13:38",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "XINXIN IM GONNA CRY"
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "I saw Childe with a girl this morning I think she confessed and he was smiling and I think I lost my chance fml 🥲"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `That's not true at all.`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "He looked happy...."
                }]
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "I mean that's all I ever want for him, you know? For him to be genuinely happy. So I guess I should just... start to distance myself? Idk, wdyt???"
                }],
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `No!`,
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `Definitely not!`
            }, {
                type: "text",
                dir: "in",
                content: `That's the worst action you could have taken!!`
            }, {
                type: "text",
                dir: "in",
                content: `I'm pretty sure he likes you back! He probably rejected that girl!!!`
            }, {
                type: "text",
                dir: "in",
                content: `You should confess to him, see what he says!!!!`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "You think???"
                }],
                timeout: 500
            }, {
                type: "text",
                dir: "in",
                content: `YES!! Do it!!!!!`
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "Okay.... Wish me luck ;w;"
                }]
            }, {
                type: "pause",
                timeout: 6000
            }, {
                type: "ts",
                content: "17:56",
                timeout: 500
            }, {
                type: "choice",
                content: [{
                    key: "1-1",
                    text: "I hate you"
                }]
            }, {
                type: "text",
                dir: "in",
                content: `Awww love you too babyyyyy mwah mwah 😘😘😘😘`
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
            key: "ayaka",
            name: "ayayayaka",
            pfp: "pfp/ayaka.png",
            chats: JSON.parse(JSON.stringify(chats.ayaka))
        }, {
            key: "ayato",
            name: "pretty (annoying)",
            pfp: "pfp/ayato.png",
            chats: JSON.parse(JSON.stringify(chats.ayato))
        }, {
            key: "childe",
            name: "walking wallet",
            pfp: "pfp/childe.png",
            chats: JSON.parse(JSON.stringify(chats.childe))
        }, {
            key: "heizou",
            name: "the de(vil)tective",
            pfp: "pfp/heizou.png",
            chats: JSON.parse(JSON.stringify(chats.heizou))
        }, {
            key: "kaeya",
            name: "(future?) bro-in-law",
            pfp: "pfp/kaeya.png",
            chats: JSON.parse(JSON.stringify(chats.kaeya))
        }, {
            key: "lisa",
            name: "ara ara mommy",
            pfp: "pfp/lisa.png",
            chats: JSON.parse(JSON.stringify(chats.lisa))
        }, {
            key: "venti",
            name: "perpetually drunk kid",
            pfp: "pfp/venti.png",
            chats: JSON.parse(JSON.stringify(chats.venti))
        }, {
            key: "xinyan",
            name: "🔥⭐️🎸 best gal",
            pfp: "pfp/xinyan.png",
            chats: JSON.parse(JSON.stringify(chats.xinyan))
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
        case "pic":
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
