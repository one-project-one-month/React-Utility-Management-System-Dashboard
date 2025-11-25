interface Props {
   children: React.ReactNode;
}

export default function FormSectionCard({ children }: Props) {
   return (
      <div className=" rounded-lg p-5 border border-divider/70 ">{children}</div>
   );
}
