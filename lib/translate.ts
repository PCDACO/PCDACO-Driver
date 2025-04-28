export const translate = {
  booking: {
    success: {
      title: 'Đặt xe thành công',
      extend: 'Cập nhật đơn đặt xe thành công',
      message: 'Đơn đặt xe đã được đặt thành công, vui lòng chờ xác nhận từ tài xế',
      payment: 'Đang chuyển hướng đến trang thanh toán...',
    },
    failed: {
      title: 'Đặt xe thất bại',
      extend: 'Cập nhật đơn đặt xe thất bại',
      message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
      payment: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
    },
    status: {
      Pending: 'Chờ xác nhận',
      Approved: 'Đã xác nhận',
      Rejected: 'Đã từ chối',
      ReadyForPickup: 'Sẵn sàng đón khách',
      Ongoing: 'Đang diễn ra',
      Completed: 'Đã hoàn thành',
      Cancelled: 'Đã hủy',
      Expired: 'Đã hết hạn',
      Done: 'Đã hoàn tất',
    },
    toast: {
      approve: 'Xác nhận đơn đặt xe thành công!',
      reject: 'Từ chối đơn đặt xe thành công!',
      payment: 'Đang chuyển hướng đến trang thanh toán...',
      cancel: 'Hủy bỏ đơn đặt xe thành công!',
      startTrip: 'Bắt đầu chuyến đi thành công!',
      complete: 'Hoàn tất chuyến đi thành công!',
      return: 'Trả xe thành công!',
    },
    totalAmount: 'Tổng tiền',
    distance: 'Quãng đường',
  },
  bank: {
    toast: {
      create: 'Thêm tài khoản ngân hàng thành công!',
      update: 'Cập nhật tài khoản ngân hàng thành công!',
      delete: 'Xóa tài khoản ngân hàng thành công!',
      error_create: 'Thêm tài khoản ngân hàng thất bại!',
      error_update: 'Cập nhật tài khoản ngân hàng thất bại!',
      error_delete: 'Xóa tài khoản ngân hàng thất bại!',
    },
  },

  report: {
    toast: {
      create: 'Tạo báo cáo thành công!',
      error_create: 'Tạo báo cáo thất bại!',
      approve: 'Phê duyệt báo cáo thành công!',
      error_approve: 'Phê duyệt báo cáo thất bại!',
      compensation: 'Cập nhật bồi thường thành công!',
      error_compensation: 'Cập nhật bồi thường thất bại!',
      compensation_proof: 'Cập nhật bằng chứng thành công!',
      error_compensation_proof: 'Cập nhật bằng chứng thất bại!',
      image: 'Cập nhật hình ảnh thành công!',
      error_image: 'Cập nhật hình ảnh thất bại!',
    },

    type: {
      Conflict: 'Xung đột',
      Accident: 'Tổn thất',
      FineNotice: 'Vi phạm',
      Damage: 'Hư hỏng',
      Maintenance: 'Bảo trì',
      Other: 'Khác',
    },

    status: {
      Pending: 'Chờ xử lý',
      UnderReview: 'Đang xử lý',
      Resolved: 'Đã xử lý',
      Rejected: 'Đã từ chối',
    },
    bookingId: 'Mã đơn',
  },

  transaction: {
    toast: {
      withdraw_success: 'Rút tiền thành công!',
      withdraw_error: 'Rút tiền thất bại!',
    },
    type: {
      BookingPayment: 'Thanh toán đơn đặt xe',
      PlatformFee: 'Phí hệ thống',
      OwnerEarning: 'Lợi nhuận chủ xe',
      Withdrawal: 'Rút tiền',
      Refund: 'Hoàn tiền',
      Compensation: 'Bồi thường',
    },
    status: {
      Pending: 'Chờ xử lý',
      Completed: 'Đã hoàn thành',
      Failed: 'Thất bại',
      Cancelled: 'Đã hủy',
    },
  },

  user: {
    toast: {
      update_avatar: 'Cập nhật ảnh đại diện thành công!',
      error_update_avatar: 'Cập nhật ảnh đại diện thất bại!',
    },
  },

  feedback: {
    toast: {
      create: 'Đánh giá thành công!',
      error_create: 'Đánh giá thất bại!',
    },
  },

  home: {
    welcome: 'Xin chào',
    welcomeSubtitle: 'Chào mừng bạn đến với PCDACO Driver',
    nearbyCars: 'Xe gần bạn',
    recentBookings: 'Đơn đặt xe gần đây',
    recentReports: 'Báo cáo gần đây',
    noNearbyCars: 'Không có xe nào gần bạn',
    noRecentBookings: 'Không có đơn đặt xe gần đây',
    noRecentReports: 'Không có báo cáo gần đây',
  },

  common: {
    seeAll: 'Xem tất cả',
  },
};
