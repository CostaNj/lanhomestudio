export default function Icon({ name }: { name: string }) {
  return (
    <svg className={`icon icon-${name}`} aria-hidden="true" role="img">
      <use href={`#icon-${name}`} />
    </svg>
  );
}
