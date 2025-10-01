export function validateProduct(input, file, type) {
  const errors = {};

  const typeFile = ['jpg', 'png', 'JPG', 'PNG'];
  const FULL_SIZE = 1024 * 1024;

  if (type === 'addProduct') {
    const requiredFields = {
      name: 'Bạn chưa nhập tên',
      price: 'Bạn chưa nhập price',
      category: 'Bạn chưa nhập category',
      brand: 'Bạn chưa nhập brand',
      status: 'Bạn chưa nhập status',
      companyProfile: 'Bạn chưa nhập companyProfile',
      detail: 'Bạn chưa nhập detail',
    };

    // Lặp qua các field để kiểm tra
    for (let field in requiredFields) {
      if (!input[field]) {
        errors[field] = requiredFields[field];
      }
    }

    if (!file || file.length === 0) {
      errors.avatar = 'Please enter Avatar *';
    } else {
      const files =
        Array.isArray(file) || file instanceof FileList ? file : [file];

      for (let f of files) {
        const ext = f.name.split('.').pop();
        if (!typeFile.includes(ext)) {
          errors.avatar =
            'Only contains files with the extension: png, jpg, jpeg, PNG, JPG';
        } else if (f.size > FULL_SIZE) {
          errors.avatar = 'Please choose a file smaller than 1MB';
        }
      }

      if (files.length > 3) {
        errors.avatar = 'Không được quá 3 ảnh';
      }
    }
  }

  return errors;
}
