import {
  RESET_ERROR_MESSAGE,
} from 'constants';


// Resets the currently visible error message.
export function resetErrorMessage() {
  return {
    type: RESET_ERROR_MESSAGE,
  };
}
