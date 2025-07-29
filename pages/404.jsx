import Error from 'next/error'
import { useEffect } from 'react';
import Avo from '../Avo';

export default function NotFound() {
    useEffect(() => {
        Avo.docsPageErrored({
          path: window.location.pathname,
          errorCode: "404"
        });
      }, []);

    return <Error statusCode={404} />
  }