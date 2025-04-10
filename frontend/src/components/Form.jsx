import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from './Button';

const Form = ({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  submitButtonLabel = 'Submit',
  resetButtonLabel = null,
  isSubmitting = false,
  className = '',
}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, formikHelpers) => {
      onSubmit(values, formikHelpers);
    },
  });

  // Clone children with formik props
  const childrenWithProps = React.Children.map(children, child => {
    // If child is not a valid React element, return as is
    if (!React.isValidElement(child)) return child;

    const name = child.props.name;
    
    // If the child doesn't have a name prop (not a form control), return as is
    if (!name) return child;

    // Add formik props to the child
    return React.cloneElement(child, {
      value: formik.values[name] || '',
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      error: formik.errors[name],
      touched: formik.touched[name],
    });
  });

  return (
    <form onSubmit={formik.handleSubmit} className={className} noValidate>
      {childrenWithProps}

      <div className="flex gap-4 mt-6">
        <Button 
          type="submit" 
          variant="primary" 
          isLoading={isSubmitting}
          disabled={isSubmitting || !formik.isValid}
        >
          {submitButtonLabel}
        </Button>
        
        {resetButtonLabel && (
          <Button 
            type="button" 
            variant="secondary" 
            onClick={formik.resetForm}
            disabled={isSubmitting}
          >
            {resetButtonLabel}
          </Button>
        )}
      </div>
    </form>
  );
};

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  submitButtonLabel: PropTypes.string,
  resetButtonLabel: PropTypes.string,
  isSubmitting: PropTypes.bool,
  className: PropTypes.string,
};

export default Form;
