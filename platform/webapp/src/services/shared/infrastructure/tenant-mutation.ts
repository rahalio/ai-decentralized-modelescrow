import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from '@tanstack/react-query';
import { getEffectiveOrgId } from './tenant-state';

export function useTenantMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
>(
  mutationFn: (
    variables: TVariables,
    orgId: string | null
  ) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables>
) {
  const queryClient = useQueryClient();
  const orgId = getEffectiveOrgId();

  return useMutation<TData, TError, TVariables>({
    ...options,
    mutationFn: (variables) => mutationFn(variables, orgId),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries();
      return options?.onSuccess?.(...args);
    },
  });
}
