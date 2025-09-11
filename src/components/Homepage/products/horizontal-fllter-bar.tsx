import React, { useState } from 'react';
import SortOptions from '@/components/Homepage/products/sort-options';
import { Button } from '@/components/ui/button';

type Category = {
	id: string | number;
	name: string;
};

interface FilterBarProps {
	categories: Category[];
	selectedCategory: string | number;
	onCategoryChange: (id: string | number) => void;
	priceRange: [number, number];
	onPriceRangeChange: (range: [number, number]) => void;
	maxPrice: number;
	sortOption: string;
	onSortChange: (option: string) => void;
}

const HorizontalFilterBar: React.FC<FilterBarProps> = ({
	categories,
	selectedCategory,
	onCategoryChange,
	priceRange,
	onPriceRangeChange,
	maxPrice,
	sortOption,
	onSortChange,
}) => {
	const [showPriceFilter, setShowPriceFilter] = useState(false);

	return (
		<div className="bg-background border p-4 sm:p-6 rounded-lg mb-6">
			<div className="flex flex-col gap-4 sm:gap-6">
				<div className="w-full">
					<h4 className="text-gold-deep font-semibold mb-2 sm:mb-3">Category</h4>
					<div className="flex flex-wrap gap-2 sm:gap-3">
						{categories.map(category => (
							<Button
								key={category.id}
								onClick={() => onCategoryChange(category.id)}
								className={`px-3 py-1 text-sm sm:text-base sm:px-4 sm:py-2 transition-colors duration-300 ${
									selectedCategory === category.id
										? 'bg-gold-deep text-background'
										: 'bg-foreground text-background'
								}`}
								size={'sm'}
								label={category.name}
							/>
						))}
					</div>
				</div>

				{/* Price filter, Sort, and Clear Filters */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					{/* Price filter - Collapsible on mobile */}
					<div className="w-full sm:w-auto">
						<Button
							onClick={() => setShowPriceFilter(!showPriceFilter)}
							className="sm:hidden w-full flex items-center justify-between bg-gray-800 border border-gold-deep text-gold-deep font-semibold py-2 px-3 mb-3"
							size={'sm'}
						>
							<span>Price Filter</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={`h-4 w-4 transition-transform ${showPriceFilter ? 'rotate-180' : ''}`}
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</Button>
						<div className={`${showPriceFilter ? 'block' : 'hidden'} sm:block w-full`}>
							<h4 className="text-gold-deep font-semibold mb-2 sm:mb-3">
								Price Range
							</h4>
							<div className="flex flex-col sm:flex-row sm:items-center gap-3">
								<input
									type="range"
									min={0}
									max={maxPrice}
									value={priceRange[1]}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										onPriceRangeChange([
											priceRange[0],
											parseInt(e.target.value, 10),
										])
									}
									className="w-full sm:w-40 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
								/>
								<span className="text-foreground text-sm">
									Up to ₦{priceRange[1].toLocaleString()}
								</span>
							</div>
						</div>
					</div>

					<div className="w-full sm:w-auto">
						<SortOptions sortOption={sortOption} onSortChange={onSortChange} />
					</div>

					<Button
						onClick={() => {
							onCategoryChange('all');
							onPriceRangeChange([0, maxPrice]);
							onSortChange('featured');
						}}
						size={'sm'}
						className="w-full sm:w-auto px-4 py-2 border border-gold-deep text-gold-deep bg-background rounded-lg hover:bg-gold-deep hover:bg-opacity-10 transition-colors duration-300 text-sm sm:text-base"
						label="Clear Filters"
					/>
				</div>
			</div>
		</div>
	);
};

export default HorizontalFilterBar;
