let employees = [];

let isSubmitted = false;
//Add Information feature
function addEmployees() {
  isSubmitted = true;
  let employee = validate();
  if (!employee) {
    return;
  }
  employees.push(employee);
  display(employees);
  reset();
}
//Find feature
function findPerformance() {
  let search = document.getElementById("searchName").value;
  search = search.trim().toLowerCase();
  let newEmployees = employees.filter((value) => {
    let performance = value.performance().trim().toLowerCase();
    return performance.includes(search);
  });
  display(newEmployees);
}

//Delete feature
function removeEmployee(employeeID) {
  employees = employees.filter((value) => {
    return value.id !== employeeID;
  });
  display(employees);
}
// Edit feature
function selectEmployee(employeeID) {
  let employee = employees.find((value) => {
    return value.id === employeeID;
  });
  //Fill thông tin tìm kiếm được lên giao diện
  document.getElementById("tknv").value = employee.id;
  document.getElementById("name").value = employee.name;
  document.getElementById("email").value = employee.email;
  document.getElementById("password").value = employee.password;
  document.getElementById("datepicker").value = employee.datepicker;
  document.getElementById("luongCB").value = employee.salary;
  document.getElementById("chucvu").value = employee.position;
  document.getElementById("gioLam").value = employee.hour;
  //Mã ID và button ADD bị disabled
  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
  //Hiển thị ra form log in
  document.getElementById("myModal").style.display = "block";
  document.querySelector(".modal").classList.add("show");
}
//Update feature
function updateEmployee() {
  isSubmitted = true;
  let employee = validate();
  if (!employee) {
    return;
  }

  let index = employees.findIndex((value) => {
    return value.id === employee.id;
  });
  //Thay thế phần tử thứ index bằng object mới tạo
  employees[index] = employee;

  //Hiển thị
  display(employees);
  document.getElementById("myModal").style.display = "none";
  document.querySelector(".modal").classList.remove("show");

  //Reset
  reset();
}
//Display function
function display(employees) {
  let html = employees.reduce((result, value) => {
    return (
      result +
      `
        <tr>
          <td>${value.id}</td>
          <td>${value.name}</td>
          <td>${value.email}</td>
          <td>${value.datepicker}</td>
          <td>${value.position}</td>
          <td>${value.totalSalary()}</td>
          <td>${value.performance()}</td>
          <td>
            <button class = "btn btn-warning me-2" onclick ="selectEmployee('${
              value.id
            }')">Edit</button>
            <button class = "btn btn-danger" onclick ="removeEmployee('${
              value.id
            }')">Delete</button>

          </td>
        </tr>
      `
    );
  }, "");

  document.getElementById("tableDanhSach").innerHTML = html;
}
//Reset feature
function reset() {
  isSubmitted = false;
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";

  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;

  document.getElementById("tbTKNV").innerHTML = "";
  document.getElementById("tbTen").innerHTML = "";
  document.getElementById("tbEmail").innerHTML = "";
  document.getElementById("tbMatKhau").innerHTML = "";
  document.getElementById("tbNgay").innerHTML = "";
  document.getElementById("tbLuongCB").innerHTML = "";
  document.getElementById("tbChucVu").innerHTML = "";
  document.getElementById("tbGiolam").innerHTML = "";
}

function isRequired(value) {
  if (!value.trim()) {
    // Chuỗi rỗng
    return false;
  }
  return true;
}
function validateSalary(value) {
  if (isNaN(value)) {
    return false;
  }
  if (value > 20000000 || value < 1000000) {
    return false;
  }
  return true;
}

function validateHour(value) {
  if (isNaN(value)) {
    return false;
  }
  if (value < 80 || value > 200) {
    return false;
  }
  return true;
}

function isAccount(value) {
  let regex = /^\d{4,6}$/;
  return regex.test(value);
}

function isName(value) {
  let regex = /^[A-Za-z]+$/;
  return regex.test(value);
}

