import Image from "next/image";

interface SvgButtonProps {
  icon: string;
  onClick: () => void;
}

export const SvgButton = ({ icon, onClick }: SvgButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer"
    >
      <Image alt="filter" src={icon} height={30} width={30} />
    </div>
  );
};
