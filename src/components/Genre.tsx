export const GenreData: any = {
  m: "Homme",
  f: "Femme",
  o: "Autre ",
};

type Props = {
  index: string;
};

const GenreType = ({ index }: Props) => {
  return <span>{GenreData[index] ?? GenreData["m"]}</span>;
};

export default GenreType;
