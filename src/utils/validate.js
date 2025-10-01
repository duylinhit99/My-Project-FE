export function validate(input, type, file = null) {
  const errors = {};

  const typeFile = ['jpg', 'png', 'JPG', 'PNG', 'jpeg'];
  const FULL_SIZE = 1024 * 1024;

  if (type === 'register') {
    const requiredFields = {
      login: {
        email: 'Bạn chưa nhập email',
        password: 'Bạn chưa nhập password',
      },
      register: {
        name: 'Bạn chưa nhập tên',
        email: 'Bạn chưa nhập email',
        password: 'Bạn chưa nhập password',
        phone: 'Bạn chưa nhập số điện thoại',
      },
      updateUser: {
        name: 'Bạn chưa nhập tên',
        email: 'Bạn chưa nhập email',
        phone: 'Bạn chưa nhập số điện thoại',
      },
    };

    if (requiredFields[type]) {
      for (let key in requiredFields[type]) {
        if (!input[key]) {
          errors[key] = requiredFields[type][key];
        }
      }
    }

    if (input.phone && !/^\d*$/.test(input.phone)) {
      errors.phone = 'Số điện thoại chỉ được chứa số';
    }

    // Validate file avatar
    if (!file) {
      errors.avatar = 'Please enter Avatar *';
    } else {
      const files = file instanceof FileList ? Array.from(file) : [file];

      for (let f of files) {
        if (!f || !f.name) continue; // tránh lỗi undefined

        const ext = f.name.split('.').pop();
        console.log(ext);
        if (!typeFile.includes(ext)) {
          errors.avatar =
            'Only contains files with the extension: png, jpg, jpeg, PNG, JPG';
        } else if (f.size > FULL_SIZE) {
          errors.avatar = 'Please choose a file smaller than 1MB';
        }
      }
    }
  }

  return errors;
}
