import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { Functions, httpsCallable, HttpsCallableOptions } from "firebase/functions";

export function useFunctionsQuery<RequestData = any, ResponseData = unknown, ModifiedData = ResponseData>(
  key: QueryKey,
  functions: Functions,
  trigger: string,
  requestData?: RequestData | null,
  options?: HttpsCallableOptions,
  useQueryOptions?: Omit<UseQueryOptions<ResponseData, Error, ModifiedData>, "queryFn">
): UseQueryResult<ModifiedData, Error> {
  return useQuery<ResponseData, Error, ModifiedData>({
    ...useQueryOptions,
    queryKey: useQueryOptions?.queryKey ?? key,
    async queryFn() {
      const { data } = await httpsCallable<RequestData, ResponseData>(functions, trigger, options)(requestData);

      return data;
    },
  });
}

export function useFunctionsCall<RequestData = any, ResponseData = unknown>(
  functions: Functions,
  trigger: string,
  options?: HttpsCallableOptions,
  useMutationOptions?: UseMutationOptions<ResponseData, Error, RequestData>
): UseMutationResult<ResponseData, Error, RequestData> {
  return useMutation<ResponseData, Error, RequestData>(async (requestData) => {
    const { data } = await httpsCallable<RequestData, ResponseData>(functions, trigger, options)(requestData);

    return data;
  }, useMutationOptions);
}
