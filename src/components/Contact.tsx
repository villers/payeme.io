export const ContractData: any = {
  s: {
    type: "Salarié",
    label: "Rémunération annuel brut en €",
    shortLabel: "en €",
  },
  f: {
    type: "Freelance",
    label: "TJM en €",
    shortLabel: "TJM en €",
  },
  o: {
    type: "Stage / Alternance",
    label: "Rémunération annuel brut en €",
    shortLabel: "en €",
  },
};

type Props = {
  index: string;
  type?: string;
};

const ContractType = ({ index, type = "shortLabel" }: Props) => {
  return <span>{ContractData[index][type]}</span>;
};

export default ContractType;
