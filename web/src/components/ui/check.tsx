"use client";

import { useComposedRefs } from "@radix-ui/react-compose-refs";
import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { ComponentProps } from "react";
import { useEffect, useRef } from "react";

export interface CheckIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CheckIconProps extends ComponentProps<"svg"> {
  size?: number;
  animateOnRender?: boolean;
}

const pathVariants: Variants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    scale: [0.5, 1],
    transition: {
      duration: 0.4,
      opacity: { duration: 0.1 },
    },
  },
};

const CheckIcon = ({
  size = 28,
  ref: refProp,
  animateOnRender = false,
  ...props
}: CheckIconProps) => {
  const controls = useAnimation();
  const ref = useRef<SVGSVGElement>(null);
  const composedRef = useComposedRefs(ref, refProp);

  useEffect(() => {
    const hasMouseOver = ref.current?.parentElement?.matches(":hover");

    if (animateOnRender && hasMouseOver) {
      controls.start("animate");
    }

    const parent = ref.current?.parentElement;

    const handleMouseEnter = () => {
      controls.start("animate");
    };
    const handleMouseLeave = () => {
      controls.start("normal");
    };

    if (parent) {
      parent.addEventListener("mouseenter", handleMouseEnter);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (parent) {
        parent.removeEventListener("mouseenter", handleMouseEnter);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [controls, animateOnRender]);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      ref={composedRef}
      {...props}
    >
      <motion.path
        variants={pathVariants}
        initial="normal"
        animate={controls}
        d="M4 12 9 17L20 6"
      />
    </svg>
  );
};

export { CheckIcon };
