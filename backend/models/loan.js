const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: 1 }, // Ensure amount > 0
    interest: { type: Number, default: 0 },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    repaymentSchedule: { type: Date }, // Optional
    repaidAmount: { type: Number, default: 0 }, // Optional
    dueDate: { type: Date }, // Optional
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Pre-save hook to update `updatedAt`
LoanSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Virtual field for total repayment amount
LoanSchema.virtual('totalRepayment').get(function () {
    return this.amount + this.interest;
});

module.exports = mongoose.model('Loan', LoanSchema);
