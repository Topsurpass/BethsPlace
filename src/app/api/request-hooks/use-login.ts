import { useMutation } from '@tanstack/react-query';
import { PublicHTTP } from '@/lib/http-clients';
import { useAuthStore } from '@/stores/user-store';
import { ENDPOINTS } from '@/lib/constants';
import { useRouter } from 'next/navigation';

type RequestPayload = {
	email: string;
	password: string;
};

const useLoginUser = () => {
	const addUserToStore = useAuthStore(state => state.setUser);
	const router = useRouter();

	return useMutation({
		mutationFn: async (requestPayload: RequestPayload) => {
			const res = await PublicHTTP.post(ENDPOINTS.login, requestPayload);
			return res.data;
		},
		onSuccess: data => {
			const { token, user } = data;
			addUserToStore(user, token);

			const searchParams = new URLSearchParams(window.location.search);
			const redirect = searchParams.get('redirect') || '/';

			router.push(redirect);
		},
	});
};

export default useLoginUser;
