"use client";

import { useComposedRefs } from "@radix-ui/react-compose-refs";
import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { ComponentProps } from "react";
import { useEffect, useRef } from "react";

export interface CopyIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface CopyIconProps extends ComponentProps<"svg"> {
  size?: number;
  animateOnRender?: boolean;
}

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 17,
  mass: 1,
};

const CopyIcon = ({
  size = 28,
  ref: refProp,
  animateOnRender = false,
  ...props
}: CopyIconProps) => {
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
      {...props}
      ref={composedRef}
    >
      <motion.rect
        width="14"
        height="14"
        x="8"
        y="8"
        rx="2"
        ry="2"
        variants={{
          normal: { translateY: 0, translateX: 0 },
          animate: { translateY: -3, translateX: -3 },
        }}
        animate={controls}
        transition={defaultTransition}
      />
      <motion.path
        d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: 3, y: 3 },
        }}
        transition={defaultTransition}
        animate={controls}
      />
    </svg>
  );
};

CopyIcon.displayName = "CopyIcon";

export { CopyIcon };
