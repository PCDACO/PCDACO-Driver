export const QueryKey = {
  AI: {
    LicensePlate: 'LicensePlate',
  },

  Auth: {
    Login: 'Login',
    Register: 'Register',
    Validate: 'Validate',
    Refresh: 'Refresh',
    SendOtp: 'SendOtp',
    VerifyOtp: 'VerifyOtp',
    ResetPassword: 'ResetPassword',
    ForgetPassword: 'ForgetPassword',
  },

  License: {
    List: 'LicenseList',
    Detail: 'LicenseDetail',
    Create: 'LicenseCreate',
    Update: 'LicenseUpdate',
    Delete: 'LicenseDelete',
    PatchImage: 'LicensePatchImage',
  },

  Car: {
    List: 'CarList',
    Detail: 'CarDetail',
    Create: 'CarCreate',
    Update: 'CarUpdate',
    Delete: 'CarDelete',
    PatchImage: 'CarPatchImage',
    Unavailable: 'CarUnavailable',
  },

  Booking: {
    get: {
      List: 'BookingList',
      Detail: 'BookingDetail',
      Contract: 'BookingContract',
      Payment: 'BookingPayment',
    },
    post: {
      Create: 'BookingCreate',
      Track: 'BookingTrack',
      PostInspection: 'BookingPostInspection',
      Webhook: 'BookingWebhook',
      Inspection: 'BookingInspection',
      Payment: 'PaymentBooking',
    },
    put: {
      Complete: 'BookingComplete',
      Approve: 'BookingApprove',
      Cancel: 'BookingCancel',
      Confirm: 'BookingConfirm',
      Return: 'BookingReturn',
      StartTrip: 'BookingStartTrip',
      Extend: 'BookingExtend',
    },
  },

  Contact: {
    get: {
      approval_preview: 'ContactApprovalPreview',
      preview: 'ContactPreview',
    },
  },

  Bank: {
    List: 'BankList',
    Account: {
      List: 'BankAccountList',
      Detail: 'BankAccountDetail',
      Create: 'BankAccountCreate',
      Update: 'BankAccountUpdate',
      Delete: 'BankAccountDelete',
    },
  },

  User: {
    Current: 'CurrentUser',
    Detail: 'UserDetail',
    Update: 'UserUpdate',
    Avatar: 'UserAvatar',
    Password: 'UserPassword',
  },

  Fuel: {
    List: 'FuelList',
  },

  Feedback: {
    List: 'FeedbackList',
    Create: 'FeedbackCreate',
  },

  Transmission: {
    List: 'TransmissionList',
  },

  Manufacturer: {
    List: 'ManufacturerList',
  },

  Report: {
    List: 'ReportList',
    Detail: 'ReportDetail',
    Create: 'ReportCreate',
    Approve: 'ReportApprove',
    Compensation: 'ReportCompensation',
    CompensationProof: 'ReportCompensationProof',
    Image: 'ReportImage',
  },

  Transaction: {
    Check: 'TransactionCheck',
    Withdraw: 'Withdraw',
    Transaction: 'Transaction',
    CreateWithdraw: 'CreateWithdraw',
  },

  Model: {
    List: 'ModelList',
  },
};
