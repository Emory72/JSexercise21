//Employees constructor
function Employee(
  id,
  name,
  email,
  password,
  datepicker,
  salary,
  position,
  hour
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.datepicker = datepicker;
  this.salary = salary;
  this.position = position;
  this.hour = hour;
}

Employee.prototype.totalSalary = function () {
  if (this.position === "CEO") {
    return this.salary * 3;
  }
  if (this.position === "manager") {
    return this.salary * 2;
  }
  if (this.position === "staff") {
    return this.salary;
  }
  return 0;
};

Employee.prototype.performance = function () {
  if (this.hour >= 192) {
    return "Excellent";
  } else if (this.hour >= 176) {
    return "Good";
  } else if (this.hour >= 160) {
    return "Average";
  } else {
    return "Poor";
  }
  return "Unidentified";
};
