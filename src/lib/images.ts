/**
 * Curated imagery (Unsplash placeholders — swap for real brand photography later).
 * All verified to resolve; unified at render time under a dark + green-graded
 * treatment so disparate photos read as one premium brand system.
 */

const BASE = "https://images.unsplash.com/";

function u(id: string, w = 1600, q = 72): string {
  return `${BASE}${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const images = {
  heroPort: u("photo-1494412651409-8963ce7935a7", 2200, 75),
  portCranes: u("photo-1605745341112-85968b19335b", 1800),
  containersAerial: u("photo-1566576912321-d58ddd7a6088", 1800),
  airFreight: u("photo-1474302770737-173ee21bab63", 1200),
  oceanFreight: u("photo-1578575437130-527eed3abbec", 1200),
  roadFreight: u("photo-1519003722824-194d4455a60c", 1200),
  warehouse: u("photo-1553413077-190dd305871c", 1400),
  containers: u("photo-1601584115197-04ecc0da31d7", 1400),
  ctaBand: u("photo-1605902711622-cfb43c4437b5", 1800),
} as const;
