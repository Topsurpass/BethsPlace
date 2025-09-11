// components/shop/FilterSidebar.js
import React from 'react';

type Category = {
	id: string | number;
	name: string;
};

interface FilterSidebarProps {
	categories: Category[];
	selectedCategory: string | number;
	onCategoryChange: (id: string | number) => void;
	priceRange: [number, number];
	onPriceRangeChange: (range: [number, number]) => void;
	maxPrice: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
	categories,
	selectedCategory,
	onCategoryChange,
	priceRange,
	onPriceRangeChange,
	maxPrice,
}) => {
	return (
		<div className="bg-gray-900 p-6 rounded-lg">
			<h3 className="text-xl font-bold text-foreground mb-6">Filters</h3>

			{/* Category filter */}
			<div className="mb-8">
				<h4 className="text-gold font-semibold mb-4">Category</h4>
				<div className="space-y-3">
					{categories.map(category => (
						<div key={category.id} className="flex items-center">
							<input
								type="radio"
								id={`category-${category.id}`}
								name="category"
								value={String(category.id)}
								checked={selectedCategory === category.id}
								onChange={() => onCategoryChange(category.id)}
								className="h-4 w-4 text-gold focus:ring-gold border-gray-600"
							/>
							<label
								htmlFor={`category-${category.id}`}
								className="ml-3 text-gray-300"
							>
								{category.name}
							</label>
						</div>
					))}
				</div>
			</div>

			{/* Price filter */}
			<div className="mb-8">
				<h4 className="text-gold font-semibold mb-4">Price Range</h4>
				<div className="space-y-4">
					<div>
						<input
							type="range"
							min={0}
							max={maxPrice}
							value={priceRange[1]}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								onPriceRangeChange([priceRange[0], parseInt(e.target.value, 10)])
							}
							className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
						/>
						<div className="flex justify-between mt-2">
							<span className="text-gray-400">₦0</span>
							<span className="text-gray-400">₦{priceRange[1].toLocaleString()}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Clear filters */}
			<button
				onClick={() => {
					onCategoryChange('all');
					onPriceRangeChange([0, maxPrice]);
				}}
				className="w-full py-2 border border-gold text-gold rounded-lg hover:bg-gold hover:bg-opacity-10 transition-colors duration-300"
			>
				Clear All Filters
			</button>
		</div>
	);
};

export default FilterSidebar;
