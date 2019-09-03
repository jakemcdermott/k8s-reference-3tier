import React from 'react';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { verifyAccountEmail } from './api';

export default function ConfirmEmail({ registrationKey }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isVerified, setIsVerified] = React.useState(false);

  async function loadRegistration() {
    setIsLoading(true);
    try {
      await verifyAccountEmail(registrationKey);
      setIsVerified(true);
    } catch {
      setIsVerified(false);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    loadRegistration();
  }, []);

  if (isLoading) {
    return (
      <Container component="main" maxWidth="xs">
        Loading...
      </Container>
    );
  }

  if (!isVerified) {
    return (
      <Container component="main" maxWidth="xs">
        Registration error.
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      Registration Complete.
      <Link href="#/signin" variant="body2">
        Sign in
      </Link>
    </Container>
  );
}
