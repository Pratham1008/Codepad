"use client";
import { useEffect } from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { setFirebaseSession } from "@/app/auth/actions";

export function TokenRefresher() {
  useEffect(() => {
    // Firebase auto-refreshes the token client-side ~5 min before expiry;
    // this listener fires every time that happens and re-syncs the cookie.
    const unsub = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const freshToken = await user.getIdToken();
        await setFirebaseSession(freshToken);
      }
    });

    // Belt-and-suspenders: force a refresh check every 10 minutes in case
    // the tab was backgrounded and the SDK's own timer got throttled.
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await setFirebaseSession(await user.getIdToken(true));
    }, 10 * 60 * 1000);

    return () => { unsub(); clearInterval(interval); };
  }, []);
  return null;
}
