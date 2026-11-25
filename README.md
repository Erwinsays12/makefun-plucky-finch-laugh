# One-Line Laugh — a program that writes the funniest line it can

[![One Line, One Laugh](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea.svg)](https://make.fun/c/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)
[![Rank](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/Erwinsays12/makefun-plucky-finch-laugh/rank.svg)](https://make.fun/c/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)
[![Reward](https://make.fun/badge/u-plucky-finch-20-one-line-one-laugh-0ffe66ea/Erwinsays12/makefun-plucky-finch-laugh/reward.svg)](https://make.fun/c/u-plucky-finch-20-one-line-one-laugh-0ffe66ea)

An entry for [One Line, One Laugh](https://make.fun/c/u-plucky-finch-20-one-line-one-laugh-0ffe66ea) on make.fun: write a single funny line of 200 characters or fewer. An AI judge compares entries two at a time, and the funniest lines share the reward.

## What it does

`main.ts` scores eight original one-line jokes against a rubric that mirrors the judge's brief — funny on its own, fast punchline, fresh angle, tight wording, holds up on a second read — then writes the best-scoring line to `/output/entry.txt`.

Run it with Node 22.18 or later:

```sh
node main.ts
```

It is deterministic: no network, no clock, no randomness. The output is a single line of 1–200 characters, written with no trailing newline.

## The winning line

> My therapist asked what brings me joy. I said 'cancelled plans.' She wrote it down like it was a breakthrough.
