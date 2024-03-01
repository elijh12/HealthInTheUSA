function processData(data, chosenStat1, chosenStat2) {
	data.forEach(d =>{
		if (chosenStat1 === "poverty_perc") {
			d.value1 = d.poverty_perc;
		};
		if (chosenStat1 === "median_household_income") {
			d.value1 = d.median_household_income;
		};
		if (chosenStat1 === "education_less_than_high_school_percent") {
			d.value1 = d.education_less_than_high_school_percent;
		};
		if (chosenStat1 === "percent_inactive") {
			d.value1 = d.percent_inactive;
		};
		if (chosenStat1 === "percent_smoking") {
			d.value1 = d.percent_smoking;
		};
    if (chosenStat1 === "park_access") {
			d.value1 = d.park_access;
		};
		if (chosenStat1 === "elderly_percentage") {
			d.value1 = d.elderly_percentage;
		};
		if (chosenStat1 === "number_of_hospitals") {
			d.value1 = d.number_of_hospitals;
		};
		if (chosenStat1 === "number_of_primary_care_physicians") {
			d.value1 = d.number_of_primary_care_physicians;
		};
		if (chosenStat1 === "percent_no_heath_insurance") {
			d.value1 = d.percent_no_heath_insurance;
		};
		if (chosenStat1 === "percent_high_blood_pressure") {
			d.value1 = d.percent_high_blood_pressure;
		};
		if (chosenStat1 === "percent_coronary_heart_disease") {
			d.value1 = d.percent_coronary_heart_disease;
		};
		if (chosenStat1 === "percent_stroke") {
			d.value1 = d.percent_stroke;
		};
		if (chosenStat1 === "percent_high_cholesterol") {
			d.value1 = d.percent_high_cholesterol;
		};
		if (chosenStat2 === "poverty_perc") {
			d.value2 = d.poverty_perc;
		};
		if (chosenStat2 === "median_household_income") {
			d.value2 = d.median_household_income;
		};
		if (chosenStat2 === "education_less_than_high_school_percent") {
			d.value2 = d.education_less_than_high_school_percent;
		};
		if (chosenStat2 === "percent_inactive") {
			d.value2 = d.percent_inactive;
		};
		if (chosenStat2 === "percent_smoking") {
			d.value2 = d.percent_smoking;
		};
		if (chosenStat2 === "elderly_percentage") {
			d.value2 = d.elderly_percentage;
		};
		if (chosenStat2 === "number_of_hospitals") {
			d.value2 = d.number_of_hospitals;
		};
		if (chosenStat2 === "number_of_primary_care_physicians") {
			d.value2 = d.number_of_primary_care_physicians;
		};
		if (chosenStat2 === "percent_no_heath_insurance") {
			d.value2 = d.percent_no_heath_insurance;
		};
		if (chosenStat2 === "percent_high_blood_pressure") {
			d.value2 = d.percent_high_blood_pressure;
		};
		if (chosenStat2 === "percent_coronary_heart_disease") {
			d.value2 = d.percent_coronary_heart_disease;
		};
		if (chosenStat2 === "percent_stroke") {
			d.value2 = d.percent_stroke;
		};
		if (chosenStat2 === "percent_high_cholesterol") {
			d.value2 = d.percent_high_cholesterol;
		};
    if (chosenStat2 === "park_access") {
			d.value2 = d.park_access;
		};
	});
  
  return (data);

}