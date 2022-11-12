import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import {
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { Auth, AuthError, User, UserCredential } from "firebase/auth";

interface UserCredentialInterface {
  email: string;
  password: string;
}

export function useAuthStateChanged(
  queryKey: QueryKey,
  auth: Auth,
  options: UseQueryOptions<void, AuthError, User> = {}
): UseQueryResult<User, AuthError> {
  const query = (): any | Promise<User | null> =>
    new Promise((resolve, reject) => {
      return onAuthStateChanged(
        auth,
        (userAuth) => {
          return resolve(userAuth);
        },
        (error) => {
          console.log("error refresh", error);
          reject(error);
        }
      );
    });

  return useQuery<void, AuthError, User>(["authUser"], () => query(), {
    ...options,
    retry: false,
    staleTime: Infinity,
    refetchInterval: undefined,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useAuthSignInWithEmailAndPassword(
  auth: Auth,
  useMutationOptions?: UseMutationOptions<UserCredential, AuthError, UserCredentialInterface>
): UseMutationResult<UserCredential, AuthError, UserCredentialInterface> {
  return useMutation<UserCredential, AuthError, UserCredentialInterface>(({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, useMutationOptions);
}

export function useAuthCreateUserWithEmailAndPassword(
  auth: Auth,
  useMutationOptions?: UseMutationOptions<UserCredential, AuthError, UserCredentialInterface>
): UseMutationResult<UserCredential, AuthError, UserCredentialInterface> {
  return useMutation<UserCredential, AuthError, UserCredentialInterface>(({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }, useMutationOptions);
}

export function useAuthSignOut(
  auth: Auth,
  useMutationOptions?: UseMutationOptions<void, AuthError, void>
): UseMutationResult<void, AuthError, void> {
  return useMutation<void, AuthError, void>(() => {
    return signOut(auth);
  }, useMutationOptions);
}
