import React from "react";

export default function Field({ label, children, htmlFor, error }) {
  const getChildId = (children) => {
    // the React.Children.only function verifies that the children prop passed to the component contains exactly one child element. If the condition is met, it returns the single child element. If there are multiple children or no children, it throws an error to indicate an incorrect usage of the component.
    
    const child = React.Children.only(children);

    // eslint-disable-next-line no-unsafe-optional-chaining
    if ("id" in child?.props) {
      return child.props.id;
    }
  };

  const id = htmlFor || getChildId(children);

  return (
    <div className="form-control">
      {label && (
        <label htmlFor={id} className="auth-label">
          {label}
        </label>
      )}
      {children}
      {!!error && (
        <div role="alert" className="text-red-600">
          {error.message}
        </div>
      )}
    </div>
  );
}
