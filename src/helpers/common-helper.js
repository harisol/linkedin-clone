/**
 * dynamically set state value.
 * https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
 *
 * @param {React.ChangeEvent<HTMLInputElement>} event
 * @param {Object} state consists key: value, where the key must be same with input "name" attribute
 * @param {Dispatch<SetStateAction<any>>} dispatch
 */
 export const handleInputChange = (
    event,
    state = {},
    dispatch = () => state
  ) => {
    const { name, value } = event.target;
  
    // state setter
    dispatch({ ...state, [name]: value });
    /* or like this */
    // setInputs((previousValues) => ({ ...previousValues, [name]: value }));
  };
  