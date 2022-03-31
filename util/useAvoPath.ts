import { useRouter } from 'next/router';

const useAvoPath = (): string => {
  const router = useRouter();
  return 'docs' + router.pathname;
};

export default useAvoPath;