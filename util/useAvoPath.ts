import { useRouter } from 'next/router';

export default (): string => {
  const router = useRouter();
  return 'docs' + router.pathname;
};
