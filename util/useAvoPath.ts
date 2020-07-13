import { useRouter } from 'next/router';

export default (): string => {
  const router = useRouter();
  return router.pathname.split('/').join('');
};
