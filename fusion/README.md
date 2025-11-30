# BetSense Fusion Engine

The **Fusion Engine** is an independent BetSense module designed to merge multiple behavioral and market layers into a single, sale-ready product for enterprise buyers.

---

## Module Purpose

- Combine NSI, RBS, Emotion, OrderBook and Historical layers into one unified “fusion” signal.
- Provide a clean narrative + numeric output that can plug into:
  - Trading dashboards
  - Retail shop terminals
  - API-only enterprise feeds

---

## What this folder contains

- Future backend code for Fusion Engine
- Any local demo JSON or mock data
- Packaging notes for selling Fusion Engine as a standalone product

---

## Live Connectivity

In the full stack, Fusion Engine will connect to:

- **BetSense Live Data Connect** (odds, xG, tempo, market micro-moves)
- **Internal engines**: NSI, RBS, Emotion, OrderBook, Meta-Behavior

This folder is reserved for everything needed to ship Fusion Engine as a **separate, independent module**.
