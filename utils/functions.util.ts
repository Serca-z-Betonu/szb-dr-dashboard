export const formatStringsToDatesChart = (stringDates: string[]) => {
  const formatter = new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return stringDates.map((stringDate) =>
    formatter.format(new Date(stringDate))
  );
};

export const formatStringToDateChart = (stringDate: string) => {
  const formatter = new Intl.DateTimeFormat("pl-PL", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return formatter.format(new Date(stringDate));
};
