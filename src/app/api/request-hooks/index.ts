import {
	// usePublicMutateRequest,
	// useAuthGetRequest,
	usePublicGetRequest,
	// useAuthMutateRequest,
} from '@/hooks/use-make-request';
import QueryKeys from './query-keys';
import { ENDPOINTS } from '@/lib/constants';

type GetProductGridParams = {
	page?: number;
	search?: string;
	category?: string;
	sort?: string;
	limit?: number;
};

export function useGetProductGrid(params: GetProductGridParams = {}) {
	return usePublicGetRequest({
		queryKey: [QueryKeys.GET_ALL_PRODUCTS, params],
		endpoint: ENDPOINTS.allProducts,
		params,
	});
}
export function useGetProductCategory() {
	return usePublicGetRequest({
		queryKey: [QueryKeys.GET_PRODUCT_CATEGORIES],
		endpoint: ENDPOINTS.productCategory,
	});
}

export const useGetSingleProduct = (slug: string) =>
	usePublicGetRequest({
		queryKey: [QueryKeys.GET_ALL_PRODUCTS, slug],
		endpoint: `${ENDPOINTS.allProducts}${slug}`,
		options: {
			enabled: !!slug,
		},
	});
