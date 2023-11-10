'use client'

import clsx from 'clsx'
import { useAccessToken, useApiKey, useUser } from '@/utils/useUser'
import { usePostHog } from 'posthog-js/react'
import { useSignIn } from '@/utils/useSignIn'
import { obfuscateSecret } from '@/utils/obfuscate'
import { Button } from '@/components/Button'
import { CopyButton } from '@/components/CopyButton'

export function CopyableSecret({
  secret = '',
  onAfterCopy,
  obfuscateStart,
  obfuscateEnd,
}: {
  secret: string;
  onAfterCopy: () => void;
  obfuscateStart?: number;
  obfuscateEnd?: number;
}) {
  return (
    <div className="relative flex">
      <span className="whitespace-nowrap font-mono text-yellow-400 group-hover:opacity-25">
        {obfuscateSecret(secret, obfuscateStart, obfuscateEnd)}
      </span>
      <span className="absolute inset-0">
        <CopyButton
          code={secret}
          onAfterCopy={onAfterCopy}
          customPositionClassNames={clsx(
            'top-[-2px] bottom-[2px]' /* nudge 2px up*/,
            'left-[-6px] right-[-6px]' /* widen a little to fit nicely */,
            'min-h-[28px]',
          )}
        />
      </span>
    </div>
  )
}

function SecretBlock({ name, secret, posthog, tip }) {
  return (
    <div>
      <h2 className="flex flex-row">
        {name}
      </h2>
      <p className="mb-0">
        Use for <strong>running</strong> the sandboxes.
      </p>
      <div className="text-xs flex">
        <CopyableSecret
          secret={secret}
          onAfterCopy={() => posthog?.capture('copied API key')}
          obfuscateStart={12}
          obfuscateEnd={5}
        />
      </div>
      <span className="text-xs text-gray-400">
        {tip}
      </span>
    </div>
  )
}
function APIKey() {
  const signIn = useSignIn()
  const { user } = useUser()
  const apiKey = useApiKey()
  const posthog = usePostHog()
  const accessToken = useAccessToken()

  return (
    <div className="flex flex-col items-start justify-start">
      {user ? (
        <div className="flex flex-col">
          <SecretBlock name="API Key" secret={apiKey} posthog={posthog} tip="Use for running the sandboxes." />
          <SecretBlock name="Access Token" secret={accessToken} posthog={posthog} tip="Use for managing the sandboxes (creating/listing/deleting)." />
          {/*<h2 className="font-bold">Access Token</h2>*/}
          {/*<span className="text-xs text-gray-200">*/}
          {/*  Use for <strong>managing</strong> the sandboxes*/}
          {/*  (creating/listing/deleting).*/}
          {/*</span>*/}
          {/*<span className="text-xs text-gray-200">*/}
          {/*  Not needed when logging in via CLI via{' '}*/}
          {/*  <code>e2b login</code>*/}
          {/*</span>*/}
          {/*<div className="relative text-xs">*/}
          {/*  <CopyableSecret*/}
          {/*    secret={accessToken}*/}
          {/*    onAfterCopy={() =>*/}
          {/*      posthog?.capture('copied Access Token')*/}
          {/*    }*/}
          {/*    obfuscateStart={12}*/}
          {/*    obfuscateEnd={5}*/}
          {/*  />*/}
          {/*  <span className="text-xs text-gray-400">*/}
          {/*    TIP: Set as <code>E2B_ACCESS_TOKEN</code> env var to avoid*/}
          {/*    passing it every time.*/}
          {/*  </span>*/}
          {/*</div>*/}
        </div>
      ) : (
        <>
          <span>You can get your API key by signing up.</span>
          <Button onClick={() => signIn()}>Sign up to get your API key</Button>
        </>
      )}
    </div>
  )
}

export default APIKey
