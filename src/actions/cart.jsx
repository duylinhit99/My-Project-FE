// khởi tạo action

export const updateTongQty = (qty) => {
  return {
    type: 'UPDATE_TONG_QTY',
    payload: qty,
  };
};
