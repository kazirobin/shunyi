Running next.config.ts took 596ms
- Cache Components enabled
- Partial Prefetching enabled
- Experiments (use with caution):
  ✓ agentFeedback

  Creating an optimized production build ...
✓ Compiled successfully in 10.2s
  Running TypeScript ...
app/admin/dashboard/page.tsx(28,19): error TS2322: Type '{ children: Element; asChild: true; className: string; }' is not assignable to type 'IntrinsicAttributes & ButtonProps & VariantProps<(props?: (ConfigVariants<{ variant: { default: string; outline: string; secondary: string; ghost: string; destructive: string; link: string; }; size: { ...; }; }> & ClassProp) | undefined) => string>'.
  Property 'asChild' does not exist on type 'IntrinsicAttributes & ButtonProps & VariantProps<(props?: (ConfigVariants<{ variant: { default: string; outline: string; secondary: string; ghost: string; destructive: string; link: string; }; size: { ...; }; }> & ClassProp) | undefined) => string>'.
app/admin/employee/db-connect.ts(32,39): error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.
components/layout/navbar.tsx(92,18): error TS2604: JSX element type 'link.icon' does not have any construct or call signatures.
components/layout/navbar.tsx(92,18): error TS2786: 'link.icon' cannotbe used as a JSX component.
  Its type 'unknown' is not a valid JSX element type.
components/layout/navbar.tsx(145,22): error TS2604: JSX element type 'link.icon' does not have any construct or call signatures.
components/layout/navbar.tsx(145,22): error TS2786: 'link.icon' cannot be used as a JSX component.
  Its type 'unknown' is not a valid JSX element type.
Failed to type check.