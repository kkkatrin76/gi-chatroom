const name = "${name}";

// Define here
const defaultTimeoutMs = 1500;
const defaultChoiceTimeoutMs = 2000;
const chars_key = "zhongli";
const content_from_notion = `
21:34

[name].

Please stop crying.

/ IM SO DUMB

You are not.

/ I DROWNED YOU. TWICE. ON THE SAME SPOT

It was an unfortunate accident.

/ NO ITS BC IM BAD AT  VIDEO GAMES I DONT DESERVE YOU WHAT USE IS YOUR 100K METEOR WHEN I CANT EVEN DO THESE SHIT PROPRLY

Deep breaths, dear.

While I cannot judge your skill in ‘video games’, having no other references to other experiences of such nature, I can assure you I do not mind these kind of accidents.

I implore you to be kinder to yourself.

/ BUT LI ;;;;;;;

Hush, little one.

I enjoy travelling with you and I do not mind the little inconveniences. This body can take quite a beating, I assure you. You are talking to one of the strongest gods in the archon war, remember?

/ ;(((( okay…..

Good.

(pause 8s)

Now, I realize it might sound hypocritical for me to lecture you about this topic, however…

Let’s talk about your ‘gacha’ addiction and money spending habits.
`;


// Script will do their thing starting this point
const choice_initials = chars_key.substring(0,2);
const choice_illusion_prefix = "/", choice_branch_prefix = "#";

let choice = 1, choice_selection = 1, showif = false;
let chats = [];

let content_arr = content_from_notion.split("\n");
content_arr = content_arr.filter((c) => {
    return c.length > 0 && c !== "[END]";
});
content_arr = content_arr.map((c) => {
    return c.replace(/’/g, `'`).replace(/‘/g, `'`).replace(/“/g, `"`).replace(/”/g, `"`).replace(/…/g, `...`).replace(/\[name\]/g, "${name}");
});
// console.log(content_arr);

// console.log("\n============================================\n");

content_arr.forEach((ca, i) => {
    let chat = {};
    const ts_pattern = /\d\d:\d\d/g;
    if (ts_pattern.test(ca) && ca.length === 5) {
        chat = {
            type: "ts",
            content: ca,
            timeout: 500,
        };

    } else if (ca.charAt(0) === choice_illusion_prefix) { // it's a choice that doesn't really mean anything yippee
        chat = {
            type: "choice",
            content: [{
                key: `${choice_initials}${choice}-${choice_selection}`,
                text: ca.replace(choice_illusion_prefix, "").trim()
            }],
            timeout: defaultChoiceTimeoutMs
        };
        choice++;

    } else if (ca.charAt(0) === choice_branch_prefix) { // it's a choice that means something, take caution!
        chat = {
            type: "choice",
            content: [{
                key: `${choice_initials}-`,
                text: ca.replace(choice_branch_prefix, "").trim()
            }],
            timeout: defaultChoiceTimeoutMs
        };
        choice++;
    // } else if (ca === "---") { // +1 to choice and reset choice_selection to 1;
    //     choice++;
    //     choice_selection = 1;
    //     showif = false;

    // } else if () { // TODO: emote
    // } else if () { // TODO: pic
    // } else if () { // TODO: call
    // } else if () { // TODO: func
    } else {
        chat = {
            type: "text",
            dir: "in",
            content: ca,
            timeout: defaultTimeoutMs
        };

    }

    if (JSON.stringify(chat) !== "{}") chats.push(chat);
});
console.log(JSON.stringify(chats, null, 4));