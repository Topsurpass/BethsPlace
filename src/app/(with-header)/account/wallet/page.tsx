import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
import { Eye, ChartSpline } from 'lucide-react';
import { formatCurrency } from '@/lib/helpers';
import { Button } from '@/components/ui/button';

export default function Page() {
	return (
		<div className="space-y-5">
			<Card className="w-full">
				<CardContent>
					<CardHeader className="px-0">
						<CardTitle className="text-xl font-semibold">My Wallet</CardTitle>
						<CardDescription className="text-sm text-gray-500">
							View and manage your wallet
						</CardDescription>
					</CardHeader>
				</CardContent>
			</Card>
			<div className="flex gap-4 flex-col md:flex-row">
				<Card className="w-full bg-teal-700">
					<CardContent>
						<CardHeader className="px-0">
							<div className="flex justify-between items-center">
								<p className="text-sm text-gray-100 mb-2">Current Balance</p>
								<Eye className="text-foreground" />
							</div>
						</CardHeader>
						<div>
							<p className="text-xl text-foreground mb-2 font-semibold">
								{formatCurrency(0)}
							</p>
						</div>
						<div>
							<p className="text-sm text-foreground mb-2">Wallet Balance</p>
							<Button
								className="bg-white text-teal-700 hover:bg-gray-100 text-sm"
								label="Fund Wallet"
							/>
						</div>
					</CardContent>
				</Card>
				<Card className="w-full">
					<CardContent>
						<div className="py-5 flex justify-between items-center w-full">
							<div>
								<p className="text-lg text-gray-500">Quick Stats</p>
							</div>
							<div>
								<ChartSpline className="text-teal-700" />
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<div className="flex justify-between">
								<p className="text-gray-500">This Month</p>
								<p className="text-xl text-teal-700 mb-2 font-semibold">
									{formatCurrency(0)}
								</p>
							</div>
							<div className="flex justify-between">
								<p className=" text-gray-500">Transactions</p>
								<p className="text-xl text-teal-700 mb-2 font-semibold">0</p>
							</div>
							<div className="flex justify-between">
								<p className=" text-gray-500">In Transit</p>
								<p className="text-xl text-teal-700 mb-2 font-semibold">
									{formatCurrency(0)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
			<div>
				<Card className="w-full">
					<CardContent>
						<CardHeader className="px-0">
							<CardTitle className="text-xl font-semibold">
								Transaction history
							</CardTitle>
							<CardDescription className="text-sm text-gray-500">
								View your transaction history
							</CardDescription>
						</CardHeader>
						<div className="flex flex-col gap-2">
							<div className="flex justify-between">
								<p className="text-gray-500">This Month</p>
								<p className="text-xl text-teal-700 mb-2 font-semibold">
									{formatCurrency(0)}
								</p>
							</div>
							<div className="flex justify-between">
								<p className=" text-gray-500">City/State:</p>
								<p className="text-xl text-teal-700 mb-2 font-semibold">0</p>
							</div>
							<div className="flex justify-between">
								<p className=" text-gray-500">Address:</p>
								<p className="text-xl text-teal-700 mb-2 font-semibold">
									{formatCurrency(0)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
