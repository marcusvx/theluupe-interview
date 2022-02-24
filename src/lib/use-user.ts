import useSWR from 'swr';
import { SessionUser } from '@dal/SessionUser';

class UserProfileError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = this.constructor.name;
  }
}

const fetcher = async (url: string): Promise<SessionUser> => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new UserProfileError('An error occurred while fetching the data.', res.status);
  }

  return res.json();
};

const useUser = () => {
  const { data, mutate, error } = useSWR('/auth/profile', fetcher);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;
  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
};

export default useUser;
