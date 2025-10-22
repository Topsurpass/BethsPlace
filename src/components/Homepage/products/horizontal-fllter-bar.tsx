'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Sparkles, SlidersHorizontal } from 'lucide-react';

type Category = {
	id: string | number;
	name: string;
	productCount?: number;
	subcategories?: Category[];
	description?: string;
};

interface FilterBarProps {
	categories: Category[];
	selectedCategory: string | undefined;
	onCategoryChange: (id: string | undefined) => void;
	productCount: number
}

const HorizontalFilterBar: React.FC<FilterBarProps> = ({
	categories,
	selectedCategory,
	onCategoryChange,
	productCount = 0,
}) => {
	const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);


	return (
		<div className="w-full">
			<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
				<div className="flex items-center gap-3">
					<h1 className="text-2xl font-light ">{selectedCategory || 'All Bags'}</h1>
					<span className="text-sm text-background bg-foreground px-2 py-1 rounded-full">
						{productCount} pieces
					</span>
				</div>

				{/* Controls */}
				<div className="flex items-center gap-3">
					<Button
						onClick={() => setIsMobileFiltersOpen(true)}
						variant="outline"
						size="sm"
						className="lg:hidden flex items-center gap-2 border-gray-200"
					>
						<SlidersHorizontal className="h-4 w-4" />
						Filters
						{categories.length > 8 && (
							<span className="bg-amber-100 text-amber-800 text-xs rounded-full h-5 w-5 flex items-center justify-center">
								{categories.length}
							</span>
						)}
					</Button>
				</div>
			</div>

			{/* Desktop Categories with Advanced Organization */}
			<div className="hidden lg:block">
				<div className="rounded-2xl shadow-sm border border-gold-deep p-6">
					{/* Header with Search and Tabs */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center gap-3">
							<Sparkles className="h-5 w-5 text-amber-600" />
							<h3 className="text-lg font-semibold ">
								Browse Collection
							</h3>
						</div>
					</div>

					<div className="flex flex-wrap gap-3">
						<button
							onClick={() => onCategoryChange(undefined)}
							className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group ${
								!selectedCategory
									? 'border-gold-deep  bg-amber-50 text-amber-900 shadow-sm'
									: 'border-gray-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-25'
							}`}
						>
							<div className="w-2 h-2 rounded-full bg-current opacity-60" />
							<span className="font-medium">All Collections</span>
						</button>

						{categories.map(category => (
							<button
								key={category.id}
								onClick={() => onCategoryChange(category.name)}
								className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group ${
									selectedCategory === category.name
										? 'border-gold-deep  bg-amber-50 text-amber-900 shadow-sm'
										: 'border-gray-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-25'
								}`}
							>
								<div className="w-2 h-2 rounded-full bg-current opacity-60" />
								<span className="font-medium">{category.name}</span>
								{category.productCount && (
									<span className="text-sm opacity-75">
										({category.productCount})
									</span>
								)}
							</button>
						))}
					</div>

					{selectedCategory && (
						<div className="mt-6 pt-4 border-t border-gray-100">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<span className="text-sm ">Viewing:</span>
									<span className="bg-amber-100 text-amber-800 px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
										{selectedCategory}
										<button
											onClick={() => onCategoryChange(undefined)}
											className="hover:text-amber-900 transition-colors"
										>
											<X className="h-3 w-3" />
										</button>
									</span>
								</div>

							</div>
						</div>
					)}
				</div>
			</div>

			{/* Mobile Filter Overlay for Many Categories */}
			{isMobileFiltersOpen && (
				<div className="fixed inset-0 z-50 lg:hidden">
					<div
						className="absolute inset-0 bg-black bg-opacity-50"
						onClick={() => setIsMobileFiltersOpen(false)}
					/>
					<div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
						<div className="p-4 border-b border-gray-200 sticky top-0 bg-white">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold text-gray-900">Categories</h3>
								<Button
									onClick={() => setIsMobileFiltersOpen(false)}
									variant="ghost"
									size="sm"
								>
									<X className="h-5 w-5" />
								</Button>
							</div>
						</div>

						<div className="p-4 space-y-3">
							{/* All Products Mobile */}
							<button
								onClick={() => {
									onCategoryChange(undefined);
									setIsMobileFiltersOpen(false);
								}}
								className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
									!selectedCategory
										? 'border-gold-deep  bg-amber-50'
										: 'border-gray-200 bg-gray-50'
								}`}
							>
								<div className="flex items-center justify-between">
									<div>
										<h4 className="font-semibold text-gray-900">All Bags</h4>
										<p className="text-sm text-gray-600 mt-1">
											{productCount} pieces
										</p>
									</div>
									{!selectedCategory && (
										<Sparkles className="h-4 w-4 text-amber-600" />
									)}
								</div>
							</button>

							{/* Categories Mobile with Search */}
							{categories.map(category => (
								<button
									key={category.id}
									onClick={() => {
										onCategoryChange(category.name);
										setIsMobileFiltersOpen(false);
									}}
									className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
										selectedCategory === category.name
											? 'border-gold-deep  bg-amber-50'
											: 'border-gray-200 bg-gray-50'
									}`}
								>
									<div className="flex items-center justify-between">
										<div>
											<h4 className="font-semibold text-gray-900">
												{category.name}
											</h4>
											{category.productCount && (
												<p className="text-sm text-gray-600 mt-1">
													{category.productCount} items
												</p>
											)}
										</div>
										{selectedCategory === category.name && (
											<Sparkles className="h-4 w-4 text-amber-600" />
										)}
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default HorizontalFilterBar;
