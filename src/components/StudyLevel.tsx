export const StudyLevelData: any = {
  "-1": "Pas de diplôme",
  "0": "CAP, BEP",
  "1": "Baccalauréat ",
  "2": "BTS, DUT",
  "3": "Licence",
  "4": "Maîtrise",
  "5": "Master",
  "8": "Doctorat",
};

type Props = {
  index: string;
};

const StudyLevel = ({ index }: Props) => {
  return <span>{StudyLevelData[index] ?? StudyLevelData["-1"]}</span>;
};

export default StudyLevel;
