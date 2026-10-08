---
title: "AI Red Teaming and Techniques: A Comprehensive Overview"
date: 2025-02-25
dek: "What AI red teaming is, how it differs from a traditional engagement, and the attack techniques that show up once a model is in the path."
---

Artificial intelligence has become part of the systems we ship: detection, automation, agents, and the applications wrapped around them. That reliance makes the security of those systems a practical problem, not a research sidebar. This note covers what AI red teaming is for, where it differs from classic red teaming, and the techniques that keep showing up in reviews.

## What is AI red teaming?

AI red teaming is systematic adversarial testing of an AI system: the model, the application around it, and the platform it runs on. The practice has widened from pure security bugs to a broader set of harms, including responsible-AI failures. Unlike a traditional red team, which is often double-blind, AI red teaming is usually single-blind and still changing quickly. Engagements mix adversarial cases with benign ones, because a system can fail on ordinary input as easily as on a crafted attack.

## AI for security vs. security of AI

The two phrases get used as if they were the same job. They are not.

- **AI for security.** Machine learning used to detect anomalies, predict threats, and automate response. The model is a tool for the defender.
- **Security of AI.** How safe and how secure the model and the application are. This is the work of attacking the system to find where it fails.

A product can do the first well and still be wide open on the second.

## AI threat impact areas

Red team findings tend to land in three places:

- **AI usage safety and security.** Whether the application is used safely, and whether its outputs can be turned against the user or the business.
- **AI platform security.** The systems where models are trained, hosted, and called: identity, data stores, plugins, and the deployment path.
- **AI application security.** The product itself: prompts, tools, retrieval, and the trust boundaries between user content and model instructions.

## Challenges in AI security

- **Complexity of AI models.** Large language models are hard to predict across inputs. That unpredictability is itself a vulnerability: behavior you did not specify is behavior an attacker can go looking for.
- **Data quality and bias.** Training data that is thin, poisoned, or skewed produces a model that is easier to push off distribution, and easier to blame on "the model" after the fact.
- **Evolving threat landscape.** New attack techniques show up faster than most control frameworks get revised.
- **Lack of standardization.** Teams still invent their own test plans. Without a shared bar, coverage depends on who is in the room.

## Practical red teaming techniques

- **Adversarial testing.** Inputs built to make the model fail, so the failure is visible before a user or an attacker finds it.
- **Vulnerability assessment.** Architecture, data sources, tools, and the deployment environment, not only the prompt.
- **Mitigation.** Retraining, tighter tool permissions, output controls, or a redesign of the path that was attacked. A finding with no owner is a note, not a fix.

## Advanced red teaming techniques

A useful test plan reaches past generic "try jailbreaks" and names the class of failure:

- **Cross-site scripting payload generation.** Models asked to produce script that would be dangerous if a downstream app renders it. The point of the test is the sink: whether model output is treated as trusted HTML.
- **Training-time attacks (poisoning).** Changes to training data or weights that bias the model, force misclassification, or shape later outputs. These need real access to the training path, which is why they are rarer and more damaging.
- **Inference-time attacks.** Extraction, evasion, inversion, and membership inference, exercised while the model is serving. Extraction, for example, queries the model for input-output pairs and trains a copycat on those pairs.
- **Prompt injection.** The model reads a stream of tokens and does not reliably separate instructions from data. An attacker writes the data so the model treats it as an instruction, using persuasion, encoding, or content the application fetched on the user's behalf.

## Attacks on machine learning systems

Machine learning systems fail in a few recurring ways. The labels below are the ones I use when sorting a finding.

- **Training-time attacks (poisoning).** Modify training data or model weights to introduce bias, cause misclassification, or steer outputs. Integrity of the model is the thing that breaks.
- **Inference-time attacks.** These happen when the model is answering:
  - **Extraction.** Learn enough about the decision boundary to train a copycat. Query, collect pairs, fit a substitute.
  - **Evasion.** Cause a misclassification. Noisy text or a perturbed image that the model reads as something else.
  - **Inversion.** Recover training data by walking a candidate input toward the model's memory of an example.
  - **Membership inference.** Decide whether a particular point was in the training set, using the model's higher confidence on data it has seen.
- **Adversarial examples.** Inputs built to force a wrong prediction, often by a change a person barely notices.
- **Model stealing.** A copycat built from queries, without the weights or the training set.

### Suffix attacks

Suffix attacks append content to an otherwise legitimate input.

1. **Adversarial suffixes.** Specific character sequences appended to a query have been shown to push aligned language models into producing content their safety training was meant to refuse.
2. **MAC forgery, as an analogy.** In some MAC constructions, knowing the tag on a message lets an attacker compute a tag on an extended message. The lesson for model inputs is the same shape: what you append is not inert.

