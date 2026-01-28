import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../utils/fetchUsers';

export function useChatUsers(viewMode, currentUserId) {
  const isIntro = viewMode === 'intro';
  const isFriendsView = viewMode === 'friends';

  const query = useQuery({
    queryKey: ['users', viewMode, currentUserId],
    queryFn: () => fetchUsers(isFriendsView, currentUserId),
    enabled: !isIntro && !!currentUserId,
    staleTime: 30_000, // optional but sensible
  });

  return {
    users: query.data?.data?.result,
    isLoading: query.isLoading,
    error: query.error,
  };
}

// export function useChatUsers(viewMode, currentUserId) {
//   const isIntro = viewMode === 'intro';

//   return useQuery({
//     queryKey: ['users', viewMode],
//     queryFn: () => fetchUsers(viewMode === 'friends', currentUserId),
//     enabled: !isIntro,
//     select: (data) => data?.data?.result ?? [],
//   });
// }

// export function useChatUsers(viewMode, currentUserId) {
//   const isIntro = viewMode === 'intro';
//   const isFriendsView = viewMode === 'friends';

//   const query = useQuery({
//     queryKey: ['users', viewMode],
//     queryFn: () =>
//       isIntro
//         ? Promise.resolve(null)
//         : fetchUsers(isFriendsView, currentUserId),
//     enabled: !isIntro,
//   });

//   return {
//     users: query.data?.data?.result,
//     isLoading: query.isLoading,
//     error: query.error,
//   };
// }
