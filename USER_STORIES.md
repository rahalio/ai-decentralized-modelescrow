# Modelescrow — User stories

**Product:** [PRODUCT.md](./PRODUCT.md)


### Requester

- As a requester, I want to lock escrow against a metric and dataset hash, so that I only pay for verified lift.
- As a requester, I want sealed evaluation for proprietary data, so that I can still run bounties without a leak.
- As a requester, I want a human review gate before deploy, so that metric gaming cannot ship unchecked.

### Model provider

- As a provider, I want transparent evaluation logs, so that I trust the ranking.
- As a provider, I want escrow status visible, so that I know funds are real before I invest compute.
- As a provider, I want to dispute a score with evidence, so that operator error has a path.

### Evaluation operator

- As an evaluation operator, I want immutable metric definitions per contest, so that mid-flight changes are impossible without a new contest.
- As an evaluation operator, I want to mark a submission invalid for rule breaks, so that leaked-label cheats do not win.

### Finance / compliance

- As finance, I want payout tied to evaluation pass and compliance clearance, so that escrow release is dual-controlled.
- As compliance, I want provider screening hooks, so that rewards do not pay sanctioned parties.

### Platform admin

- As a platform admin, I want disclosed take-rate on each contest, so that economics stay explicit.
- As a platform admin, I want cancel/expiry paths that return funds correctly, so that abandoned contests do not strand capital.
