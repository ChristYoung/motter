export interface FeatureFlagProps {
  conditions: boolean[];
  mode?: 'anyOf' | 'allOf' | 'noneOf';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureFlag: React.FC<FeatureFlagProps> = (props: FeatureFlagProps) => {
  const { conditions, mode = 'anyOf', children, fallback } = props;
  const hasAccess =
    mode === 'noneOf'
      ? !conditions.some(Boolean)
      : mode === 'anyOf'
        ? conditions.some(Boolean)
        : conditions.every(Boolean);

  // If the user has access, render the children
  if (hasAccess) {
    return <>{children}</>;
  }

  // If the user doesn't have access, render the fallback
  if (fallback) {
    return <>{fallback}</>;
  }
  return <></>;
};
