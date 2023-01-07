import path from 'path'

export function outputDirectory (argv: Record<string, unknown>): string {
  if (['', '.', undefined, null].includes(argv.output as string)) {
    return '.'
  }

  const directory = path.dirname(argv.output as string)

  return directory === '.'
    ? path.basename(argv.output as string)
    : directory
}
