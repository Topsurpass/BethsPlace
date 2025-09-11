import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import LoadingSpinner from '@/assests/icons/loading-spinner';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				primary:
					'bg-gold-deep text-black shadow-lg hover:bg-gold-light hover:shadow-xl active:scale-[0.98] shadow-gold/30',
				destructive:
					'bg-red-600 text-foreground shadow-lg hover:shadow-xl hover:bg-red-700 active:scale-[0.98] shadow-red/30',
				outline:
					'border-2 border-gold-deep bg-transparent text-gold-deep hover:bg-gold-deep/10 active:scale-[0.98] backdrop-blur-sm',
				secondary:
					'bg-gray-800 text-foreground shadow-md hover:shadow-lg hover:bg-gray-700 active:scale-[0.98] shadow-gray/20',
				ghost: 'hover:bg-gold-deep/10 text-gold-deep active:scale-[0.98] backdrop-blur-sm',
				link: 'text-gold-deep underline-offset-4 hover:underline',
				success:
					'bg-green-600 text-foreground shadow-lg hover:shadow-xl hover:bg-green-700 active:scale-[0.98] shadow-green/30',
				warning:
					'bg-yellow-500 text-black shadow-lg hover:shadow-xl hover:bg-yellow-600 active:scale-[0.98] shadow-yellow/30',
				danger: 'bg-red-500 text-foreground shadow-lg hover:shadow-xl hover:bg-red-600 active:scale-[0.98] shadow-red/30',
			},
			size: {
				md: 'h-10 px-4 py-3 md:px-8',
				sm: 'h-9 rounded-md px-3 text-xs',
				lg: 'h-11 rounded-md px-8 text-base',
				icon: 'h-10 w-10',
			},
			fullWidth: {
				true: 'w-full',
			},
			disabled: {
				true: 'disabled:cursor-not-allowed disabled:opacity-50',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	label?: string;
	isLoading?: boolean;
	disabled?: boolean;
	loadingText?: string;
	children?: React.ReactNode;
	icon?: React.ElementType;
	iconPosition?: 'start' | 'end';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			label = '',
			className,
			variant,
			size,
			asChild = false,
			isLoading = false,
			disabled = false,
			fullWidth,
			loadingText = 'Please wait',
			icon,
			iconPosition = 'start',
			children,
			...props
		},
		ref,
	) => {
		const Comp = asChild ? Slot : 'button';
		const Icon = icon;

		const render = () => {
			if (children) return children;

			if (isLoading) {
				return (
					<div className="flex items-center gap-2 animate-pulse">
						<LoadingSpinner className="text-current animate-spin" />
						<div className="flex items-center">
							<span className="capitalize">{loadingText}</span>
							<MoreHorizontal size={20} className="ml-1 animate-pulse" />
						</div>
					</div>
				);
			}

			return (
				<div className="flex items-center gap-2">
					{Icon && iconPosition === 'start' && (
						<Icon
							size={18}
							className="transition-transform group-hover:translate-x-0.5"
						/>
					)}
					<span>{label}</span>
					{Icon && iconPosition === 'end' && (
						<Icon
							size={18}
							className="transition-transform group-hover:translate-x-0.5"
						/>
					)}
				</div>
			);
		};

		return (
			<Comp
				className={cn(buttonVariants({ variant, size, disabled, fullWidth }), className)}
				ref={ref}
				disabled={disabled || isLoading}
				{...props}
			>
				{render()}
			</Comp>
		);
	},
);

Button.displayName = 'Button';

export { Button, buttonVariants };
