const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First Name is required.'],
    minlength: [3, 'First Name must be at least 3 characters.'],
    maxlength: [50, 'First Name must be less than or equal to 50 characters.']
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required.'],
    minlength: [3, 'Last Name must be at least 3 characters.'],
    maxlength: [50, 'Last Name must be less than or equal to 50 characters.']
  },
  course: {
    type: String,
    required: [true, 'Course selection is required.'],
    enum: [
      'Certificate in Health Science',
      'Certificate in Applied Technology',
      'Bachelor of Information Technology',
      'Bachelor in Business Technology',
      'Master of Public Health'
    ]
  },
  entryScheme: {
    type: String,
    required: [true, 'Entry Scheme is required.'],
    enum: ['A-Level certificate', 'Adult/Mature Learning', 'Certificate', 'Diploma', 'Bachelors']
  },
  intake: {
    type: String,
    required: [true, 'Intake selection is required.'],
    enum: ['January Intake', 'May Intake', 'August Intake']
  },
  sponsorship: {
    type: String,
    required: [true, 'Sponsorship is required.'],
    enum: ['Private', 'Government', 'Bursary']
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female'],
    default: 'Male'
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of Birth is required.'],
    validate: {
      validator: function(value) {
        const ageLimit = 18;
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        return birthDate < today && age >= ageLimit;
      },
      message: 'Applicant must be at least 18 years old and Date of Birth must be before the application date.'
    }
  },
  residence: {
    type: String,
    required: [true, 'Residence is required.'],
    minlength: [2, 'Residence must be at least 2 characters.'],
    maxlength: [255, 'Residence must be less than or equal to 255 characters.']
  }
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);