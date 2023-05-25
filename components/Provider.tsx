'use client';

import { SessionProvider } from 'next-auth/react';
import type { Session } from "next-auth";

type Props = {
  children: React.ReactNode
  session: Session
}

export default function Provider({children, session}: Props) {
  return (
    <div>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </div>
  )
}
