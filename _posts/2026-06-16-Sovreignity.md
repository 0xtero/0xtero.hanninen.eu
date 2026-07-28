---
layout: post
title: "The Sovereignty Rant"
date: 2026-06-16
style: rant
---
So the US government decided Anthropic's frontier models couldn't be shared outside its borders. No deprecation notice. No migration guide. No apologetic status page with a little yellow icon. Just gone on a Friday, which is of course the only day anything ever breaks. 

Sovereignty drags a lot of flag-waving baggage behind it. The engineering version of the word is much smaller and far less self-important. It has nothing to do with patriotism or "buy local to feel good." It's about whether a critical dependency can be yanked by someone who isn't in the room and was never going to ask first.

These days, these critical dependencies stack up into layers, neatly enough to be reassuring right up until it isn't. In relity, every layer is just a spot where someone else gets to throttle, meter, or just pull the plug.

At the top is the app and SaaS layer, the Microsoft 365s and Workspaces everyone swears they could migrate off any time now. Below that is the freshly arrived AI model layer and its APIs. Under that, cloud and compute, where most of Europe's spend cheerfully flows to about three American companies. Below that, chips, governed by export rules that change with the mood. And at the bottom, connectivity, the satellites and subsea cables nobody thinks about until a Russian fishing trawler drags an anchor across the bottom of the ocean.

The AI-model layer is the new arrival. A year ago it wasn't really on the register at all. Now half the stack depends on it and we're all apparently fine with a single API call that can quietly vanish over a weekend. Just fine. No concerns. Our modern infrastructure has chokepoints, and whoever's sitting on one gets to squeeze whenever it's convenient.

The word "sovereign" is now stamped on basically every cloud and AI vendor homepage, usually next to a stock photo of a flag or a very secure-looking padlock. It's the new "cloud-native." A few years ago everything was cloud-native, including products that were just a VM in a trench coat. Last year everything was "AI-powered," including a few things doing what was clearly a regex and a prayer. AI demand arrived (or was drummed up by the vendor hype machine) before anyone agreed what the word meant. The vacuum got filled with whatever definition was most flattering and least expensive to claim. The mechanics are pure greenwashing. Find a thing people want, find the cheapest way to look like it's on offer, and get it onto the slide before legal wakes up.

The usual shape is depressingly consistent. A local datacenter gets stood up in some small far-away village with a promise of tech jobs, a stack of compliance certs gets collected, and the whole thing gets christened a "sovereign cloud." But where data physically lives and who has authority over it are two completely different questions. If the company running it is headquartered somewhere whose laws can compel it to hand over data or cut access, the location of the disk is a charming detail and nothing more. The CLOUD Act and FISA 702 are the usual party guests. It's sovereign the way a rental car is "your car" right up until someone with more authority and a clipboard wants the keys back.

The EU's shiny new cloud-and-AI law comes with four whole tiers of "sovereignty assurance," which is about three more tiers than anyone actually wanted. Only the top tier actually keeps non-EU providers out. Everything below it lets the usual hyperscalers waltz in, provided their home country counts as "aligned enough," a phrase doing an Olympic amount of deadlifting in this context. Some of the "sovereign" contracts already going out are landing with joint ventures that politely include the exact foreign giants the whole exercise was meant to reduce dependence on.

And for the all-time cautionary tale, there's Gaia-X. A 2019 push for a sovereign European cloud. Spectacular volume of diagrams, working groups, and press releases. Almost nothing in production. Not for lack of engineering talent, but because the setup was voluntary, fragmented, and quietly steered by the very incumbents it was supposed to dethrone. Turns out asking the foxes to help design the chicken coop fence has a predictable result.

The small mercy is that telling real from snake-oil doesn't require a law degree. 

Can a foreign government or a vendor's HQ cut access overnight, and has it already happened to some other poor soul? Who holds the encryption keys and who can be quietly compelled to produce them? Closed API, or open weights that actually run in-house? Not where the datacenter lives but who genuinely owns the company operating it? Whether there's a tested exit plan or just a slide that confidently says "multi-cloud" and means nothing? And where the money actually goes? Because the spend is either building real capability or just renting someone else's platform with a local flag sticker slapped on the side.

Failing one of those isn't a dealbreaker. Having no answer at all, not being able to describe the blast radius, that's already a hole in the floor.

For language models specifically, the options tend to collapse into three, and every one of them comes with a catch.

US closed frontier models are the most capable. The catch is the switch lives in someone else's hand, possibly someone who tweets or uses too much orange tan spray. Chinese open-weight models like Qwen and Kimi are cheap to the point of being almost suspicious, auditable, and happy to run locally. The catch is the censorship, the narrative baggage, and a brand new dependency to replace the old one. Building European models, Mistral and the various public-sector efforts, gives genuine control. The catch is it's slower and costs real money, two things committees love.

We need to stop picking a country and start picking an architecture. Open weights on owned infrastructure can't be killed from a distance. That property holds no matter whose flag the model shipped under. The capability gap is closing fast too. The distance between the best open model and the closed frontier went from about a year to a few months, and on coding they're basically neck and neck. The strongest open weights right now are mostly Chinese, and no amount of squinting changes that. Open weights still mean the thing can be run locally regardless of origin. 

Downloading a model is the easy bit. It's basically a git clone and some disappointment about your available VRAM. Knowing whether it's safe to point at a bank, a hospital, or a government workflow is actual engineering, and it's the part almost nobody has bothered to fund.

Evaluation, red-teaming, regression-testing a model before it gets anywhere near production should be the standard. The EU's AI Act waves vaguely in this direction for the most capable models, but the in-house muscle to actually do any of it is thin to nonexistent, and nobody seems particularly bothered about that part. Sovereignty without an evaluation pipeline isn't sovereignty. It's running a stranger's 120Gb binary as root and calling it strategy.

The reflexive response to all this is a world-weary shrug. The argument goes that EU catching up is hopeless, so the grown-up move is to negotiate decent terms and make peace with the dependency. It sounds like realism. 

Airbus, GSM, and Galileo all looked adorably naive at the start and all turned out fine. These are all projects that had mandated demand and a long horizon. The Gaia-X flop had a voluntary consortium and a lovely set of intentions.

None of this requires becoming a policy person or saying "strategic autonomy" out loud in meetings. Most of it is the instinct already applied to tech everywhere; we just need to drag up those old desogns and apply it to the AI-layer. Nothing has really changed.

At the team level, spending some time thinking and writing down what actually happens if a given vendor/model vanishes tends to be clarifying, in the way a cold shower is clarifying. "Critical AI" and cloud dependencies get treated like SaaS subscriptions when they should be treated like infrastructure supply. Reserves, redundancy, and an exit plan that has been tested rather than merely promised.

And all of this lands back on the off switch. Sovereignty isn't about isolation or flags. It's the ability to keep running when someone an ocean away changes their mind on a Friday afternoon. That's it. That's the whole ask.