**Case study.** Researchers showed that attaching a chosen suffix to a harmful instruction could walk past the safety behavior of several large language models. A benign-looking prompt plus the suffix was enough to elicit the refused content. Alignment that only inspects the start of a prompt does not hold.

### Token smuggling

Token smuggling hides a filtered string so the filter and the model do not see the same thing.

1. **Base64 and other encodings.** The filtered phrase is encoded, and the model is asked to decode it. The filter sees noise. The model sees the instruction.
2. **Fill-in-the-blank.** Part of a banned word is supplied, and the model completes it.

**Case study.** Prompt-injection writeups have demonstrated both patterns against content filters: encode the sensitive span, or give the model the stem and let it finish. A filter that only matches plaintext tokens will miss both.

### Positive leading

Positive leading steers a model by example and reinforcement rather than by a direct forbidden instruction. The published examples in this area are often about shaping behavior with affirming context: recognizing a desired outcome, then asking the model to continue in that vein. In a red-team setting the same shape is used less innocently: a conversation that rewards the model for moving toward a refused topic one agreeable step at a time, instead of asking for the refused thing outright.

The leadership literature uses the same phrase for something else entirely (coaching, recognition, culture). That material is not a security technique. The part that matters for testing is the multi-turn steering: if the model can be walked to a bad output by a sequence of "helpful" turns, the single-prompt refusal test was incomplete.

### Few-shot hacking

Few-shot hacking uses the model's in-context learning. A handful of examples in the prompt defines a task, and the model continues the pattern.

1. **Classification patterns.** A few labeled examples, then a new item the filter would have rejected if it had been asked for directly.
2. **Worked examples.** A short series of solved problems whose pattern, continued, produces the disallowed output.

**Case study.** Few-shot setups are legitimately used for tasks like sentiment labeling when labeled data is scarce. The red-team version keeps the format and changes the labels, so the model follows the demonstrated pattern rather than the policy written above it.

### Typographic attacks

Typographic attacks abuse a model's trust in text that is sitting on top of some other signal.

1. **Homoglyphs.** Characters that look like Latin letters (often Cyrillic) so a string passes a human glance and fails a literal check, or the reverse.
2. **Adversarial typography.** Text drawn onto an image so a vision-language model reports the caption instead of the object.

**Case study.** Work on models in the CLIP family showed that a label placed in the image (a dog marked "mouse") can dominate the visual classification. The model reads the typeset word and ignores the animal. Vision-language systems need a defense that does not treat embedded text as ground truth.

### Instruction hiding

Instruction hiding places a directive where the application thinks it is storing data.

1. **Hidden prompts.** Instructions buried in training text, retrieved documents, or other content the model will read later.
2. **Encapsulation, as a design idea.** The non-security version of this phrase is ordinary information hiding: expose an interface, keep the rest internal. The security failure is the opposite, an instruction smuggled inside content that was supposed to be data.

**Case study.** Indirect cases are the ones that show up in products. A document, a ticket, or a web page carries a line of instruction. A summarizer or agent reads it and treats the line as part of its task. The user never typed the attack.

### Adversarial examples

Adversarial examples are inputs designed to force a wrong prediction.

1. **Image perturbation.** Small noise, often invisible at a glance, that changes a classifier's label.
2. **Textual adversarial examples.** Small edits to a sentence that change a model's decision or walk it past a refusal.

**Case study.** The autonomous-driving version is the one people remember: subtle changes to a road sign that cause a vision system to read a different instruction. The same idea, with different physics, applies to text. The defense has to survive inputs that look almost right.

### Indirect prompt injection

Indirect prompt injection puts the malicious instruction in content the model will process for the user, not in the user's own message.

1. **Hidden text in documents.** Invisible or easily missed text in a resume, a PDF, or a page, aimed at a model that screens or summarizes it.
2. **Fetched web content.** A page or file the assistant retrieves, containing instructions aimed at the assistant rather than the reader.

**Case study.** Email is the clear version. A message contains an instruction for the model that will summarize or act on the inbox. The person who owns the mailbox did not write that instruction. When the model has tools (send, browse, read files), the injected line can become an action, including attempts to pull data out of the session. Treat retrieved text as data, and keep tool use on a path the user actually requested.

### Metaprompt extraction

Here the target is the hidden instruction: the system prompt, the policy, the scaffolding the application does not show the user.

1. **Scaffolded tasks.** Meta-level instructions that tell the model how to break a problem down. Useful when they are yours. Sensitive when they are the product's secret prompt and an attacker is trying to read them back.
2. **Prompt refinement.** Asking the model to reveal or improve the instructions it was given, sometimes by framing the request as debugging or as a writing exercise.

**Case study.** Meta-prompting research uses high-level instructions to split a hard task into smaller ones and improve accuracy. Attackers use the same curiosity: get the model to quote the rules it is following. If those rules contain keys, unreleased policy, or another tenant's context, the quote is the incident.

## Conclusion

