import type { Transition, Variants } from 'framer-motion';

/**
 * Shared motion vocabulary.
 *
 * Every reveal on the site used its own duration and delay, so sections
 * resolved at visibly different speeds. Routing them through these presets
 * keeps the whole page moving as one system and puts the timing in one place.
 *
 * `MotionConfig reducedMotion="user"` in App.tsx strips the transforms
 * automatically when the visitor has asked for reduced motion.
 */

/** VS Code's own easing curve: quick out of the gate, soft landing. */
export const EASE = [0.2, 0, 0, 1] as const;

export const enter: Transition = { duration: 0.4, ease: EASE };

/** Fade up — the default reveal for a block of content. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: enter },
};

/** Fade in from the side, for two-column layouts. */
export const fadeIn = (x: number): Variants => ({
  hidden: { opacity: 0, x },
  show: { opacity: 1, x: 0, transition: enter },
});

/**
 * Parent for a list that reveals its children in sequence.
 *
 * `staggerChildren` replaces the previous `delay: index * 0.1`, which grew
 * without bound — the seven project cards finished a full second apart.
 */
export const stagger = (step = 0.05, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

/** Only animate once, and start as soon as a sliver of the block is visible. */
export const viewportOnce = { once: true, amount: 0.1 } as const;
