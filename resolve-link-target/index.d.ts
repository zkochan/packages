declare module 'resolve-link-target' {
  export = resolveLinkTarget;

  function resolveLinkTarget (linkPath: string): Promise<string>;

  namespace resolveLinkTarget {
    export function sync (linkPath: string): string
  }
}
