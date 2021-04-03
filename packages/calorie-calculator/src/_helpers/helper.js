export const Check = (gender, age, bmi) => {
  console.log(gender, age, bmi);
  switch (gender) {
    case "male":
      if (age < 18) {
        if (bmi < 21) {
          return "under weight";
        } else if (bmi >= 23 && bmi < 26) {
          return "optimal weight";
        } else if (bmi >= 21 && bmi < 29) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else if (age >= 18 && age <= 34) {
        if (bmi < 22) {
          return "under weight";
        } else if (bmi >= 23 && bmi < 27) {
          return "optimal weight";
        } else if (bmi >= 22 && bmi < 29) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else if (age >= 45 && age <= 54) {
        if (bmi < 23) {
          return "under weight";
        } else if (bmi >= 24 && bmi < 28) {
          return "optimal weight";
        } else if (bmi >= 23 && bmi < 29) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else if (age >= 55 && age <= 64) {
        if (bmi < 23) {
          return "under weight";
        } else if (bmi >= 24 && bmi < 29) {
          return "optimal weight";
        } else if (bmi >= 23 && bmi < 31.5) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else if (age >= 65 && age <= 74) {
        if (bmi < 23) {
          return "under weight";
        } else if (bmi >= 25 && bmi < 29) {
          return "optimal weight";
        } else if (bmi >= 23 && bmi < 31.5) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else if (age >= 75 && age <= 99) {
        if (bmi < 24) {
          return "under weight";
        } else if (bmi >= 25 && bmi < 33) {
          return "optimal weight";
        } else if (bmi >= 24 && bmi < 35) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else return "outOfRange";

    case "female":
      if (age < 18) {
        if (bmi < 15.5) {
          return "under weight";
        } else if (bmi >= 15.5 && bmi < 25) {
          return "optimal weight";
        } else if (bmi >= 15.5 && bmi < 26) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else if (age >= 18 && age <= 34) {
        if (bmi < 17.5) {
          return "under weight";
        } else if (bmi >= 19 && bmi < 24) {
          return "optimal weight";
        } else if (bmi >= 17.5 && bmi < 26) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else if (age >= 45 && age <= 49) {
        if (bmi < 19) {
          return "under weight";
        } else if (bmi >= 20 && bmi < 26) {
          return "optimal weight";
        } else if (bmi >= 19 && bmi < 27) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else if (age >= 50 && age <= 54) {
        if (bmi < 21) {
          return "under weight";
        } else if (bmi >= 22 && bmi < 27) {
          return "optimal weight";
        } else if (bmi >= 21 && bmi < 28) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else if (age >= 55 && age <= 64) {
        if (bmi < 22) {
          return "under weight";
        } else if (bmi >= 23 && bmi < 28) {
          return "optimal weight";
        } else if (bmi >= 22 && bmi < 30) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else if (age >= 65 && age <= 74) {
        if (bmi < 22) {
          return "under weight";
        } else if (bmi >= 24 && bmi < 29) {
          return "optimal weight";
        } else if (bmi >= 22 && bmi < 31.5) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else if (age >= 75 && age <= 99) {
        if (bmi < 22) {
          return "under weight";
        } else if (bmi >= 24 && bmi < 30) {
          return "optimal weight";
        } else if (bmi >= 22 && bmi < 36.5) {
          return "acceptable weight";
        } else {
          return "over weight";
        }
      } else return "outOfRange";

    default:
      return "noResult";
  }
};

export const calculateBmi = (weight, height) => {
  return weight / (height * height);
};
