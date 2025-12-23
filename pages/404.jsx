import Error from 'next/error'
import { useEffect } from 'react';
import { docsPageErrored } from '../AvoEvents';

export default function NotFound() {
    useEffect(() => {
        docsPageErrored({
          path: window.location.pathname,
          errorCode: "404"
        });
      }, []);

    return <Error statusCode={404} />
  }