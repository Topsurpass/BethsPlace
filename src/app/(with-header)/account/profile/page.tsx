import { Card, CardContent, CardDescription, CardTitle, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

export default function Page() {
	return (
		<div className="border rounded-2xl p-6 ">
			<div className="">
				<h2 className="text-xl font-semibold"> My Profile</h2>
				<p className="text-sm text-gray-500">View and manage your profile</p>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex gap-4 justify-start items-center mt-6">
					<div className="h-18 w-18 rounded-full border bg-teal-700 p-2">
						<div className="h-16 w-16 rounded-full border bg-white"></div>
					</div>
					<div>
						<h3>Favour Anita Micheal</h3>
						<p className="text-sm text-gray-500">Retaler</p>
						<p className="text-sm text-yellow-500">#1234356789</p>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-4 justify-between">
					<Card className="w-full">
						<CardContent>
							<CardHeader className="px-0">
								<CardTitle className="text-lg font-semibold">
									Personal Information
								</CardTitle>
								<CardDescription className="text-sm text-gray-500">
									Manage your personal information
								</CardDescription>
							</CardHeader>
							<div className="flex flex-col gap-2">
								<div className="flex justify-between">
									<p className="text-sm text-gray-500">First Name:</p>
									<p className="font-medium text-sm">Favour</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm text-gray-500">Middle Name:</p>
									<p className="font-medium text-sm">Anita</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm text-gray-500">Last Name:</p>
									<p className="font-medium text-sm">Chukwu</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm text-gray-500">Email:</p>
									<p className="font-medium text-sm">Chukwu@gmail.com</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm text-gray-500">Phone Number:</p>
									<p className="font-medium text-sm">+234 8107564786</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="w-full">
						<CardContent>
							<CardHeader className="px-0">
								<CardTitle className="text-lg font-semibold">
									Address Information
								</CardTitle>
								<CardDescription className="text-sm text-gray-500">
									Manage your personal information
								</CardDescription>
							</CardHeader>
							<div className="flex flex-col gap-2">
								<div className="flex justify-between">
									<p className="text-sm text-gray-500">Country:</p>
									<p className="font-medium text-sm">Nigeria</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm text-gray-500">City/State:</p>
									<p className="font-medium text-sm">Ikeja, Lagos</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm text-gray-500">Address:</p>
									<p className="font-medium text-sm">
										25, Ketu region, opp Bishop Court
									</p>
								</div>
								<div className="flex justify-between">
									<p className="text-sm text-gray-500">Postal Code:</p>
									<p className="font-medium text-sm">110221</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="space-y-3">
					<h3 className="text-lg font-semibold">Promotion</h3>
					<div className="flex flex-col md:flex-row gap-4 justify-between">
						<Card className="w-full">
							<CardContent>
								<CardHeader className="px-0">
									<CardTitle className="text-lg font-semibold text-teal-600">
										Refer a friend
									</CardTitle>
									<CardDescription className="text-sm text-gray-500">
										Refer a friend or family and get a coupon
									</CardDescription>
								</CardHeader>
								<div className="flex flex-col gap-2">
									<div className="flex gap-4 items-center ">
										<p className="text-sm text-gray-500">
											Share Your Refferal Link
										</p>
										<input
											className="border w-1/2 p-2 rounded-lg text-sm"
											defaultValue={'https://my-referal-code'}
											readOnly
										></input>
									</div>
								</div>
							</CardContent>
						</Card>
						<Card className="w-full">
							<CardContent>
								<CardHeader className="px-0">
									<CardTitle className="text-lg font-semibold text-teal-600">
										CrossPay
									</CardTitle>
									<CardDescription className="text-sm text-gray-500">
										Get your goods delivered to you and pay later
									</CardDescription>
								</CardHeader>
								<div className="flex flex-col gap-2">
									<div className="flex gap-4 items-center ">
										<Link
											className="text-sm text-yellow-500 underline"
											href={'#'}
										>
											Learn more
										</Link>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
