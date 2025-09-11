const SortOptions = ({
	sortOption,
	onSortChange,
}: {
	sortOption: string;
	onSortChange: (value: string) => void;
}) => {
	const options = [
		{ value: 'featured', label: 'Featured' },
		{ value: 'price-low', label: 'Price: Low to High' },
		{ value: 'price-high', label: 'Price: High to Low' },
		{ value: 'rating', label: 'Top Rated' },
	];

	return (
		<div className="flex items-center">
			<span className="text-foreground mr-3">Sort by:</span>
			<select
				value={sortOption}
				onChange={e => onSortChange(e.target.value)}
				className="bg-background border text-foreground rounded-lg px-4 py-2 focus:ring-gold focus:border-gold"
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};

export default SortOptions;