AI red teaming is how you find out whether the system you deployed still matches the system you threat-modeled. The point is to name the failure while there is time to change the design, and to hand the fix to an owner.

The techniques above are not a complete catalog. They are the set that keeps recurring: poisoning, inference-time attacks, adversarial examples, suffix attacks, token smuggling, few-shot pattern following, typographic attacks, hidden instructions, indirect prompt injection, and attempts to read the system prompt back out. Multi-turn approaches such as Crescendo sit on top of the same idea. A single refusal test on a single prompt will not see them. Defenses have to be layered, and they have to be retested when the model, the tools, or the retrieval corpus changes.

## Tools, resources, and community contributions

The public tooling splits roughly into attack orchestration and reference collections.

- **Automated attack frameworks**
  - [PyRIT](https://github.com/Azure/PyRIT), the Python Risk Identification Tool for generative AI.
  - [Azure CounterFit](https://github.com/Azure/counterfit), a framework for simulating adversarial attacks against AI systems.
  - [Crescendomation](https://crescendo-the-multiturn-jailbreak.github.io/), automation around the Crescendo multi-turn strategy.
- **Security and jailbreak repositories**
  - [Awesome Jailbreak on LLMs](https://github.com/yueliu1999/Awesome-Jailbreak-on-LLMs) collects techniques and examples.
  - [AI-Engineering.academy](https://github.com/adithya-s-k/AI-Engineering.academy) and [bRAG-langchain](https://github.com/bRAGAI/bRAG-langchain) are community collections of educational material and code on how these systems fail.
- **Red teaming and orchestration**
  - [Multi-Agent Orchestrator](https://github.com/awslabs/multi-agent-orchestrator) and [sa-ai-agent](https://github.com/viktoriasemaan/sa-ai-agent/tree/main) are starting points for multi-turn adversarial setups.
- **Further reading on prompt injection**
  - [OWASP LLM01: Prompt Injection](https://github.com/OWASP/www-project-top-10-for-large-language-model-applications/blob/main/2_0_vulns/LLM01_PromptInjection.md)
  - [Arthur.ai on types of prompt injection](https://www.arthur.ai/blog/from-jailbreaks-to-gibberish-understanding-the-different-types-of-prompt-injections)
  - [BSI cybersecurity warning (2023)](https://www.bsi.bund.de/SharedDocs/Cybersicherheitswarnungen/EN/2023/2023-249034-1032.pdf?__blob=publicationFile&v=5) and [NIST's artificial intelligence work](https://www.nist.gov/artificial-intelligence) for the standards context around these failures.

## Further reading

1. [Advancing red teaming with people and AI](https://openai.com/index/advancing-red-teaming-with-people-and-ai/)
2. [Al-Azzawi, security of large language models (Theseus)](https://www.theseus.fi/bitstream/handle/10024/876979/Al-Azzawi_Mays.pdf?sequence=2)

## References

1. Practical Security: The Perils of Prompt Injection
2. Prompt Injection: A Comprehensive Guide
3. Prompt Injection, Wikipedia
4. Positive Leadership, SpringerLink
5. Positive Leadership: Moving Towards an Integrated Definition and Interventions
6. Editorial: Positive Leadership and Worker Well-Being in Dynamic Environments
7. Adversarial Examples in Modern Machine Learning: A Review
8. A Survey of Practical Adversarial Example Attacks
9. Adversarial Examples: Opportunities and Challenges
10. Benchmarking and Defending Against Indirect Prompt Injection Attacks on Large Language Models
11. Vision-LLMs Can Fool Themselves with Self-Generated Typographic Attacks
12. Unveiling Typographic Deceptions: Insights of the Typographic Vulnerability in Large Vision-Language Models
13. Typographic Attacks on Vision-Language Models
14. MetaPrompting: Learning to Learn Better Prompts
15. Meta-Prompting: Enhancing Language Models with Task-Agnostic Scaffolding
16. Mitigating Adversarial Attacks in LLMs through Defensive Suffix Generation
17. Adversarial Suffixes May Be Features Too!
18. Universal and Transferable Adversarial Attacks on Aligned Language Models
19. Few-shot Model Extraction Attacks against Sequential Recommender Systems
20. Few Edges Are Enough: Few-Shot Network Attack Detection with Graph Neural Networks
21. [Few-Shot Malware Classification via Attention-Based Transductive Learning](https://doi.org/10.1007/s11036-024-02383-z), Liting Deng, Chengli Yu, Hui Wen, Mingfeng Xin, Yue Sun, Limin Sun, and Hongsong Zhu
22. [Indirect prompt injection: generative AI's greatest security flaw](https://cetas.turing.ac.uk/publications/indirect-prompt-injection-generative-ais-greatest-security-flaw), Centre for Emerging Technology and Security. Damian Ruck and Matthew Sutton, CETaS Expert Analysis, November 2024.
