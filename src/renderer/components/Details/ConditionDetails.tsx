import type { ConditionDetailsInterface } from './Details';

export default function ConditionDetails({
  details,
}: ConditionDetailsInterface) {
  return (
    <>
      <p>Name: {details.name}</p>
      <p>Description: {details.description}</p>
    </>
  );
}
