const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post(
  '/submit-form',
  [
    // First Name Validation
    body('firstName')
      .isString().withMessage('First Name must be a string.')
      .isLength({ min: 3, max: 50 }).withMessage('First Name must be between 3 and 50 characters.')
      .notEmpty().withMessage('First Name is required.'),

    // Last Name Validation
    body('lastName')
      .isString().withMessage('Last Name must be a string.')
      .isLength({ min: 3, max: 50 }).withMessage('Last Name must be between 3 and 50 characters.')
      .notEmpty().withMessage('Last Name is required.'),

    // Course Validation
    body('course')
      .notEmpty().withMessage('Course is required.')
      .isIn([
        'Certificate in Health Science',
        'Certificate in Applied Technology',
        'Bachelor of Information Technology',
        'Bachelor in Business Technology',
        'Master of Public Health'
      ]).withMessage('Invalid course selection.'),

    // Entry Scheme Validation
    body('entryScheme')
      .notEmpty().withMessage('Entry Scheme is required.')
      .isIn([
        'A-Level certificate',
        'Adult/Mature Learning',
        'Certificate',
        'Diploma',
        'Bachelors'
      ]).withMessage('Invalid entry scheme selection.'),

    // Intake Validation
    body('intake')
      .notEmpty().withMessage('Intake is required.')
      .isIn(['January Intake', 'May Intake', 'August Intake']).withMessage('Invalid intake selection.'),

    // Sponsorship Validation
    body('sponsorship')
      .notEmpty().withMessage('Sponsorship is required.')
      .isIn(['Private', 'Government', 'Bursary']).withMessage('Invalid sponsorship selection.'),

    // Gender Validation
    body('gender')
      .isIn(['Male', 'Female']).withMessage('Invalid gender selection.')
      .optional(), // Optional since Male is default but needs a fallback check.

    // Date of Birth Validation
    body('dateOfBirth')
      .notEmpty().withMessage('Date of Birth is required.')
      .isDate().withMessage('Date of Birth must be a valid date.')
      .custom((value, { req }) => {
        const dob = new Date(value);
        const today = new Date();
        const applicationDate = new Date(req.body.applicationDate);
        const age = today.getFullYear() - dob.getFullYear();
        if (dob >= applicationDate || age < 18) {
          throw new Error('Applicants must be at least 18 years old, and the date of birth cannot be after the application date.');
        }
        return true;
      }),

    // Residence Validation
    body('residence')
      .isString().withMessage('Residence must be a string.')
      .isLength({ min: 2, max: 255 }).withMessage('Residence must be between 2 and 255 characters.')
      .notEmpty().withMessage('Residence is required.'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Process form data if validation is successful
    res.status(200).json({ message: 'Form submitted successfully!' });
  }
);

module.exports = router;