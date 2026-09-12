---
layout: post
title: "On AI Destroying Humanity"
date: 2026-09-12
---
Sigh. So this has been making the rounds this past week.

https://www.youtube.com/watch?v=CNut8Ub-lvQ

I originally figured it was ridiculous enough to die on its own. Instead, major news outlets picked it up and ran it, apparently without doing any research into the subject at all or talking to anyone sane about it. I guess that's how we roll now.

Let's start with the obvious. An LLM is not the ILOVEYOU virus. It is not infecting a web server. It is not hacking a wiki. Those are commodity pieces of software with mass distribution, and jumping from that to a frontier model is a non-trivial leap in hardware, software, and capability. One does not automatically follow from the other.

Running a frontier model right now is a MASSIVE effort. It needs purpose built datacenters to run. It sprawls across multiple very expensive chips, specialized inference software, specialized harness software, databases, cloud compute, tooling, and hundreds of install packages.

Let's take one Kimi K3 as an example. It's not a frontier model, you can get access to it with $10/month. But it's 1.6 TB of weights at 2.8 trillion parameters. You need about 1.5 TB of VRAM, which means 8x NVIDIA GB300s, which set you back roughly 400 to 700K USD to buy, and as much or more per year to rent.

Now say one of these real frontier models, Astra or Mythos or whatever the next big hype thing is, lands at 10 trillion parameters. That's roughly 10 to 20 TB unquantized. We're guessing, because these folks reveal nothing about architectures anymore, but they're reasonable guesses based on scaling laws. You'd need about 23 TB of VRAM and several million dollars a year to run ONE instance. And it gets worse, because it no longer fits on an 8-way cluster. Now you need special networking configuration and inference software, or a Nvidia NVL72 rack-scale system, which goes for between $3 and $6.5 million.

So the potential "killer rogue" model can only copy itself onto the most expensive compute in the world. The places that have that kind of compute, don't have it sitting on the shelf idling. And it's also not open to public to run whatever they want, it's watched closely for downtime and anomalies. It's governed by SLA's and protected by actual cybersecurity controls (which seems to be an area noone at these AI fronties labs understand at all). The highly expensive compute is doing one of two things.

1) Serving customers at a hyperscaler.
2) Serving inference for some well-endowed company.

In the first case, a "killer rogue AI" gets noticed instantly by the hyperscaler's actually good automated monitoring and it alerts the IT and Cybersecurity team, because something is using their infrastructure without being billed, costing them millions in lost revenue and electricity.

In the second case, the model that lived on that very expensive hardware is now offline, replaced by the rogue one. That model was presumably wired into some valuable internal software, which is now glitching and not running. This will also alert IT/Cybersecurity staff and incident response will begin immediately.

The expensive systems will be contained, The "killer rogue AI" will be evicted and that'll be the end of that.

Real world systems have friction, resource limits, actual monitoring, Real world systems need to provice business value. You can't use up the compute running a "rogue agent swarm" without anyone noticing. The researchers in AI labs obviously don't have to think about these things, which is singularly unique position. It seems that makes all of the lose perspective to reality completely.

To be fair, some of this may be possible in coming decades. Not likely but perhaps non-zero probability. Breakthroughs in architecture, smaller models, and a commoditized computing substrate could change the picture materially. And sure, we might eventually reach a point where superintelligence emerges from all of this. The odds of an LLM program suddenly flipping into superintelligent AGI are nearly nonexistent, partly because [language isn't even the foundation of human intelligence](https://www.nature.com/articles/s41586-024-07522-w), so betting on it springing from a text predictor is a stretch, but let's humor the process. If I was writing a near future sci-fi novel, I might use that. But of course, I don't have to write the novel, because these guys are LARP:ing it in evening news.

Getting back to reality. We don't have super AGI and the rest of this is mitigable, foreseeable, and an engineering problem that is solved by monitoring and basic cybersecurity controls. 

These things will not be copying themselves around like a virus on your computer, your phone of your entertainment system at home, not in their current form, not now, not in the coming years. Let's re-visit this in two decades or so.

All of this also betrays a lack of understanding of how complex economic, societal, and technological systems evolve. They don't evolve in a vacuum. Mitigations always show up as parallel evolutionary developments. You get viruses, you get antivirus software. You get DDoS attacks, you get CDNs like Cloudflare. There's money in solving problems, and nothing evolves in isolation. We who live and work in cyber security know this intimately because we ARE the mitigating factors.

Believing things evolve in isolation, that one thing changes while all other variables politely stay put, is one of the many reasoning errors that destroys people's ability to make accurate predictions.

And when you don't have the requisite knowledge to verify your own predictions, things that sound sane and rational to you are, in fact, completely batshit insane and ridiculous.

Finally I want to leave you with this old, but gold video. Watching it is well worth your time.

https://www.youtube.com/watch?v=kErHiET5YPw