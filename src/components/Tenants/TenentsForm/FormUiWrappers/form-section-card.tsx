interface Props {
  children: React.ReactNode;
}

export default function FormSectionCard({ children }: Props) {
  return (
    <div className="bg-white rounded-lg p-5 border border-slate-200">
      {children}
    </div>
  );
}
