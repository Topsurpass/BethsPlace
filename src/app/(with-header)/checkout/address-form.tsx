'use client';

import { Button } from '@/components/ui/button';
import { CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { TextField, SelectField, CheckboxField } from '@/components/ui/forms';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const AddressSchema = z.object({
	street: z.string().min(3, 'Street address is required'),
	city: z.string().min(2, 'City is required'),
	state: z.string().min(2, 'State is required'),
	postalCode: z.string().min(3, 'Postal code is required'),
	country: z.preprocess(
		val => (val === '' || val == null ? 'Nigeria' : val),
		z.string().min(2, 'Country is required'),
	),

	isDefault: z.boolean().optional(),
});

export type AddressInputs = z.infer<typeof AddressSchema>;

const defaultValues: AddressInputs = {
	street: '',
	city: '',
	state: '',
	postalCode: '',
	country: 'Nigeria',
	isDefault: false,
};

export function AddressForm({
	isLoading,
	onSaveAddress,
	isError,
	error,
}: {
	isError: boolean;
	isLoading: boolean;
	error?: string;
	onSaveAddress: SubmitHandler<AddressInputs>;
}) {
	const { control, handleSubmit } = useForm<AddressInputs>({
		resolver: zodResolver(AddressSchema),
		defaultValues,
	});

	return (
		<div>
			<CardHeader className="text-left pb-8">
				<CardTitle className="text-3xl font-bold dark:text-gold-deep">
					Shipping Address
				</CardTitle>
				<p className="text-base leading-relaxed text-gray-400">
					Enter your shipping or billing address details below.
				</p>
			</CardHeader>

			<CardContent className="pb-8">
				<form onSubmit={handleSubmit(onSaveAddress)} className="space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<TextField
								label="Street"
								id="street"
								name="street"
								placeholder="123 Main Street"
								control={control}
							/>
						</div>
						<div>
							<TextField
								label="City"
								id="city"
								name="city"
								placeholder="Lagos"
								control={control}
							/>
						</div>
						<div>
							<TextField
								label="State"
								id="state"
								name="state"
								placeholder="Lagos State"
								control={control}
							/>
						</div>
						<div>
							<TextField
								label="Postal Code"
								id="postalCode"
								name="postalCode"
								placeholder="100001"
								control={control}
							/>
						</div>
						<div>
							<TextField
								label="Country"
								id="country"
								name="country"
								control={control}
								placeholder="Nigeria"
							/>
						</div>
						<div></div>
					</div>

					<CheckboxField
						label="Set as default address"
						name="isDefault"
						control={control}
					/>

					<Button
						type="submit"
						disabled={isLoading}
						className="border-gold-deep  hover:bg-gold-light hover:border-gold-deep w-full"
						isLoading={isLoading}
						label="Save Address"
					/>

					{isError && (
						<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center gap-2 animate-fade-in">
							<span className="text-red-600 text-sm">
								{error || 'An error occurred while saving address.'}
							</span>
						</div>
					)}
				</form>
			</CardContent>
		</div>
	);
}
