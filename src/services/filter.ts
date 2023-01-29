import { Record } from "@/interfaces";

export const calculateAvgTJM = (jobs: Record[]) => {
  const sum = jobs
    .filter((e) => e.contract == "f")
    .reduce((accumulator: number, current: Record) => {
      return accumulator + parseInt(current.salary);
    }, 0);

  return sum / jobs.length;
};

export const calculateAvgSalary = (jobs: Record[]) => {
  const sum = jobs
    .filter((e) => e.contract != "f")
    .reduce((accumulator: number, current: Record) => {
      return accumulator + parseInt(current.salary);
    }, 0);

  return sum / jobs.length;
};