function isPassword(value) {
  let regex =
    /^(?=.*[A-Z])(?=.*[!&%\/()=\?\^\*\+\]\[#><;:,\._-|@])(?=.*[0-9])(?=.*[a-z]).{6,10}$/;

  return regex.test(value);
}

function isEmail(value) {
  let regex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
  return regex.test(value);
}

function validate() {
  let id = document.getElementById("tknv").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let datepicker = document.getElementById("datepicker").value;
  let salary = document.getElementById("luongCB").value;
  let position = document.getElementById("chucvu").value;
  let hour = document.getElementById("gioLam").value;

  let isValid = true;
  //Account ID
  if (!isRequired(id)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML =
      "Account field must be fill in";
    document.getElementById("tbTKNV").style.display = "unset";
  } else if (!isAccount(id)) {
    isValid = false;
    document.getElementById("tbTKNV").innerHTML = "Account field invalid";
    document.getElementById("tbTKNV").style.display = "unset";
  }
  // Name
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML =
      "Full name field must be fill in";
    document.getElementById("tbTen").style.display = "unset";
  } else if (!isName(name)) {
    isValid = false;
    document.getElementById("tbTen").innerHTML = "Full name field invalid";
    document.getElementById("tbTen").style.display = "unset";
  }
  // Email
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML =
      "Email field must be fill in";
    document.getElementById("tbEmail").style.display = "unset";
  } else if (!isEmail(email)) {
    isValid = false;
    document.getElementById("tbEmail").innerHTML = "Email field invalid";
    document.getElementById("tbEmail").style.display = "unset";
  }
  // password
  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML =
      "Password field must be fill in";
    document.getElementById("tbMatKhau").style.display = "unset";
  } else if (!isPassword(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").innerHTML = "Password invalid";
    document.getElementById("tbMatKhau").style.display = "unset";
  }
  // datepicker
  if (!isRequired(datepicker)) {
    isValid = false;
    document.getElementById("tbNgay").innerHTML = "Date field must be fill in";
    document.getElementById("tbNgay").style.display = "unset";
  }
  // salary
  if (!isRequired(salary)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      "Basic salary field must be fill in";
    document.getElementById("tbLuongCB").style.display = "unset";
  } else if (!validateSalary(+salary)) {
    isValid = false;
    document.getElementById("tbLuongCB").innerHTML =
      "Basic salary field invalid    ";
    document.getElementById("tbLuongCB").style.display = "unset";
  }
  // position
  if (!isRequired(position)) {
    isValid = false;
    document.getElementById("tbChucVu").innerHTML =
      "Position field must be fill in";
    document.getElementById("tbChucVu").style.display = "unset";
  }
  // Working Hour
  if (!isRequired(hour)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML =
      "Working hour field must be fill in";
    document.getElementById("tbGiolam").style.display = "unset";
  } else if (!validateHour(+hour)) {
    isValid = false;
    document.getElementById("tbGiolam").innerHTML =
      "Working hour field invalid ";
    document.getElementById("tbGiolam").style.display = "unset";
  }

  if (isValid) {
    let employee = new Employee(
      id,
      name,
      email,
      password,
      datepicker,
      +salary,
      position,
      +hour
    );
    return employee;
  }
  return undefined;
}
//Event ID
document.getElementById("tknv").oninput = (event) => {
  if (!isSubmitted) return;
  let idSpan = document.getElementById("tbTKNV");
  if (isRequired(event.target.value)) {
    idSpan.innerHTML = "";
  } else {
    idSpan.innerHTML = "Fields must be filled";
  }
};
//Event name
document.getElementById("name").oninput = (event) => {
  if (!isSubmitted) return;

  let nameSpan = document.getElementById("tbTen");
  if (isRequired(event.target.value)) {
    nameSpan.innerHTML = "";
  } else {
    nameSpan.innerHTML = "Fields must be filled";
  }
};
//Event email
document.getElementById("email").oninput = (event) => {
  if (!isSubmitted) return;

  let emailSpan = document.getElementById("tbEmail");
  if (isRequired(event.target.value)) {
    emailSpan.innerHTML = "";
  } else {
    emailSpan.innerHTML = "Fields must be filled";
  }
};

//Event password
document.getElementById("password").oninput = (event) => {
  if (!isSubmitted) return;

  let passwordSpan = document.getElementById("tbMatKhau");
  if (isRequired(event.target.value)) {
    passwordSpan.innerHTML = "";
  } else {
    passwordSpan.innerHTML = "Fields must be filled";
  }
};

//Event date
document.getElementById("datepicker").oninput = (event) => {
  if (!isSubmitted) return;

  let dateSpan = document.getElementById("tbNgay");
  if (isRequired(event.target.value)) {
    dateSpan.innerHTML = "";
  } else {
    dateSpan.innerHTML = "Fields must be filled";
  }
};

//Event salary
document.getElementById("luongCB").oninput = (event) => {
  if (!isSubmitted) return;

  let salarySpan = document.getElementById("tbLuongCB");
  if (isRequired(event.target.value)) {
    salarySpan.innerHTML = "";
  } else {
    salarySpan.innerHTML = "Fields must be filled";
  }
};

//Event position
document.getElementById("chucvu").oninput = (event) => {
  if (!isSubmitted) return;

  let positionSpan = document.getElementById("tbChucVu");
  if (isRequired(event.target.value)) {
    positionSpan.innerHTML = "";
  } else {
    positionSpan.innerHTML = "Fields must be filled";
  }
};

//Event hour
document.getElementById("gioLam").oninput = (event) => {
  if (!isSubmitted) return;

  let hourSpan = document.getElementById("tbGiolam");
  if (isRequired(event.target.value)) {
    hourSpan.innerHTML = "";
  } else {
    hourSpan.innerHTML = "Fields must be filled";
  }
};
