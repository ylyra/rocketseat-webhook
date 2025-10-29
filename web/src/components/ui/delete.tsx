'use client'

import type { Transition, Variants } from 'motion/react'
import { motion, useAnimation, useComposedRefs } from 'motion/react'
import type { ComponentProps } from 'react'
import { useEffect, useRef } from 'react'

export interface DeleteIconHandle {
	startAnimation: () => void
	stopAnimation: () => void
}

interface DeleteIconProps extends ComponentProps<'svg'> {
	size?: number
}

const lidVariants: Variants = {
	normal: { y: 0 },
	animate: { y: -1.1 },
}

const springTransition: Transition = {
	type: 'spring',
	stiffness: 500,
	damping: 30,
}

const DeleteIcon = ({ size = 28, ref: refProp, ...props }: DeleteIconProps) => {
	const controls = useAnimation()
	const ref = useRef<SVGSVGElement>(null)
	const composedRef = useComposedRefs(ref, refProp)

	useEffect(() => {
		const parent = ref.current?.parentElement

		const handleMouseEnter = () => {
			controls.start('animate')
		}
		const handleMouseLeave = () => {
			controls.start('normal')
		}

		if (parent) {
			parent.addEventListener('mouseenter', handleMouseEnter)
			parent.addEventListener('mouseleave', handleMouseLeave)
		}
		return () => {
			if (parent) {
				parent.removeEventListener('mouseenter', handleMouseEnter)
				parent.removeEventListener('mouseleave', handleMouseLeave)
			}
		}
	}, [controls])

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
			<motion.g
				variants={lidVariants}
				animate={controls}
				transition={springTransition}
			>
				<path d="M3 6h18" />
				<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
			</motion.g>
			<motion.path
				d="M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8"
				variants={{
					normal: { d: 'M19 8v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V8' },
					animate: { d: 'M19 9v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V9' },
				}}
				animate={controls}
				transition={springTransition}
			/>
			<motion.line
				x1="10"
				x2="10"
				y1="11"
				y2="17"
				variants={{
					normal: { y1: 11, y2: 17 },
					animate: { y1: 11.5, y2: 17.5 },
				}}
				animate={controls}
				transition={springTransition}
			/>
			<motion.line
				x1="14"
				x2="14"
				y1="11"
				y2="17"
				variants={{
					normal: { y1: 11, y2: 17 },
					animate: { y1: 11.5, y2: 17.5 },
				}}
				animate={controls}
				transition={springTransition}
			/>
		</svg>
	)
}

export { DeleteIcon }
