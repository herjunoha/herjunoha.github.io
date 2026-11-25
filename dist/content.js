"use strict";
/*
  ALL THE TEXT OF THE SITE LIVES IN THIS FILE (src/content.ts).
  Edit the words between the backticks and save. The browser runs the compiled
  copy in dist/content.js, so keep "npm run watch" running in a terminal: it
  recompiles on every save, then you refresh the browser.
  Never edit anything inside dist/. It is regenerated and your change is lost.

  The shapes of every field are in src/types.d.ts. If you mistype a field name
  or leave one out, the compiler (and VS Code) reports it, and dist/ is left
  untouched until the error is fixed.

  How to edit safely
  - Keep every string inside its backticks ` `.
  - Do not type ${ inside a string. A backtick inside a string must be written \`
  - Keep the commas after each item.

  Two markers you can use inside any string
  - [[text]]   marks a DUMMY value. It gets a dotted underline so it cannot
               pass as real. Delete the [[ and ]] when the value is real.
  - **text**   highlights a word in the accent color (a fault or a rejection).

  Adding or removing items
  - Case files, posts, experience and facts are lists. Copy one { ... } block,
    paste it below the last one with a comma, and edit it.
  - A case file is one entry in caseFiles. Its page is <slug>.html, so a new
    case also needs a copy of case-1.html named after the slug, with the same
    data-case value. Add a card for it in home.cases.items.

  Source of the numbers: the three case folders under proof-of-method-site/
  (ANALYSIS.md, PAGE.md, STATUS.md, README.md in each). Numbers come from real
  runs only. Wording is "in this setup" because each case is one small run.

  Pages: index.html (home), cases.html, writing.html, about.html and
  contact.html each show one stage. The nav moves between them. A stage page
  is a copy of index.html with its own data-page value.

  Things that are NOT text and stay in src/render.ts: links, layout and the
  run strip drawing (edit the strip.code letters below instead).
*/
// The reviewer's note on the planted empty test, shown in case 3.
const REVIEWER_RECORD = [
    `case     AC-02, test c8`,
    `         booking form is visible`,
    `reviewer **BLOCKER**  11:12:44, before any run`,
    `         holds whatever the product does`,
    `verdict  removed in the next version`,
];
// The case 02 step 3 diagram: the evaluator checks, then the loop baseline.
// Shown on the home page and again in case 02, so it is written once.
const EVALUATOR_FIGURE = {
    kind: `line`,
    aria: `Pass rate of the bot. Tuning set: 0.896, 0.917 in the two evaluator checks, then 0.625 as the loop baseline, then 0.708, 0.813, 0.917 after each validated edit. Held-out set: 0.917, 0.792, then 0.458, 0.542, 0.750, 0.875. A dashed line marks the 0.65 bar the baseline had to fall to.`,
    caption: `Pass rate of the bot. The checks and the loop baseline were scored by different evaluator versions, so the first three points are not a trend in the bot.`,
    min: 0.4,
    max: 1,
    ticks: [0.4, 0.6, 0.8, 1],
    x: [`Check 1`, `Check 2`, `Baseline`, `Edit 1`, `Edit 2`, `Edit 3`],
    series: [
        { label: `Tuning`, values: [0.896, 0.917, 0.625, 0.708, 0.8125, 0.917], dy: -5 },
        { label: `Held-out`, values: [0.917, 0.792, 0.458, 0.542, 0.75, 0.875], dashed: true, dy: 8 },
    ],
    bar: { value: 0.65, label: `bar 0.65` },
    split: { index: 2, before: `Evaluator checks`, after: `Loop` },
};
window.CONTENT = {
    // Shared text, used on every page
    site: {
        name: `Herjuno Hestu Adhimarta`,
        skipLink: `Skip to content`,
        // Set draftNote to `` (empty) to hide the draft strip before launch.
        draftNote: ``,
        nav: {
            cases: `Case files`,
            writing: `Writing`,
            about: `About`,
            contact: `Contact`,
        },
        footerNote: `Client work is under NDA. Everything here is rebuilt on public or synthetic targets.`,
        footerFine: `2026 Herjuno Hestu Adhimarta`,
    },
    // Home page (index.html)
    home: {
        pageTitle: `Herjuno Hestu Adhimarta, Agentic SQA Engineer`,
        metaDescription: `QA engineer in Yogyakarta. I write down what done looks like before an AI agent builds anything, and a reviewer agent checks the result.`,
        headline: `I make AI agents show evidence for their passes.`,
        // A \n in the lede becomes a line break.
        lede: `Evidence has to exist before the output does.\nBefore an agent builds anything, I write down what done looks like and confirm it fails today. The agent works until it meets that bar, and a reviewer agent checks the result.`,
        excerptCaption: `Excerpt from case file 02, step 3: checking the evaluator before the loop starts`,
        excerptFigure: EVALUATOR_FIGURE,
        casesLink: `Read the three case files`,
        github: {
            label: `GitHub`,
            lede: `Some of what I build is public.`,
            repos: [
                { name: `verdictloop`, url: `https://github.com/herjunoha/verdictloop`, text: `An improvement loop for an AI agent or chatbot. It keeps an edit only if the verdict says it is really better.` },
                { name: `greenfield-pipeline`, url: `https://github.com/herjunoha/greenfield-pipeline`, text: `Claude Code plugins that deliver software from scratch and take an idea to a won deal.` },
            ],
            profile: { url: `https://github.com/herjunoha`, text: `github.com/herjunoha` },
        },
        cases: {
            pageTitle: `Case files, Herjuno Hestu Adhimarta`,
            metaDescription: `Three case files on testing AI agents. Each is rebuilt on a synthetic target, with the setup committed before the run.`,
            label: `Case files`,
            intro: `Each case file is rebuilt on a synthetic target. The setup is committed before the run and every result is recorded.`,
            items: [
                {
                    id: `01`,
                    slug: `case-1`,
                    title: `Red before green, or tests written from the finished code`,
                    summary: `One agent writes tests two ways, five runs each. Red first caught the planted fault 5 of 5. Tests written from the finished code caught it 3 of 5.`,
                    meta: `10 runs, 1 planted fault`,
                },
                {
                    id: `02`,
                    slug: `case-2`,
                    title: `A verdict layer for a loop on a noisy score`,
                    summary: `A written policy decides which prompt edits to keep. Three were validated and one regression got through. A fourth edit repaired it and the policy would not keep it.`,
                    meta: `3 edits validated, handover 9 of 9 down to 5 of 9, repair rated neutral`,
                },
                {
                    id: `03`,
                    slug: `case-3`,
                    title: `One delivery run, recorded end to end`,
                    summary: `Four agent roles and the checks between them take a booking app from requirement to handover.`,
                    meta: `4 criteria, 3 verified, 1 unverified, 6 human decisions`,
                },
            ],
        },
        writing: {
            pageTitle: `Writing, Herjuno Hestu Adhimarta`,
            metaDescription: `Building trust in AI agents by getting evidence out of them.`,
            label: `Writing`,
            intro: `Building trust in AI agents by getting evidence out of them.`,
            soon: `Coming soon.`,
        },
        about: {
            pageTitle: `About, Herjuno Hestu Adhimarta`,
            metaDescription: `QA engineer in Yogyakarta. Integration QA and AI trainer at Qiscus since 2022.`,
            label: `About`,
            paragraphs: [
                `I came to AI agents from QA. My day job is scoring chatbot answers against a held-out test set, and the same rule governs my agent work: the evidence comes first, and someone other than the builder checks it.`,
            ],
            stackLabel: `Stack`,
            stack: `Playwright, Postman, k6, SQL, Claude Code`,
            experienceLabel: `Experience`,
            experience: [
                { years: `Sep 2022 to now`, role: `Integration QA and AI trainer, Qiscus` },
                { years: `Jun 2022 to Sep 2022`, role: `QA web developer, Garena` },
                { years: `Jul 2021 to Feb 2022`, role: `QA game tester, GIT Solution` },
            ],
        },
        contact: {
            pageTitle: `Contact, Herjuno Hestu Adhimarta`,
            metaDescription: `Email and LinkedIn for Herjuno Hestu Adhimarta.`,
            label: `Contact`,
            intro: `For roles, collaboration or questions about a case file.`,
            emailLabel: `Email`,
            email: `herjunoha@gmail.com`,
            emailIsDummy: false, // set to false once this is your real address
            linkedin: {
                label: `LinkedIn`,
                url: `https://www.linkedin.com/in/herjuno-hestu-a-4754ba234/`,
                text: `linkedin.com/in/herjuno-hestu-a-4754ba234`,
            },
        },
    },
    // Case file pages: case-1.html, case-2.html, case-3.html
    // Each case is a short run of numbered steps. A step has a title, then any of:
    // paragraphs, a record excerpt, a table.
    caseFiles: [
        // ---------------------------------------------------------------- case 1
        {
            slug: `case-1`,
            pageTitle: `Red before green, or tests written from the finished code, case file 01`,
            metaDescription: `The same agent writes tests two ways, five runs each. With a smaller model and a criterion without numbers, red first caught the planted fault 5 of 5 and tests written from the finished code caught it 3 of 5.`,
            crumbLabel: `Case files`,
            crumbTail: `01`,
            title: `Red before green, or tests written from the finished code`,
            claim: `Does seeing a test fail before the build make it stronger? In this setup, red first, which also meant not seeing the code, caught the planted fault 5 of 5 against 3 of 5.`,
            stageLabel: `Run result`,
            strip: {
                code: `EDDDE DDDDD`,
                aria: `10 runs, 5 per arm. Arm A caught the planted fault in 3 and missed 2. Arm B caught it in all 5.`,
                caption: `Arm A runs 1 to 5, then arm B runs 1 to 5`,
            },
            legend: [
                { kind: `defect`, label: `Caught the planted fault` },
                { kind: `empty`, label: `Missed it` },
            ],
            facts: [
                {
                    label: `Step 1`,
                    title: `Set up`,
                    paragraphs: [
                        `A small cart and coupon API with 7 criteria I wrote and committed before any code. Haiku 4.5 writes the tests two ways, 5 runs each: from the finished code (arm A), or from the criteria and a stub, red first (arm B).`,
                    ],
                },
                {
                    label: `Step 2`,
                    title: `Plant a fault`,
                    paragraphs: [
                        `A random draw picked criterion 6. In the as-built app, removing an item silently drops the coupon, so the total ignores the discount.`,
                    ],
                },
                {
                    label: `Step 3`,
                    title: `Leave the numbers out`,
                    paragraphs: [
                        `Criterion 6 gives no totals. It says only that the total is recalculated with the coupon applied to the remaining items, so the agent must work out the numbers.`,
                    ],
                },
                {
                    label: `Step 4`,
                    title: `Check the tests`,
                    paragraphs: [
                        `A test must fail on the as-built app and pass on a clean reference. A mutation tool seeds 219 code changes and scores each suite. No model judges.`,
                        `The rule for calling a difference was fixed before the first run: one arm catches the fault in at least 1 more run, or the mutation score ranges overlap by at most 20%.`,
                    ],
                },
                {
                    label: `Step 5`,
                    title: `Read the result`,
                    paragraphs: [
                        `Arm A caught the fault in 3 of 5 runs and arm B in 5 of 5. Under the rule, that counts as separation, by the fault count only.`,
                        `Mutation score does not separate the arms: the ranges overlap by half.`,
                    ],
                    figure: {
                        kind: `dots`,
                        aria: `Mutation score per run. Arm A, saw the code: 0.484 and 0.502 missed the fault, then 0.575, 0.580, 0.580 caught it. Arm B, red first: 0.571, 0.580, 0.589, 0.589, 0.589, all caught it.`,
                        caption: `Mutation score per run, sorted. Round dots caught the planted fault, hollow squares missed it. The bar is the median: 0.575 for A, 0.589 for B.`,
                        min: 0.45,
                        max: 0.6,
                        ticks: [0.45, 0.5, 0.55, 0.6],
                        groups: [
                            {
                                label: `A, saw the code`,
                                sub: `caught 3 of 5`,
                                median: 0.5753,
                                points: [
                                    { v: 0.484, miss: true },
                                    { v: 0.5023, miss: true },
                                    { v: 0.5753 },
                                    { v: 0.5799 },
                                    { v: 0.5799 },
                                ],
                            },
                            {
                                label: `B, red first`,
                                sub: `caught 5 of 5`,
                                median: 0.589,
                                points: [
                                    { v: 0.5708 },
                                    { v: 0.5799 },
                                    { v: 0.589 },
                                    { v: 0.589 },
                                    { v: 0.589 },
                                ],
                            },
                        ],
                    },
                },
                {
                    label: `Step 6`,
                    title: `Read the two misses`,
                    paragraphs: [
                        `Both misses are arm A tests that copy the bug. They assert that the total equals the subtotal after a removal, so they pass on the faulty app and fail on the clean one. Arm A run 1 even says so in a comment.`,
                    ],
                    record: {
                        note: `Arm A run 1`,
                        lines: [
                            `test     asserts total equals subtotal`,
                            `         after a removal`,
                            `comment  "implementation clears coupon`,
                            `         on item removal"`,
                            `result   **PASS** on as-built, FAIL on reference`,
                            `verdict  fault missed, test copied it`,
                        ],
                    },
                },
                {
                    label: `Step 7`,
                    title: `State the limits`,
                    paragraphs: [
                        `One app, one model, 5 runs per arm: counts, not statistics. A 2-run gap on one fault is weak evidence.`,
                        `The red-first check never fired. All 5 arm B suites failed against the stub on the first try, so the gap more likely comes from arm B not seeing the code.`,
                        `I approved the wording of criterion 6, but Claude wrote it. The stub also states three behaviors that no criterion pins, which narrows the gap between the arms.`,
                    ],
                },
            ],
            pager: {
                aria: `Case files`,
                back: `All case files`,
                next: `Next: 02, a verdict layer for a loop on a noisy score`,
                nextHref: `case-2.html`,
            },
        },
        // ---------------------------------------------------------------- case 2
        {
            slug: `case-2`,
            pageTitle: `A verdict layer for a loop on a noisy score, case file 02`,
            metaDescription: `Controls, a held-out set and a written policy decide which prompt edits to keep. Three edits were validated and a handover regression got through. A fourth edit repaired it and was reverted as neutral.`,
            crumbLabel: `Case files`,
            crumbTail: `02`,
            title: `A verdict layer for a loop on a noisy score`,
            claim: `A verdict layer with a noise band passed its two controls, validated three prompt edits, missed a regression it was not built to see, and then would not keep the fix.`,
            stageLabel: `Planted faults`,
            strip: {
                code: `PEDPP`,
                aria: `Five planted faults. Three were found and fixed. Two almost never failed, and one of those two regressed without the verdicts noticing.`,
                caption: `F1 to F5, in order`,
            },
            legend: [
                { kind: `pass`, label: `Found and fixed` },
                { kind: `empty`, label: `Almost never failed` },
                { kind: `defect`, label: `Almost never failed, then regressed and the verdicts missed it` },
            ],
            facts: [
                {
                    label: `Step 1`,
                    title: `Set up`,
                    paragraphs: [
                        `The loop is Karpathy's autoresearch idea, rebuilt from the concept. It edits one prompt for a fictional shop chatbot. A locked evaluator runs 24 scenarios, 16 for tuning and 8 held out.`,
                    ],
                },
                {
                    label: `Step 2`,
                    title: `Plant faults`,
                    paragraphs: [
                        `Five faults in the starting prompt, plus a no-op and a known-bad control, all committed before the first run. Two of the five almost never failed, so the loop could not fix them.`,
                    ],
                },
                {
                    label: `Step 3`,
                    title: `Check the evaluator`,
                    paragraphs: [
                        `Two checks of the unchanged bot, nothing tuned, to see whether the evaluator could give a verdict at all. Check 1 left the baseline near 0.9, so the planted faults did not bite and no edit could beat the noise band. I fixed the evaluator and checked again with the same result, then hid the shop rules from the bot.`,
                        `The next set of rounds met the bar set before it, a baseline of 0.65 or lower. That set is the loop's starting baseline, and the loop starts there.`,
                    ],
                    figure: EVALUATOR_FIGURE,
                },
                {
                    label: `Step 4`,
                    title: `Judge each edit`,
                    paragraphs: [
                        `A written policy compares each edit with repeated baseline runs against a noise band. A gain counts only if the held-out set does not drop.`,
                    ],
                },
                {
                    label: `Step 5`,
                    title: `Read the verdicts`,
                    paragraphs: [
                        `Both controls matched and three edits were validated. A fourth, tried after the loop cap, came out neutral.`,
                    ],
                    table: {
                        head: [`Run`, `Verdict`, `Delta, tuning / held-out`],
                        rows: [
                            [`C2, no-op`, `NEUTRAL, as expected`, `0.000 / not run`],
                            [`C1, known bad`, `REFUTED, as expected`, `-0.125 / not run`],
                            [`1, returns`, `VALIDATED`, `+0.094 / +0.042`],
                            [`2, discount code`, `VALIDATED`, `+0.104 / +0.208`],
                            [`3, order lookup`, `VALIDATED`, `+0.094 / +0.125`],
                            [`4, handover repair`, `NEUTRAL, reverted`, `+0.021 / not run`],
                        ],
                    },
                },
                {
                    label: `Step 6`,
                    title: `Find what got through`,
                    paragraphs: [
                        `Handover scenarios fell while every edit was validated. The held-out check compares aggregates, so a gain in one area hid a loss in another. I found it by reading per-scenario results.`,
                    ],
                    figure: {
                        kind: `bars`,
                        aria: `Handover scenario passes out of 9 runs: 9 at the start, 8 after edit 1, 8 after edit 2, 5 after edit 3. The reverted edit 4 passed 6 of 6 in its two candidate rounds.`,
                        caption: `Handover scenarios passed, out of 9 runs, at the start and after each validated edit. The last bar is the reverted fourth edit, over its 2 rounds.`,
                        max: 9,
                        bars: [
                            { label: `Start`, value: 9 },
                            { label: `After edit 1`, value: 8 },
                            { label: `After edit 2`, value: 8 },
                            { label: `After edit 3`, value: 5, hit: true },
                            { label: `Edit 4, reverted`, value: 6, of: 6 },
                        ],
                    },
                    record: {
                        note: `Edit 3 and what it hid`,
                        lines: [
                            `edit     3, always look up the order`,
                            `verdict  VALIDATED  tuning +0.094, band 0.0625`,
                            `handover scenarios **5/9** passes, was 9/9`,
                            `missed   held-out check compares aggregates only`,
                        ],
                    },
                },
                {
                    label: `Step 7`,
                    title: `Try to repair it`,
                    paragraphs: [
                        `I raised the loop cap on the record and tried one more edit aimed at handover: hand over on legal threats, chargebacks and safety incidents, in the same reply. Held-out was no longer blind, because I had read its results, so a held-out pass proves little.`,
                        `The edit repaired handover in both rounds. The verdict was NEUTRAL: with the baseline at 0.917, the tuning score could rise by at most 0.083, against a band of 0.072. Under the protocol the edit was reverted, so the final prompt keeps the regression.`,
                        `A per-fault check, with a threshold set after the fact, would have flagged the original regression and flags nothing here. It also raised one false alarm in edit 1.`,
                    ],
                    record: {
                        note: `Edit 4, a continuation`,
                        lines: [
                            `edit     hand over on legal threats,`,
                            `         chargebacks, safety incidents`,
                            `verdict  NEUTRAL  tuning +0.021, band 0.072`,
                            `handover scenarios 6/6 passes, was 5/9`,
                            `result   edit reverted, final prompt keeps **5/9**`,
                        ],
                    },
                },
                {
                    label: `Step 8`,
                    title: `State the limits`,
                    paragraphs: [
                        `One loop run, one domain. The agent read the policy file, so this shows edits can follow a stated rule, not that a loop finds rules. The evaluator was revised twice after the checks, and the last revision hid the shop rules from the bot, so the setup is not blind. No plain keep-if-higher loop ran for comparison, and two edits beat the noise band by only half a scenario. Cost against the weekly allowance is unsettled: 8.1 to 25.3 points, ceiling 15.`,
                    ],
                },
            ],
            pager: {
                aria: `Case files`,
                back: `All case files`,
                next: `Next: 03, one delivery run, recorded end to end`,
                nextHref: `case-3.html`,
            },
        },
        // ---------------------------------------------------------------- case 3
        {
            slug: `case-3`,
            pageTitle: `One delivery run, recorded end to end, case file 03`,
            metaDescription: `Four agent roles and the checks between them take a booking app from requirement to handover.`,
            crumbLabel: `Case files`,
            crumbTail: `03`,
            title: `One delivery run, recorded end to end`,
            claim: `A small booking app taken from requirement to handover by four agent roles, once, with every decision logged. A process, not a result rate.`,
            stageLabel: `Final board`,
            strip: {
                code: `EPPP`,
                aria: `Four acceptance criteria. AC-02, AC-03 and AC-04 verified. AC-01 unverified because its test script was never approved.`,
                caption: `AC-01 to AC-04`,
            },
            legend: [
                { kind: `pass`, label: `Verified` },
                { kind: `empty`, label: `Unverified, script never approved` },
            ],
            facts: [
                {
                    label: `Step 1`,
                    title: `Agree the requirement`,
                    paragraphs: [
                        `Four acceptance criteria from synthetic notes, signed off by me before anything ran. Four roles: a generator (Sonnet), a reviewer (Opus), a triager (Haiku) and an executor that is a plain script.`,
                    ],
                },
                {
                    label: `Step 2`,
                    title: `Plant three faults`,
                    paragraphs: [
                        `Registered before the first run: a build defect, a test that passes but checks nothing and a blocked run.`,
                    ],
                },
                {
                    label: `Step 3`,
                    title: `Review the tests`,
                    paragraphs: [
                        `The generator writes one script per criterion. The reviewer reads every version and never edits. It rejects the empty test before any run.`,
                    ],
                    record: {
                        note: `Fault B, from the run record`,
                        lines: REVIEWER_RECORD,
                    },
                },
                {
                    label: `Step 4`,
                    title: `Run and judge`,
                    paragraphs: [
                        `Each stage, who acts in it, and where each planted fault shows up. The blocked run was recorded as blocked, not as a pass.`,
                    ],
                    figure: {
                        kind: `flow`,
                        aria: `The run in order: sign-off, test design with review, impasse decisions, red run, build, run 1, judging and review, send-back, run 2, final sign-off.`,
                        caption: `Diamonds are the six human decisions. Tags mark the three planted faults.`,
                        items: [
                            { who: `human`, text: `Signs off the four criteria.`, gate: true },
                            { who: `generator, reviewer`, text: `One script per criterion, every version reviewed.`, tag: `fault B rejected`, tagHit: true },
                            { who: `human, three times`, text: `AC-01 impasse after 9 versions: more rounds, drop one case, override.`, gate: true },
                            { who: `executor`, text: `Red run on the empty skeleton: 22 cases, 13 failed, 9 errored.` },
                            { who: `builder`, text: `Builds the app through the scope guard.`, tag: `fault A planted` },
                            { who: `executor`, text: `Run 1. AC-01 to AC-03 run, staging stops before AC-04.`, tag: `fault C: AC-04 blocked` },
                            { who: `triager, scorer, reviewer`, text: `Each case judged, the run reviewed.`, tag: `fault A caught`, tagHit: true },
                            { who: `human`, text: `Sends run 1 back.`, gate: true },
                            { who: `builder, executor`, text: `Fixes the build and writes new scripts. Run 2: all four criteria run.` },
                            { who: `human`, text: `Signs off run 2: 3 of 4 verified.`, gate: true },
                        ],
                    },
                },
                {
                    label: `Step 5`,
                    title: `Read the board`,
                    paragraphs: [
                        `6 human decisions, 45 agent actions, 108 script actions.`,
                    ],
                    table: {
                        head: [`Criterion`, `Run 1`, `Run 2`, `Final`],
                        rows: [
                            [`AC-01, book a free slot`, `2 bug reports`, `none`, `Unverified, script never approved`],
                            [`AC-02, reject bad details`, `5 bug reports`, `none`, `Verified`],
                            [`AC-03, taken slot refused`, `**2 bug reports, fault A**`, `none`, `Verified`],
                            [`AC-04, cancel by reference`, `Blocked`, `none`, `Verified`],
                        ],
                    },
                },
                {
                    label: `Step 6`,
                    title: `State the limits`,
                    paragraphs: [
                        `AC-01 stays unverified: its script was never approved, and no test covers a missing date. Three of the six human decisions were forced by that impasse, which the pipeline had no rule for.`,
                        `I wrote the requirement before the run, so the step that turns scattered notes into a requirement did not run. The reviewer rejected the empty test at review, before the red run, so the red run's check on empty tests was not exercised.`,
                        `One run on one small app, so no rate or saving is claimed.`,
                    ],
                },
            ],
            pager: {
                aria: `Case files`,
                back: `All case files`,
                next: `That is all three case files`,
            },
        },
    ],
};
