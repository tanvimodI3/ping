"use client";

interface Props {
  title: any;
  children: any;
  className?: string;
}

export default function Window({ title, children, className }: Props) {
  return (
    <div className={`w-[420px] bg-light flex flex-col border border-dark [border-right:2px_solid_var(--lightest)] [border-bottom:2px_solid_var(--lightest)] [box-shadow:3px_3px_0_var(--darkest)] ${className ?? ""}`}>
      <div className="h-[24px] flex items-center justify-between px-[6px] py-[4px] bg-dark text-white">
        <span>{title}</span>
        <span>✕</span>
      </div>

      <div className="p-[16px] bg-contrastbg border border-darkest [border-right:2px_solid_var(--lightest)] [border-bottom:2px_solid_var(--lightest)]">
        {children}
      </div>
    </div>
  );
}