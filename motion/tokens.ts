/**
 * Shared Motion Tokens for Snow Design System
 * Ensures consistent animation timing, easing curves, and spring physics across spatial components.
 */

export const motionTokens = {
  // Duration tokens in seconds
  duration: {
    instant: 0.1,
    fast: 0.25,
    normal: 0.4,
    slow: 0.7,
    cinematic: 1.1,
  },

  // Custom Cubic Bezier Easing Curves
  ease: {
    // Smooth cinematic deceleration curve
    outExponential: [0.16, 1, 0.3, 1] as const,
    // Ultra smooth ease in-out
    inOutSmooth: [0.65, 0, 0.35, 1] as const,
    // Subtle snappy exit
    inOutFast: [0.4, 0, 0.2, 1] as const,
    // Standard cubic ease
    standard: [0.2, 0, 0, 1] as const,
  },

  // Framer Motion Spring Presets
  spring: {
    // Snappy responsive feedback for magnetic or buttons
    snappy: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
      mass: 0.5,
    },
    // Smooth spatial tilt response
    spatial: {
      type: "spring" as const,
      stiffness: 150,
      damping: 20,
      mass: 0.8,
    },
    // Gentle fluid parallax drift
    gentle: {
      type: "spring" as const,
      stiffness: 70,
      damping: 18,
      mass: 1.2,
    },
  },

  // Stagger intervals in seconds
  stagger: {
    tight: 0.04,
    normal: 0.08,
    relaxed: 0.15,
  },
} as const;
