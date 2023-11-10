import { obfuscateSecret } from '@/utils/obfuscate'
import { CopyButton } from '@/components/CopyButton'
import clsx from 'clsx'

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
    <>
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
    </>
  )
}