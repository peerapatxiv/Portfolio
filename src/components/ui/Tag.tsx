interface TagProps {
  label: string;
}

export default function Tag({ label }: TagProps) {
  return (
    <span className="inline-block text-[11px] font-medium tracking-wide text-stone-600 bg-stone-100 border border-stone-200 rounded-sm px-2.5 py-1 leading-none">
      {label}
    </span>
  );
}
