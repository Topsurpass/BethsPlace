import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import AuthHTTP, { PublicHTTP } from '@/lib/http-clients';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export type MutationMethod = 'post' | 'put' | 'patch' | 'delete';

export interface MutationConfig<TData = any, TVariables = any> {
	method: MutationMethod;
	endpoint: string | ((...args: any[]) => string);
	options?: Omit<UseMutationOptions<TData, unknown, TVariables>, 'mutationFn'>;
}

export interface GetRequestConfig<TData = any> {
	queryKey: (string | number | object)[];
	endpoint: string;
	params?: Record<string, any>;
	options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>;
}

function getRequestHook(httpClient: typeof AuthHTTP | typeof PublicHTTP) {
	return function useGetRequest<TData = any>({
		queryKey,
		endpoint,
		params = {},
		options,
	}: GetRequestConfig<TData>) {
		return useQuery<TData>({
			queryKey,
			queryFn: async () => {
				const response = await httpClient.get(endpoint, { params });
				return response?.data ?? response?.data;
			},
			...options,
		});
	};
}

function useMutateRequest<TData = any, TVariables = any>(
	client: typeof AuthHTTP | typeof PublicHTTP,
	{ method, endpoint, options }: MutationConfig<TData, TVariables>,
) {
	return useMutation<TData, unknown, TVariables>({
		mutationFn: async (variables: TVariables) => {
			const url = typeof endpoint === 'function' ? endpoint(variables) : endpoint;

			if (method === 'delete') {
				return (await client.delete(url, { data: variables }))?.data;
			}
			return (await (client as any)[method](url, variables))?.data;
		},
		...options,
	});
}

export function useAuthMutateRequest<TData = any, TVariables = any>(
	config: MutationConfig<TData, TVariables>,
) {
	return useMutateRequest(AuthHTTP, config);
}

export function usePublicMutateRequest<TData = any, TVariables = any>(
	config: MutationConfig<TData, TVariables>,
) {
	return useMutateRequest(PublicHTTP, config);
}

export const useAuthGetRequest = getRequestHook(AuthHTTP);
export const usePublicGetRequest = getRequestHook(PublicHTTP);
