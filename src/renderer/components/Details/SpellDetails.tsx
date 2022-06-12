import type { SpellDetailsInterface } from './Details';

export default function SpellDetails({ details }: SpellDetailsInterface) {
  return (
    <>
      <p>Name: {details.name}</p>
      <p>Level: {details.level}</p>
      <p>Saving throw: {details.saving_throw}</p>
      <p>Range: {details.range}</p>
      <p>Components: {details.components}</p>
      <p>Schools: {details.school}</p>
      <p>Duration: {details.duration}</p>
      <p>Casting time: {details.casting_time}</p>
      <p>spell resistance: {details.spell_resistance}</p>
      <p>Target: {details.target}</p>
      <p>Description: {details.description}</p>
    </>
  );
}
